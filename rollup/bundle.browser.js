// Rollup plugins
import babel from 'rollup-plugin-babel';
import {
  eslint
} from 'rollup-plugin-eslint';
import filesize from 'rollup-plugin-filesize';
import sizes from "rollup-plugin-sizes";

export default {
  input: 'src/index.browser.js',
  output: {
    name: 'notError',
    format: 'iife',
    file: 'build/bundle.js',
    sourcemap: false,
  },
  plugins: [
    eslint({
      fix: true,
      exclude: ['tmpl/**', 'build/**', 'node_modules/**', 'css/**', 'js/**', 'test/**', 'bower_components/**', 'assets/*', 'dist/**']
    }),
    filesize(),
    sizes()
  ]
};
