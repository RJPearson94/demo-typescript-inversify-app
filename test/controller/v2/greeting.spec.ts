import 'reflect-metadata';
import V2GreetingController from '@initial-service/controller/v2/greeting';
import HelloService from '@initial-service/service/hello/hello';

describe('#V2GreetingController', () => {
  test('should return SayHello when greet is called', () => {
    // Given
    const mockedSayHelloFunction = jest.fn(() => 'Hello');
    const helloMock: HelloService = {
        sayHello: mockedSayHelloFunction
    };

    // When
    const testSubject: V2GreetingController = new V2GreetingController(helloMock);
    const response: string = testSubject.greet();

    // Then
    expect(mockedSayHelloFunction).toBeCalled();
    expect(response).toEqual('SayHello');
  });
});