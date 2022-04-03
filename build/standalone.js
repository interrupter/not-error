var notErrorStandalone = (function () {
  'use strict';

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

  /**
  *	Template of error.js
  *	For building for specific environment.
  *	Node.js or Browser
  *	@param {string}	env	node|browser in wich env it will be running
  *	@param {string}	url	URL of report collector
  *	@param {string}	key	key to indetificate reporter
  **/
  var NOT_NODE_ERROR_URL_NODE_DEFAULT = 'https://appmon.ru/api/key/collect';
  var NOT_NODE_ERROR_URL_BROWSER = 'https://appmon.ru/api/key/collect';
  /**
  * Error reporting with features, saving browser info, uri and so on.
  * @module not-error/error
  */

  var notErrorStandalone = /*#__PURE__*/function (_Error) {
    _inherits(notErrorStandalone, _Error);

    var _super = _createSuper(notErrorStandalone);

    function notErrorStandalone(message) {
      var _this;

      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, notErrorStandalone);

      _this = _super.call(this, message);
      _this.options = options;

      _this.fill();

      _this.getTime();

      return _possibleConstructorReturn(_this, _assertThisInitialized(_this));
    }
    /**
    *	Adopting native error object
    *	@param {Error}	error 	Error object
    *	@return {notError}		chainable
    */


    _createClass(notErrorStandalone, [{
      key: "adopt",
      value: function adopt(error) {
        this.parent = error;
        return this;
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
    }, {
      key: "report",
      value: function report() {
        //pack error
        var data = this.packError(); //send report to collector

        return this._report(data, this.getReportURL());
      }
    }, {
      key: "packError",
      value: function packError() {
        var result = {};

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

    }, {
      key: "fill",
      value: function fill() {
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
          }
        };
        return this;
      }
    }, {
      key: "getReportURL",
      value: function getReportURL() {
        if (window.NOT_NODE_ERROR_URL_BROWSER && window.NOT_NODE_ERROR_URL_BROWSER.length > 0) {
          return window.NOT_NODE_ERROR_URL_BROWSER;
        } else if (NOT_NODE_ERROR_URL_BROWSER.length > 0) {
          return NOT_NODE_ERROR_URL_BROWSER;
        } else {
          return NOT_NODE_ERROR_URL_NODE_DEFAULT;
        }
      }
    }, {
      key: "getReportKey",
      value: function getReportKey() {
        if (window.NOT_NODE_ERROR_KEY && window.NOT_NODE_ERROR_KEY.length > 0) {
          return window.NOT_NODE_ERROR_KEY;
        } else {
          return '';
        }
      }
    }, {
      key: "_report",
      value: function _report(data, url) {
        var report = {
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
    }]);

    return notErrorStandalone;
  }( /*#__PURE__*/_wrapNativeSuper(Error));

  var service = new notErrorStandalone();

  return service;

})();
