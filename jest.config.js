'use strict';

const baseConfig = require('./jest.config.base')

module.exports = {
  ...baseConfig,
  projects: [
    '<rootDir>/**/jest.config.app.js',
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
}