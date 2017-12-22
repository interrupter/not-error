var notError = (function () {
'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

/**
* Detects if code runs in browser.
*/
var isBrowser = new Function("try {return this===window;}catch(e){ return false;}");

/**
* Error reporting with features, saving browser info, uri and so on.
* @module not-error/error
*/

var notError = function (_Error) {
	inherits(notError, _Error);

	function notError(message) {
		var _ret;

		var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
		classCallCheck(this, notError);

		var _this = possibleConstructorReturn(this, (notError.__proto__ || Object.getPrototypeOf(notError)).call(this, message));

		_this.options = options;
		_this.timestamp = new Date().getTime();
		_this.fill();
		return _ret = _this, possibleConstructorReturn(_this, _ret);
	}

	/**
 * Collecting data from broser or Node
 */


	createClass(notError, [{
		key: "fill",
		value: function fill() {
			if (isBrowser()) {
				this.fillForBrowser();
			} else {
				this.fillForNode();
			}
		}

		/**
  * Collecting information specific for browsers
  */

	}, {
		key: "fillForBrowser",
		value: function fillForBrowser() {
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
		}

		/**
  *	Collecting information specific for Node.js V8
  */

	}, {
		key: "fillForNode",
		value: function fillForNode() {
			/**
   *	You want some fields from env but not all, cause there are passwords
   *	from db, api keys and etc
   */
			this.env = {
				browser: false,
				node: true,
				versions: Object.assign({}, process.versions),
				vars: this.filterEnv(process.env, this.options.whitelist || ['NODE_ENV'])
			};
		}

		/**
  *	Filtering out key by `white` list
  * @param {object} object hash to be copied according filter `white` list
  * @param {array} filter array of sting, which represents keys we want to be
  *						copied in resulting object from source
  * @return {object}		white listed hash
  */

	}, {
		key: "filterEnv",
		value: function filterEnv(object, filter) {
			var result = {};
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = filter[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var t = _step.value;

					if (object.hasOwnProperty(t)) {
						result[t] = object[t];
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			return result;
		}
	}]);
	return notError;
}(Error);

var error = notError;

return error;

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IuanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9lcnJvci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiogRGV0ZWN0cyBpZiBjb2RlIHJ1bnMgaW4gYnJvd3Nlci5cbiovXG52YXIgaXNCcm93c2VyID0gbmV3IEZ1bmN0aW9uKFwidHJ5IHtyZXR1cm4gdGhpcz09PXdpbmRvdzt9Y2F0Y2goZSl7IHJldHVybiBmYWxzZTt9XCIpO1xuXG4vKipcbiogRXJyb3IgcmVwb3J0aW5nIHdpdGggZmVhdHVyZXMsIHNhdmluZyBicm93c2VyIGluZm8sIHVyaSBhbmQgc28gb24uXG4qIEBtb2R1bGUgbm90LWVycm9yL2Vycm9yXG4qL1xuY2xhc3Mgbm90RXJyb3IgZXh0ZW5kcyBFcnJvciB7XG5cdGNvbnN0cnVjdG9yKG1lc3NhZ2UsIG9wdGlvbnMgPSB7fSl7XG5cdFx0c3VwZXIobWVzc2FnZSk7XG5cdFx0dGhpcy5vcHRpb25zID0gb3B0aW9ucztcblx0XHR0aGlzLnRpbWVzdGFtcCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXHRcdHRoaXMuZmlsbCgpO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0LyoqXG5cdCogQ29sbGVjdGluZyBkYXRhIGZyb20gYnJvc2VyIG9yIE5vZGVcblx0Ki9cblx0ZmlsbCgpe1xuXHRcdGlmIChpc0Jyb3dzZXIoKSl7XG5cdFx0XHR0aGlzLmZpbGxGb3JCcm93c2VyKCk7XG5cdFx0fWVsc2V7XG5cdFx0XHR0aGlzLmZpbGxGb3JOb2RlKCk7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCogQ29sbGVjdGluZyBpbmZvcm1hdGlvbiBzcGVjaWZpYyBmb3IgYnJvd3NlcnNcblx0Ki9cblx0ZmlsbEZvckJyb3dzZXIoKXtcblx0XHR0aGlzLmVudiA9IHtcblx0XHRcdGJyb3dzZXI6IHRydWUsXG5cdFx0XHRub2RlOiBmYWxzZSxcblx0XHRcdGxvY2F0aW9uOiB7XG5cdFx0XHRcdGhhc2g6IFx0XHR3aW5kb3cubG9jYXRpb24uaGFzaCxcblx0XHRcdFx0cG9ydDogXHRcdHdpbmRvdy5sb2NhdGlvbi5wb3J0LFxuXHRcdFx0XHRwcm90b2NvbDogXHR3aW5kb3cubG9jYXRpb24ucHJvdG9jb2wsXG5cdFx0XHRcdHNlYXJjaDogXHR3aW5kb3cubG9jYXRpb24uc2VhcmNoLFxuXHRcdFx0XHRob3N0OiBcdFx0d2luZG93LmxvY2F0aW9uLmhvc3QsXG5cdFx0XHRcdGhyZWY6IFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZixcblx0XHRcdFx0aG9zdG5hbWU6IFx0d2luZG93LmxvY2F0aW9uLmhvc3RuYW1lLFxuXHRcdFx0XHRwYXRobmFtZTogXHR3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUsXG5cdFx0XHR9XG5cdFx0fTtcblx0fVxuXG5cdC8qKlxuXHQqXHRDb2xsZWN0aW5nIGluZm9ybWF0aW9uIHNwZWNpZmljIGZvciBOb2RlLmpzIFY4XG5cdCovXG5cdGZpbGxGb3JOb2RlKCl7XG5cdFx0LyoqXG5cdFx0Klx0WW91IHdhbnQgc29tZSBmaWVsZHMgZnJvbSBlbnYgYnV0IG5vdCBhbGwsIGNhdXNlIHRoZXJlIGFyZSBwYXNzd29yZHNcblx0XHQqXHRmcm9tIGRiLCBhcGkga2V5cyBhbmQgZXRjXG5cdFx0Ki9cblx0XHR0aGlzLmVudiA9IHtcblx0XHRcdGJyb3dzZXI6IGZhbHNlLFxuXHRcdFx0bm9kZTogdHJ1ZSxcblx0XHRcdHZlcnNpb25zOiBPYmplY3QuYXNzaWduKHt9LCBwcm9jZXNzLnZlcnNpb25zKSxcblx0XHRcdHZhcnM6IHRoaXMuZmlsdGVyRW52KHByb2Nlc3MuZW52LCB0aGlzLm9wdGlvbnMud2hpdGVsaXN0IHx8IFsnTk9ERV9FTlYnXSlcblx0XHR9O1xuXHR9XG5cblx0LyoqXG5cdCpcdEZpbHRlcmluZyBvdXQga2V5IGJ5IGB3aGl0ZWAgbGlzdFxuXHQqIEBwYXJhbSB7b2JqZWN0fSBvYmplY3QgaGFzaCB0byBiZSBjb3BpZWQgYWNjb3JkaW5nIGZpbHRlciBgd2hpdGVgIGxpc3Rcblx0KiBAcGFyYW0ge2FycmF5fSBmaWx0ZXIgYXJyYXkgb2Ygc3RpbmcsIHdoaWNoIHJlcHJlc2VudHMga2V5cyB3ZSB3YW50IHRvIGJlXG5cdCpcdFx0XHRcdFx0XHRjb3BpZWQgaW4gcmVzdWx0aW5nIG9iamVjdCBmcm9tIHNvdXJjZVxuXHQqIEByZXR1cm4ge29iamVjdH1cdFx0d2hpdGUgbGlzdGVkIGhhc2hcblx0Ki9cblx0ZmlsdGVyRW52KG9iamVjdCwgZmlsdGVyKXtcblx0XHRsZXQgcmVzdWx0ID0ge307XG5cdFx0Zm9yKGxldCB0IG9mIGZpbHRlcil7XG5cdFx0XHRpZihvYmplY3QuaGFzT3duUHJvcGVydHkodCkpe1xuXHRcdFx0XHRyZXN1bHRbdF0gPSBvYmplY3RbdF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBub3RFcnJvcjtcbiJdLCJuYW1lcyI6WyJpc0Jyb3dzZXIiLCJGdW5jdGlvbiIsIm5vdEVycm9yIiwibWVzc2FnZSIsIm9wdGlvbnMiLCJ0aW1lc3RhbXAiLCJEYXRlIiwiZ2V0VGltZSIsImZpbGwiLCJmaWxsRm9yQnJvd3NlciIsImZpbGxGb3JOb2RlIiwiZW52Iiwid2luZG93IiwibG9jYXRpb24iLCJoYXNoIiwicG9ydCIsInByb3RvY29sIiwic2VhcmNoIiwiaG9zdCIsImhyZWYiLCJob3N0bmFtZSIsInBhdGhuYW1lIiwiT2JqZWN0IiwiYXNzaWduIiwicHJvY2VzcyIsInZlcnNpb25zIiwiZmlsdGVyRW52Iiwid2hpdGVsaXN0Iiwib2JqZWN0IiwiZmlsdGVyIiwicmVzdWx0IiwidCIsImhhc093blByb3BlcnR5IiwiRXJyb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7QUFHQSxJQUFJQSxZQUFZLElBQUlDLFFBQUosQ0FBYSxxREFBYixDQUFoQjs7Ozs7OztJQU1NQzs7O21CQUNPQyxPQUFaLEVBQWtDOzs7TUFBYkMsT0FBYSx1RUFBSCxFQUFHOzs7aUhBQzNCRCxPQUQyQjs7UUFFNUJDLE9BQUwsR0FBZUEsT0FBZjtRQUNLQyxTQUFMLEdBQWlCLElBQUlDLElBQUosR0FBV0MsT0FBWCxFQUFqQjtRQUNLQyxJQUFMOzs7Ozs7Ozs7Ozt5QkFPSztPQUNEUixXQUFKLEVBQWdCO1NBQ1ZTLGNBQUw7SUFERCxNQUVLO1NBQ0NDLFdBQUw7Ozs7Ozs7Ozs7bUNBT2M7UUFDVkMsR0FBTCxHQUFXO2FBQ0QsSUFEQztVQUVKLEtBRkk7Y0FHQTtXQUNEQyxPQUFPQyxRQUFQLENBQWdCQyxJQURmO1dBRURGLE9BQU9DLFFBQVAsQ0FBZ0JFLElBRmY7ZUFHRUgsT0FBT0MsUUFBUCxDQUFnQkcsUUFIbEI7YUFJQUosT0FBT0MsUUFBUCxDQUFnQkksTUFKaEI7V0FLREwsT0FBT0MsUUFBUCxDQUFnQkssSUFMZjtXQU1ETixPQUFPQyxRQUFQLENBQWdCTSxJQU5mO2VBT0VQLE9BQU9DLFFBQVAsQ0FBZ0JPLFFBUGxCO2VBUUVSLE9BQU9DLFFBQVAsQ0FBZ0JROztJQVg3Qjs7Ozs7Ozs7O2dDQW1CWTs7Ozs7UUFLUFYsR0FBTCxHQUFXO2FBQ0QsS0FEQztVQUVKLElBRkk7Y0FHQVcsT0FBT0MsTUFBUCxDQUFjLEVBQWQsRUFBa0JDLFFBQVFDLFFBQTFCLENBSEE7VUFJSixLQUFLQyxTQUFMLENBQWVGLFFBQVFiLEdBQXZCLEVBQTRCLEtBQUtQLE9BQUwsQ0FBYXVCLFNBQWIsSUFBMEIsQ0FBQyxVQUFELENBQXREO0lBSlA7Ozs7Ozs7Ozs7Ozs7NEJBZVNDLFFBQVFDLFFBQU87T0FDcEJDLFNBQVMsRUFBYjs7Ozs7O3lCQUNhRCxNQUFiLDhIQUFvQjtTQUFaRSxDQUFZOztTQUNoQkgsT0FBT0ksY0FBUCxDQUFzQkQsQ0FBdEIsQ0FBSCxFQUE0QjthQUNwQkEsQ0FBUCxJQUFZSCxPQUFPRyxDQUFQLENBQVo7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQUdLRCxNQUFQOzs7O0VBdEVxQkc7O0FBMEV2QixZQUFpQi9CLFFBQWpCOzs7Ozs7OzsifQ==
