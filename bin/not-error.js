#!/usr/bin/env node

/*
	not-error builder
	rebuilds scripts with custom vars (env,key,url)
  not-error.js  --key '2398v90128y5018'  --url-browser 'https://reporter.host/api/error'  --url-node 'https://reporter.host/api/error' --out 'dir/to/put/files'
  options
    key - product key
    url_node - link to error-collector server for server side
		url_browser - link to error-collector server for browser side
		out	-	dir to put files if not specified will be put in module_dir/build/
*/

const argv = require('yargs').argv,
	fs = require('fs'),
	path = require('path'),
	ejs = require('ejs');

let defOpts = {
	'url-node': 		'https://appmon.ru/api/key/collect',
	'url-browser':	'https://appmon.ru/api/key/collect',
	'key': 					'',
	'out': 					path.join(__dirname, '../src'),
};

if(argv['url-node'] === true){
	delete argv['url-node'];
}

if(argv['url-browser'] === true){
	delete argv['url-browser'];
}

if(argv['out'] === true){
	delete argv['out'];
}

if(argv['key'] === true){
	delete argv['key'];
}

let opts = {
	'url-node': 		(argv['url-node'] || process.env.NOT_NODE_ERROR_URL_NODE || defOpts['url-node']),
	'url-browser':	(argv['url-browser'] || process.env.NOT_NODE_ERROR_URL_BROWSER  || defOpts['url-browser']),
	'key': 					(argv['key'] || process.env.NOT_NODE_ERROR_KEY  || defOpts['key']),
	'out': 					(argv.out || defOpts['out']),
};
/**
*	ERROR - notError class
*	REPORTER - notErrorReporter class
*	STANDALONE - notErrorStandalone class
*/
const TEMPLATE_ERROR = path.join(__dirname, '../tmpl/error.ejs');
const OUTPUT_NODE_ERROR = path.join(opts.out, 'error.node.js');
const OUTPUT_BROWSER_ERROR = path.join(opts.out, 'error.browser.js');

const TEMPLATE_STANDALONE = path.join(__dirname, '../tmpl/standalone.ejs');
const OUTPUT_NODE_STANDALONE = path.join(opts.out, 'standalone.node.js');
const OUTPUT_BROWSER_STANDALONE = path.join(opts.out, 'standalone.browser.js');

const TEMPLATE_REPORTER = path.join(__dirname, '../tmpl/reporter.ejs');
const OUTPUT_NODE_REPORTER = path.join(opts.out, 'reporter.node.js');
const OUTPUT_BROWSER_REPORTER = path.join(opts.out, 'reporter.browser.js');

function renderScript(input, options, dest){
	return new Promise((resolve ,reject)=>{
		let js = ejs.renderFile(input, options, (err, res)=>{
			if(err){
				reject(err);
			}else{
				fs.writeFile(dest, res, (err) => {
					if (err) {reject(err);}
					else {resolve();}
				});
			}
		});
	});
}

let tasks = [
	renderScript(
		TEMPLATE_ERROR,
		{
			env: 'node',
			key: opts.key,
			url: opts['url-node'],
		},
		OUTPUT_NODE_ERROR
	),
	renderScript(
		TEMPLATE_ERROR,
		{
			env: 'browser',
			key: opts.key,
			url: opts['url-browser'],
		},
		OUTPUT_BROWSER_ERROR
	),
	renderScript(
		TEMPLATE_REPORTER,
		{
			env: 'node',
			key: opts.key,
			url: opts['url-node'],
		},
		OUTPUT_NODE_REPORTER
	),
	renderScript(
		TEMPLATE_REPORTER,
		{
			env: 'browser',
			key: opts.key,
			url: opts['url-browser'],
		},
		OUTPUT_BROWSER_REPORTER
	),
	renderScript(
		TEMPLATE_STANDALONE,
		{
			env: 'node',
			key: opts.key,
			url: opts['url-node'],
		},
		OUTPUT_NODE_STANDALONE
	),
	renderScript(
		TEMPLATE_STANDALONE,
		{
			env: 'browser',
			key: opts.key,
			url: opts['url-browser'],
		},
		OUTPUT_BROWSER_STANDALONE
	)
];

Promise.all(tasks)
	.then(()=>{
		console.log('not-error rebuilded!');
	})
	.catch((e)=>{
		console.error(e);
		process.exit(1);
	});
