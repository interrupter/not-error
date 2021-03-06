// Rollup plugins
import babel from 'rollup-plugin-babel';
import {eslint} from 'rollup-plugin-eslint';
import { terser } from "rollup-plugin-terser";
import filesize from 'rollup-plugin-filesize';

export default {
	input: 'src/error.browser.js',
	output:{
		name: 'notError',
		format: 'iife',
		file: 'build/error.js',
		sourcemap: false,
	},
	plugins: [
		eslint({
			fix: true,
			exclude: ['tmpl/**','build/**', 'node_modules/**', 'css/**', 'js/**', 'test/**', 'bower_components/**', 'assets/*', 'dist/**']
		}),
		babel({
			babelrc: false,
			exclude: ['tmpl/**','build/**', 'node_modules/**', 'css/**', 'js/**', 'test/**', 'bower_components/**', 'assets/*', 'dist/**']
		}),
		filesize()
	]
};
