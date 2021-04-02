/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';
const baseConfig = require('../jest.config.base');
const packageName = require('./package.json').name;

module.exports = {
  ...baseConfig,
  clearMocks: true,
  roots: ['<rootDir>/src/'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.ts$',
  moduleFileExtensions: ['js', 'ts'],
  name: packageName,
  displayName: packageName,
  testURL: 'http://localhost:3000/'
};
