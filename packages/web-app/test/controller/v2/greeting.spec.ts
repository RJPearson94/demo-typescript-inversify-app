import 'reflect-metadata';

import HelloService from '@core/service/hello/hello';

import V2GreetingController from '@src/controller/v2/greeting';
import GreetingResponse from '@src/controller/v2/model/greeting-response';

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
