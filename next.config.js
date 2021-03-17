const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');
const path = require('path');
const DIST_DIR = '../../dist/views';
const SVG_ASSETS_DIR = './src/client/assets/svg'
const withSass = require('@zeit/next-sass');
const withCSS = require("@zeit/next-css");

module.exports = withPlugins(
  [
    [
      withCSS(withSass(withImages({
        exclude: path.resolve(__dirname, SVG_ASSETS_DIR),
        webpack: (config) => {
          config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack']
          });

          return config;
        }
      })))
    ]
  ],
  {
    distDir: DIST_DIR,
    reactStrictMode: true
  }
);