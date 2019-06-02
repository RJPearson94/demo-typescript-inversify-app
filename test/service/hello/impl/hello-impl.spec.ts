import 'reflect-metadata';
import HelloServiceImpl from '@src/service/hello/impl/hello-impl';

describe('#HelloServiceImpl', () => {
  test('should return Hello when sayHello is called', () => {
    // Given

    // When
    const testSubject: HelloServiceImpl = new HelloServiceImpl();
    const response: string = testSubject.sayHello();

    // Then
    expect(response).toEqual('Hello');
  });
});