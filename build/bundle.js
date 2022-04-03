var notError = (function (exports) {
	'use strict';

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var classCallCheck = {exports: {}};

	(function (module) {
	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;
	}(classCallCheck));

	var _classCallCheck = /*@__PURE__*/getDefaultExportFromCjs(classCallCheck.exports);

	var createClass = {exports: {}};

	(function (module) {
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
	  Object.defineProperty(Constructor, "prototype", {
	    writable: false
	  });
	  return Constructor;
	}

	module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;
	}(createClass));

	var _createClass = /*@__PURE__*/getDefaultExportFromCjs(createClass.exports);

	var assertThisInitialized = {exports: {}};

	(function (module) {
	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
	}

	module.exports = _assertThisInitialized, module.exports.__esModule = true, module.exports["default"] = module.exports;
	}(assertThisInitialized));

	var _assertThisInitialized = /*@__PURE__*/getDefaultExportFromCjs(assertThisInitialized.exports);

	var inherits = {exports: {}};

	var setPrototypeOf = {exports: {}};

	(function (module) {
	function _setPrototypeOf(o, p) {
	  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
	  return _setPrototypeOf(o, p);
	}

	module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;
	}(setPrototypeOf));

	(function (module) {
	var setPrototypeOf$1 = setPrototypeOf.exports;

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
	  if (superClass) setPrototypeOf$1(subClass, superClass);
	}

	module.exports = _inherits, module.exports.__esModule = true, module.exports["default"] = module.exports;
	}(inherits));

	var _inherits = /*@__PURE__*/getDefaultExportFromCjs(inherits.exports);

	var possibleConstructorReturn = {exports: {}};

	var _typeof = {exports: {}};

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
	}(_typeof));

	(function (module) {
	var _typeof$1 = _typeof.exports["default"];

	var assertThisInitialized$1 = assertThisInitialized.exports;

	function _possibleConstructorReturn(self, call) {
	  if (call && (_typeof$1(call) === "object" || typeof call === "function")) {
	    return call;
	  } else if (call !== void 0) {
	    throw new TypeError("Derived constructors may only return object or undefined");
	  }

	  return assertThisInitialized$1(self);
	}

	module.exports = _possibleConstructorReturn, module.exports.__esModule = true, module.exports["default"] = module.exports;
	}(possibleConstructorReturn));

	var _possibleConstructorReturn = /*@__PURE__*/getDefaultExportFromCjs(possibleConstructorReturn.exports);

	var getPrototypeOf = {exports: {}};

	(function (module) {
	function _getPrototypeOf(o) {
	  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
	    return o.__proto__ || Object.getPrototypeOf(o);
	  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
	  return _getPrototypeOf(o);
	}

	module.exports = _getPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;
	}(getPrototypeOf));

	var _getPrototypeOf = /*@__PURE__*/getDefaultExportFromCjs(getPrototypeOf.exports);

	var wrapNativeSuper = {exports: {}};

	var isNativeFunction = {exports: {}};

	(function (module) {
	function _isNativeFunction(fn) {
	  return Function.toString.call(fn).indexOf("[native code]") !== -1;
	}

	module.exports = _isNativeFunction, module.exports.__esModule = true, module.exports["default"] = module.exports;
	}(isNativeFunction));

	var construct = {exports: {}};

	var isNativeReflectConstruct = {exports: {}};

	(function (module) {
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

	module.exports = _isNativeReflectConstruct, module.exports.__esModule = true, module.exports["default"] = module.exports;
	}(isNativeReflectConstruct));

	(function (module) {
	var setPrototypeOf$1 = setPrototypeOf.exports;

	var isNativeReflectConstruct$1 = isNativeReflectConstruct.exports;

	function _construct(Parent, args, Class) {
	  if (isNativeReflectConstruct$1()) {
	    module.exports = _construct = Reflect.construct, module.exports.__esModule = true, module.exports["default"] = module.exports;
	  } else {
	    module.exports = _construct = function _construct(Parent, args, Class) {
	      var a = [null];
	      a.push.apply(a, args);
	      var Constructor = Function.bind.apply(Parent, a);
	      var instance = new Constructor();
	      if (Class) setPrototypeOf$1(instance, Class.prototype);
	      return instance;
	    }, module.exports.__esModule = true, module.exports["default"] = module.exports;
	  }

	  return _construct.apply(null, arguments);
	}

	module.exports = _construct, module.exports.__esModule = true, module.exports["default"] = module.exports;
	}(construct));

	(function (module) {
	var getPrototypeOf$1 = getPrototypeOf.exports;

	var setPrototypeOf$1 = setPrototypeOf.exports;

	var isNativeFunction$1 = isNativeFunction.exports;

	var construct$1 = construct.exports;

	function _wrapNativeSuper(Class) {
	  var _cache = typeof Map === "function" ? new Map() : undefined;

	  module.exports = _wrapNativeSuper = function _wrapNativeSuper(Class) {
	    if (Class === null || !isNativeFunction$1(Class)) return Class;

	    if (typeof Class !== "function") {
	      throw new TypeError("Super expression must either be null or a function");
	    }

	    if (typeof _cache !== "undefined") {
	      if (_cache.has(Class)) return _cache.get(Class);

	      _cache.set(Class, Wrapper);
	    }

	    function Wrapper() {
	      return construct$1(Class, arguments, getPrototypeOf$1(this).constructor);
	    }

	    Wrapper.prototype = Object.create(Class.prototype, {
	      constructor: {
	        value: Wrapper,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	    return setPrototypeOf$1(Wrapper, Class);
	  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
	  return _wrapNativeSuper(Class);
	}

	module.exports = _wrapNativeSuper, module.exports.__esModule = true, module.exports["default"] = module.exports;
	}(wrapNativeSuper));

	var _wrapNativeSuper = /*@__PURE__*/getDefaultExportFromCjs(wrapNativeSuper.exports);

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

	var asyncToGenerator = {exports: {}};

	(function (module) {
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

	module.exports = _asyncToGenerator, module.exports.__esModule = true, module.exports["default"] = module.exports;
	}(asyncToGenerator));

	var _asyncToGenerator = /*@__PURE__*/getDefaultExportFromCjs(asyncToGenerator.exports);

	var defineProperty = {exports: {}};

	(function (module) {
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

	module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;
	}(defineProperty));

	var _defineProperty = /*@__PURE__*/getDefaultExportFromCjs(defineProperty.exports);

	var toConsumableArray = {exports: {}};

	var arrayWithoutHoles = {exports: {}};

	var arrayLikeToArray = {exports: {}};

	(function (module) {
	function _arrayLikeToArray(arr, len) {
	  if (len == null || len > arr.length) len = arr.length;

	  for (var i = 0, arr2 = new Array(len); i < len; i++) {
	    arr2[i] = arr[i];
	  }

	  return arr2;
	}

	module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
	}(arrayLikeToArray));

	(function (module) {
	var arrayLikeToArray$1 = arrayLikeToArray.exports;

	function _arrayWithoutHoles(arr) {
	  if (Array.isArray(arr)) return arrayLikeToArray$1(arr);
	}

	module.exports = _arrayWithoutHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;
	}(arrayWithoutHoles));

	var iterableToArray = {exports: {}};

	(function (module) {
	function _iterableToArray(iter) {
	  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
	}

	module.exports = _iterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
	}(iterableToArray));

	var unsupportedIterableToArray = {exports: {}};

	(function (module) {
	var arrayLikeToArray$1 = arrayLikeToArray.exports;

	function _unsupportedIterableToArray(o, minLen) {
	  if (!o) return;
	  if (typeof o === "string") return arrayLikeToArray$1(o, minLen);
	  var n = Object.prototype.toString.call(o).slice(8, -1);
	  if (n === "Object" && o.constructor) n = o.constructor.name;
	  if (n === "Map" || n === "Set") return Array.from(o);
	  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray$1(o, minLen);
	}

	module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
	}(unsupportedIterableToArray));

	var nonIterableSpread = {exports: {}};

	(function (module) {
	function _nonIterableSpread() {
	  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}

	module.exports = _nonIterableSpread, module.exports.__esModule = true, module.exports["default"] = module.exports;
	}(nonIterableSpread));

	(function (module) {
	var arrayWithoutHoles$1 = arrayWithoutHoles.exports;

	var iterableToArray$1 = iterableToArray.exports;

	var unsupportedIterableToArray$1 = unsupportedIterableToArray.exports;

	var nonIterableSpread$1 = nonIterableSpread.exports;

	function _toConsumableArray(arr) {
	  return arrayWithoutHoles$1(arr) || iterableToArray$1(arr) || unsupportedIterableToArray$1(arr) || nonIterableSpread$1();
	}

	module.exports = _toConsumableArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
	}(toConsumableArray));

	var _toConsumableArray = /*@__PURE__*/getDefaultExportFromCjs(toConsumableArray.exports);

	var runtime = {exports: {}};

	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	(function (module) {
	var runtime = (function (exports) {

	  var Op = Object.prototype;
	  var hasOwn = Op.hasOwnProperty;
	  var undefined$1; // More compressible than void 0.
	  var $Symbol = typeof Symbol === "function" ? Symbol : {};
	  var iteratorSymbol = $Symbol.iterator || "@@iterator";
	  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
	  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

	  function define(obj, key, value) {
	    Object.defineProperty(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	    return obj[key];
	  }
	  try {
	    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
	    define({}, "");
	  } catch (err) {
	    define = function(obj, key, value) {
	      return obj[key] = value;
	    };
	  }

	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
	    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
	    var generator = Object.create(protoGenerator.prototype);
	    var context = new Context(tryLocsList || []);

	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);

	    return generator;
	  }
	  exports.wrap = wrap;

	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }

	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";

	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};

	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}

	  // This is a polyfill for %IteratorPrototype% for environments that
	  // don't natively support it.
	  var IteratorPrototype = {};
	  define(IteratorPrototype, iteratorSymbol, function () {
	    return this;
	  });

	  var getProto = Object.getPrototypeOf;
	  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
	  if (NativeIteratorPrototype &&
	      NativeIteratorPrototype !== Op &&
	      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
	    // This environment has a native %IteratorPrototype%; use it instead
	    // of the polyfill.
	    IteratorPrototype = NativeIteratorPrototype;
	  }

	  var Gp = GeneratorFunctionPrototype.prototype =
	    Generator.prototype = Object.create(IteratorPrototype);
	  GeneratorFunction.prototype = GeneratorFunctionPrototype;
	  define(Gp, "constructor", GeneratorFunctionPrototype);
	  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
	  GeneratorFunction.displayName = define(
	    GeneratorFunctionPrototype,
	    toStringTagSymbol,
	    "GeneratorFunction"
	  );

	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      define(prototype, method, function(arg) {
	        return this._invoke(method, arg);
	      });
	    });
	  }

	  exports.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };

	  exports.mark = function(genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	      define(genFun, toStringTagSymbol, "GeneratorFunction");
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };

	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `hasOwn.call(value, "__await")` to determine if the yielded value is
	  // meant to be awaited.
	  exports.awrap = function(arg) {
	    return { __await: arg };
	  };

	  function AsyncIterator(generator, PromiseImpl) {
	    function invoke(method, arg, resolve, reject) {
	      var record = tryCatch(generator[method], generator, arg);
	      if (record.type === "throw") {
	        reject(record.arg);
	      } else {
	        var result = record.arg;
	        var value = result.value;
	        if (value &&
	            typeof value === "object" &&
	            hasOwn.call(value, "__await")) {
	          return PromiseImpl.resolve(value.__await).then(function(value) {
	            invoke("next", value, resolve, reject);
	          }, function(err) {
	            invoke("throw", err, resolve, reject);
	          });
	        }

	        return PromiseImpl.resolve(value).then(function(unwrapped) {
	          // When a yielded Promise is resolved, its final value becomes
	          // the .value of the Promise<{value,done}> result for the
	          // current iteration.
	          result.value = unwrapped;
	          resolve(result);
	        }, function(error) {
	          // If a rejected Promise was yielded, throw the rejection back
	          // into the async generator function so it can be handled there.
	          return invoke("throw", error, resolve, reject);
	        });
	      }
	    }

	    var previousPromise;

	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return new PromiseImpl(function(resolve, reject) {
	          invoke(method, arg, resolve, reject);
	        });
	      }

	      return previousPromise =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(
	          callInvokeWithMethodAndArg,
	          // Avoid propagating failures to Promises returned by later
	          // invocations of the iterator.
	          callInvokeWithMethodAndArg
	        ) : callInvokeWithMethodAndArg();
	    }

	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }

	  defineIteratorMethods(AsyncIterator.prototype);
	  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
	    return this;
	  });
	  exports.AsyncIterator = AsyncIterator;

	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
	    if (PromiseImpl === void 0) PromiseImpl = Promise;

	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList),
	      PromiseImpl
	    );

	    return exports.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
	          return result.done ? result.value : iter.next();
	        });
	  };

	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;

	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }

	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }

	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }

	      context.method = method;
	      context.arg = arg;

	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          var delegateResult = maybeInvokeDelegate(delegate, context);
	          if (delegateResult) {
	            if (delegateResult === ContinueSentinel) continue;
	            return delegateResult;
	          }
	        }

	        if (context.method === "next") {
	          // Setting context._sent for legacy support of Babel's
	          // function.sent implementation.
	          context.sent = context._sent = context.arg;

	        } else if (context.method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw context.arg;
	          }

	          context.dispatchException(context.arg);

	        } else if (context.method === "return") {
	          context.abrupt("return", context.arg);
	        }

	        state = GenStateExecuting;

	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;

	          if (record.arg === ContinueSentinel) {
	            continue;
	          }

	          return {
	            value: record.arg,
	            done: context.done
	          };

	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(context.arg) call above.
	          context.method = "throw";
	          context.arg = record.arg;
	        }
	      }
	    };
	  }

	  // Call delegate.iterator[context.method](context.arg) and handle the
	  // result, either by returning a { value, done } result from the
	  // delegate iterator, or by modifying context.method and context.arg,
	  // setting context.delegate to null, and returning the ContinueSentinel.
	  function maybeInvokeDelegate(delegate, context) {
	    var method = delegate.iterator[context.method];
	    if (method === undefined$1) {
	      // A .throw or .return when the delegate iterator has no .throw
	      // method always terminates the yield* loop.
	      context.delegate = null;

	      if (context.method === "throw") {
	        // Note: ["return"] must be used for ES3 parsing compatibility.
	        if (delegate.iterator["return"]) {
	          // If the delegate iterator has a return method, give it a
	          // chance to clean up.
	          context.method = "return";
	          context.arg = undefined$1;
	          maybeInvokeDelegate(delegate, context);

	          if (context.method === "throw") {
	            // If maybeInvokeDelegate(context) changed context.method from
	            // "return" to "throw", let that override the TypeError below.
	            return ContinueSentinel;
	          }
	        }

	        context.method = "throw";
	        context.arg = new TypeError(
	          "The iterator does not provide a 'throw' method");
	      }

	      return ContinueSentinel;
	    }

	    var record = tryCatch(method, delegate.iterator, context.arg);

	    if (record.type === "throw") {
	      context.method = "throw";
	      context.arg = record.arg;
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    var info = record.arg;

	    if (! info) {
	      context.method = "throw";
	      context.arg = new TypeError("iterator result is not an object");
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    if (info.done) {
	      // Assign the result of the finished delegate to the temporary
	      // variable specified by delegate.resultName (see delegateYield).
	      context[delegate.resultName] = info.value;

	      // Resume execution at the desired location (see delegateYield).
	      context.next = delegate.nextLoc;

	      // If context.method was "throw" but the delegate handled the
	      // exception, let the outer generator proceed normally. If
	      // context.method was "next", forget context.arg since it has been
	      // "consumed" by the delegate iterator. If context.method was
	      // "return", allow the original .return call to continue in the
	      // outer generator.
	      if (context.method !== "return") {
	        context.method = "next";
	        context.arg = undefined$1;
	      }

	    } else {
	      // Re-yield the result returned by the delegate method.
	      return info;
	    }

	    // The delegate iterator is finished, so forget it and continue with
	    // the outer generator.
	    context.delegate = null;
	    return ContinueSentinel;
	  }

	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);

	  define(Gp, toStringTagSymbol, "Generator");

	  // A Generator should always return itself as the iterator object when the
	  // @@iterator function is called on it. Some browsers' implementations of the
	  // iterator prototype chain incorrectly implement this, causing the Generator
	  // object to not be returned from this call. This ensures that doesn't happen.
	  // See https://github.com/facebook/regenerator/issues/274 for more details.
	  define(Gp, iteratorSymbol, function() {
	    return this;
	  });

	  define(Gp, "toString", function() {
	    return "[object Generator]";
	  });

	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };

	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }

	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }

	    this.tryEntries.push(entry);
	  }

	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }

	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }

	  exports.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();

	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }

	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };

	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }

	      if (typeof iterable.next === "function") {
	        return iterable;
	      }

	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }

	          next.value = undefined$1;
	          next.done = true;

	          return next;
	        };

	        return next.next = next;
	      }
	    }

	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  exports.values = values;

	  function doneResult() {
	    return { value: undefined$1, done: true };
	  }

	  Context.prototype = {
	    constructor: Context,

	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      // Resetting context._sent for legacy support of Babel's
	      // function.sent implementation.
	      this.sent = this._sent = undefined$1;
	      this.done = false;
	      this.delegate = null;

	      this.method = "next";
	      this.arg = undefined$1;

	      this.tryEntries.forEach(resetTryEntry);

	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined$1;
	          }
	        }
	      }
	    },

	    stop: function() {
	      this.done = true;

	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }

	      return this.rval;
	    },

	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }

	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;

	        if (caught) {
	          // If the dispatched exception was caught by a catch block,
	          // then let that catch block handle the exception normally.
	          context.method = "next";
	          context.arg = undefined$1;
	        }

	        return !! caught;
	      }

	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;

	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }

	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");

	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }

	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },

	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }

	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }

	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;

	      if (finallyEntry) {
	        this.method = "next";
	        this.next = finallyEntry.finallyLoc;
	        return ContinueSentinel;
	      }

	      return this.complete(record);
	    },

	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }

	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = this.arg = record.arg;
	        this.method = "return";
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }

	      return ContinueSentinel;
	    },

	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },

	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }

	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },

	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };

	      if (this.method === "next") {
	        // Deliberately forget the last sent value so that we don't
	        // accidentally pass it on to the delegate.
	        this.arg = undefined$1;
	      }

	      return ContinueSentinel;
	    }
	  };

	  // Regardless of whether this script is executing as a CommonJS module
	  // or not, return the runtime object so that we can declare the variable
	  // regeneratorRuntime in the outer scope, which allows this module to be
	  // injected easily by `bin/regenerator --include-runtime script.js`.
	  return exports;

	}(
	  // If this script is executing as a CommonJS module, use module.exports
	  // as the regeneratorRuntime namespace. Otherwise create a new empty
	  // object. Either way, the resulting object will be used to initialize
	  // the regeneratorRuntime variable at the top of this file.
	  module.exports 
	));

	try {
	  regeneratorRuntime = runtime;
	} catch (accidentalStrictMode) {
	  // This module should not be running in strict mode, so the above
	  // assignment should always work unless something is misconfigured. Just
	  // in case runtime.js accidentally runs in strict mode, in modern engines
	  // we can explicitly access globalThis. In older engines we can escape
	  // strict mode using a global Function call. This could conceivably fail
	  // if a Content Security Policy forbids using Function, but in that case
	  // the proper solution is to fix the accidental strict mode problem. If
	  // you've misconfigured your bundler to force strict mode and applied a
	  // CSP to forbid Function, and you're not willing to fix either of those
	  // problems, please detail your unique predicament in a GitHub issue.
	  if (typeof globalThis === "object") {
	    globalThis.regeneratorRuntime = runtime;
	  } else {
	    Function("r", "regeneratorRuntime = r")(runtime);
	  }
	}
	}(runtime));

	var regenerator = runtime.exports;

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
	          while (1) {
	            switch (_context.prev = _context.next) {
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
	      var _tryToGetSourceBlock = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3(result) {
	        var text, lines;
	        return regenerator.wrap(function _callee3$(_context3) {
	          while (1) {
	            switch (_context3.prev = _context3.next) {
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

	exports.notError = notError;
	exports.notErrorStandalone = service;
	exports.notReporter = notErrorReporter;
	exports.notRequestError = notRequestError;
	exports.notValidationError = notValidationError;

	Object.defineProperty(exports, '__esModule', { value: true });

	return exports;

})({});
