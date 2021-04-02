#!/bin/bash
set -e

printf "=> Generate prisma types"
yarn --cwd api prisma generate --schema ./prisma/schema.prisma
yarn --cwd api prisma generate --schema ./prisma/schema.test.prisma

printf "=> Deploy prisma database"
yarn --cwd api prisma migrate deploy --schema ./prisma/schema.prisma
yarn --cwd api prisma migrate deploy --schema ./prisma/schema.test.prisma

printf "=> Unit test"
yarn jest --coverage --detectOpenHandles --forceExit
