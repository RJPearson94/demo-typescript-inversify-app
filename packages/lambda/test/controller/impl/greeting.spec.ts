import 'reflect-metadata';

import { HelloService } from '@rjpearson94/core';

import GreetingController from '@src/controller/impl/greeting-impl';

describe('#V1GreetingController', () => {
  test('should return HelloLambda when greet is called', () => {
    // Given
    const helloMock: HelloService = {
      sayHello: jest.fn(() => 'Hello')
    };

    // When
    const testSubject = new GreetingController(helloMock);
    const response = testSubject.greet();

    // Then
    expect(helloMock.sayHello).toHaveBeenCalled();
    expect(response).toEqual('HelloLambda');
  });
});
