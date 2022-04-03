// Rollup plugins
import babel from 'rollup-plugin-babel';
import {eslint} from 'rollup-plugin-eslint';
import { terser } from "rollup-plugin-terser";
import filesize from 'rollup-plugin-filesize';

export default {
	input: 'src/index.browser.js',
	output:{
		name: 'notError',
		format: 'iife',
		file: 'build/bundle.js',
		sourcemap: false,
	},
	plugins: [
		eslint({
			fix: true,
			exclude: ['tmpl/**','build/**', 'node_modules/**', 'css/**', 'js/**', 'test/**', 'bower_components/**', 'assets/*', 'dist/**']
		}),
		babel({
			babelrc: false,
			exclude: ['tmpl/**','build/**', 'node_modules/**', 'css/**', 'js/**', 'test/**', 'bower_components/**', 'assets/*', 'dist/**'],
			plugins:[
				'@babel/plugin-proposal-object-rest-spread'
			],
			presets:[
        "@babel/preset-env",
        "@babel/preset-react"
    	]
		}),
		filesize()
	]
};
