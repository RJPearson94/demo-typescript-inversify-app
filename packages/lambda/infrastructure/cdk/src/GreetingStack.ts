import { CfnOutput, Construct, Duration, RemovalPolicy, Stack, StackProps } from '@aws-cdk/core';
import { Function, Runtime, Code, Tracing, Alias, IFunction, IAlias } from '@aws-cdk/aws-lambda';
import { LogGroup, RetentionDays } from '@aws-cdk/aws-logs';
import { IRestApi, SpecRestApi, ApiDefinition, RateLimitedApiKey, Period, IApiKey } from '@aws-cdk/aws-apigateway';
import { ServicePrincipal } from '@aws-cdk/aws-iam';
import openApiTemplate from './templates/openapi.tpl.json';

export interface FunctionResources {
  func: IFunction;
  alias: IAlias;
}

export interface ApiGatewayResources {
  restApi: IRestApi;
  apiKey: IApiKey;
}

export type GreetingStackProps = {
  resourcePrefix?: string;
  api?: {
    stageName?: string;
    quota?: {
      limit?: number;
      period?: Period;
    };
  };
  lambda?: {
    alias?: string;
  };
} & StackProps;

export class GreetingStack extends Stack {
  public readonly apiGatewayURL: CfnOutput;
  public readonly apiKeyArn: CfnOutput;

  private resourcePrefix: string;

  public constructor(scope: Construct, private id: string, private props?: GreetingStackProps) {
    super(scope, id, props);

    this.resourcePrefix = props?.resourcePrefix ? `${props?.resourcePrefix}-` : '';

    const { alias } = this.createFunction();
    const { restApi, apiKey } = this.createAPIGateway(alias);

    alias.addPermission('AllowApiGatewayInvoke', {
      principal: new ServicePrincipal('apigateway.amazonaws.com'),
      action: 'lambda:InvokeFunction',
      sourceArn: restApi.deploymentStage.restApi.arnForExecuteApi()
    });

    this.apiGatewayURL = new CfnOutput(this, `APIGatewayURL`, {
      value: restApi.deploymentStage.urlForPath()
    });
    this.apiKeyArn = new CfnOutput(this, `APIKeyARN`, {
      value: apiKey.keyArn
    });
  }

  private createFunction(): FunctionResources {
    const functionName = `${this.resourcePrefix}${this.id}`;

    const logGroup = new LogGroup(this, `FunctionLogGroup`, {
      logGroupName: `/aws/lambda/${functionName}`,
      retention: RetentionDays.ONE_WEEK,
      removalPolicy: RemovalPolicy.DESTROY
    });

    const func = new Function(this, `Function`, {
      code: Code.fromAsset('../../dist/lambda.zip'),
      functionName,
      handler: 'main.handler',
      runtime: Runtime.NODEJS_14_X,
      tracing: Tracing.ACTIVE,
      timeout: Duration.seconds(5)
    });

    logGroup.grantWrite(func);

    const alias = new Alias(this, `FunctionAlias`, {
      aliasName: this.props?.lambda?.alias || 'stable',
      version: func.currentVersion
    });

    return {
      func,
      alias
    };
  }

  private createAPIGateway(alias: IAlias): ApiGatewayResources {
    const template = JSON.stringify(openApiTemplate).replace('${lambda_arn}', alias.functionArn);

    const apiGatewayName = `${this.resourcePrefix}${this.id}`;

    const restApi = new SpecRestApi(this, `ApiGateway`, {
      apiDefinition: ApiDefinition.fromInline(JSON.parse(template)),
      restApiName: `${apiGatewayName}-rest-api`,
      deploy: true,
      cloudWatchRole: false,
      deployOptions: {
        tracingEnabled: true,
        stageName: this.props?.api?.stageName || 'test'
      }
    });

    const apiKey = new RateLimitedApiKey(this, `ApiKey`, {
      apiKeyName: `${apiGatewayName}-api-key`,
      resources: [restApi],
      apiStages: [
        {
          api: restApi,
          stage: restApi.deploymentStage
        }
      ],
      quota: {
        limit: 100,
        period: Period.MONTH,
        ...(this.props?.api?.quota || {})
      }
    });

    return {
      restApi,
      apiKey
    };
  }
}
