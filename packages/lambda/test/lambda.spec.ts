import 'reflect-metadata';

import * as lambda from '@src/lambda';
import { container } from '@src/inversify.config';
import { TYPES } from '@src/constant/types';
import { GreetingController } from '@src/controller';
import { APIResponse } from '@src/lib';

describe('#Lambda', () => {
  test('Should return HelloTest when lambda is invoked', async done => {
    // Setup
    const greetingController: GreetingController = {
      greet: jest.fn().mockReturnValue('HelloTest')
    };

    container.unbind(TYPES.GreetingController);
    container.bind<GreetingController>(TYPES.GreetingController).toConstantValue(greetingController);

    // Given
    const event: any = {
      context: {}
    };
    const context: any = {};

    // When
    // @ts-ignore
    lambda.handler(event, context, (error: Error | undefined, response: APIResponse | undefined) => {
      expect(error).toBeNull();
      expect(response).toBeDefined();

      expect(greetingController.greet).toHaveBeenCalled();

      expect(response.statusCode).toEqual(200);
      expect(JSON.parse(response.body)).toEqual({
        message: 'HelloTest'
      });

      done();
    });

    // Then
    // The callback should assert
  });
});
