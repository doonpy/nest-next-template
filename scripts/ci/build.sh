#!/bin/bash
set -e

printf "=> Generate prisma types"
yarn --cwd api prisma generate --schema ./prisma/schema.prisma
yarn --cwd api prisma generate --schema ./prisma/schema.test.prisma

printf "=> Deploy prisma database"
yarn --cwd api prisma migrate deploy --schema ./prisma/schema.prisma
yarn --cwd api prisma migrate deploy --schema ./prisma/schema.test.prisma

echo "=> Build API application"
yarn rimraf "api/dist"
yarn --cwd api nest build

echo "=> Build Web application"
yarn rimraf "web/dist"
yarn --cwd web next telemetry disable
yarn --cwd web next build