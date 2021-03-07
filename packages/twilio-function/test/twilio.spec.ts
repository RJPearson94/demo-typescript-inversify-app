import 'reflect-metadata';

import * as twilio from '../src/twilio';
import { container } from '../src/inversify.config';
import { TYPES } from '../src/constant/types';
import { GreetingController } from '../src/controller';
import { MessageResponse } from '../src/lib';

describe('#Twilio', () => {
  test('Should return HelloTest when twilio function is invoked', done => {
    // Given
    const greetingController: GreetingController = {
      greet: jest.fn().mockReturnValue('HelloTest')
    };

    container.rebind<GreetingController>(TYPES.GreetingController).toConstantValue(greetingController);

    const event: any = {};
    const context: any = {};

    // When
    twilio.handler(event, context, (err: Error, resp: MessageResponse) => {
      // Then
      expect(greetingController.greet).toHaveBeenCalled();
      expect(err).toBeNull();
      expect(resp).toEqual({
        message: 'HelloTest'
      });
      done();
    });
  });
});
