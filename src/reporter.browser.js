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
			
			let line = stack[0];
			let res = [...line.matchAll(/(.*)@(.+):(\d+):(\d+)/gi)][0];
			if(!res){
				return {};
			}
			let functionName = res[1].replace('/' , '').replace('\\' , '').replace('>', '').replace('<', ''),
				filePath = res[2],
				parts = filePath.split('/'),
				fileName = parts.length?parts[parts.length-1]:'',
				fileDir = parts.length>1?parts[parts.length-2]:'',
				fileLine = res[3];
			
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
		let res = {
			columnNumber:    err.columnNumber,
			fileName:        err.fileName,
			lineNumber:      err.lineNumber,
			name:            err.name,
			message:        err.message,
			stack:          err.stack
		};
		if(res.stack){
			let stackInfo = this.parseStack(res.stack);
			if(stackInfo && stackInfo.stack){
				if(local){
					res.stack = stackInfo.stack.join("\n");
					if(stackInfo.fileName){       res.fileName = stackInfo.fileName;              }
					if(stackInfo.lineNumber){     res.lineNumber = stackInfo.lineNumber;          }
					if(stackInfo.functionName){   res.functionName = stackInfo.functionName;      }
					if(stackInfo.type){           res.type = stackInfo.type;                      }
					if(stackInfo.filePath){       res.filePath = stackInfo.filePath;              }
				}else{
					if(!res.fileName){       res.fileName = stackInfo.fileName;              }
					if(!res.lineNumber){     res.lineNumber = stackInfo.lineNumber;          }
					if(!res.functionName){   res.functionName = stackInfo.functionName;      }
					if(!res.type){           res.type = stackInfo.type;                      }
				}
			}
		}
		return res;
	}

	async packError(error, local = false){
		let result = {};
		if (Object.prototype.hasOwnProperty.call(error, 'parent') && typeof error.parent !== 'undefined' && error.parent){
			result.parent = this.extractDataFromError(error.parent, local);
		}
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

	async loadSources(filePath){
		let res = await fetch(filePath);
		if(parseInt(res.status) === 200){
			return await res.text();
		}else{
			return false;
		}
	}


}


export default notErrorReporter;

