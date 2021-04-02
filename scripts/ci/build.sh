#!/bin/bash
set -e

echo "=> Build API application"
yarn rimraf "api/dist"
yarn --cwd api nest build

echo "=> Build Web application"
yarn rimraf "web/dist"
yarn --cwd web next telemetry disable
yarn --cwd web next build
