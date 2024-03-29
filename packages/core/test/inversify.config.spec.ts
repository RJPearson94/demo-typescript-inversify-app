import 'reflect-metadata';

import { container } from '@src/inversify.config';
import { TYPES } from '@src/constant/types';
import { HelloService, HelloServiceImpl } from '@src/service/hello';

describe('#InversifyConfig', () => {
  test('Should verify HelloServiceImpl is bound to HelloService', () => {
    // Given

    // When
    const testSubject = container.get<HelloService>(TYPES.HelloService);

    // Then
    expect(testSubject).toBeInstanceOf(HelloServiceImpl);
  });
});
