
const notError = require('./error.node.js');


class notValidationError extends notError{
  constructor(message, fields = {}, err = null){
    super(message, {fields}, err);
    return this;
  }

  /**
  * Sets hash of fields errors messages for usage in forms
  *	@return {Object}	hash of field->errors [key:string]: Array<string>
  */
  setFieldsErrors(messages){
    this.options.fields = messages;
  }

  /**
  * Returns hash of errors
  *	@return {Object}	hash of field->errors [key:string]: Array<string>
  */
  getFieldsErrors(){
    return this.options.fields;
  }

}


module.exports = notValidationError;

