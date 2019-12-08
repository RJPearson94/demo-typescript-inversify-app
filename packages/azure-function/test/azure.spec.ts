import 'reflect-metadata';

import httpEventHandler from '@src/azure';
import { container } from '@src/inversify.config';
import { TYPES } from '@src/constant/types';
import { GreetingController } from '@src/controller';

describe('#Azure', () => {
  test('Should return HelloTest when azure function is invoked', async () => {
    // Given
    const greetingController: GreetingController = {
      greet: jest.fn().mockReturnValue('HelloTest')
    };

    container.rebind<GreetingController>(TYPES.GreetingController).toConstantValue(greetingController);

    const context: any = {};

    // When
    await httpEventHandler(context);

    // Then
    expect(greetingController.greet).toHaveBeenCalled();

    const response = context.res;
    expect(response.body).toEqual({
      message: 'HelloTest'
    });
  });
});
