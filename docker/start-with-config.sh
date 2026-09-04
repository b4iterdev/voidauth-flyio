#!/bin/sh
set -eu

node /app/seed-config.mjs

cd /app
exec node ./dist/index.mjs
