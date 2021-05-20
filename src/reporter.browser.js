/**
*	Template of reporter.js
*	For building for specific environment.
*	Node.js or Browser
*	@param {string}	env	node|browser in wich env it will be running
*	@param {string}	url	URL of report collector
*	@param {string}	key	key to indetificate reporter
*/


const LOG = window.console;
const NOT_NODE_ERROR_URL_BROWSER = 'https://appmon.ru/api/key/collect';
const NOT_NODE_ERROR_KEY = '';
import notError from './error.browser.js';


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

	static PARASITES = ['report@', 'notError@'];

	isLineParasite(line){
		return this.PARASITES.some((str) => line.includes(str));
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
			
			let line = stack[0];
			let res = [...line.matchAll(/(.*)@(.+):(\d+):(\d+)/gi)][0];
			let functionName = res[1].replace('/' , '').replace('\\' , '').replace('>', '').replace('<', ''),
			  file = res[2],
				parts = file.split('/'),
			  fileName = parts.length?parts[parts.length-1]:'',
				fileDir = parts.length>1?parts[parts.length-2]:'',
			  fileLine = res[3];
			
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
	***	Browser Section
	******************************************************************************************************
	******************************************************************************************************
	**/
	getReportURL(){
		if(window.NOT_NODE_ERROR_URL_BROWSER && window.NOT_NODE_ERROR_URL_BROWSER.length>0){
			return window.NOT_NODE_ERROR_URL_BROWSER;
		}else if(NOT_NODE_ERROR_URL_BROWSER && NOT_NODE_ERROR_URL_BROWSER.length>0){
			return NOT_NODE_ERROR_URL_BROWSER;
		}else{
			return '/api/error';
		}
	}

	getReportKey(){
		if(window.NOT_NODE_ERROR_KEY && window.NOT_NODE_ERROR_KEY.length > 0){
			return window.NOT_NODE_ERROR_KEY;
		}else if(NOT_NODE_ERROR_KEY && NOT_NODE_ERROR_KEY.length > 0){
			return NOT_NODE_ERROR_KEY;
		}else{
			return '';
		}
	}

	_report(data, url){
		let report = {
			report: data,
			type: 'error',
			key: this.getReportKey(),
		};
		return fetch(url, {
			method: 			'PUT',
			cache: 				'no-cache',
			headers: 			{
				'Content-Type': 'application/json; charset=utf-8'
			},
			redirect: 		'follow',
			referrer: 		'no-referrer',
			body: 				JSON.stringify(report),
		});
	}


}


export default notErrorReporter;

