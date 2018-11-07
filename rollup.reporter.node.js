// Rollup plugins
import babel from 'rollup-plugin-babel';
import {eslint} from 'rollup-plugin-eslint';
import { terser } from "rollup-plugin-terser";
import filesize from 'rollup-plugin-filesize';

export default {
	input: 'src/reporter.browser.js',
	output:{
		name: 'notErrorReporter',
		format: 'cjs',
		file: 'build/reporter.cjs.js',
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
