import 'reflect-metadata';

import TYPES from '@src/constant/types';
import GreetingController from '@src/controller/greeting';
import container from '@src/inversify.config';
import APIResponse from '@src/lib/apiResponse';

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
    const lambda = require('@src/lambda');
    lambda.handler(event, context, (error: any, response: APIResponse | undefined) => {
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
