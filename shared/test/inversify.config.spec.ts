import 'reflect-metadata';
import container from '@shared/inversify.config';
import TYPES from '@shared/constant/types';
import HelloService from '@shared/service/hello/hello';
import HelloServiceImpl from '@shared/service/hello/impl/hello-impl';

describe('#InversifyConfig', () => {
  test('Should verify HelloServiceImpl is bound to HelloService', () => {
    // Given

    // When
    const testSubject = container.get<HelloService>(TYPES.HelloService);

    // Then
    expect(testSubject).toBeInstanceOf(HelloServiceImpl);
  });
});
