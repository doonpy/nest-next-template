#!/bin/bash
set -e

echo "1. Remove old dist directory"
rimraf dist

echo "1. Build NestJS"
npx nest build

echo "2. Build NextJS"
rm -rf dist/views
npx next telemetry disable
npx next build src/views

echo "3. Run after-build.js"
node build/after-build.js