declare class notErrorReporter{
  constructor(opt:{
		envFirst?: Boolean,
		origin?: any,
		url?:string,
		key?:string,
		registerAll?: boolean
	});
  setKey(key:string):notErrorReporter;
  setURL(url:string):notErrorReporter;
  setOrigin(origin:any):void;
  setRegisterAll(registerAll?:boolean):void;
  report(error:any, notSecure?:boolean):Promise<any>;
  reportError(name:string, opts: any, parent:any, notSecure?:boolean):Promise<any>;
  isLineParasite(line:string):boolean;
  trunkStack(stack:string):Array<string>;
  parseStack(rawStack:any):any;
  extractDataFromError(err:any, local:boolean):any;
  packError(error:any, local:boolean):Promise<any>;
  tryToGetSourceBlock(result:any):Promise<void|boolean>;
  extractLinesFromFile(text:string, targetLine:string):Array<any>;
  getReportURL():string;
  getReportKey():string;
  _report(data:any, url:string):Promise<any>;
  loadSources(filePath:string):Promise<string|boolean>;
  registerError(ev:Error):void;
}

export default notErrorReporter;
