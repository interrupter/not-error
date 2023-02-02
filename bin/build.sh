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

NODE_ENV=$ENV ./bin/not-error.cjs --key $KEY --url-node $URL_NODE --url-browser $URL_BROWSER --out $OUT
NODE_ENV=$ENV ./node_modules/.bin/eslint ./src/**.js
NODE_ENV=$ENV ./node_modules/.bin/rollup -c ./rollup/bundle.browser.js
NODE_ENV=$ENV ./node_modules/.bin/terser --compress --mangle -- build/bundle.js > ./build/bundle.min.js
NODE_ENV=$ENV ./node_modules/.bin/rollup -c ./rollup/error.browser.js
NODE_ENV=$ENV ./node_modules/.bin/rollup -c ./rollup/error.node.js
NODE_ENV=$ENV ./node_modules/.bin/terser --compress --mangle -- build/error.js > ./build/error.min.js
NODE_ENV=$ENV ./node_modules/.bin/rollup -c ./rollup/validation.error.browser.js
NODE_ENV=$ENV ./node_modules/.bin/terser --compress --mangle -- build/validation.error.js > ./build/validation.error.min.js
NODE_ENV=$ENV ./node_modules/.bin/rollup -c ./rollup/reporter.browser.js
NODE_ENV=$ENV ./node_modules/.bin/rollup -c ./rollup/reporter.node.js
NODE_ENV=$ENV ./node_modules/.bin/terser --compress --mangle -- build/reporter.js > ./build/reporter.min.js
NODE_ENV=$ENV ./node_modules/.bin/rollup -c ./rollup/standalone.browser.js
NODE_ENV=$ENV ./node_modules/.bin/terser --compress --mangle -- build/standalone.js > ./build/standalone.min.js
