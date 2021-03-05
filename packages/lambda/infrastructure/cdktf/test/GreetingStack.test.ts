import { Testing } from 'cdktf';
import { GreetingStack } from '../src/GreetingStack';

test('create greeting stack', () => {
  const app = Testing.app();
  const stack = new GreetingStack(app, 'greeting-stack');
  expect(Testing.synth(stack)).toMatchSnapshot();
});

test('create greeting stack with prefix and tags', () => {
  const app = Testing.app();
  const stack = new GreetingStack(app, 'greeting-stack', {
    resourcePrefix: 'test',
    tags: {
      service: 'greeting-stack',
      testing: 'true'
    }
  });
  expect(Testing.synth(stack)).toMatchSnapshot();
});
