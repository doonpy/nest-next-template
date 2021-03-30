#!/bin/bash
set -e

echo "1. Set up"
yarn prisma-api:generate

echo "2. Type check"
yarn type-check
