
const notError = require('./error.node.js');


//reportable
class notRequestError extends notError{
  constructor(
    message,
    code = 500,
    errors = {}
    ){
    super(
      message,
      {
        code,
        errors
      }
    );
    return this;
  }

  setCode(code){
    this.options.code = code;
  }

  getCode(){
    return this.options.code;
  }

  setErrors(list){
    this.options.errors = list;
  }

  getErrors(){
    return this.options.errors;
  }

  getResult(){
    return {
      message:  this.message,
      code:     this.getCode(),
      errors:   this.getErrors()
    };
  }

}


module.exports = notRequestError;

