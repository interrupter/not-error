/**
*	Template of error.js
*	For building for specific environment.
*	Node.js or Browser 
*	@param {string}	env	node|browser in wich env it will be running
*	@param {string}	url	URL of report collector
*	@param {string}	key	key to indetificate reporter
*/


const config = require('not-config').readerForModule('error');
const https = require('https');
const http = require('http');
const querystring = require('querystring');


/**
* Error reporting with features, saving browser info, uri and so on.
* @module not-error/error
*/
class notError extends Error {
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
			if(object.hasOwnProperty(t)){
				result[t] = object[t];
			}
		}
		return result;
	}

	report(){
		//pack error
		let data = this.packError();
		//send report to collector		
		return this.reportToServer(data, this.getReportURL());		
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
		return (config && config.get('url'))?config.get('url'):null;
	}

	selectProto(url, options = {secure: true}){
		if(options.secure){
			return https;
		}else if(url.indexOf('https://') === 0){
			return https;
		}else{	
			return http;
		}

	}

	reportError(data, url){
		return new Promise((resolve, reject)=>{
			try{
				data.key = config.get('key');
				let options = Object.assign({}, config.get('options') || {secure: true}),
					postBody = querystring.stringify(data),
					postreq,
					responseData = '',
					proto =	this.selectProto(url, options);
				if (!options.headers){
					options.headers = {};
				}
				options.method = 'POST';
				options.headers['Content-Length'] = postBody.length;
				postreq = proto.request(options, function (res) {
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


module.exports = notError;

