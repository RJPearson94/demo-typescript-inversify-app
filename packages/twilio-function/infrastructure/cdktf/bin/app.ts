#!/usr/bin/env node

import { App } from 'cdktf';
import { TwilioProvider } from '../.gen/providers/twilio';
import { GreetingStack } from '../src/GreetingStack';

const app = new App({ stackTraces: false });

const stack = new GreetingStack(app, `inversify-cdktf`);
new TwilioProvider(stack, 'twilio');

app.synth();
