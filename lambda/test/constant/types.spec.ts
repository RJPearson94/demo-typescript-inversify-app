import TYPES from '@src/constant/types';

describe('#Types', () => {
  test('Should verify GreetingController type is mapped to GreetingController string', () => {
    // Given

    // When
    const testSubject = TYPES.GreetingController;

    // Then
    expect(testSubject).toEqual('GreetingController');
  });
});
