import 'reflect-metadata';

import { ProxyResult } from 'aws-lambda';

import * as lambda from '@src/lambda';
import { container } from '@src/inversify.config';
import { TYPES } from '@src/constant/types';
import { GreetingController } from '@src/controller';

describe('#Lambda', () => {
  test('Should return HelloTest when lambda is invoked', async done => {
    // Given
    const greetingController: GreetingController = {
      greet: jest.fn().mockReturnValue('HelloTest')
    };

    container.rebind<GreetingController>(TYPES.GreetingController).toConstantValue(greetingController);

    // When
    // @ts-ignore
    lambda.handler({}, {}, (error: Error | undefined, response: ProxyResult | undefined) => {
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
