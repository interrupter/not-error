/**
* Detects if code runs in browser.
*/
var isBrowser = new Function("try {return this===window;}catch(e){ return false;}");

/**
* Error reporting with features, saving browser info, uri and so on.
* @module not-error/error
*/
class notError extends Error {
	constructor(message, options = {}){
		super(message);
		this.options = options;
		this.fill();
		this.getTime();
		return this;
	}

	getTime(){
		let date = new Date();
		this.env.date = {
			timestamp : date.getTime(),
			offset: date.getTimezoneOffset()
		};
	}

	/**
	* Collecting data from broser or Node
	*/
	fill(){
		if (isBrowser()){
			this.fillForBrowser();
		}else{
			this.fillForNode();
		}
	}

	/**
	* Collecting information specific for browsers
	*/
	fillForBrowser(){
		this.env = {
			browser: true,
			node: false,
			location: {
				hash: 		window.location.hash,
				port: 		window.location.port,
				protocol: 	window.location.protocol,
				search: 	window.location.search,
				host: 		window.location.host,
				href: 		window.location.href,
				hostname: 	window.location.hostname,
				pathname: 	window.location.pathname,
			}
		};
	}

	/**
	*	Collecting information specific for Node.js V8
	*/
	fillForNode(){
		/**
		*	You want some fields from env but not all, cause there are passwords
		*	from db, api keys and etc
		*/
		this.env = {
			browser: false,
			node: true,
			versions: Object.assign({}, process.versions),
			vars: this.filterEnv(process.env, this.options.whitelist || ['NODE_ENV'])
		};
	}

	/**
	*	Filtering out key by `white` list
	* @param {object} object hash to be copied according filter `white` list
	* @param {array} filter array of sting, which represents keys we want to be
	*						copied in resulting object from source
	* @return {object}		white listed hash
	*/
	filterEnv(object, filter){
		let result = {};
		for(let t of filter){
			if(object.hasOwnProperty(t)){
				result[t] = object[t];
			}
		}
		return result;
	}
}

module.exports = notError;
