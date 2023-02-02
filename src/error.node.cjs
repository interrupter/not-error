/**
*	Template of error.js
*	For building for specific environment.
*	Node.js or Browser
*	@param {string}	env	node|browser in wich env it will be running
*	@param {string}	url	URL of report collector
*	@param {string}	key	key to indetificate reporter
*/
/**
* Error reporting with features, saving browser info, uri and so on.
* @module not-error/error
*/
class notError extends Error {
	constructor(message, options = {}, error = null){
		super(message);
		this.options = options;
		this.adopt(error);
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
		if(error instanceof Error){
			this.parent = error;
		}
		return this;
	}

	getStack(){
		if(this.parent){
			return this.parent.stack;
		}else{
			return this.stack;
		}
	}

	getDetails(){
		let src = this;
		if(this.parent){
			src = this.parent;
		}
		return {
			columnNumber:    	src.columnNumber,
			fileName:        	src.fileName,
			lineNumber:      	src.lineNumber,
			name:            	src.name,
			message:        	src.message,
			stack:          	src.stack
		};
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
	******************************************************************************************************
	******************************************************************************************************
	***	Node.js Section
	******************************************************************************************************
	******************************************************************************************************
	**/

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
			if(Object.prototype.hasOwnProperty.call(object, t)){
				result[t] = object[t];
			}
		}
		return result;
	}

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
			versions: Object.assign({}, process.versions),
			vars: 		this.filterEnv(process.env, this.options.whitelist || ['NODE_ENV'])
		};
		return this;
	}


}


module.exports = notError;

