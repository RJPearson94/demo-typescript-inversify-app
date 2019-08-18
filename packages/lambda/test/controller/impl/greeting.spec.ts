import 'reflect-metadata';

import HelloService from '@core/service/hello/hello';

import GreetingController from '@src/controller/impl/greeting-impl';

describe('#V1GreetingController', () => {
  test('should return HelloLambda when greet is called', () => {
    // Given
    const mockedSayHelloFunction = jest.fn(() => 'Hello');
    const helloMock: HelloService = {
      sayHello: mockedSayHelloFunction
    };

    // When
    const testSubject = new GreetingController(helloMock);
    const response = testSubject.greet();

    // Then
    expect(mockedSayHelloFunction).toHaveBeenCalled();
    expect(response).toEqual('HelloLambda');
  });
});
