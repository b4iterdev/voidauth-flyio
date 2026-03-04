#!/bin/sh
set -eu

node /opt/voidauth-bin/seed-config.mjs

cd /app
exec node ./dist/index.mjs
