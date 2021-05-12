import 'reflect-metadata';

import * as lambda from '../src/lambda';
import { container } from '../src/inversify.config';
import { TYPES } from '../src/constant/types';
import { GreetingController } from '../src/controller';

describe('#Lambda', () => {
  test('Should return HelloTest when lambda is invoked', async () => {
    // Given
    const greetingController: GreetingController = {
      greet: jest.fn().mockReturnValue('HelloTest')
    };

    container.rebind<GreetingController>(TYPES.GreetingController).toConstantValue(greetingController);

    // When
    const response = await lambda.handler({}, {});

    // Then
    expect(greetingController.greet).toHaveBeenCalled();

    expect(response).toBeDefined();
    expect(response.statusCode).toEqual(200);
    expect(JSON.parse(response.body)).toEqual({
      message: 'HelloTest'
    });
  });
});
