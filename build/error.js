var notError = (function () {
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
        if (error instanceof Error) {
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

  return notError;

}());
