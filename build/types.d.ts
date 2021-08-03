declare class notErrorReporter{
  constructor(envFirst?: boolean = false);
  setOrigin(origin:any):void;
  setRegisterAll(registerAll:boolean = true):void;
  async report(error:any, notSecure:boolean):any;
  reportError(name:string, opts: any, parent:any, notSecure:boolean):;
  isLineParasite(line:string):boolean;
  trunkStack(stack:string):Array<string>;
  parseStack(rawStack:any):any;
  extractDataFromError(err:any, local:boolean):any;
  async packError(error:any, local?:boolean = false):any;
  async tryToGetSourceBlock(result:any):void|boolean;
  extractLinesFromFile(text:string, targetLine:string):Array<any>;
  getReportURL():string;
  getReportKey():string;
  _report(data:any, url:string):Promise;
  async loadSources(filePath:string):Promise<string>|boolean;
  registerError(ev:Error):void;
}
