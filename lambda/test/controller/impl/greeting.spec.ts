import 'reflect-metadata';
import HelloService from '@shared/service/hello/hello';
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
    expect(mockedSayHelloFunction).toBeCalled();
    expect(response).toEqual('HelloLambda');
  });
});