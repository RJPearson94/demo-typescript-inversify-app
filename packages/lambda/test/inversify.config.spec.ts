import 'reflect-metadata';

import container from '@src/inversify.config';
import TYPES from '@src/constant/types';
import GreetingController from '@src/controller/greeting';
import GreetingControllerImpl from '@src/controller/impl/greeting-impl';

describe('#InversifyConfig', () => {
  test('Should verify GreetingControllerImpl is bound to GreetingController', () => {
    // Given

    // When
    const testSubject = container.get<GreetingController>(TYPES.GreetingController);

    // Then
    expect(testSubject).toBeInstanceOf(GreetingControllerImpl);
  });
});
