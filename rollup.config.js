// Rollup plugins
import babel from 'rollup-plugin-babel';
import eslint from 'rollup-plugin-eslint';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';
import filesize from 'rollup-plugin-filesize';
import postcss from 'rollup-plugin-postcss';

// PostCSS plugins
import simplevars from 'postcss-simple-vars';
import nested from 'postcss-nested';
import cssnext from 'postcss-cssnext';
import envReplace from 'postcss-env-replace';
import cssnano from 'cssnano';

export default {
	input: 'src/error.js',
	output:{
		name: 'notError',
		format: 'iife',
		file: (process.env.NODE_ENV === 'production' ? 'build/error.min.js' : 'build/error.js'),
		sourcemap: (process.env.NODE_ENV === 'production' ? false : 'inline'),
	},
	plugins: [
		resolve({
			jsnext: true,
			main: true,
			browser: true
		}),
		commonjs({
			include: ['node_modules/**', './src/**']
		}),
		eslint({
			exclude: ['build/**', 'node_modules/**', 'css/**', 'js/**', 'test/**', 'bower_components/**', 'assets/*', 'dist/**']
		}),
		babel({
			babelrc: false,
			presets: ['es2015-rollup'],
			exclude: ['build/**', 'node_modules/**', 'css/**', 'js/**', 'test/**', 'bower_components/**', 'assets/*', 'dist/**']
		}), replace({
			ENV: JSON.stringify(process.env.NODE_ENV || 'development')
		}),
		(process.env.NODE_ENV === 'production' && uglify()),
		filesize()
	]
};
