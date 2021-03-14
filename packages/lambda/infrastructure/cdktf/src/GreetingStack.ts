import { Construct } from 'constructs';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { TerraformStack, TerraformOutput } from 'cdktf';
import {
  LambdaFunction,
  CloudwatchLogGroup,
  IamRole,
  LambdaAlias,
  LambdaPermission,
  IamPolicy,
  IamRolePolicyAttachment,
  ApiGatewayRestApi,
  ApiGatewayDeployment,
  ApiGatewayStage,
  ApiGatewayApiKey,
  ApiGatewayUsagePlan,
  ApiGatewayUsagePlanKey
} from '@cdktf/provider-aws';
import openApiTemplate from './templates/openapi.tpl.json';

export type FunctionResources = {
  func: LambdaFunction;
  alias: LambdaAlias;
};

export interface ApiGatewayResources {
  restApi: ApiGatewayRestApi;
  stage: ApiGatewayStage;
  apiKey: ApiGatewayApiKey;
}

export type GreetingStackProps = {
  resourcePrefix?: string;
  api?: {
    stageName?: string;
    quota?: {
      limit?: number;
      period?: string;
    };
  };
  lambda?: {
    alias?: string;
  };
  tags?: { [name: string]: string };
};

export class GreetingStack extends TerraformStack {
  public readonly apiGatewayURL: TerraformOutput;
  public readonly apiKeyArn: TerraformOutput;

  private resourcePrefix: string;

  constructor(scope: Construct, private name: string, private props?: GreetingStackProps) {
    super(scope, name);

    this.resourcePrefix = props?.resourcePrefix ? `${props?.resourcePrefix}-` : '';

    const { alias } = this.createFunction();
    const { stage, apiKey } = this.createAPIGateway(alias);

    new LambdaPermission(this, `api_gateway_invoke_lambda`, {
      statementId: 'AllowAPIGatewayInvoke',
      action: 'lambda:InvokeFunction',
      functionName: alias.arn,
      principal: 'apigateway.amazonaws.com',
      sourceArn: `${stage.executionArn}/*`
    });

    this.apiGatewayURL = new TerraformOutput(this, `api_gateway_url`, {
      value: stage.invokeUrl
    });
    this.apiKeyArn = new TerraformOutput(this, `api_key_arn`, {
      value: apiKey.arn
    });
  }

  private createFunction(): FunctionResources {
    const functionName = `${this.resourcePrefix}${this.name}-function`;

    const logGroup = new CloudwatchLogGroup(this, `lambda_logs`, {
      name: `/aws/lambda/${functionName}`,
      retentionInDays: 7,
      tags: this.props?.tags
    });

    const lambdaRole = new IamRole(this, `lambda_role`, {
      assumeRolePolicy: JSON.stringify({
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'sts:AssumeRole',
            Principal: {
              Service: 'lambda.amazonaws.com'
            },
            Effect: 'Allow'
          }
        ]
      }),
      name: `${functionName}-role`,
      tags: this.props?.tags
    });

    const lambdaPolicy = new IamPolicy(this, `lambda_policy`, {
      name: `${functionName}-policy`,
      policy: JSON.stringify({
        Version: '2012-10-17',
        Statement: [
          {
            Action: ['logs:CreateLogStream', 'logs:PutLogEvents'],
            Resource: logGroup.arn,
            Effect: 'Allow'
          },
          {
            Action: ['xray:PutTraceSegments', 'xray:PutTelemetryRecords'],
            Resource: '*',
            Effect: 'Allow'
          }
        ]
      })
    });

    new IamRolePolicyAttachment(this, `lambda_policy_attachment`, {
      role: lambdaRole.name,
      policyArn: lambdaPolicy.arn
    });

    const lambdaArtefactPath = '../../../dist/lambda.zip';
    const fileContents = fs.readFileSync(path.resolve(__dirname, lambdaArtefactPath));

    const func = new LambdaFunction(this, `lambda`, {
      filename: lambdaArtefactPath,
      sourceCodeHash: crypto.createHash('sha256').update(fileContents).digest('base64'),

      functionName,
      role: lambdaRole.arn,

      runtime: 'nodejs14.x',
      handler: 'main.handler',
      memorySize: 128,
      timeout: 5,
      tags: this.props?.tags,

      tracingConfig: [
        {
          mode: 'PassThrough'
        }
      ]
    });

    const alias = new LambdaAlias(this, `lambda_alias`, {
      name: this.props?.lambda?.alias || 'stable',
      functionName: func.functionName,
      functionVersion: func.version
    });

    return {
      func,
      alias
    };
  }

  private createAPIGateway(alias: LambdaAlias): ApiGatewayResources {
    const template = JSON.stringify(openApiTemplate).replace('${lambda_excution_uri}', alias.invokeArn);

    const apiGatewayName = `${this.resourcePrefix}${this.name}`;

    const restApi = new ApiGatewayRestApi(this, `rest_api`, {
      name: `${apiGatewayName}-rest-api`,
      body: template,
      tags: this.props?.tags
    });

    const deployment = new ApiGatewayDeployment(this, `deployment`, {
      restApiId: restApi.id,

      triggers: {
        redeployment: crypto.createHash('sha512').update(template).digest('hex')
      },

      lifecycle: {
        createBeforeDestroy: true
      }
    });

    const stage = new ApiGatewayStage(this, `stage`, {
      stageName: this.props?.api?.stageName || 'test',
      restApiId: restApi.id,
      deploymentId: deployment.id,
      xrayTracingEnabled: true,
      tags: this.props?.tags
    });

    const apiKey = new ApiGatewayApiKey(this, `api_key`, {
      name: `${apiGatewayName}-api-key`,
      tags: this.props?.tags
    });

    const usagePlan = new ApiGatewayUsagePlan(this, `usage_plan`, {
      name: `${apiGatewayName}-usage-plan`,
      apiStages: [
        {
          apiId: restApi.id,
          stage: stage.stageName
        }
      ],
      quotaSettings: [
        {
          limit: 100,
          period: 'MONTH',
          ...(this.props?.api?.quota || {})
        }
      ],
      tags: this.props?.tags
    });

    new ApiGatewayUsagePlanKey(this, `usage_plan_key`, {
      keyId: apiKey.id,
      usagePlanId: usagePlan.id,
      keyType: 'API_KEY'
    });

    return {
      restApi,
      stage,
      apiKey
    };
  }
}
