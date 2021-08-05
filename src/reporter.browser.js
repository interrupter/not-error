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
	'file',
	'path',
	'type',
	'line',
	'column',
	'function',
];

const FILE_LINE_PARSERS = [
	{
		test: (line)=>{
			const tester = /(.*)@(.+):(\d+):(\d+)/gi;
			let matches = [...line.matchAll(tester)];
			if(matches.length){
				let res = matches[0];
				if(res && res.length > 2 ){
					return res;
				}
			}
			return false;
		},
		parse: (res)=>{
			if(res){

			}else{
				return false;
			}
		}
	},
	{
		test: (line)=>{
			const tester = /\sat\s(.+)\s\((.+)\)/gi;
			let matches = [...line.matchAll(tester)];
			if(matches.length){
				let res = matches[0];
				if(res && res.length > 2 ){
					return res;
				}
			}
			return false;
		},
		parse: (res)=>{
			if(res){
				//separation of different types of data
				let functionFullPath = res[1].split('.');
				let file = res[2].split(':');
				//extraction of exact values
				let pathParts = file[0].split('/');
				let fileName = pathParts[pathParts.length - 1];
				pathParts.pop();
				let filePath = pathParts.join('/');
				let lineNumber = parseInt(file[1]);
				let columnNumber = parseInt(file[2]);
				let functionName = functionFullPath[functionFullPath.length - 1];
				if (functionName.replaceAll){
					functionName = functionName.replaceAll('/' , '').replaceAll('\\' , '').replaceAll('>', '').replaceAll('<', '');
				}
				let fileDir;
				if(pathParts && pathParts.length){
					fileDir = pathParts.pop();
				}
				return {
					file: fileName,
					path: filePath,
					line: lineNumber,
					column: columnNumber,
					function: functionName,
					type: fileDir,
				};
			}else{
				return false;
			}
		}
	},
];


const LOG = window.console;
const NOT_NODE_ERROR_URL_BROWSER = 'https://appmon.ru/api/key/collect';
const NOT_NODE_ERROR_KEY = '';
import notError from './error.browser.js';


const DEFAULT_OPTIONS = {
	envFirst: false,
	origin: {},
	url:undefined,
	key:undefined,
	registerAll: true
};

/**
* Error reporting with features, saving browser info, uri and so on.
* @module not-error/error
*/
class notErrorReporter{

	constructor(opts = DEFAULT_OPTIONS){
		let {envFirst, origin,	url, key,registerAll } = opts;
		this.envFirst = envFirst;
		this.processWatching = false;
		this.setOrigin(origin);
		this.setKey(key);
		this.setURL(url);
		this.setRegisterAll(registerAll);
		
		window.addEventListener('error', this.registerError.bind(this));
		
		return this;
	}

	setOrigin(origin){
		this.origin = origin;
		return this;
	}

	setKey(key){
		this.key = key;
		return this;
	}

	setURL(url){
		this.url = url;
		return this;
	}

	setRegisterAll(registerAll = true){
		this.registerAll = registerAll;
		return this;
	}

	async report(error, notSecure){
		let local = false;
		if(error.constructor.name !== 'notError'){
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


	__stackFirstLineParser(line){
		let result;
		let parser = FILE_LINE_PARSERS.find((itm) =>{ return result = itm.test(line);});
		if(parser){
			return parser.parse(result);
		}
		return false;
	}

	__stackFirstLineSearcher(stack){
		for(let i = 0; stack.length > i; i++){
			let	line = stack[i];
			if(!line){continue;}
			let res = this.__stackFirstLineParser(line);
			if(res){
				return res;
			}else{
				continue;
			}
		}
		return false;
	}

	parseStack(rawStack){
		try{
			let stack = this.trunkStack(rawStack);
			let res = this.__stackFirstLineSearcher(stack);
			if(!res){
				return {stack};
			}
			let fileinfo = this.__stackFirstLineSearcher(stack);
			if(!fileinfo){
				return {stack};
			}
			return {
				stack,
				...fileinfo
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
	***	Browser Section
	******************************************************************************************************
	******************************************************************************************************
	**/
	getReportURL(){
		if(typeof this.url !== 'undefined'){
			return this.url;
		}else	if(window.NOT_NODE_ERROR_URL_BROWSER && window.NOT_NODE_ERROR_URL_BROWSER.length>0){
			return window.NOT_NODE_ERROR_URL_BROWSER;
		}else if(NOT_NODE_ERROR_URL_BROWSER && NOT_NODE_ERROR_URL_BROWSER.length>0){
			return NOT_NODE_ERROR_URL_BROWSER;
		}else{
			return '/api/error';
		}
	}

	getReportKey(){
		if(typeof this.key !== 'undefined'){
			return this.key;
		}else	if(window.NOT_NODE_ERROR_KEY && window.NOT_NODE_ERROR_KEY.length > 0){
			return window.NOT_NODE_ERROR_KEY;
		}else if(NOT_NODE_ERROR_KEY && NOT_NODE_ERROR_KEY.length > 0){
			return NOT_NODE_ERROR_KEY;
		}else{
			return '';
		}
	}

	_report(data, url){
		console.log(data);
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

	registerError(ev){
		if(this.registerAll){
			this.report(ev.error);
		}
	}


}


export default notErrorReporter;

