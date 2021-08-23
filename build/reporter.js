var notErrorReporter = (function () {
  'use strict';

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);

      if (enumerableOnly) {
        symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
      }

      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
      var info = gen[key](arg);
      var value = info.value;
    } catch (error) {
      reject(error);
      return;
    }

    if (info.done) {
      resolve(value);
    } else {
      Promise.resolve(value).then(_next, _throw);
    }
  }

  function _asyncToGenerator(fn) {
    return function () {
      var self = this,
          args = arguments;
      return new Promise(function (resolve, reject) {
        var gen = fn.apply(self, args);

        function _next(value) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
        }

        function _throw(err) {
          asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
        }

        _next(undefined);
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (_isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

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
  var notError = /*#__PURE__*/function (_Error) {
    _inherits(notError, _Error);

    var _super = _createSuper(notError);

    function notError(message) {
      var _this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var error = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      _classCallCheck(this, notError);

      _this = _super.call(this, message);
      _this.options = options;

      _this.adopt(error);

      _this.fill();

      _this.getTime();

      return _possibleConstructorReturn(_this, _assertThisInitialized(_this));
    }
    /**
    *	Adopting native error object
    *	@param {Error}	error 	Error object
    *	@return {notError}		chainable
    */


    _createClass(notError, [{
      key: "adopt",
      value: function adopt(error) {
        if (error) {
          this.parent = error;
        }

        return this;
      }
    }, {
      key: "getStack",
      value: function getStack() {
        if (this.parent) {
          return this.parent.stack;
        } else {
          return this.stack;
        }
      }
    }, {
      key: "getDetails",
      value: function getDetails() {
        var src = this;

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

    }, {
      key: "getTime",
      value: function getTime() {
        var date = new Date();
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

    }, {
      key: "fill",
      value: function fill() {
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
    }]);

    return notError;
  }( /*#__PURE__*/_wrapNativeSuper(Error));

  /**
  *  Template of reporter.js
  *  For building for specific environment.
  *  Node.js or Browser
  *  @param {string}  env  node|browser in wich env it will be running
  *  @param {string}  url  URL of report collector
  *  @param {string}  key  key to indetificate reporter
  */
  var PARASITES = ['report@', 'notError@'];
  var LINES_TO_CAPTURE = 6;
  var STACK_PROPS = ['file', 'path', 'type', 'line', 'column', 'function'];
  var FILE_LINE_PARSERS = [{
    test: function test(line) {
      var tester = /(.*)@(.+):(\d+):(\d+)/gi;

      var matches = _toConsumableArray(line.matchAll(tester));

      if (matches.length) {
        var res = matches[0];

        if (res && res.length > 2) {
          return res;
        }
      }

      return false;
    },
    parse: function parse(res) {
      if (res) {
        //separation of different types of data
        var functionFullPath = res[1].split('.');
        var file = res[2]; //extraction of exact values

        var pathParts = file.split('/');
        var fileName = pathParts[pathParts.length - 1];
        pathParts.pop();
        var filePath = pathParts.join('/');
        var lineNumber = parseInt(res[3]);
        var columnNumber = parseInt(res[4]);
        var functionName = functionFullPath[functionFullPath.length - 1];

        if (functionName.replaceAll) {
          functionName = functionName.replaceAll('/', '').replaceAll('\\', '').replaceAll('>', '').replaceAll('<', '');
        }

        var fileDir;

        if (pathParts && pathParts.length) {
          fileDir = pathParts.pop();
        }

        return {
          file: fileName,
          path: filePath,
          line: lineNumber,
          column: columnNumber,
          "function": functionName,
          type: fileDir
        };
      } else {
        return false;
      }
    }
  }, {
    test: function test(line) {
      var tester = /\sat\s(.+)\s\((.+)\)/gi;

      var matches = _toConsumableArray(line.matchAll(tester));

      if (matches.length) {
        var res = matches[0];

        if (res && res.length > 2) {
          return res;
        }
      }

      return false;
    },
    parse: function parse(res) {
      if (res) {
        //separation of different types of data
        var functionFullPath = res[1].split('.');
        var file = res[2].split(':'); //extraction of exact values

        var pathParts = file[0].split('/');
        var fileName = pathParts[pathParts.length - 1];
        pathParts.pop();
        var filePath = pathParts.join('/');
        var lineNumber = parseInt(file[1]);
        var columnNumber = parseInt(file[2]);
        var functionName = functionFullPath[functionFullPath.length - 1];

        if (functionName.replaceAll) {
          functionName = functionName.replaceAll('/', '').replaceAll('\\', '').replaceAll('>', '').replaceAll('<', '');
        }

        var fileDir;

        if (pathParts && pathParts.length) {
          fileDir = pathParts.pop();
        }

        return {
          file: fileName,
          path: filePath,
          line: lineNumber,
          column: columnNumber,
          "function": functionName,
          type: fileDir
        };
      } else {
        return false;
      }
    }
  }];
  var LOG = window.console;
  var NOT_NODE_ERROR_URL_BROWSER = 'https://appmon.ru/api/key/collect';
  var DEFAULT_OPTIONS = {
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

  var notErrorReporter = /*#__PURE__*/function () {
    function notErrorReporter() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_OPTIONS;

      _classCallCheck(this, notErrorReporter);

      var envFirst = opts.envFirst,
          origin = opts.origin,
          url = opts.url,
          key = opts.key,
          registerAll = opts.registerAll;
      this.envFirst = envFirst;
      this.processWatching = false;
      this.setOrigin(origin);
      this.setKey(key);
      this.setURL(url);
      this.setRegisterAll(registerAll);
      window.addEventListener('error', this.registerError.bind(this));
      return this;
    }

    _createClass(notErrorReporter, [{
      key: "setOrigin",
      value: function setOrigin(origin) {
        this.origin = origin;
        return this;
      }
    }, {
      key: "setKey",
      value: function setKey(key) {
        this.key = key;
        return this;
      }
    }, {
      key: "setURL",
      value: function setURL(url) {
        this.url = url;
        return this;
      }
    }, {
      key: "setRegisterAll",
      value: function setRegisterAll() {
        var registerAll = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        this.registerAll = registerAll;
        return this;
      }
    }, {
      key: "report",
      value: function () {
        var _report2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(error, notSecure) {
          var local, data;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  local = false;

                  if (error.constructor.name !== 'notError') {
                    error = new notError(error.message, {}, error);
                    local = true;
                  }

                  _context.next = 4;
                  return this.packError(error, local);

                case 4:
                  data = _context.sent;
                  _context.next = 7;
                  return this._report(data, this.getReportURL(), notSecure, 'error');

                case 7:
                  return _context.abrupt("return", _context.sent);

                case 8:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function report(_x, _x2) {
          return _report2.apply(this, arguments);
        }

        return report;
      }()
    }, {
      key: "reportError",
      value: function reportError(name) {
        var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var notSecure = arguments.length > 3 ? arguments[3] : undefined;
        return this.report(new notError(name, opts, parent), notSecure);
      }
    }, {
      key: "isLineParasite",
      value: function isLineParasite(line) {
        return PARASITES.some(function (str) {
          return line.includes(str);
        });
      }
    }, {
      key: "trunkStack",
      value: function trunkStack(stack) {
        var lines = stack.split("\n");

        while (lines.length && this.isLineParasite(lines[0])) {
          lines.shift();
        }

        return lines;
      }
    }, {
      key: "__stackFirstLineParser",
      value: function __stackFirstLineParser(line) {
        var result;
        var parser = FILE_LINE_PARSERS.find(function (itm) {
          return result = itm.test(line);
        });

        if (parser) {
          return parser.parse(result);
        }

        return false;
      }
    }, {
      key: "__stackFirstLineSearcher",
      value: function __stackFirstLineSearcher(stack) {
        for (var i = 0; stack.length > i; i++) {
          var line = stack[i];

          if (!line) {
            continue;
          }

          var res = this.__stackFirstLineParser(line);

          if (res) {
            return res;
          } else {
            continue;
          }
        }

        return false;
      }
    }, {
      key: "parseStack",
      value: function parseStack(rawStack) {
        try {
          var stack = this.trunkStack(rawStack);

          var res = this.__stackFirstLineSearcher(stack);

          if (!res) {
            return {
              stack: stack
            };
          }

          var fileinfo = this.__stackFirstLineSearcher(stack);

          if (!fileinfo) {
            return {
              stack: stack
            };
          }

          return _objectSpread2({
            stack: stack
          }, fileinfo);
        } catch (e) {
          LOG.error(e);
          return false;
        }
      }
    }, {
      key: "extractDataFromError",
      value: function extractDataFromError(err, local) {
        var res = err.getDetails();

        if (res.stack) {
          var stackInfo = this.parseStack(res.stack);

          if (stackInfo && stackInfo.stack) {
            if (local) {
              res.stack = stackInfo.stack.join("\n");
              STACK_PROPS.forEach(function (j) {
                if (stackInfo[j]) {
                  res[j] = stackInfo[j];
                }
              });
            } else {
              STACK_PROPS.forEach(function (j) {
                if (!res[j]) {
                  res[j] = stackInfo[j];
                }
              });
            }
          }
        }

        return res;
      }
    }, {
      key: "packError",
      value: function () {
        var _packError = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(error) {
          var local,
              result,
              _args2 = arguments;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  local = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : false;
                  result = {};
                  result.details = this.extractDataFromError(error, local);
                  _context2.next = 5;
                  return this.tryToGetSourceBlock(result);

                case 5:
                  result.options = error.options;
                  result.env = error.env;
                  result.origin = this.origin ? this.origin : {};
                  return _context2.abrupt("return", result);

                case 9:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        function packError(_x3) {
          return _packError.apply(this, arguments);
        }

        return packError;
      }()
    }, {
      key: "tryToGetSourceBlock",
      value: function () {
        var _tryToGetSourceBlock = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(result) {
          var text, lines;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  if (!(result.details.filePath && !isNaN(result.details.lineNumber))) {
                    _context3.next = 11;
                    break;
                  }

                  _context3.prev = 1;
                  _context3.next = 4;
                  return this.loadSources(result.details.filePath);

                case 4:
                  text = _context3.sent;

                  if (text) {
                    lines = this.extractLinesFromFile(text, parseInt(result.details.lineNumber));
                    result.lines = lines;
                  }

                  _context3.next = 11;
                  break;

                case 8:
                  _context3.prev = 8;
                  _context3.t0 = _context3["catch"](1);
                  return _context3.abrupt("return", false);

                case 11:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, this, [[1, 8]]);
        }));

        function tryToGetSourceBlock(_x4) {
          return _tryToGetSourceBlock.apply(this, arguments);
        }

        return tryToGetSourceBlock;
      }()
    }, {
      key: "extractLinesFromFile",
      value: function extractLinesFromFile(text, targetLine) {
        var lines = text.split("\n");
        targetLine = parseInt(targetLine) - 1;
        var fromLine = targetLine - LINES_TO_CAPTURE;
        var toLine = targetLine + LINES_TO_CAPTURE;

        if (fromLine < 0) {
          fromLine = 0;
        }

        if (toLine > lines.length - 1) {
          toLine = lines.length - 1;
        }

        var result = [];

        for (var t = fromLine; t < toLine; t++) {
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

    }, {
      key: "getReportURL",
      value: function getReportURL() {
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
    }, {
      key: "getReportKey",
      value: function getReportKey() {
        if (typeof this.key !== 'undefined') {
          return this.key;
        } else if (window.NOT_NODE_ERROR_KEY && window.NOT_NODE_ERROR_KEY.length > 0) {
          return window.NOT_NODE_ERROR_KEY;
        } else {
          return '';
        }
      }
    }, {
      key: "_report",
      value: function _report(data, url) {
        var report = {
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
    }, {
      key: "loadSources",
      value: function () {
        var _loadSources = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(filePath) {
          var res;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return fetch(filePath);

                case 2:
                  res = _context4.sent;

                  if (!(parseInt(res.status) === 200)) {
                    _context4.next = 9;
                    break;
                  }

                  _context4.next = 6;
                  return res.text();

                case 6:
                  return _context4.abrupt("return", _context4.sent);

                case 9:
                  return _context4.abrupt("return", false);

                case 10:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4);
        }));

        function loadSources(_x5) {
          return _loadSources.apply(this, arguments);
        }

        return loadSources;
      }()
    }, {
      key: "registerError",
      value: function registerError(ev) {
        if (this.registerAll) {
          this.report(ev.error);
        }
      }
    }]);

    return notErrorReporter;
  }();

  _defineProperty(notErrorReporter, "notError", notError);

  return notErrorReporter;

}());
