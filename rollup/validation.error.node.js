// Rollup plugins
import babel from "@rollup/plugin-babel";
import eslint from "@rollup/plugin-eslint";
import filesize from "rollup-plugin-filesize";

export default {
    input: "src/validation.error.node.cjs",
    output: {
        name: "notError",
        format: "cjs",
        file: "build/error.cjs.js",
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
        }),
        filesize(),
    ],
};
