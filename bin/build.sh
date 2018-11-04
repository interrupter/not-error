#!/bin/bash
echo 'building for' $ENV 'environment'
for i in "$@"
do
case $i in
    --key=*)
    KEY="${i#*=}"
    ;;
    --env=*)
    ENV="${i#*=}"
    ;;
    --url-node=*)
    URL_NODE="${i#*=}"
    ;;
    --url-browser=*)
    URL_BROWSER="${i#*=}"
    ;;
    --out=*)
    OUT="${i#*=}"
    ;;
esac
done

NODE_ENV=$ENV ./bin/not-error.js --key $KEY --url-node $URL_NODE --url-browser $URL_BROWSER --out $OUT
NODE_ENV=$ENV ./node_modules/.bin/eslint ./src/**.js
NODE_ENV=$ENV ./node_modules/.bin/rollup -c ./rollup.config.js
NODE_ENV=$ENV ./node_modules/.bin/rollup -c ./rollup.node.js
NODE_ENV=$ENV ./node_modules/.bin/terser --compress --mangle -- build/error.js > ./build/error.min.js
