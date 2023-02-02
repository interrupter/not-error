// Rollup plugins
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";

import resolve from "@rollup/plugin-node-resolve";
import eslint from "@rollup/plugin-eslint";
import filesize from "rollup-plugin-filesize";
import sizes from "rollup-plugin-sizes";

export default {
    input: "src/index.browser.mjs",
    output: {
        name: "notError",
        format: "iife",
        file: "build/bundle.js",
        sourcemap: false,
    },
    plugins: [
        eslint({
            fix: true,
            exclude: [
                "tmpl/**",
                "build/**",
                "node_modules/**",
                "css/**",
                "js/**",
                "test/**",
                "bower_components/**",
                "assets/*",
                "dist/**",
            ],
        }),
        resolve(),
        commonjs(),
        babel({
            babelHelpers: "runtime",
            presets: ["@babel/preset-env"],
            plugins: [
                "@babel/plugin-proposal-class-properties",
                [
                    "@babel/plugin-transform-runtime",
                    {
                        regenerator: true,
                    },
                ],
            ],
            exclude: [
                "tmpl/**",
                "build/**",
                "node_modules/**",
                "css/**",
                "js/**",
                "test/**",
                "bower_components/**",
                "assets/*",
                "dist/**",
            ],
        }),
        filesize(),
        sizes(),
    ],
};
