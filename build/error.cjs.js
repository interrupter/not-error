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

  getStack() {
    if (this.parent) {
      return this.parent.stack;
    } else {
      return this.stack;
    }
  }

  getDetails() {
    let src = this;

    if (this.parent) {
      src = this.parent;
    }

    return {
      columnNumber: src.columnNumber,
      fileName: src.fileName,
      lineNumber: src.lineNumber,
      name: src.name,
      message: src.message,
      stack: src.stack
    };
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
      document: {
        title: document.title
      },
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

module.exports = notError;
