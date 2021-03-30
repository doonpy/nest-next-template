#!/bin/bash
set -e

echo "1. Set up"
yarn prisma-api:generate

echo "2. Lint"
yarn lint
