// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"../js/utilities/helpers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.domReady = domReady;
exports.randNumber = randNumber;
exports.normalizeNumber = normalizeNumber;
exports.degToRad = degToRad;
exports.isElementInViewport = isElementInViewport;

function domReady(fn) {
  if (document.readyState !== 'loading') {
    fn();
    return;
  }

  document.addEventListener('DOMContentLoaded', fn);
}

function randNumber(from, to) {
  // return Math.floor(Math.random() * to) + from;
  return Math.floor(Math.random() * (to - from + 1)) + from;
}

function normalizeNumber(val, min, max) {
  return (val - min) / (max - min);
}

function degToRad(degrees) {
  return degrees * (Math.PI / 180);
}

function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();
  return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
}
},{}],"../js/modules/entry/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function init() {
  window.addEventListener('load', function () {
    window.setTimeout(function () {
      var html = document.querySelector('html');
      html.classList.remove('is-loading');
    }, 500);
  });
}

var _default = init;
exports.default = _default;
},{}],"../../node_modules/validatinator/js/validatinator.min.js":[function(require,module,exports) {
/* 
 * Copyright (c) 2013-2017 David Jenkins (validatinator) 
 * See the file license.txt for copying permission. 
 * 
 * Simple, yet effective, vanilla JavaScript form validation "plugin." Validatinator is based off 
 * of one of PHP's most famous framework, Laravel.  Using Validatinator is as easy as instantiating 
 * a Validatinator object, calling the passes or fails methods and if there are failed validations then grabbing 
 * those validations from the errors property on the main object. 
 * 
 * Latest Update: 1.3.4 (02/01/2017) 
 */ 
(function(window, undefined) {function Validatinator(a,b){if(!(this instanceof Validatinator))throw new Error("Whoops!  Validatinator must be called with the new keyword!");this.validationInformation=void 0!==a?this.utils.convertFieldValidationsToArray(a):{},this.errors={},this.currentForm,this.currentField,this.validations.parent=this,this.messages.parent=this,this.validations.utils=this.utils,this.messages.utils=this.utils,void 0!==b&&this.messages.overwriteAndAddNewMessages(b)}Validatinator.prototype={fails:function(a){return!this.startValidations(a)},passes:function(a){return this.startValidations(a)},startValidations:function(a){var b,c,d,e;this.currentForm=a,this.errors={};for(var f in this.validationInformation[a])for(this.currentField=f,b=this.validationInformation[a][f],c=this.utils.getFieldsValue(this.currentForm,this.currentField),e=0;e<b.length;e++){var g,h=[];d=this.getValidationMethodAndParameters(b[e]),g=d[0],2===d.length&&(h=d[1]),this.callValidationMethodWithParameters(g,h,c)||(h.shift(),this.messages.addValidationErrorMessage(g,h))}return this.utils.isEmptyObject(this.errors)},getValidationMethodAndParameters:function(a){var b,c;return a.contains(":")?(b=a.split(":"),c=b.shift(),[c,this.prepareParameters(b)]):[a]},prepareParameters:function(a){for(var b=0,c=0;b<a.length;b++)if(a[b].contains(","))for(a[b]=a[b].split(",");c<a[b].length;c++)a[b][c]=this.utils.convertStringToBoolean(a[b][c].trim());else a[b]=this.utils.convertStringToBoolean(a[b].trim());return a},callValidationMethodWithParameters:function(a,b,c){if(!(a in this.validations))throw new Error("Validation does not exist: "+a);return b?(b.unshift(c),this.validations[a].apply(this.validations,b)):this.validations[a](c)}},"object"==typeof window&&"object"==typeof window.document&&(window.Validatinator=Validatinator),Validatinator.prototype.messages={validationMessages:{accepted:"This field must be accepted.",alpha:"This field only allows alpha characters.",alphaDash:"This field only allows alpha, dash and underscore characters.",alphaNum:"This field only allows alpha, dash, underscore and numerical characters.",between:"This field must be between {$0}",betweenLength:"This field must be between {$0} characters long.",confirmed:"This field must be the same as {$0}.",contains:"This field must be one of the following values, {$0}.",dateBefore:"This field must be a date before {$0}.",dateAfter:"This field must be a date after {$0}.",different:"This field must not be the same as {$0}.",digitsLength:"This field must be a numerical value and {$0} characters long.",digitsLengthBetween:"This field must be a numerical value and between {$0} characters long.",email:"This field only allows valid email addresses.",ipvFour:"This field only allows valid ipv4 addresses.",max:"This field must be equal to or less than {$0}.",maxLength:"This field must be {$0} or less characters long.",min:"This field must be equal to or more than {$0}.",minLength:"This field must be {$0} or more characters long.",notIn:"This field must not be contained within the following values, {$0}.",number:"This field only allows valid numerical values.",required:"This field is required.",requiredIf:"This field is required if the value of {$0} equals {$1}.",requiredIfNot:"This field is required if the value of {$0} does not equal {$1}.",same:"This field must be the same value as {$0}.",url:"This field only allows valid urls."},overwriteAndAddNewMessages:function(a){var b;for(b in a)this.validationMessages[b]=a[b]},addCurrentFormAndField:function(){this.parent.errors.hasOwnProperty(this.parent.currentForm)||(this.parent.errors[this.parent.currentForm]={}),this.parent.errors[this.parent.currentForm].hasOwnProperty(this.parent.currentField)||(this.parent.errors[this.parent.currentForm][this.parent.currentField]={})},addValidationErrorMessage:function(a,b){var c=this.parent.currentForm,d=this.parent.currentField,e=this.getValidationErrorMessage(a);this.addCurrentFormAndField(),b.length>0&&(e=this.replaceCurlyBracesWithValues(e,b)),this.parent.errors[c][d][a]=e},getValidationErrorMessage:function(a){var b,c=this.parent.currentForm,d=this.parent.currentField;try{b=this.validationMessages[c][d][a]}catch(e){}return b||(b=this.validationMessages[a]),b},replaceCurlyBracesWithValues:function(a,b){for(var c,d,e=0;e<b.length;e++)c=b[e],d="{$"+e+"}",(a.contains(d)||null!==c||void 0!==c)&&(a=this.utils.isValueAnArray(b[e])?a.split(d).join(this.utils.convertArrayValuesToEnglishString(c)):a.split(d).join(c));return a}},String.prototype.contains||(String.prototype.contains=function(a,b){return-1!==String.prototype.indexOf.call(this,a,b)}),Array.prototype.indexOf||(Array.prototype.indexOf=function(a,b){if(void 0===this||null===this)throw new TypeError('"this" is null or not defined');var c=this.length>>>0;for(b=+b||0,Math.abs(b)===1/0&&(b=0),0>b&&(b+=c,0>b&&(b=0));c>b;b++)if(this[b]===a)return b;return-1}),Validatinator.prototype.utils={convertFieldValidationsToArray:function(a){var b;for(var c in a)for(var d in a[c])b=a[c][d],a[c][d]=b.contains("|")?b.split("|"):[b];return a},convertStringToBoolean:function(a){return"string"!=typeof a?a:"false"===a.toLowerCase()?!1:"true"===a.toLowerCase()?!0:a},convertArrayValuesToEnglishString:function(a){for(var b,c=0,d="";c<a.length;c++)b=c+1,d+=b===a.length?" and "+a[c]:0===c?a[c]:", "+a[c];return d},isValueFalsyInNature:function(a,b){return(void 0===b||null===b)&&(b=!0),void 0===a||null===a||""===a?!0:b?!a:a===!1},isValueAnArray:function(a){return"[object Array]"===Object.prototype.toString.call(a)},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},getFieldsValue:function(a,b){var c,d,e,f=0;for(c=document.getElementsByName(b);f<c.length;f++)if(e=c[f],e.form&&e.form.name===a){if(-1!==["radio","checkbox"].indexOf(e.type)&&!d){if(e.checked){d=e.value;break}d="";continue}d=e.value;break}if(!d&&""!==d)throw new Error("Couldn't find the field element "+b+" for the form "+a+".");return d}},Validatinator.prototype.validations={accepted:function(a){return document.getElementsByName(this.parent.currentField)[0].checked},alpha:function(a){var b=/^[a-zA-Z]+$/;return this.utils.isValueFalsyInNature(a)?!1:b.test(a)},alphaDash:function(a){var b=/^[a-zA-Z-_]+$/;return this.utils.isValueFalsyInNature(a)?!1:b.test(a)},alphaNum:function(a){var b=/^[a-zA-Z-_0-9]+$/;return this.utils.isValueFalsyInNature(a)?!1:b.test(a)},between:function(a,b){var c=Number(b[0]),d=Number(b[1]);if(isNaN(c)||isNaN(d))throw new Error("min and max must both be numbers in the `between` validation.");return a>=c&&d>=a},betweenLength:function(a,b){var c=Number(b[0]),d=Number(b[1]),e=String(a).length;if(isNaN(c)||isNaN(d))throw new Error("min and max must both be numbers in the `betweenLength` validation.");return e>=c&&d>=e},contains:function(a,b){return-1!==b.indexOf(a)},dateBefore:function(a,b){return Date.parse(a)<Date.parse(b)},dateAfter:function(a,b){return!this.dateBefore(a,b)},different:function(a,b,c){return!this.same(a,b,c)},digitsLength:function(a,b){var c=String(a).length,b=Number(b);if(isNaN(b))throw new Error("length must be of numerical value in the `digitsLength` validation.");return this.number(a)?c===b:!1},digitsLengthBetween:function(a,b){var c=Number(b[0]),d=Number(b[1]),e=String(a).length;if(isNaN(c)||isNaN(d))throw new Error("minLength and maxLength must both be numerical values in the `digitsLengthBetween` validation.");return this.number(a)?e>=c&&d>=e:!1},email:function(a){var b=/[^\s@]+@[^\s@]+\.[^\s@]+/;return b.test(a)},ipvFour:function(a){var b,c=255;return b=a.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/),null!==b&&b[1]<=c&&b[2]<=c&&b[3]<=c&&b[4]<=c},max:function(a,b){if(b=Number(b),isNaN(b))throw new Error("max must be of numerical value in the `max` validation.");return this.between(a,[-(1/0),b])},maxLength:function(a,b){if(b=Number(b),isNaN(b))throw new Error("max must be a numerical value in the `max` validation.");return this.betweenLength(a,[-(1/0),b])},min:function(a,b){if(b=Number(b),isNaN(b))throw new Error("min must be of numerical value in the `min` validation.");return this.between(a,[b,1/0])},minLength:function(a,b){if(b=Number(b),isNaN(b))throw new Error("min must be a numerical value in the `minLength` validation.");return this.betweenLength(a,[b,1/0])},notIn:function(a,b){return!this.contains(a,b)},number:function(a){return null===a||void 0===a?!1:(a=Number(a),!isNaN(a))},required:function(a){return!this.utils.isValueFalsyInNature(a,!1)},_required_if:function(a,b,c,d){var e=this.utils.getFieldsValue(this.parent.currentForm,b);return d&&e!==c||!d&&e===c?this.required(a):!0},requiredIf:function(a,b,c){return this._required_if(a,b,c,!1)},requiredIfNot:function(a,b,c){return this._required_if(a,b,c,!0)},same:function(a,b,c){var d=this.utils.getFieldsValue(this.parent.currentForm,b);return(void 0===c||null===c)&&(c=!0),a=String(a),d=String(d),c?a===d:a.toLowerCase()===d.toLowerCase()},url:function(a){var b=/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;return b.test(a)}};})(window);
},{}],"../js/modules/validation/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("validatinator");

function validate(form) {
  var validator = new window.Validatinator({
    'contact-form': {
      'fullname': 'required',
      'email': 'required|email',
      'message': 'required'
    }
  }, {
    'contact-form': {
      'fullname': {
        'required': 'Name is required.'
      },
      'email': {
        'required': 'Email address is required.',
        'email': 'Email must be in a valid format.'
      },
      'message': {
        'required': 'Message is required.'
      }
    }
  });
  var formName = form.getAttribute('name');
  var allFields = form.querySelectorAll('[name]'); // Clear any existing error messages from all form fields.

  Array.from(allFields).forEach(function (field) {
    return field.classList.remove('has-error');
  });

  if (validator.fails(formName)) {
    var errors = validator.errors[formName];

    for (var key in errors) {
      if (errors.hasOwnProperty(key)) {
        var obj = errors[key];
        var selector = "[name='".concat(key, "']");
        var field = form.querySelector(selector);

        for (var prop in obj) {
          if (obj.hasOwnProperty(prop)) {
            field.classList.add('has-error');
            form.classList.add('has-error-history'); // field.insertAdjacentHTML('afterend', `<p class="c-form__message">${obj[prop]}</p>`);
          }
        }
      }
    }

    return {
      isValid: false,
      errors: errors
    };
  }

  return {
    isValid: true,
    errors: {}
  };
}

var _default = validate;
exports.default = _default;
},{"validatinator":"../../node_modules/validatinator/js/validatinator.min.js"}],"../js/modules/notification/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function display(template) {
  var html = document.querySelector('html');
  window.document.body.insertAdjacentHTML('afterbegin', template);
  window.setTimeout(function () {
    var visibleNotifications = document.querySelectorAll('.c-notification');
    html.classList.add('has-notification');
    Array.from(visibleNotifications).forEach(function (visibleNotification) {
      visibleNotification.addEventListener('click', function () {
        html.classList.remove('has-notification');
        window.setTimeout(function () {
          visibleNotification.parentNode.removeChild(visibleNotification);
        }, 500);
      });
    });
  }, 500);
}

function notification() {
  var heading = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var emoji = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '🚀';
  var template = "\n    <div class=\"c-notification is-theme-grey-light\">\n      <div class=\"c-notification__dialog\">\n        <p class=\"c-notification__emoji\">".concat(emoji, "</p>\n        <h3 class=\"c-notification__heading\">").concat(heading, "</h3>\n        <p class=\"c-notification__message\">").concat(message, "</p>\n      </div>\n    </div>\n  ");
  display(template);
}

var _default = notification;
exports.default = _default;
},{}],"../js/modules/form/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _validation = _interopRequireDefault(require("../validation"));

var _notification = _interopRequireDefault(require("../notification"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function success(form, data) {
  form.classList.remove('is-loading');

  if (data && data.hasOwnProperty('success')) {
    (0, _notification.default)('Message successfully sent', 'Thanks and I\'ll be in touch soon', '🚀');
    form.reset();
    return;
  }

  (0, _notification.default)('Error', 'Something went wrong. Try again!', '🙈');
}

function fail(form, error) {
  form.classList.remove('is-loading');
  (0, _notification.default)('Error', "".concat(error.toString()), '🙈');
}

function send(form) {
  var action = form.getAttribute('action');
  var name = form.querySelector('#form-name');
  var email = form.querySelector('#form-email');
  var message = form.querySelector('#form-message');
  return fetch(action, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name.value,
      email: email.value,
      message: message.value
    })
  });
}

function validates(form) {
  var validation = (0, _validation.default)(form);
  return validation.isValid;
}

function init() {
  var form = document.querySelector('#form'); // Run validation and if successfull, post the form.

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (validates(form)) {
      form.classList.add('is-loading');
      send(form).then(function (response) {
        return response.json();
      }).then(function (data) {
        return success(form, data);
      }).catch(function (error) {
        return fail(form, error);
      });
    }
  }); // Run validation only if form has a history of failed validation.

  form.addEventListener('keyup', function () {
    if (form.classList.contains('has-error-history')) {
      validates(form);
    }
  });
}

var _default = init;
exports.default = _default;
},{"../validation":"../js/modules/validation/index.js","../notification":"../js/modules/notification/index.js"}],"../../node_modules/jump.js/dist/jump.module.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// Robert Penner's easeInOutQuad
// find the rest of his easing functions here: http://robertpenner.com/easing/
// find them exported for ES6 consumption here: https://github.com/jaxgeller/ez.js
var easeInOutQuad = function easeInOutQuad(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t + b;
  t--;
  return -c / 2 * (t * (t - 2) - 1) + b;
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var jumper = function jumper() {
  // private variable cache
  // no variables are created during a jump, preventing memory leaks
  var element = void 0; // element to scroll to                   (node)

  var start = void 0; // where scroll starts                    (px)

  var stop = void 0; // where scroll stops                     (px)

  var offset = void 0; // adjustment from the stop position      (px)

  var easing = void 0; // easing function                        (function)

  var a11y = void 0; // accessibility support flag             (boolean)

  var distance = void 0; // distance of scroll                     (px)

  var duration = void 0; // scroll duration                        (ms)

  var timeStart = void 0; // time scroll started                    (ms)

  var timeElapsed = void 0; // time spent scrolling thus far          (ms)

  var next = void 0; // next scroll position                   (px)

  var callback = void 0; // to call when done scrolling            (function)
  // scroll position helper

  function location() {
    return window.scrollY || window.pageYOffset;
  } // element offset helper


  function top(element) {
    return element.getBoundingClientRect().top + start;
  } // rAF loop helper


  function loop(timeCurrent) {
    // store time scroll started, if not started already
    if (!timeStart) {
      timeStart = timeCurrent;
    } // determine time spent scrolling so far


    timeElapsed = timeCurrent - timeStart; // calculate next scroll position

    next = easing(timeElapsed, start, distance, duration); // scroll to it

    window.scrollTo(0, next); // check progress

    timeElapsed < duration ? window.requestAnimationFrame(loop) // continue scroll loop
    : done(); // scrolling is done
  } // scroll finished helper


  function done() {
    // account for rAF time rounding inaccuracies
    window.scrollTo(0, start + distance); // if scrolling to an element, and accessibility is enabled

    if (element && a11y) {
      // add tabindex indicating programmatic focus
      element.setAttribute('tabindex', '-1'); // focus the element

      element.focus();
    } // if it exists, fire the callback


    if (typeof callback === 'function') {
      callback();
    } // reset time for next jump


    timeStart = false;
  } // API


  function jump(target) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {}; // resolve options, or use defaults

    duration = options.duration || 1000;
    offset = options.offset || 0;
    callback = options.callback; // "undefined" is a suitable default, and won't be called

    easing = options.easing || easeInOutQuad;
    a11y = options.a11y || false; // cache starting position

    start = location(); // resolve target

    switch (typeof target === 'undefined' ? 'undefined' : _typeof(target)) {
      // scroll from current position
      case 'number':
        element = undefined; // no element to scroll to

        a11y = false; // make sure accessibility is off

        stop = start + target;
        break;
      // scroll to element (node)
      // bounding rect is relative to the viewport

      case 'object':
        element = target;
        stop = top(element);
        break;
      // scroll to element (selector)
      // bounding rect is relative to the viewport

      case 'string':
        element = document.querySelector(target);
        stop = top(element);
        break;
    } // resolve scroll distance, accounting for offset


    distance = stop - start + offset; // resolve duration

    switch (_typeof(options.duration)) {
      // number in ms
      case 'number':
        duration = options.duration;
        break;
      // function passed the distance of the scroll

      case 'function':
        duration = options.duration(distance);
        break;
    } // start the loop


    window.requestAnimationFrame(loop);
  } // expose only the jump method


  return jump;
}; // export singleton


var singleton = jumper();
var _default = singleton;
exports.default = _default;
},{}],"../js/modules/navigation/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jump = _interopRequireDefault(require("jump.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function toggle() {
  var html = document.querySelector('html');
  html.classList.toggle('has-navigation');
}

function activate() {
  var navButton = document.querySelector('#navigation-activate');

  if (!navButton) {
    return;
  }

  navButton.addEventListener('click', function () {
    toggle();
  });
}
/* eslint-disable no-mixed-operators */

/* eslint-disable no-cond-assign */


function easeInOutExpo(t, b, c, d) {
  if (t === 0) return b;
  if (t === d) return b + c;
  if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
  return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
}
/* eslint-enable no-mixed-operators */

/* eslint-enable no-cond-assign */


function jumpTo(selector) {
  var html = document.querySelector('html');
  (0, _jump.default)(selector, {
    duration: 500,
    easing: easeInOutExpo,
    callback: function callback() {
      if (html.classList.contains('has-navigation')) {
        toggle();
      }
    }
  });
}

function links() {
  var scrollLinks = document.querySelectorAll('[data-scroll]');
  Array.from(scrollLinks).forEach(function (scrollLink) {
    scrollLink.addEventListener('click', function (e) {
      e.preventDefault();
      jumpTo(scrollLink.getAttribute('href'));
    });
  });
}

function init() {
  activate();
  links();
}

var _default = init;
exports.default = _default;
},{"jump.js":"../../node_modules/jump.js/dist/jump.module.js"}],"../js/modules/inview/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _helpers = require("../../utilities/helpers");

var elements;

function isInView() {
  if (!elements) {
    return;
  }

  Array.from(elements).forEach(function (element) {
    if ((0, _helpers.isElementInViewport)(element)) {
      element.classList.add('is-inview');
    }
  });
}

function init() {
  var elementsStore = document.querySelectorAll('[data-inview]');

  if (!elementsStore) {
    return;
  }

  elements = elementsStore;
  isInView();
}

window.addEventListener('scroll', function () {
  isInView();
});
var _default = init;
exports.default = _default;
},{"../../utilities/helpers":"../js/utilities/helpers.js"}],"../js/modules/scrolling/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var html = document.querySelector('html');
var lastPosition = 0;

function getCurrentPosition() {
  var currentPosition = window.pageYOffset || document.documentElement.scrollTop;
  currentPosition = currentPosition < 0 ? 0 : currentPosition;
  return currentPosition;
}

function init() {
  var currentPosition = getCurrentPosition();

  if (currentPosition > lastPosition && lastPosition > 1) {
    html.classList.remove('is-scrolling-up');
    html.classList.add('is-scrolling-down');
  } else {
    html.classList.remove('is-scrolling-down');
    html.classList.add('is-scrolling-up');
  }

  if (window.pageYOffset > 0) {
    html.classList.add('has-scrolled-down');
  } else {
    html.classList.remove('has-scrolled-down');
  } // Here we have to check if we're at the bottom of the page.
  // If we are, simply assign lastPosition to its own value, or else the currentPosition.
  // This is due to Safari having an 'overscroll' effect that means we are always going 'up' if we hit the bottom.


  lastPosition = window.innerHeight + window.pageYOffset >= document.body.offsetHeight ? lastPosition : currentPosition;
}

window.addEventListener('scroll', function () {
  init();
});
var _default = init;
exports.default = _default;
},{}],"../js/utilities/settings.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var settings = {
  speed: 500,
  easing: 'easeInOutExpo',
  colors: [{
    name: 'red',
    value: '#DF6C74'
  }, {
    name: 'green',
    value: '#99C46D'
  }, {
    name: 'yellow',
    value: '#ecce79'
  }, {
    name: 'blue',
    value: '#63ADF5'
  }, {
    name: 'cyan',
    value: '#59B6C4'
  }, {
    name: 'orange',
    value: '#D09B5C'
  }, {
    name: 'purple',
    value: '#C575E4'
  }, {
    name: 'slate',
    value: '#5F697F'
  }]
};
var _default = settings;
exports.default = _default;
},{}],"../js/modules/patterns/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _helpers = require("../../utilities/helpers");

var _settings = _interopRequireDefault(require("../../utilities/settings"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Confetti =
/*#__PURE__*/
function () {
  function Confetti() {
    var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'canvas';
    var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var animated = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    _classCallCheck(this, Confetti);

    this.color = color;
    this.animated = animated;
    this.amount = window.innerWidth * window.innerHeight / (window.innerWidth / 0.06);
    this.width = 6;
    this.height = 60;
    this.shapes = [];
    this.animationFrame = null;
    this.playing = true;
    this.canvas = document.querySelector(selector);
    this.ctx = this.canvas.getContext('2d');
  }

  _createClass(Confetti, [{
    key: "drawShape",
    value: function drawShape(shape) {
      var shapeX = shape.width / 2 + shape.x;
      var shapeY = shape.height / 2 + shape.y;
      this.ctx.save();
      this.ctx.translate(shapeX, shapeY);
      this.ctx.scale(shape.scale, shape.scale);
      this.ctx.rotate((0, _helpers.degToRad)(shape.rotate));
      this.ctx.fillStyle = shape.colour;
      this.ctx.fillRect(-Math.abs(shape.width / 2), -Math.abs(shape.height / 2), shape.width, shape.height);
      this.ctx.restore();
    }
  }, {
    key: "setShape",
    value: function setShape(shape, index) {
      var ySpeed = shape.scale / 4;
      var rSpeed = shape.scale / 4;

      if (index % 2) {
        shape.rotate = shape.rotate += rSpeed;
      } else {
        shape.rotate = shape.rotate -= rSpeed;
      }

      if (shape.y > this.canvas.height) {
        shape.y = -Math.abs(shape.height);
        shape.x = (0, _helpers.randNumber)(0, this.canvas.width);
      } else {
        shape.y = shape.y += ySpeed;
      }
    }
  }, {
    key: "placeShapes",
    value: function placeShapes() {
      var _this = this;

      if (!this.playing) {
        this.animationFrame = window.requestAnimationFrame(this.placeShapes.bind(this));
        return;
      }

      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.shapes.forEach(function (shape, index) {
        _this.drawShape(shape);

        _this.setShape(shape, index);
      });

      if (!this.animated) {
        return;
      }

      this.animationFrame = window.requestAnimationFrame(this.placeShapes.bind(this));
    }
  }, {
    key: "createShapes",
    value: function createShapes() {
      var _this2 = this;

      for (var i = 0; i < this.amount; i += 1) {
        var shapeEl = {
          width: this.width,
          height: this.height,
          x: (0, _helpers.randNumber)(-Math.abs(this.width), window.innerWidth),
          y: (0, _helpers.randNumber)(-Math.abs(this.height), window.innerHeight),
          colour: this.color ? _settings.default.colors.find(function (item) {
            return item.name === _this2.color;
          }).value : _settings.default.colors[(0, _helpers.randNumber)(0, _settings.default.colors.length - 1)].value,
          scale: i % 15 ? (0, _helpers.normalizeNumber)((0, _helpers.randNumber)(1, 10), 0, 10) : 1.5,
          rotate: (0, _helpers.randNumber)(0, 360),
          xSpeed: (0, _helpers.randNumber)(0, 2)
        };
        this.shapes.push(shapeEl);
      }

      this.placeShapes();
    }
  }, {
    key: "setCanvasSize",
    value: function setCanvasSize() {
      this.canvas.setAttribute('width', window.innerWidth);
      this.canvas.setAttribute('height', window.innerHeight);
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.placeShapes();
    }
  }, {
    key: "setEvents",
    value: function setEvents() {
      var _this3 = this;

      // window.addEventListener('resize', () => {
      //   window.cancelAnimationFrame(this.animationFrame)
      //   this.setCanvasSize()
      // })
      this.canvas.addEventListener('click', function () {
        _this3.playing = !_this3.playing;
      });
      document.addEventListener('visibilitychange', function () {
        _this3.playing = Boolean(document.visibilityState === 'visible');
      });
    }
  }, {
    key: "init",
    value: function init() {
      this.setEvents();
      this.setCanvasSize();
      this.createShapes();
    }
  }]);

  return Confetti;
}();

var _default = Confetti;
exports.default = _default;
},{"../../utilities/helpers":"../js/utilities/helpers.js","../../utilities/settings":"../js/utilities/settings.js"}],"../js/app.js":[function(require,module,exports) {
"use strict";

var _helpers = require("./utilities/helpers");

var _entry = _interopRequireDefault(require("./modules/entry"));

var _form = _interopRequireDefault(require("./modules/form"));

var _navigation = _interopRequireDefault(require("./modules/navigation"));

var _inview = _interopRequireDefault(require("./modules/inview"));

var _scrolling = _interopRequireDefault(require("./modules/scrolling"));

var _patterns = _interopRequireDefault(require("./modules/patterns"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import lazyLoad from './modules/lazy-load'
var app = {
  init: function init() {
    (0, _entry.default)(); // lazyLoad()

    (0, _form.default)();
    (0, _navigation.default)();
    (0, _inview.default)();
    (0, _scrolling.default)();
    var cover = new _patterns.default('#pattern-cover', false, true);
    cover.init();
    var reference = new _patterns.default('#pattern-reference', 'cyan');
    reference.init();
    var availability = new _patterns.default('#pattern-availability', 'yellow');
    availability.init();
    var resume = new _patterns.default('#pattern-resume', 'purple');
    resume.init();
  }
};
(0, _helpers.domReady)(app.init);
},{"./utilities/helpers":"../js/utilities/helpers.js","./modules/entry":"../js/modules/entry/index.js","./modules/form":"../js/modules/form/index.js","./modules/navigation":"../js/modules/navigation/index.js","./modules/inview":"../js/modules/inview/index.js","./modules/scrolling":"../js/modules/scrolling/index.js","./modules/patterns":"../js/modules/patterns/index.js"}],"../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64868" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","../js/app.js"], null)
//# sourceMappingURL=/app.5a203f7e.map