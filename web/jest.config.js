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
  testURL: 'http://localhost:3001/'
};
