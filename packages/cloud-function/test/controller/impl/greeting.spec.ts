import 'reflect-metadata';

import { HelloService } from '@rjpearson94/core';

import { GreetingControllerImpl } from '@src/controller/impl/greeting-impl';

describe('#V1GreetingController', () => {
  test('should return HelloCloudFunction when greet is called', () => {
    // Given
    const helloMock: HelloService = {
      sayHello: jest.fn(() => 'Hello')
    };

    // When
    const testSubject = new GreetingControllerImpl(helloMock);
    const response = testSubject.greet();

    // Then
    expect(helloMock.sayHello).toHaveBeenCalled();
    expect(response).toEqual('HelloCloudFunction');
  });
});
