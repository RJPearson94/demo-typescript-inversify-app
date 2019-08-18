import 'reflect-metadata';

import HelloService from '@core/service/hello/hello';

import V2GreetingController from '@src/controller/v2/greeting';
import GreetingResponse from '@src/controller/v2/model/greeting-response';

describe('#V2GreetingController', () => {
  test('should return SayHello when greet is called', () => {
    // Given
    const mockedSayHelloFunction = jest.fn(() => 'Hello');
    const helloMock: HelloService = {
      sayHello: mockedSayHelloFunction
    };

    // When
    const testSubject: V2GreetingController = new V2GreetingController(helloMock);
    const response: GreetingResponse = testSubject.greet();

    // Then
    expect(mockedSayHelloFunction).toHaveBeenCalled();
    expect(response).toBeDefined();
    expect(response.message).toEqual('SayHello');
  });
});
