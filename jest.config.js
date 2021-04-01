module.exports = {
  preset: 'ts-jest',
  roots: ['api', 'web'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  coverageReporters: ['text-summary', 'json-summary', 'html'],
  verbose: true
};
