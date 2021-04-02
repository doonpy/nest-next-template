#!/bin/bash
set -e

printf "=> Generate prisma types"
yarn --cwd api prisma generate --schema ./prisma/schema.prisma
yarn --cwd api prisma generate --schema ./prisma/schema.test.prisma

printf "=> Lint"
yarn lint
