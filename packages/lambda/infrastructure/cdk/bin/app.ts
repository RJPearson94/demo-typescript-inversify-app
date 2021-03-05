#!/usr/bin/env node

import { App } from '@aws-cdk/core';
import { GreetingStack } from '../src/GreetingStack';

const app = new App();

new GreetingStack(app, 'greeting-function-cdk', {
  tags: {
    Environment: 'Testing',
    IaC: 'CDK'
  }
});
