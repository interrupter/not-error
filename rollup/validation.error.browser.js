// Rollup plugins
import babel from 'rollup-plugin-babel';
import {eslint} from 'rollup-plugin-eslint';
import filesize from 'rollup-plugin-filesize';

export default {
	input: 'src/validation.error.browser.js',
	output:{
		name: 'notValidationError',
		format: 'iife',
		file: 'build/validation.error.js',
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
				[
					"@babel/preset-env",
					{
						targets: "> 0.25%, not dead"
					}
				]
    	]
		}),
		filesize()
	]
};
