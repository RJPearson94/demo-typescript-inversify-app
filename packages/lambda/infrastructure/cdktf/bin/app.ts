#!/usr/bin/env node

import { App } from 'cdktf';
import { GreetingStack } from '../src/GreetingStack';

const app = new App({ stackTraces: false });

new GreetingStack(app, `greeting-function-cdktf`, {
  tags: {
    Environment: 'Testing',
    IaC: 'CDK'
  }
});
app.synth();
