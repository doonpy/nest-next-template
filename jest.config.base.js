'use strict';

module.exports = {
  preset: 'ts-jest',
  coverageDirectory: '<rootDir>/coverage/',
  collectCoverageFrom: [
    '<rootDir>/**/src/**/*.{ts,tsx}'
  ],
  coverageReporters: ['text-summary', 'json-summary', 'html'],
  clearMocks: true,
  verbose: true
};