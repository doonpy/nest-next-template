#!/bin/bash
set -e

echo "1. Set up"
npx rimraf dist
yarn prisma-api:generate

echo "2. Build API application"
npx nest build

echo "3. Build Web application"
npx next telemetry disable
npx next build apps/web

echo "4. Run after-build.js"
node scripts/ci/after-build.js