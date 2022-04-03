// Rollup plugins
import babel from 'rollup-plugin-babel';
import {eslint} from 'rollup-plugin-eslint';
import filesize from 'rollup-plugin-filesize';

export default {
	input: 'src/reporter.browser.js',
	output:{
		name: 'notErrorReporter',
		format: 'iife',
		file: 'build/reporter.js',
		sourcemap: false,
	},
	plugins: [
		eslint({
			fix: true,
			exclude: ['tmpl/**','build/**', 'node_modules/**', 'css/**', 'js/**', 'test/**', 'bower_components/**', 'assets/*', 'dist/**']
		}),
		babel({
			babelrc: true,
			exclude: ['tmpl/**','build/**', 'node_modules/**', 'css/**', 'js/**', 'test/**', 'bower_components/**', 'assets/*', 'dist/**'],
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
