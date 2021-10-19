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
    if (error instanceof Error) {
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

class notValidationError extends notError {
  constructor(message, fields = {}, err = null) {
    super(message, {
      fields
    }, err);
    return this;
  }
  /**
   * Sets hash of fields errors messages for usage in forms
   *	@return {Object}	hash of field->errors [key:string]: Array<string>
   */


  setFieldsErrors(messages) {
    this.options.fields = messages;
  }
  /**
   * Returns hash of errors
   *	@return {Object}	hash of field->errors [key:string]: Array<string>
   */


  getFieldsErrors() {
    return this.options.fields;
  }

}

class notRequestError extends notError {
  constructor(message, {
    code,
    errors,
    redirect
  } = {
    code: 500,
    errors: {},
    redirect: false
  }, error = null) {
    super(message, {
      code,
      errors,
      redirect
    }, error);
    return this;
  }

  setRedirect(url) {
    this.options.redirect = url;
  }

  getRedirect() {
    return this.options.redirect;
  }

  setCode(code) {
    this.options.code = code;
  }

  getCode() {
    return this.options.code;
  }

  setErrors(list) {
    this.options.errors = list;
  }

  getErrors() {
    return this.options.errors;
  }

  getResult() {
    return {
      message: this.message,
      code: this.getCode(),
      errors: this.getErrors(),
      redirect: this.getRedirect()
    };
  }

}

/**
*  Template of reporter.js
*  For building for specific environment.
*  Node.js or Browser
*  @param {string}  env  node|browser in wich env it will be running
*  @param {string}  url  URL of report collector
*  @param {string}  key  key to indetificate reporter
*/
const PARASITES = ['report@', 'notError@'];
const LINES_TO_CAPTURE = 6;
const STACK_PROPS = ['file', 'path', 'type', 'line', 'column', 'function'];
const FILE_LINE_PARSERS = [{
  test: line => {
    const tester = /(.*)@(.+):(\d+):(\d+)/gi;
    let matches = [...line.matchAll(tester)];

    if (matches.length) {
      let res = matches[0];

      if (res && res.length > 2) {
        return res;
      }
    }

    return false;
  },
  parse: res => {
    if (res) {
      //separation of different types of data
      let functionFullPath = res[1].split('.');
      let file = res[2]; //extraction of exact values

      let pathParts = file.split('/');
      let fileName = pathParts[pathParts.length - 1];
      pathParts.pop();
      let filePath = pathParts.join('/');
      let lineNumber = parseInt(res[3]);
      let columnNumber = parseInt(res[4]);
      let functionName = functionFullPath[functionFullPath.length - 1];

      if (functionName.replaceAll) {
        functionName = functionName.replaceAll('/', '').replaceAll('\\', '').replaceAll('>', '').replaceAll('<', '');
      }

      let fileDir;

      if (pathParts && pathParts.length) {
        fileDir = pathParts.pop();
      }

      return {
        file: fileName,
        path: filePath,
        line: lineNumber,
        column: columnNumber,
        function: functionName,
        type: fileDir
      };
    } else {
      return false;
    }
  }
}, {
  test: line => {
    const tester = /\sat\s(.+)\s\((.+)\)/gi;
    let matches = [...line.matchAll(tester)];

    if (matches.length) {
      let res = matches[0];

      if (res && res.length > 2) {
        return res;
      }
    }

    return false;
  },
  parse: res => {
    if (res) {
      //separation of different types of data
      let functionFullPath = res[1].split('.');
      let file = res[2].split(':'); //extraction of exact values

      let pathParts = file[0].split('/');
      let fileName = pathParts[pathParts.length - 1];
      pathParts.pop();
      let filePath = pathParts.join('/');
      let lineNumber = parseInt(file[1]);
      let columnNumber = parseInt(file[2]);
      let functionName = functionFullPath[functionFullPath.length - 1];

      if (functionName.replaceAll) {
        functionName = functionName.replaceAll('/', '').replaceAll('\\', '').replaceAll('>', '').replaceAll('<', '');
      }

      let fileDir;

      if (pathParts && pathParts.length) {
        fileDir = pathParts.pop();
      }

      return {
        file: fileName,
        path: filePath,
        line: lineNumber,
        column: columnNumber,
        function: functionName,
        type: fileDir
      };
    } else {
      return false;
    }
  }
}];
const LOG = window.console;
const NOT_NODE_ERROR_URL_BROWSER = 'https://appmon.ru/api/key/collect';
const DEFAULT_OPTIONS = {
  envFirst: false,
  origin: {},
  url: undefined,
  key: undefined,
  registerAll: true
};
/**
* Error reporting with features, saving browser info, uri and so on.
* @module not-error/error
*/

class notErrorReporter {
  static notError = notError;
  static notValidationError = notValidationError;
  static notRequestError = notRequestError;

  constructor(opts = DEFAULT_OPTIONS) {
    let {
      envFirst,
      origin,
      url,
      key,
      registerAll
    } = opts;
    this.envFirst = envFirst;
    this.processWatching = false;
    this.setOrigin(origin);
    this.setKey(key);
    this.setURL(url);
    this.setRegisterAll(registerAll);
    window.addEventListener('error', this.registerError.bind(this));
    return this;
  }

  setOrigin(origin) {
    this.origin = origin;
    return this;
  }

  setKey(key) {
    this.key = key;
    return this;
  }

  setURL(url) {
    this.url = url;
    return this;
  }

  setRegisterAll(registerAll = true) {
    this.registerAll = registerAll;
    return this;
  }

  errorIsReportable(error) {
    return error instanceof notError;
  }

  async report(error, notSecure) {
    let local = false;

    if (!this.errorIsReportable(error)) {
      error = new notError(error.message, {}, error);
      local = true;
    }

    let data = await this.packError(error, local);
    return await this._report(data, this.getReportURL(), notSecure, 'error');
  }

  reportError(name, opts = {}, parent = null, notSecure) {
    return this.report(new notError(name, opts, parent), notSecure);
  }

  isLineParasite(line) {
    return PARASITES.some(str => line.includes(str));
  }

  trunkStack(stack) {
    let lines = stack.split("\n");

    while (lines.length && this.isLineParasite(lines[0])) {
      lines.shift();
    }

    return lines;
  }

  __stackFirstLineParser(line) {
    let result;
    let parser = FILE_LINE_PARSERS.find(itm => {
      return result = itm.test(line);
    });

    if (parser) {
      return parser.parse(result);
    }

    return false;
  }

  __stackFirstLineSearcher(stack) {
    for (let i = 0; stack.length > i; i++) {
      let line = stack[i];

      if (!line) {
        continue;
      }

      let res = this.__stackFirstLineParser(line);

      if (res) {
        return res;
      } else {
        continue;
      }
    }

    return false;
  }

  parseStack(rawStack) {
    try {
      let stack = this.trunkStack(rawStack);

      let res = this.__stackFirstLineSearcher(stack);

      if (!res) {
        return {
          stack
        };
      }

      let fileinfo = this.__stackFirstLineSearcher(stack);

      if (!fileinfo) {
        return {
          stack
        };
      }

      return {
        stack,
        ...fileinfo
      };
    } catch (e) {
      LOG.error(e);
      return false;
    }
  }

  extractDataFromError(err, local) {
    let res = err.getDetails();

    if (res.stack) {
      let stackInfo = this.parseStack(res.stack);

      if (stackInfo && stackInfo.stack) {
        if (local) {
          res.stack = stackInfo.stack.join("\n");
          STACK_PROPS.forEach(j => {
            if (stackInfo[j]) {
              res[j] = stackInfo[j];
            }
          });
        } else {
          STACK_PROPS.forEach(j => {
            if (!res[j]) {
              res[j] = stackInfo[j];
            }
          });
        }
      }
    }

    return res;
  }

  async packError(error, local = false) {
    let result = {};
    result.details = this.extractDataFromError(error, local);
    await this.tryToGetSourceBlock(result);
    result.options = error.options;
    result.env = error.env;
    result.origin = this.origin ? this.origin : {};
    return result;
  }

  async tryToGetSourceBlock(result) {
    if (result.details.fileName && !isNaN(result.details.lineNumber)) {
      try {
        let text = await this.loadSources(result.details.fileName);

        if (text) {
          let lines = this.extractLinesFromFile(text, parseInt(result.details.lineNumber));
          result.lines = lines;
        }
      } catch (e) {
        return false;
      }
    }
  }

  extractLinesFromFile(text, targetLine) {
    let lines = text.split("\n");
    targetLine = parseInt(targetLine) - 1;
    let fromLine = targetLine - LINES_TO_CAPTURE;
    let toLine = targetLine + LINES_TO_CAPTURE;

    if (fromLine < 0) {
      fromLine = 0;
    }

    if (toLine > lines.length - 1) {
      toLine = lines.length - 1;
    }

    let result = [];

    for (let t = fromLine; t < toLine; t++) {
      result.push({
        l: t + 1,
        txt: lines[t],
        color: {
          danger: targetLine === t
        }
      });
    }

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
    if (typeof this.url !== 'undefined') {
      return this.url;
    } else if (window.NOT_NODE_ERROR_URL_BROWSER && window.NOT_NODE_ERROR_URL_BROWSER.length > 0) {
      return window.NOT_NODE_ERROR_URL_BROWSER;
    } else if (NOT_NODE_ERROR_URL_BROWSER.length > 0) {
      return NOT_NODE_ERROR_URL_BROWSER;
    } else {
      return '/api/error';
    }
  }

  getReportKey() {
    if (typeof this.key !== 'undefined') {
      return this.key;
    } else if (window.NOT_NODE_ERROR_KEY && window.NOT_NODE_ERROR_KEY.length > 0) {
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

  async loadSources(filePath) {
    let res = await fetch(filePath);

    if (parseInt(res.status) === 200) {
      return await res.text();
    } else {
      return false;
    }
  }

  registerError(ev) {
    if (this.registerAll) {
      this.report(ev.error);
    }
  }

}

module.exports = notErrorReporter;
