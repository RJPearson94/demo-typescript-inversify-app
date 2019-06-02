import 'reflect-metadata';
import V1GreetingController from '@src/controller/v1/greeting';
import HelloService from '@src/service/hello/hello';

describe('#V1GreetingController', () => {
  test('should return Hello when greet is called', () => {
    // Given
    const mockedSayHelloFunction = jest.fn(() => 'Hello');
    const helloMock: HelloService = {
        sayHello: mockedSayHelloFunction
    };

    // When
    const testSubject = new V1GreetingController(helloMock);
    const response = testSubject.greet();

    // Then
    expect(mockedSayHelloFunction).toBeCalled();
    expect(response).toEqual('Hello');
  });
});