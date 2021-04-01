module.exports = {
  preset: 'ts-jest',
  clearMocks: true,
  roots: ['<rootDir>/api/src/', '<rootDir>/web/'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  coverageReporters: ['text-summary', 'json-summary', 'html'],
  verbose: true
};
