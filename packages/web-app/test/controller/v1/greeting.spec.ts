import 'reflect-metadata';

import HelloService from '@core/service/hello/hello';

import V1GreetingController from '@src/controller/v1/greeting';

describe('#V1GreetingController', () => {
  test('should return Hello when greet is called', () => {
    // Given
    const helloMock: HelloService = {
      sayHello: jest.fn(() => 'Hello')
    };

    // When
    const testSubject = new V1GreetingController(helloMock);
    const response = testSubject.greet();

    // Then
    expect(helloMock.sayHello).toHaveBeenCalled();
    expect(response).toEqual('Hello');
  });
});
