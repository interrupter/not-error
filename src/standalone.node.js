/**
*	Template of error.js
*	For building for specific environment.
*	Node.js or Browser
*	@param {string}	env	node|browser in wich env it will be running
*	@param {string}	url	URL of report collector
*	@param {string}	key	key to indetificate reporter
**/



const NOT_NODE_ERROR_URL_NODE_DEFAULT = 'https://appmon.ru/api/key/collect';
var NOT_NODE_ERROR_URL_NODE = null;
var NOT_NODE_ERROR_KEY = null;
var config = null;

try{
	config = require('not-config').readerForModule('error');
}catch(e){
	NOT_NODE_ERROR_URL_NODE = 'https://appmon.ru/api/key/collect';
	NOT_NODE_ERROR_KEY = '';
}
const https = require('https');
const http = require('http');

/**
* Error reporting with features, saving browser info, uri and so on.
* @module not-error/error
*/
class notErrorStandalone extends Error {
	constructor(message, options = {}){
		super(message);
		this.options = options;
		this.fill();
		this.getTime();
		return this;
	}
	/**
	*	Adopting native error object
	*	@param {Error}	error 	Error object
	*	@return {notError}		chainable
	*/
	adopt(error){
		this.parent = error;
		return this;
	}

	/**
	*	Updating this.env.date property
	*	@return  {object}	{timestamp, offset}
	*/
	getTime(){
		let date = new Date();
		this.env.date = {
			timestamp : date.getTime(),
			offset: date.getTimezoneOffset()
		};
		return this.env.date;
	}

	report(){
		//pack error
		let data = this.packError();
		//send report to collector
		return this._report(data, this.getReportURL());
	}

	packError(){
		let result = {};
		if (this.parent){
			result.parent = {
				columnNumber:		this.parent.columnNumber,
				fileName:				this.parent.fileName,
				lineNumber:			this.parent.lineNumber,
				message:				this.parent.message,
				name:						this.parent.name,
				stack:					this.parent.stack
			};
		}

		result.details = {
			columnNumber:		this.columnNumber,
			fileName:				this.fileName,
			lineNumber:			this.lineNumber,
			name:						this.name,
			message:				this.message,
			stack:					this.stack
		};

		result.options 	= this.options;
		result.env 			= this.env;
		return result;
	}

	/**
	******************************************************************************************************
	******************************************************************************************************
	***	Node.js Section
	******************************************************************************************************
	******************************************************************************************************
	**/

	/**
	*	Filtering out key by `white` list
	*	@param {object} object hash to be copied according filter `white` list
	*	@param {array} filter array of sting, which represents keys we want to be
	*						copied in resulting object from source
	*	@return {object}		white listed hash
	*/
	filterEnv(object, filter){
		let result = {};
		for(let t of filter){
			if(Object.prototype.hasOwnProperty.call(object, t)){
				result[t] = object[t];
			}
		}
		return result;
	}

	/**
	*	Collecting information specific for Node.js V8
	*	@return {notError}		chainable
	*/
	fill(){
		/**
		*	You want some fields from env but not all, cause there are passwords
		*	from db, api keys and etc
		*/
		this.env = {
			browser: 	false,
			node: 		true,
			versions: 	Object.assign({}, process.versions),
			vars: 		this.filterEnv(process.env, this.options.whitelist || ['NODE_ENV'])
		};
		return this;
	}

	getReportURL(){
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
		if(window.NOT_NODE_ERROR_KEY && window.NOT_NODE_ERROR_KEY.length>0){
			return window.NOT_NODE_ERROR_KEY;
		}else if(NOT_NODE_ERROR_KEY && NOT_NODE_ERROR_KEY.length>0){
			return NOT_NODE_ERROR_KEY;
		}else{
			return '';
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

	_report(data, url){
		return new Promise((resolve, reject)=>{
			try{
				let report ={
					key: this.getReportKey(),
					type: 'error',
					report: data
				};
				let options = Object.assign({}, config.get('options') || {secure: true}),
					postBody = JSON.stringify(report),
					postreq,
					responseData = '',
					proto =	this.selectProto(url, options);
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
							reject({statusCode: res.statusCode, content:responseData});
						}
					});
				});
				postreq.on('error', (e) => {
					reject(e);
				});
				postreq.write(postBody);
				postreq.end();
			}catch(e){
				reject(e);
			}
		});
	}

}


module.exports = new notErrorStandalone();
