var notErrorStandalone = (function () {
	'use strict';

	/**
	*	Template of error.js
	*	For building for specific environment.
	*	Node.js or Browser
	*	@param {string}	env	node|browser in wich env it will be running
	*	@param {string}	url	URL of report collector
	*	@param {string}	key	key to indetificate reporter
	*/
	const NOT_NODE_ERROR_URL_BROWSER = '/api/error';
	/**
	* Error reporting with features, saving browser info, uri and so on.
	* @module not-error/error
	*/

	class notErrorStandalone extends Error {
	  constructor(message, options = {}) {
	    super(message);
	    this.options = options;
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
	    this.parent = error;
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

	  report() {
	    //pack error
	    let data = this.packError(); //send report to collector

	    return this._report(data, this.getReportURL());
	  }

	  packError() {
	    let result = {};

	    if (this.parent) {
	      result.parent = {
	        columnNumber: this.parent.columnNumber,
	        fileName: this.parent.fileName,
	        lineNumber: this.parent.lineNumber,
	        message: this.parent.message,
	        name: this.parent.name,
	        stack: this.parent.stack
	      };
	    }

	    result.details = {
	      columnNumber: this.columnNumber,
	      fileName: this.fileName,
	      lineNumber: this.lineNumber,
	      name: this.name,
	      message: this.message,
	      stack: this.stack
	    };
	    result.options = this.options;
	    result.env = this.env;
	    return result;
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
	      }
	    };
	    return this;
	  }

	  getReportURL() {
	    if (window.NOT_NODE_ERROR_URL_BROWSER && window.NOT_NODE_ERROR_URL_BROWSER.length > 0) {
	      return window.NOT_NODE_ERROR_URL_BROWSER;
	    } else if ( NOT_NODE_ERROR_URL_BROWSER.length > 0) {
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
	      key: this.getReportKey(),
	      report: data,
	      type: 'error'
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

	const service = new notErrorStandalone();

	return service;

}());
