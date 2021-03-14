import { Construct } from 'constructs';
import { TerraformStack, TerraformOutput } from 'cdktf';
import { ServerlessBuild, ServerlessDeployment, ServerlessEnvironment, ServerlessFunction, ServerlessService } from '../.gen/providers/twilio';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export type GreetingStackProps = {
  resourceSuffix?: string;
};

export class GreetingStack extends TerraformStack {
  public readonly functionURL: TerraformOutput;

  private resourceSuffix: string;

  constructor(scope: Construct, private name: string, props?: GreetingStackProps) {
    super(scope, name);

    this.resourceSuffix = props?.resourceSuffix ? `-${props?.resourceSuffix}` : '';

    const service = this.createService();
    const func = this.createFunction(service);
    const build = this.createBuild(service, func);
    const environment = this.createEnvironment(service);
    this.createDeployment(service, environment, build);

    this.functionURL = new TerraformOutput(this, `function_url`, {
      value: `https://${environment.domainName}${func.path}`
    });
  }

  private createService(): ServerlessService {
    return new ServerlessService(this, 'service', {
      uniqueName: `${this.name}${this.resourceSuffix}`,
      friendlyName: `${this.name}${this.resourceSuffix}`,
      includeCredentials: false,
      uiEditable: false
    });
  }

  private createFunction(service: ServerlessService): ServerlessFunction {
    const source = '../../../dist/index.js';
    const fileContents = fs.readFileSync(path.resolve(__dirname, source));

    return new ServerlessFunction(this, 'function', {
      serviceSid: service.sid,
      friendlyName: `${this.name}${this.resourceSuffix}`,

      source,
      sourceHash: crypto.createHash('sha256').update(fileContents).digest('base64'),

      contentType: 'application/javascript',
      path: '/inversify',
      visibility: 'public'
    });
  }

  private createBuild(service: ServerlessService, func: ServerlessFunction): ServerlessBuild {
    return new ServerlessBuild(this, 'build', {
      serviceSid: service.sid,

      functionVersion: [
        {
          sid: func.latestVersionSid
        }
      ],

      runtime: 'node12',

      dependencies: {
        twilio: '3.57.0',
        fs: '0.0.1-security',
        lodash: '4.17.21',
        util: '0.12.3',
        xmldom: '0.4.0',
        '@twilio/runtime-handler': '1.0.1'
      },

      polling: [
        {
          enabled: true
        }
      ],

      lifecycle: {
        createBeforeDestroy: true
      }
    });
  }

  private createEnvironment(service: ServerlessService): ServerlessEnvironment {
    return new ServerlessEnvironment(this, 'environment', {
      serviceSid: service.sid,
      uniqueName: `dev${this.resourceSuffix}`
    });
  }

  private createDeployment(service: ServerlessService, environment: ServerlessEnvironment, build: ServerlessBuild): ServerlessDeployment {
    return new ServerlessDeployment(this, 'deployment', {
      serviceSid: service.sid,
      environmentSid: environment.sid,
      buildSid: build.sid,

      lifecycle: {
        createBeforeDestroy: true
      }
    });
  }
}
