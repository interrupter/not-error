var notError = (function (exports) {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _typeof$1(obj) {
    "@babel/helpers - typeof";

    return _typeof$1 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof$1(obj);
  }

  function _toPrimitive(input, hint) {
    if (_typeof$1(input) !== "object" || input === null) return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== undefined) {
      var res = prim.call(input, hint || "default");
      if (_typeof$1(res) !== "object") return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }

  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return _typeof$1(key) === "symbol" ? key : String(key);
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
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
    Object.defineProperty(subClass, "prototype", {
      writable: false
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof$1(call) === "object" || typeof call === "function")) {
      return call;
    } else if (call !== void 0) {
      throw new TypeError("Derived constructors may only return object or undefined");
    }
    return _assertThisInitialized(self);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function _isNativeReflectConstruct$4() {
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
    if (_isNativeReflectConstruct$4()) {
      _construct = Reflect.construct.bind();
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

  function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
  function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
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
    var _super = _createSuper$3(notError);
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

  function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
  function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  //reportable
  var notValidationError = /*#__PURE__*/function (_notError) {
    _inherits(notValidationError, _notError);
    var _super = _createSuper$2(notValidationError);
    function notValidationError(message) {
      var _this;
      var fields = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var err = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var params = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      _classCallCheck(this, notValidationError);
      _this = _super.call(this, message, {
        fields: fields,
        params: params
      }, err);
      return _possibleConstructorReturn(_this, _assertThisInitialized(_this));
    }

    /**
    * Sets hash of fields errors messages for usage in forms
    *	@return {Object}	hash of field->errors [key:string]: Array<string>
    **/
    _createClass(notValidationError, [{
      key: "setFieldsErrors",
      value: function setFieldsErrors(messages) {
        this.options.fields = messages;
      }

      /**
      * Returns hash of errors
      *	@return {Object}	hash of field->errors [key:string]: Array<string>
      **/
    }, {
      key: "getFieldsErrors",
      value: function getFieldsErrors() {
        return this.options.fields;
      }
    }]);
    return notValidationError;
  }(notError);

  function _createSuper$1(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$1(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
  function _isNativeReflectConstruct$1() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

  //reportable
  var notRequestError = /*#__PURE__*/function (_notError) {
    _inherits(notRequestError, _notError);
    var _super = _createSuper$1(notRequestError);
    function notRequestError(message) {
      var _this;
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
          code: 500,
          errors: {},
          redirect: false,
          params: {}
        },
        code = _ref.code,
        errors = _ref.errors,
        redirect = _ref.redirect,
        params = _ref.params;
      var error = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      _classCallCheck(this, notRequestError);
      _this = _super.call(this, message, {
        code: code,
        errors: errors,
        redirect: redirect,
        params: params
      }, error);
      return _possibleConstructorReturn(_this, _assertThisInitialized(_this));
    }
    _createClass(notRequestError, [{
      key: "setRedirect",
      value: function setRedirect(url) {
        this.options.redirect = url;
      }
    }, {
      key: "getRedirect",
      value: function getRedirect() {
        return this.options.redirect;
      }
    }, {
      key: "setCode",
      value: function setCode(code) {
        this.options.code = code;
      }
    }, {
      key: "getCode",
      value: function getCode() {
        return this.options.code;
      }
    }, {
      key: "setErrors",
      value: function setErrors(list) {
        this.options.errors = list;
      }
    }, {
      key: "getErrors",
      value: function getErrors() {
        return this.options.errors;
      }
    }, {
      key: "getResult",
      value: function getResult() {
        return {
          message: this.message,
          code: this.getCode(),
          errors: this.getErrors(),
          redirect: this.getRedirect()
        };
      }
    }]);
    return notRequestError;
  }(notError);

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

  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
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

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
    return arr2;
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

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  var regeneratorRuntimeExports = {};
  var regeneratorRuntime$1 = {
    get exports(){ return regeneratorRuntimeExports; },
    set exports(v){ regeneratorRuntimeExports = v; },
  };

  var _typeofExports = {};
  var _typeof = {
    get exports(){ return _typeofExports; },
    set exports(v){ _typeofExports = v; },
  };

  (function (module) {
  	function _typeof(obj) {
  	  "@babel/helpers - typeof";

  	  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
  	    return typeof obj;
  	  } : function (obj) {
  	    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  	  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(obj);
  	}
  	module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;
  } (_typeof));

  (function (module) {
  	var _typeof = _typeofExports["default"];
  	function _regeneratorRuntime() {
  	  module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
  	    return exports;
  	  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  	  var exports = {},
  	    Op = Object.prototype,
  	    hasOwn = Op.hasOwnProperty,
  	    defineProperty = Object.defineProperty || function (obj, key, desc) {
  	      obj[key] = desc.value;
  	    },
  	    $Symbol = "function" == typeof Symbol ? Symbol : {},
  	    iteratorSymbol = $Symbol.iterator || "@@iterator",
  	    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
  	    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  	  function define(obj, key, value) {
  	    return Object.defineProperty(obj, key, {
  	      value: value,
  	      enumerable: !0,
  	      configurable: !0,
  	      writable: !0
  	    }), obj[key];
  	  }
  	  try {
  	    define({}, "");
  	  } catch (err) {
  	    define = function define(obj, key, value) {
  	      return obj[key] = value;
  	    };
  	  }
  	  function wrap(innerFn, outerFn, self, tryLocsList) {
  	    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
  	      generator = Object.create(protoGenerator.prototype),
  	      context = new Context(tryLocsList || []);
  	    return defineProperty(generator, "_invoke", {
  	      value: makeInvokeMethod(innerFn, self, context)
  	    }), generator;
  	  }
  	  function tryCatch(fn, obj, arg) {
  	    try {
  	      return {
  	        type: "normal",
  	        arg: fn.call(obj, arg)
  	      };
  	    } catch (err) {
  	      return {
  	        type: "throw",
  	        arg: err
  	      };
  	    }
  	  }
  	  exports.wrap = wrap;
  	  var ContinueSentinel = {};
  	  function Generator() {}
  	  function GeneratorFunction() {}
  	  function GeneratorFunctionPrototype() {}
  	  var IteratorPrototype = {};
  	  define(IteratorPrototype, iteratorSymbol, function () {
  	    return this;
  	  });
  	  var getProto = Object.getPrototypeOf,
  	    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  	  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  	  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  	  function defineIteratorMethods(prototype) {
  	    ["next", "throw", "return"].forEach(function (method) {
  	      define(prototype, method, function (arg) {
  	        return this._invoke(method, arg);
  	      });
  	    });
  	  }
  	  function AsyncIterator(generator, PromiseImpl) {
  	    function invoke(method, arg, resolve, reject) {
  	      var record = tryCatch(generator[method], generator, arg);
  	      if ("throw" !== record.type) {
  	        var result = record.arg,
  	          value = result.value;
  	        return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
  	          invoke("next", value, resolve, reject);
  	        }, function (err) {
  	          invoke("throw", err, resolve, reject);
  	        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
  	          result.value = unwrapped, resolve(result);
  	        }, function (error) {
  	          return invoke("throw", error, resolve, reject);
  	        });
  	      }
  	      reject(record.arg);
  	    }
  	    var previousPromise;
  	    defineProperty(this, "_invoke", {
  	      value: function value(method, arg) {
  	        function callInvokeWithMethodAndArg() {
  	          return new PromiseImpl(function (resolve, reject) {
  	            invoke(method, arg, resolve, reject);
  	          });
  	        }
  	        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
  	      }
  	    });
  	  }
  	  function makeInvokeMethod(innerFn, self, context) {
  	    var state = "suspendedStart";
  	    return function (method, arg) {
  	      if ("executing" === state) throw new Error("Generator is already running");
  	      if ("completed" === state) {
  	        if ("throw" === method) throw arg;
  	        return doneResult();
  	      }
  	      for (context.method = method, context.arg = arg;;) {
  	        var delegate = context.delegate;
  	        if (delegate) {
  	          var delegateResult = maybeInvokeDelegate(delegate, context);
  	          if (delegateResult) {
  	            if (delegateResult === ContinueSentinel) continue;
  	            return delegateResult;
  	          }
  	        }
  	        if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
  	          if ("suspendedStart" === state) throw state = "completed", context.arg;
  	          context.dispatchException(context.arg);
  	        } else "return" === context.method && context.abrupt("return", context.arg);
  	        state = "executing";
  	        var record = tryCatch(innerFn, self, context);
  	        if ("normal" === record.type) {
  	          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
  	          return {
  	            value: record.arg,
  	            done: context.done
  	          };
  	        }
  	        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
  	      }
  	    };
  	  }
  	  function maybeInvokeDelegate(delegate, context) {
  	    var methodName = context.method,
  	      method = delegate.iterator[methodName];
  	    if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
  	    var record = tryCatch(method, delegate.iterator, context.arg);
  	    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
  	    var info = record.arg;
  	    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  	  }
  	  function pushTryEntry(locs) {
  	    var entry = {
  	      tryLoc: locs[0]
  	    };
  	    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  	  }
  	  function resetTryEntry(entry) {
  	    var record = entry.completion || {};
  	    record.type = "normal", delete record.arg, entry.completion = record;
  	  }
  	  function Context(tryLocsList) {
  	    this.tryEntries = [{
  	      tryLoc: "root"
  	    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  	  }
  	  function values(iterable) {
  	    if (iterable) {
  	      var iteratorMethod = iterable[iteratorSymbol];
  	      if (iteratorMethod) return iteratorMethod.call(iterable);
  	      if ("function" == typeof iterable.next) return iterable;
  	      if (!isNaN(iterable.length)) {
  	        var i = -1,
  	          next = function next() {
  	            for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
  	            return next.value = undefined, next.done = !0, next;
  	          };
  	        return next.next = next;
  	      }
  	    }
  	    return {
  	      next: doneResult
  	    };
  	  }
  	  function doneResult() {
  	    return {
  	      value: undefined,
  	      done: !0
  	    };
  	  }
  	  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
  	    value: GeneratorFunctionPrototype,
  	    configurable: !0
  	  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
  	    value: GeneratorFunction,
  	    configurable: !0
  	  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
  	    var ctor = "function" == typeof genFun && genFun.constructor;
  	    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  	  }, exports.mark = function (genFun) {
  	    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  	  }, exports.awrap = function (arg) {
  	    return {
  	      __await: arg
  	    };
  	  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
  	    return this;
  	  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
  	    void 0 === PromiseImpl && (PromiseImpl = Promise);
  	    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
  	    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
  	      return result.done ? result.value : iter.next();
  	    });
  	  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
  	    return this;
  	  }), define(Gp, "toString", function () {
  	    return "[object Generator]";
  	  }), exports.keys = function (val) {
  	    var object = Object(val),
  	      keys = [];
  	    for (var key in object) keys.push(key);
  	    return keys.reverse(), function next() {
  	      for (; keys.length;) {
  	        var key = keys.pop();
  	        if (key in object) return next.value = key, next.done = !1, next;
  	      }
  	      return next.done = !0, next;
  	    };
  	  }, exports.values = values, Context.prototype = {
  	    constructor: Context,
  	    reset: function reset(skipTempReset) {
  	      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
  	    },
  	    stop: function stop() {
  	      this.done = !0;
  	      var rootRecord = this.tryEntries[0].completion;
  	      if ("throw" === rootRecord.type) throw rootRecord.arg;
  	      return this.rval;
  	    },
  	    dispatchException: function dispatchException(exception) {
  	      if (this.done) throw exception;
  	      var context = this;
  	      function handle(loc, caught) {
  	        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
  	      }
  	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
  	        var entry = this.tryEntries[i],
  	          record = entry.completion;
  	        if ("root" === entry.tryLoc) return handle("end");
  	        if (entry.tryLoc <= this.prev) {
  	          var hasCatch = hasOwn.call(entry, "catchLoc"),
  	            hasFinally = hasOwn.call(entry, "finallyLoc");
  	          if (hasCatch && hasFinally) {
  	            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
  	            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
  	          } else if (hasCatch) {
  	            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
  	          } else {
  	            if (!hasFinally) throw new Error("try statement without catch or finally");
  	            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
  	          }
  	        }
  	      }
  	    },
  	    abrupt: function abrupt(type, arg) {
  	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
  	        var entry = this.tryEntries[i];
  	        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
  	          var finallyEntry = entry;
  	          break;
  	        }
  	      }
  	      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
  	      var record = finallyEntry ? finallyEntry.completion : {};
  	      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
  	    },
  	    complete: function complete(record, afterLoc) {
  	      if ("throw" === record.type) throw record.arg;
  	      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
  	    },
  	    finish: function finish(finallyLoc) {
  	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
  	        var entry = this.tryEntries[i];
  	        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
  	      }
  	    },
  	    "catch": function _catch(tryLoc) {
  	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
  	        var entry = this.tryEntries[i];
  	        if (entry.tryLoc === tryLoc) {
  	          var record = entry.completion;
  	          if ("throw" === record.type) {
  	            var thrown = record.arg;
  	            resetTryEntry(entry);
  	          }
  	          return thrown;
  	        }
  	      }
  	      throw new Error("illegal catch attempt");
  	    },
  	    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
  	      return this.delegate = {
  	        iterator: values(iterable),
  	        resultName: resultName,
  	        nextLoc: nextLoc
  	      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
  	    }
  	  }, exports;
  	}
  	module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports;
  } (regeneratorRuntime$1));

  // TODO(Babel 8): Remove this file.

  var runtime = regeneratorRuntimeExports();
  var regenerator = runtime;

  // Copied from https://github.com/facebook/regenerator/blob/main/packages/runtime/runtime.js#L736=
  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    if (typeof globalThis === "object") {
      globalThis.regeneratorRuntime = runtime;
    } else {
      Function("r", "regeneratorRuntime = r")(runtime);
    }
  }

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }
  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
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
        var file = res[2];
        //extraction of exact values
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
        var file = res[2].split(':');
        //extraction of exact values
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
  var NOT_NODE_ERROR_URL_BROWSER$1 = 'https://appmon.ru/api/key/collect';
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
      key: "errorIsReportable",
      value: function errorIsReportable(error) {
        return error instanceof notError;
      }
    }, {
      key: "report",
      value: function () {
        var _report2 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(error, notSecure) {
          var local, data;
          return regenerator.wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                local = false;
                if (!this.errorIsReportable(error)) {
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
          return _objectSpread({
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
        var _packError = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(error) {
          var local,
            result,
            _args2 = arguments;
          return regenerator.wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
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
        var _tryToGetSourceBlock = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3(result) {
          var text, lines;
          return regenerator.wrap(function _callee3$(_context3) {
            while (1) switch (_context3.prev = _context3.next) {
              case 0:
                if (!(result.details.fileName && !isNaN(result.details.lineNumber))) {
                  _context3.next = 11;
                  break;
                }
                _context3.prev = 1;
                _context3.next = 4;
                return this.loadSources(result.details.fileName);
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
        } else if (NOT_NODE_ERROR_URL_BROWSER$1.length > 0) {
          return NOT_NODE_ERROR_URL_BROWSER$1;
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
        var _loadSources = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee4(filePath) {
          var res;
          return regenerator.wrap(function _callee4$(_context4) {
            while (1) switch (_context4.prev = _context4.next) {
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
  _defineProperty(notErrorReporter, "notValidationError", notValidationError);
  _defineProperty(notErrorReporter, "notRequestError", notRequestError);

  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
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
        var data = this.packError();
        //send report to collector
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

  exports.notError = notError;
  exports.notErrorStandalone = service;
  exports.notReporter = notErrorReporter;
  exports.notRequestError = notRequestError;
  exports.notValidationError = notValidationError;

  return exports;

})({});
