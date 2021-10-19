
import notError from './error.browser.js';


//reportable
class notRequestError extends notError{
	constructor(
		message,
		{code, errors, redirect} = {code:500, errors:{}, redirect: false},
		error = null
	){
		super(
			message,
			{
				code,
				errors,
				redirect
			},
			error
		);
		return this;
	}

	setRedirect(url){
		this.options.redirect = url;
	}

	getRedirect(){
		return this.options.redirect;
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
			errors:   this.getErrors(),
			redirect: this.getRedirect(),
		};
	}

}


export default notRequestError;

