/* eslint-env es2020 */

'use strict';

const baseConfig = require('./jest.config.base')

module.exports = {
  ...baseConfig,
  projects: [
    '<rootDir>/api/jest.config.js',
    '<rootDir>/web/jest.config.js',
  ],
  moduleNameMapper: {
    '.json$': 'identity-obj-proxy',
  },
  moduleDirectories: [
    'node_modules',
  ],
  snapshotSerializers: [
    'enzyme-to-json/serializer',
  ],
  coverageDirectory: '<rootDir>/coverage/',
  collectCoverageFrom: [
    '<rootDir>/**/src/**/*.{ts,tsx}'
  ],
  coverageReporters: ['text-summary', 'json-summary', 'html'],
}