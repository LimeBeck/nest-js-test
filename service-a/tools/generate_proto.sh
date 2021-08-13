#!/bin/bash

SRC_DIR=src/proto/schemas
DEST_DIR=src/proto/generated

node_modules/.bin/pbjs \
--target static-module \
--wrap commonjs \
--keep-case \
--path ${SRC_DIR} \
--out ${DEST_DIR}/rpc.js \
${SRC_DIR}/**/*.proto

node_modules/.bin/pbts \
--out ${DEST_DIR}/rpc.d.ts \
${DEST_DIR}/rpc.js
