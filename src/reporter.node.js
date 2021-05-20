/**
*	Template of reporter.js
*	For building for specific environment.
*	Node.js or Browser
*	@param {string}	env	node|browser in wich env it will be running
*	@param {string}	url	URL of report collector
*	@param {string}	key	key to indetificate reporter
*/

const PARASITES = ['report@', 'notError@'];


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

	report(error, notSecure){
		if(!(error instanceof notError)){
			error = new notError(error.message, {}, error);
		}
		let data = this.packError(error);
		return this._report(data, this.getReportURL(), notSecure, 'error');
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
			
			let line = stack[3];
		  let res = [...line.matchAll(/\sat\s(.+)\s\((.+)\)/gi)][0];
		  let functionFullPath = res[1].split('.');
		  let functionName = functionFullPath[functionFullPath.length - 1],
		    file = res[2].split(':'),
		    fileName = file[0],
		    fileLine = file[1],
				fileInfo, fileDir;
			if(path){
				fileInfo = path?path.parse(fileName):false;
				if(fileInfo){
					fileDir = fileInfo.dir.split('/').pop();
				}
			}
			
		  return {
		    functionName: functionName,         //name of function
		    type: fileDir,              				//logic type of function
		    fileName,             							//filename
		    lineNumber: parseInt(fileLine)    	//number of line in file
		  };
		}catch(e){
			LOG.error(e);
			return false;
		}
	}

	extractDataFromError(err){
		let res = {
			columnNumber:		err.columnNumber,
			fileName:				err.fileName,
			lineNumber:			err.lineNumber,
			name:						err.name,
			message:				err.message,
			stack:					err.stack
		};
		if(res.stack){
			let stackInfo = this.parseStack(res.stack);
			if(stackInfo){
				if(!res.fileName){ 			res.fileName = stackInfo.fileName;							}
				if(!res.lineNumber){ 		res.lineNumber = stackInfo.lineNumber;					}
				if(!res.functionName){ 	res.functionName = stackInfo.functionName;			}
				if(!res.type){ 					res.type = stackInfo.type;											}
			}
		}
		return res;
	}

	packError(error){
		let result = {};
		if (Object.prototype.hasOwnProperty.call(error, 'parent') && typeof error.parent !== 'undefined' && error.parent){
			result.parent = this.extractDataFromError(error.parent);
		}
		result.details 	= this.extractDataFromError(error);
		result.options 	= error.options;
		result.env 			= error.env;
		result.origin 	= this.origin?this.origin:{};
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


}


try{
	service = new notErrorReporter();
}catch(err){
	LOG.error(err);
}
module.exports = service;

