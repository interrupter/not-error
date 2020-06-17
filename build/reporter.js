var notErrorReporter = (function () {
	'use strict';

	/**
	*	Template of reporter.js
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

	class notErrorReporter {
	  constructor(envFirst = false) {
	    this.envFirst = envFirst;
	    return this;
	  }

	  report(error, notSecure) {
	    let data = this.packError(error);
	    return this._report(data, this.getReportURL(), notSecure);
	  }

	  packError(error) {
	    let result = {};

	    if (error.parent) {
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

	const service = new notErrorReporter();

	return service;

}());
