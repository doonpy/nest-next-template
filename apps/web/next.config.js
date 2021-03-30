const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');
const path = require('path');

const DIST_DIR = '../../dist/apps/web';
const SVG_ASSETS_DIR = './assets/svg';

module.exports = withPlugins(
  [
    [
      withImages({
        exclude: path.resolve(__dirname, SVG_ASSETS_DIR),
        webpack: (config, { dev, isServer }) => {
          config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack']
          });

          if (!dev && !isServer) {
            // Replace React with Preact only in client production build
            Object.assign(config.resolve.alias, {
              'react': 'preact/compat',
              'react-dom/test-utils': 'preact/test-utils',
              'react-dom': 'preact/compat'
            });
          }

          return config;
        }
      })
    ]
  ],
  {
    distDir: DIST_DIR,
    reactStrictMode: true,
    env: {
      NEXT_PUBLIC_API_SERVER: process.env.HEROKU_PR_NUMBER ? `nnt-preview-pr-${process.env.HEROKU_PR_NUMBER}.herokuapp.com` : process.env.API_SERVER
    }
  }
);