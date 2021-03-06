import 'reflect-metadata';

import * as gcp from '../src/gcp';
import { container } from '../src/inversify.config';
import { TYPES } from '../src/constant/types';
import { GreetingController } from '../src/controller';

describe('#GCP', () => {
  test('Should return HelloTest when cloud function is invoked', async () => {
    // Given
    const greetingController: GreetingController = {
      greet: jest.fn().mockReturnValue('HelloTest')
    };

    container.rebind<GreetingController>(TYPES.GreetingController).toConstantValue(greetingController);

    const request: any = {};

    const response: any = {
      status: jest.fn(() => response),
      json: jest.fn(() => response)
    };

    // When
    // @ts-ignore
    await gcp.handler(request, response);

    // Then
    expect(greetingController.greet).toHaveBeenCalled();

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({
      message: 'HelloTest'
    });
  });
});
