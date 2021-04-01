/* eslint-disable @typescript-eslint/no-var-requires */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
});
const withPlugins = require('next-compose-plugins');
const withImages = require('next-images');
const path = require('path');

const DIST_DIR = './dist';
const SVG_ASSETS_DIR = './assets/svg';

/**
 * Get API server.
 * When application deploy all preview environment this will use HEROKU_PREVIEW_API_SERVER as a API server
 */
function getApiServer() {
  if (process.env.HEROKU_PR_NUMBER) {
    return process.env.HEROKU_PREVIEW_API_SERVER.replace(
      '%prNumber%',
      process.env.HEROKU_PR_NUMBER
    );
  }

  return process.env.API_SERVER;
}

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
              react: 'preact/compat',
              'react-dom/test-utils': 'preact/test-utils',
              'react-dom': 'preact/compat'
            });
          }

          return config;
        }
      })
    ],
    [withBundleAnalyzer]
  ],
  {
    future: {
      webpack5: true
    },
    distDir: DIST_DIR,
    reactStrictMode: true,
    env: {
      NEXT_PUBLIC_API_SERVER: getApiServer()
    }
  }
);
