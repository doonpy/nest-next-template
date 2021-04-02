/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';
const baseConfig = require('../jest.config.base');
const appName = require('./package.json').name;

module.exports = {
  ...baseConfig,
  clearMocks: true,
  roots: ['<rootDir>/src/'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts$',
  moduleFileExtensions: ['js', 'ts'],
  name: appName,
  displayName: appName,
  testURL: 'http://localhost:3000/',
  setupFilesAfterEnv: ['<rootDir>/test_helpers/after-setup.ts']
};
