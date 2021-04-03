/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';
const baseConfig = require('../jest.config.base');
const packageName = require('./package.json').name;

module.exports = {
  ...baseConfig,
  clearMocks: true,
  roots: ['<rootDir>/src/'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['js', 'ts', 'tsx'],
  name: packageName,
  displayName: packageName,
  testURL: 'http://localhost:3001/',
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  setupFilesAfterEnv: ['<rootDir>/test_helpers/enzyme.ts'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/test_helpers/__mocks__/mocks.ts',
    '\\.(css|less|scss)$': '<rootDir>/test_helpers/__mocks__/mocks.ts'
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.test.json'
    }
  }
};
