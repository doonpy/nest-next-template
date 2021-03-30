#!/bin/bash
set -e

printf "1. Generate Prisma types"
npx prisma generate --schema api/prisma/schema.prisma

printf "2. Lint"
yarn lint
