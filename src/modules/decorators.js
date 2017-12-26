/** Default debounce duration (in ms) */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = outerDecorator;
exports.debounce = debounce;

// export default function outerDecorator(); 
// exports.debouncer = outerDecorator;
var DEFAULT_DEBOUNCE_DURATION = 500;

exports.DEFAULT_DEBOUNCE_DURATION = DEFAULT_DEBOUNCE_DURATION;
/** Decorates a class method so that it is debounced by the specified duration */


export default function outerDecorator(duration, context = '') {
  return function innerDecorator(target, key, descriptor) {
    return {
      configurable: true,
      enumerable: descriptor.enumerable,
      get: function getter() {
        // Attach this function to the instance (not the class)
        Object.defineProperty(this, key, {
          configurable: true,
          enumerable: descriptor.enumerable,
          value: debounce(descriptor.value, duration, context)
        });
        return this[key];
      }
    };
  };
}

/** Debounces the specified function and returns a wrapper function */

function debounce(method, duration = '', context = '') {
  var duration = arguments.length <= 1 || arguments[1] === undefined ? DEFAULT_DEBOUNCE_DURATION : arguments[1];

  var timeoutId = undefined;

  function debounceWrapper() {
    var _this = context || this;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    debounceWrapper.clear();

    timeoutId = setTimeout(function () {
      timeoutId = null;
      method.apply(_this, args);
    }, duration);
  }

  debounceWrapper.clear = function () {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return debounceWrapper;
}