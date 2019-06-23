import 'reflect-metadata';
import HelloService from '@shared/service/hello/hello';
import V1GreetingController from '@src/controller/v1/greeting';

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
