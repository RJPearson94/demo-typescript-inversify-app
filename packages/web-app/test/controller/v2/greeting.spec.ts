import 'reflect-metadata';

import { HelloService } from '@rjpearson94/core';

import { V2GreetingController, GreetingResponse } from '@src/controller/v2';

describe('#V2GreetingController', () => {
  test('should return SayHello when greet is called', () => {
    // Given
    const helloMock: HelloService = {
      sayHello: jest.fn(() => 'Hello')
    };

    // When
    const testSubject: V2GreetingController = new V2GreetingController(helloMock);
    const response: GreetingResponse = testSubject.greet();

    // Then
    expect(helloMock.sayHello).toHaveBeenCalled();
    expect(response).toBeDefined();
    expect(response.message).toEqual('SayHello');
  });
});
