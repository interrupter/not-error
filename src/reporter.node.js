/**
*	Template of reporter.js
*	For building for specific environment.
*	Node.js or Browser
*	@param {string}	env	node|browser in wich env it will be running
*	@param {string}	url	URL of report collector
*	@param {string}	key	key to indetificate reporter
*/


var NOT_NODE_ERROR_URL_NODE = null;
var NOT_NODE_ERROR_KEY = null;
var config = null;
try{
	config = require('not-config').readerForModule('error');
}catch(e){
	NOT_NODE_ERROR_URL_NODE = '/api/error';
	NOT_NODE_ERROR_KEY = '';
}
const https = require('https');
const http = require('http');


/**
* Error reporting with features, saving browser info, uri and so on.
* @module not-error/error
*/
class notErrorReporter{
	constructor(envFirst = false){
		this.envFirst = envFirst;
		return this;
	}

	report(error, notSecure){
		let data = this.packError(error);
		return this._report(data, this.getReportURL(), notSecure);
	}

	packError(error){
		let result = {};
		if (Object.prototype.hasOwnProperty.call(error, 'parent') && typeof error.parent !== 'undefined' && error.parent){
			result.parent = {
				columnNumber:		error.parent.columnNumber,
				fileName:				error.parent.fileName,
				lineNumber:			error.parent.lineNumber,
				name:						error.parent.name,
				message:				error.parent.message,
				stack:					error.parent.stack
			};
		}
		result.details = {
			columnNumber:		error.columnNumber,
			fileName:				error.fileName,
			lineNumber:			error.lineNumber,
			name:						error.name,
			message:				error.message,
			stack:					error.stack
		};
		result.options 	= error.options;
		result.env 			= error.env;
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
				return '/api/error';
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

	_report(data, url, notSecure){
		return new Promise((resolve, reject)=>{
			try{
				let report = {
					key: this.getReportKey(),
					report: data,
					type: 'error'
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
				options.headers['Content-Length'] = postBody.length;
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


}


module.exports = new notErrorReporter();

