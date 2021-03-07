import { Testing } from 'cdktf';
import { GreetingStack } from '../src/GreetingStack';

test('create greeting stack', () => {
  const app = Testing.app();
  const stack = new GreetingStack(app, 'greeting-stack');
  expect(Testing.synth(stack)).toMatchSnapshot();
});

test('create greeting stack with suffix', () => {
  const app = Testing.app();
  const stack = new GreetingStack(app, 'greeting-stack', {
    resourceSuffix: 'test'
  });
  expect(Testing.synth(stack)).toMatchSnapshot();
});
