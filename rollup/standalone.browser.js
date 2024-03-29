// Rollup plugins
import babel from "@rollup/plugin-babel";
import eslint from "@rollup/plugin-eslint";
import filesize from "rollup-plugin-filesize";

export default {
    input: "src/standalone.browser.mjs",
    output: {
        name: "notErrorStandalone",
        format: "iife",
        file: "build/standalone.js",
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
        babel({
            babelrc: false,
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
            presets: [
                [
                    "@babel/preset-env",
                    {
                        targets: "> 0.25%, not dead",
                    },
                ],
            ],
        }),
        filesize(),
    ],
};
