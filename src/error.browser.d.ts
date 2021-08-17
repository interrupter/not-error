declare class notError extends Error {
  constructor(message:string, options: any, error: Error);
  adopt(error: Error):notError;
  getStack():any;
  getDetails():{
    columnNumber:Number,
    fileName:string,
    lineNumber:Number,
    name:string,
    message:String,
    stack:any
  };
  getTime():{
    timestamp: Number,
    offset: Number
  };
  fill():notError;
}

export default notError;
