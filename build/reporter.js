var notErrorReporter = (function () {
	'use strict';

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
	  constructor(message, options = {}, error = null) {
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


	  adopt(error) {
	    if (error) {
	      this.parent = error;
	    }

	    return this;
	  }
	  /**
	  *	Updating this.env.date property
	  *	@return  {object}	{timestamp, offset}
	  */


	  getTime() {
	    let date = new Date();
	    this.env.date = {
	      timestamp: date.getTime(),
	      offset: date.getTimezoneOffset()
	    };
	    return this.env.date;
	  }
	  /**
	  ******************************************************************************************************
	  ******************************************************************************************************
	  ***	Browser Section
	  ******************************************************************************************************
	  ******************************************************************************************************
	  **/

	  /**
	  *	Collecting information specific for browsers
	  *	@return {notError}		chainable
	  */


	  fill() {
	    this.env = {
	      browser: true,
	      node: false,
	      location: {
	        hash: window.location.hash,
	        port: window.location.port,
	        protocol: window.location.protocol,
	        search: window.location.search,
	        host: window.location.host,
	        url: window.location.url,
	        href: window.location.href,
	        hostname: window.location.hostname,
	        pathname: window.location.pathname
	      },
	      navigator: {
	        appName: navigator.appName,
	        appCodeName: navigator.appCodeName,
	        appVersion: navigator.appVersion,
	        userAgent: navigator.userAgent,
	        platform: navigator.platform,
	        language: navigator.language,
	        product: navigator.product,
	        onLine: navigator.onLine,
	        cookieEnabled: navigator.cookieEnabled
	      },
	      window: {
	        height: window.innerHeight,
	        width: window.innerWidth
	      }
	    };
	    return this;
	  }

	}

	/**
	*	Template of reporter.js
	*	For building for specific environment.
	*	Node.js or Browser
	*	@param {string}	env	node|browser in wich env it will be running
	*	@param {string}	url	URL of report collector
	*	@param {string}	key	key to indetificate reporter
	*/
	const LOG = window.console;
	const NOT_NODE_ERROR_URL_BROWSER = 'https://appmon.ru/api/key/collect';
	/**
	* Error reporting with features, saving browser info, uri and so on.
	* @module not-error/error
	*/

	class notErrorReporter {
	  constructor(envFirst = false) {
	    this.envFirst = envFirst;
	    this.processWatching = false;
	    this.origin = {};
	    return this;
	  }

	  setOrigin(origin) {
	    this.origin = origin;
	  }

	  report(error, notSecure) {
	    if (!(error instanceof notError)) {
	      error = new notError(error.message, {}, error);
	    }

	    let data = this.packError(error);
	    return this._report(data, this.getReportURL(), notSecure, 'error');
	  }

	  reportError(name, opts = {}, parent = null, notSecure) {
	    return this.report(new notError(name, opts, parent), notSecure);
	  }

	  parseStack(stack) {
	    try {
	      let line = stack.split("\n")[0].replace('"', '');
	      let res = [...line.matchAll(/(.*)@(.+):(\d+):(\d+)/gi)][0];
	      let functionName = res[1].replace('/', '').replace('\\', '').replace('>', '').replace('<', ''),
	          file = res[2],
	          parts = file.split('/'),
	          fileName = parts.length ? parts[parts.length - 1] : '',
	          fileDir = parts.length > 1 ? parts[parts.length - 2] : '',
	          fileLine = res[3];
	      return {
	        functionName: functionName,
	        //name of function
	        type: fileDir,
	        //logic type of function
	        fileName,
	        //filename
	        lineNumber: parseInt(fileLine) //number of line in file

	      };
	    } catch (e) {
	      LOG.error(e);
	      return false;
	    }
	  }

	  extractDataFromError(err) {
	    let res = {
	      columnNumber: err.columnNumber,
	      fileName: err.fileName,
	      lineNumber: err.lineNumber,
	      name: err.name,
	      message: err.message,
	      stack: err.stack
	    };

	    if (res.stack) {
	      let stackInfo = this.parseStack(res.stack);

	      if (stackInfo) {
	        if (!res.fileName) {
	          res.fileName = stackInfo.fileName;
	        }

	        if (!res.lineNumber) {
	          res.lineNumber = stackInfo.lineNumber;
	        }

	        if (!res.functionName) {
	          res.functionName = stackInfo.functionName;
	        }

	        if (!res.type) {
	          res.type = stackInfo.type;
	        }
	      }
	    }

	    return res;
	  }

	  packError(error) {
	    let result = {};

	    if (Object.prototype.hasOwnProperty.call(error, 'parent') && typeof error.parent !== 'undefined' && error.parent) {
	      result.parent = this.extractDataFromError(error.parent);
	    }

	    result.details = this.extractDataFromError(error);
	    result.options = error.options;
	    result.env = error.env;
	    result.origin = this.origin ? this.origin : {};
	    return result;
	  }
	  /**
	  ******************************************************************************************************
	  ******************************************************************************************************
	  ***	Browser Section
	  ******************************************************************************************************
	  ******************************************************************************************************
	  **/


	  getReportURL() {
	    if (window.NOT_NODE_ERROR_URL_BROWSER && window.NOT_NODE_ERROR_URL_BROWSER.length > 0) {
	      return window.NOT_NODE_ERROR_URL_BROWSER;
	    } else if (NOT_NODE_ERROR_URL_BROWSER.length > 0) {
	      return NOT_NODE_ERROR_URL_BROWSER;
	    } else {
	      return '/api/error';
	    }
	  }

	  getReportKey() {
	    if (window.NOT_NODE_ERROR_KEY && window.NOT_NODE_ERROR_KEY.length > 0) {
	      return window.NOT_NODE_ERROR_KEY;
	    } else {
	      return '';
	    }
	  }

	  _report(data, url) {
	    let report = {
	      report: data,
	      type: 'error',
	      key: this.getReportKey()
	    };
	    return fetch(url, {
	      method: 'PUT',
	      cache: 'no-cache',
	      headers: {
	        'Content-Type': 'application/json; charset=utf-8'
	      },
	      redirect: 'follow',
	      referrer: 'no-referrer',
	      body: JSON.stringify(report)
	    });
	  }

	}

	return notErrorReporter;

}());
