import TYPES from '@src/constant/types';

describe('#Types', () => {
  test('Should verify HelloService type is mapped to HelloService string', () => {
    // Given

    // When
    const testSubject = TYPES.HelloService;

    // Then
    expect(testSubject).toEqual('HelloService');
  });
});
