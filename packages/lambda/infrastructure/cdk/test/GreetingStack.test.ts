import { SynthUtils } from '@aws-cdk/assert';
import { App } from '@aws-cdk/core';

import { GreetingStack } from '../src/GreetingStack';

test('create greeting stack', () => {
  const app = new App();
  const stack = new GreetingStack(app, 'greeting-stack');
  expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
});
