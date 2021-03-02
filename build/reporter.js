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
	var service;
	const LOG = window.console;
	const NOT_NODE_ERROR_URL_BROWSER = 'https://appmon.ru/api/key/collect';
	const NOT_NODE_ERROR_KEY = '';

	try {
	  /**
	  * Error reporting with features, saving browser info, uri and so on.
	  * @module not-error/error
	  */
	  class notErrorReporter {
	    constructor(envFirst = false) {
	      this.envFirst = envFirst;
	      this.processWatching = false;
	      return this;
	    }

	    report(error, notSecure) {
	      let data = this.packError(error);
	      return this._report(data, this.getReportURL(), notSecure, 'error');
	    }

	    reportError(name, opts = {}, parent = null, notSecure) {
	      return this._report(new notError(name, opts, parent), notSecure);
	    }

	    packError(error) {
	      let result = {};

	      if (Object.prototype.hasOwnProperty.call(error, 'parent') && typeof error.parent !== 'undefined' && error.parent) {
	        result.parent = {
	          columnNumber: error.parent.columnNumber,
	          fileName: error.parent.fileName,
	          lineNumber: error.parent.lineNumber,
	          name: error.parent.name,
	          message: error.parent.message,
	          stack: error.parent.stack
	        };
	      }

	      result.details = {
	        columnNumber: error.columnNumber,
	        fileName: error.fileName,
	        lineNumber: error.lineNumber,
	        name: error.name,
	        message: error.message,
	        stack: error.stack
	      };
	      result.options = error.options;
	      result.env = error.env;
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
	      } else if (NOT_NODE_ERROR_URL_BROWSER && NOT_NODE_ERROR_URL_BROWSER.length > 0) {
	        return NOT_NODE_ERROR_URL_BROWSER;
	      } else {
	        return '/api/error';
	      }
	    }

	    getReportKey() {
	      if (window.NOT_NODE_ERROR_KEY && window.NOT_NODE_ERROR_KEY.length > 0) {
	        return window.NOT_NODE_ERROR_KEY;
	      } else if (NOT_NODE_ERROR_KEY && NOT_NODE_ERROR_KEY.length > 0) ; else {
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

	  service = new notErrorReporter();
	} catch (err) {
	  LOG.error(err);
	}

	var service$1 = service;

	return service$1;

}());
