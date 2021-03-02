module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/index.ts'],
  preset: 'ts-jest',
  testEnvironment: 'node'
};
