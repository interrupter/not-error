/**
*  Template of reporter.js
*  For building for specific environment.
*  Node.js or Browser
*  @param {string}  env  node|browser in wich env it will be running
*  @param {string}  url  URL of report collector
*  @param {string}  key  key to indetificate reporter
*/

const PARASITES = ['report@', 'notError@'];
const LINES_TO_CAPTURE = 6;
const STACK_PROPS = [
	'fileName',
	'filePath',
	'lineNumber',
	'columnNumber',
	'functionName',
	'type',
];


const NOT_NODE_ERROR_URL_NODE_DEFAULT = 'https://appmon.ru/api/key/collect';
var NOT_NODE_ERROR_URL_NODE = null;
var NOT_NODE_ERROR_KEY = null;
var config = null;
var service = null;
try{
	config = require('not-config').readerForModule('error');
}catch(e){
	NOT_NODE_ERROR_URL_NODE = 'https://appmon.ru/api/key/collect';
	NOT_NODE_ERROR_KEY = '';
}
const Buffer = require('buffer').Buffer;
const {readFile} = require('fs').promises;
const https = require('https');
const http = require('http');
const path = require('path');
const LOG = require('not-log')(module, 'notReporter');
const notError = require('./error.node.js');


/**
* Error reporting with features, saving browser info, uri and so on.
* @module not-error/error
*/
class notErrorReporter{
	constructor(envFirst = false){
		this.envFirst = envFirst;
		this.processWatching = false;
		this.origin = {};
		
		return this;
	}

	setOrigin(origin){
		this.origin = origin;
	}

	setRegisterAll(registerAll = true){
		this.registerAll = registerAll;
	}

	async report(error, notSecure){
		let local = false;
		if(!(error instanceof notError)){
			error = new notError(error.message, {}, error);
			local = true;
		}
		let data = await this.packError(error, local);
		return await this._report(data, this.getReportURL(), notSecure, 'error');
	}

	reportError(name, opts = {}, parent = null, notSecure){
		return this.report(new notError(name, opts, parent), notSecure);
	}

	isLineParasite(line){
		return PARASITES.some((str) => line.includes(str));
	}

	trunkStack(stack){
		let lines = stack.split("\n");
		while(lines.length && this.isLineParasite(lines[0])){
			lines.shift();
		}
		return lines;
	}

	parseStack(rawStack){
		try{
			let stack = this.trunkStack(rawStack);
			
			let line = stack[1];
			if(!line){ return {stack};}
			let res = [...line.matchAll(/\sat\s(.+)\s\((.+)\)/gi)][0];
			if(!res || res.length < 2){ return {stack}; }
			let functionFullPath = res[1].split('.');
			let functionName = functionFullPath[functionFullPath.length - 1],
				file = res[2].split(':'),
				fileName = file[0],
				filePath = file[0],
				fileLine = file[1],
				fileInfo, fileDir;
			if(path){
				fileInfo = path?path.parse(fileName):false;
				if(fileInfo){
					fileDir = fileInfo.dir.split('/').pop();
				}
			}
			
			return {
				stack,
				functionName: functionName,         //name of function
				type: fileDir,                      //logic type of function
				fileName,                           //filename
				filePath,                            //full file url
				lineNumber: parseInt(fileLine)      //number of line in file
			};
		}catch(e){
			LOG.error(e);
			return false;
		}
	}

	extractDataFromError(err, local){
		let res = err.getDetails();
		if(res.stack){
			let stackInfo = this.parseStack(res.stack);
			if(stackInfo && stackInfo.stack){
				if(local){
					res.stack = stackInfo.stack.join("\n");
					STACK_PROPS.forEach((j) => {
						if(stackInfo[j]){ res[j] = stackInfo[j];}
					});
				}else{
					STACK_PROPS.forEach((j) => {
						if(!res[j]){res[j] = stackInfo[j];}
					});
				}
			}
		}
		return res;
	}

	async packError(error, local = false){
		let result = {};
		result.details   = this.extractDataFromError(error, local);
		await this.tryToGetSourceBlock(result);
		result.options   = error.options;
		result.env       = error.env;
		result.origin   = this.origin?this.origin:{};
		return result;
	}

	async tryToGetSourceBlock(result){
		if(result.details.filePath && !isNaN(result.details.lineNumber)){
			try{
				let text = await this.loadSources(result.details.filePath);
				if(text){
					let lines = this.extractLinesFromFile(text, parseInt(result.details.lineNumber));
					result.lines = lines;
				}
			}catch(e){
				return false;
			}
		}
	}

	extractLinesFromFile(text, targetLine){
		let lines = text.split("\n");
		targetLine = parseInt(targetLine) - 1;
		let fromLine = (targetLine - LINES_TO_CAPTURE);
		let toLine = (targetLine + LINES_TO_CAPTURE);
		if(fromLine < 0){
			fromLine = 0;
		}
		if(toLine > lines.length - 1){
			toLine = lines.length - 1;
		}
		let result = [];
		for(let t = fromLine; t < toLine; t++){
			result.push({l: t + 1, txt: lines[t], color: { danger: targetLine === t} });
		}
		return result;
	}


	/**
	******************************************************************************************************
	******************************************************************************************************
	***	Node.js Section
	******************************************************************************************************
	******************************************************************************************************
	**/

	useENV(){
		this.envFirst = true;
		return this;
	}

	getReportURL(){
		if(this.envFirst){
			if(
				typeof process.env.NOT_NODE_ERROR_URL_NODE !== 'undefined' &&
				process.env.NOT_NODE_ERROR_URL_NODE &&
				process.env.NOT_NODE_ERROR_URL_NODE.length > 0 ){
				return process.env.NOT_NODE_ERROR_URL_NODE;
			}
		}
		if ((config && config.get('url') && config.get('url').length > 3)){
			return config.get('url');
		}else{
			if(process.env.NOT_NODE_ERROR_URL_NODE && process.env.NOT_NODE_ERROR_URL_NODE.length>0){
				return process.env.NOT_NODE_ERROR_URL_NODE;
			}else if(NOT_NODE_ERROR_URL_NODE && NOT_NODE_ERROR_URL_NODE.length>3){
				return NOT_NODE_ERROR_URL_NODE;
			}else{
				return NOT_NODE_ERROR_URL_NODE_DEFAULT;
			}
		}
	}

	getReportKey(){
		if(this.envFirst){
			if(
				typeof process.env.NOT_NODE_ERROR_KEY !== 'undefined' &&
				process.env.NOT_NODE_ERROR_KEY &&
				process.env.NOT_NODE_ERROR_KEY.length > 0 ){
				return process.env.NOT_NODE_ERROR_KEY;
			}
		}
		if ((config && config.get('key') && config.get('key').length > 3)){
			return config.get('key');
		}else{
			if(process.env.NOT_NODE_ERROR_KEY && process.env.NOT_NODE_ERROR_KEY.length > 0){
				return process.env.NOT_NODE_ERROR_KEY;
			}else if(NOT_NODE_ERROR_KEY && NOT_NODE_ERROR_KEY.length > 0){
				return NOT_NODE_ERROR_KEY;
			}else{
				return '';
			}
		}
	}

	selectProto(url, options = {secure: true}){
		if(url.indexOf('https://') === 0){
			return https;
		}else if(options.secure){
			return https;
		}else{
			return http;
		}
	}

	_report(data, url, notSecure, type = 'error'){
		return new Promise((resolve, reject)=>{
			try{
				let report = {
					key: this.getReportKey(),
					report: data,
					type
				};
				let options = Object.assign({}, config.get('options') || {secure: true}),
					postBody = JSON.stringify(report),
					postreq,
					responseData = '';
				if(notSecure === true){
					options.secure = false;
				}
				let	proto =	this.selectProto(url, options);
				if (!options.headers){
					options.headers = {};
				}
				options.method = 'PUT';
				options.body = postBody;
				options.headers['Content-Length'] = Buffer.byteLength(postBody, 'utf8');
				options.headers['Content-Type'] = 'application/json';
				postreq = proto.request(url, options, function (res) {
					res.on('data', (chunk) => {
						responseData += chunk;
					});
					res.on('end', () => {
						if (res.statusCode == 200){
							let jsonResponse = JSON.parse(responseData);
							resolve(jsonResponse);
						}else{
							reject({statusCode: res.statusCode, content:responseData, payload: postBody});
						}
					});
				});
				postreq.on('error', reject);
				postreq.write(postBody);
				postreq.end();
			}catch(e){
				reject(e);
			}
		});
	}

	watchProcess(){
		if(!this.processWatching){
			process.on('uncaughtExceptionMonitor', (err, origin) => {
				this.reportError(origin, {origin}, err).catch(exc => LOG.error(exc));
			});

			process.on('unhandledRejection', (reason) => {
				this.reportError('unhandledRejection', { reason }, new Error(reason)).catch(exc=>LOG.error(exc));;
			});

			process.on('warning', (warning) => {
				this.reportError(`Warning: ${warning}`, { type: 'warning', warning }, new Error(warning)).catch(exc=>LOG.error(exc));;
			});

			process.on('exit', (code) => {
				this.reportError(`Server process exit`, { uptime: process.uptime(), type: 'event', code }, new Error('Exit')).catch(exc=>LOG.error(exc));;
			});

			const onSignal = (signal)=>{
				this.reportError(`Signal received ${signal}`, {
					uptime: process.uptime(),
					type: 'event',
					signal
				}, new Error('Signal')).catch(exc=>LOG.error(exc));;
			};

			process.on('SIGINT', onSignal);
			process.on('SIGTERM', onSignal);

			this.processWatching = true;
		}
	}

	async loadSources(filePath){
		return await readFile(filePath, 'utf8');
	}


}


try{
	service = new notErrorReporter();
}catch(err){
	LOG.error(err);
}
module.exports = service;

