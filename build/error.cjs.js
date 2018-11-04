'use strict';

/**
*	Template of error.js
*	For building for specific environment.
*	Node.js or Browser 
*	@param {string}	env	node|browser in wich env it will be running
*	@param {string}	url	URL of report collector
*	@param {string}	key	key to indetificate reporter
*/
const NOT_ERROR_URL = '/api/error';
/**
* Error reporting with features, saving browser info, uri and so on.
* @module not-error/error
*/

class notError extends Error {
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
  /**
  *	Filtering out key by `white` list
  *	@param {object} object hash to be copied according filter `white` list
  *	@param {array} filter array of sting, which represents keys we want to be
  *						copied in resulting object from source
  *	@return {object}		white listed hash
  */


  filterEnv(object, filter) {
    let result = {};

    for (let t of filter) {
      if (object.hasOwnProperty(t)) {
        result[t] = object[t];
      }
    }

    return result;
  }

  report() {
    //pack error
    let data = this.packError(); //send report to collector		

    return this.reportToServer(data, this.getReportURL());
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
    if (window.NOT_ERROR_URL && window.NOT_ERROR_URL.length > 0) {
      return window.NOT_ERROR_URL;
    } else if (NOT_ERROR_URL.length > 0) {
      return NOT_ERROR_URL;
    } else {
      return '/api/error';
    }
  }

  getReportKey() {
    if (window.NOT_ERROR_KEY && window.NOT_ERROR_KEY.length > 0) {
      return window.NOT_ERROR_KEY;
    } else {
      return '';
    }
  }

  reportError(data, url) {
    data.key = this.getReportKey();
    return fetch(url, {
      method: 'POST',
      // *GET, POST, PUT, DELETE, etc.
      mode: 'no-cors',
      // no-cors, cors, *same-origin
      cache: 'no-cache',
      // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin',
      // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      redirect: 'follow',
      // manual, *follow, error
      referrer: 'no-referrer',
      // no-referrer, *client
      body: JSON.stringify(data) // body data type must match "Content-Type" header

    });
  }

}

module.exports = notError;
