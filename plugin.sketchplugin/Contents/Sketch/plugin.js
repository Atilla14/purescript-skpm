var that = this;
function __skpm_run (key, context) {
  that.context = context;

var exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(console) {/* globals log */

if (true) {
  var sketchUtils = __webpack_require__(7)
  var sketchDebugger = __webpack_require__(9)
  var actions = __webpack_require__(11)

  function getStack() {
    return sketchUtils.prepareStackTrace(new Error().stack)
  }
}

console._skpmPrefix = 'console> '

function logEverywhere(type, args) {
  var values = Array.prototype.slice.call(args)

  // log to the System logs
  values.forEach(function(v) {
    try {
      log(console._skpmPrefix + indentString() + v)
    } catch (e) {
      log(v)
    }
  })

  if (true) {
    if (!sketchDebugger.isDebuggerPresent()) {
      return
    }

    var payload = {
      ts: Date.now(),
      type: type,
      plugin: String(context.scriptPath),
      values: values.map(sketchUtils.prepareValue),
      stack: getStack(),
    }

    sketchDebugger.sendToDebugger(actions.ADD_LOG, payload)
  }
}

var indentLevel = 0
function indentString() {
  var indent = ''
  for (var i = 0; i < indentLevel; i++) {
    indent += '  '
  }
  if (indentLevel > 0) {
    indent += '| '
  }
  return indent
}

var oldGroup = console.group

console.group = function() {
  // log to the JS context
  oldGroup && oldGroup.apply(this, arguments)
  indentLevel += 1
  if (true) {
    sketchDebugger.sendToDebugger(actions.GROUP, {
      plugin: String(context.scriptPath),
      collapsed: false,
    })
  }
}

var oldGroupCollapsed = console.groupCollapsed

console.groupCollapsed = function() {
  // log to the JS context
  oldGroupCollapsed && oldGroupCollapsed.apply(this, arguments)
  indentLevel += 1
  if (true) {
    sketchDebugger.sendToDebugger(actions.GROUP, {
      plugin: String(context.scriptPath),
      collapsed: true
    })
  }
}

var oldGroupEnd = console.groupEnd

console.groupEnd = function() {
  // log to the JS context
  oldGroupEnd && oldGroupEnd.apply(this, arguments)
  indentLevel -= 1
  if (indentLevel < 0) {
    indentLevel = 0
  }
  if (true) {
    sketchDebugger.sendToDebugger(actions.GROUP_END, {
      plugin: context.scriptPath,
    })
  }
}

var counts = {}
var oldCount = console.count

console.count = function(label) {
  label = typeof label !== 'undefined' ? label : 'Global'
  counts[label] = (counts[label] || 0) + 1

  // log to the JS context
  oldCount && oldCount.apply(this, arguments)
  return logEverywhere('log', [label + ': ' + counts[label]])
}

var timers = {}
var oldTime = console.time

console.time = function(label) {
  // log to the JS context
  oldTime && oldTime.apply(this, arguments)

  label = typeof label !== 'undefined' ? label : 'default'
  if (timers[label]) {
    return logEverywhere('warn', ['Timer "' + label + '" already exists'])
  }

  timers[label] = Date.now()
  return
}

var oldTimeEnd = console.timeEnd

console.timeEnd = function(label) {
  // log to the JS context
  oldTimeEnd && oldTimeEnd.apply(this, arguments)

  label = typeof label !== 'undefined' ? label : 'default'
  if (!timers[label]) {
    return logEverywhere('warn', ['Timer "' + label + '" does not exist'])
  }

  var duration = Date.now() - timers[label]
  delete timers[label]
  return logEverywhere('log', [label + ': ' + (duration / 1000) + 'ms'])
}

var oldLog = console.log

console.log = function() {
  // log to the JS context
  oldLog && oldLog.apply(this, arguments)
  return logEverywhere('log', arguments)
}

var oldWarn = console.warn

console.warn = function() {
  // log to the JS context
  oldWarn && oldWarn.apply(this, arguments)
  return logEverywhere('warn', arguments)
}

var oldError = console.error

console.error = function() {
  // log to the JS context
  oldError && oldError.apply(this, arguments)
  return logEverywhere('error', arguments)
}

var oldAssert = console.assert

console.assert = function(condition, text) {
  // log to the JS context
  oldAssert && oldAssert.apply(this, arguments)
  if (!condition) {
    return logEverywhere('assert', [text])
  }
  return undefined
}

var oldInfo = console.info

console.info = function() {
  // log to the JS context
  oldInfo && oldInfo.apply(this, arguments)
  return logEverywhere('info', arguments)
}

var oldClear = console.clear

console.clear = function() {
  oldClear && oldClear()
  if (true) {
    return sketchDebugger.sendToDebugger(actions.CLEAR_LOGS)
  }
}

console._skpmEnabled = true

module.exports = console

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/* eslint-disable no-not-accumulator-reassign/no-not-accumulator-reassign, no-var, vars-on-top, prefer-template, prefer-arrow-callback, func-names, prefer-destructuring, object-shorthand */

module.exports = function prepareStackTrace(stackTrace) {
  var stack = stackTrace.split('\n')
  stack = stack.map(function (s) {
    return s.replace(/\sg/, '')
  })

  stack = stack.map(function (entry) {
    // entry is something like `functionName@path/to/my/file:line:column`
    // or `path/to/my/file:line:column`
    // or `path/to/my/file`
    // or `path/to/@my/file:line:column`
    var parts = entry.split('@')
    var fn = parts.shift()
    var filePath = parts.join('@') // the path can contain @

    if (fn.indexOf('/Users/') === 0) {
      // actually we didn't have a fn so just put it back in the filePath
      filePath = fn + (filePath ? ('@' + filePath) : '')
      fn = null
    }

    if (!filePath) {
      // we should always have a filePath, so if we don't have one here, it means that the function what actually anonymous and that it is the filePath instead
      filePath = entry
      fn = null
    }

    var filePathParts = filePath.split(':')
    filePath = filePathParts[0]

    // the file is the last part of the filePath
    var file = filePath.split('/')
    file = file[file.length - 1]

    return {
      fn: fn,
      file: file,
      filePath: filePath,
      line: filePathParts[1],
      column: filePathParts[2],
    }
  })

  return stack
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = function toArray(object) {
  if (Array.isArray(object)) {
    return object
  }
  var arr = []
  for (var j = 0; j < (object || []).length; j += 1) {
    arr.push(object[j])
  }
  return arr
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("sketch");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("sketch/dom");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var purs = __webpack_require__(6);
var sketch = __webpack_require__(3);
var sketchDom = __webpack_require__(4);
var Document = __webpack_require__(4).Document;

exports.test = function () {
  purs.main();
};

exports.api = function () {
  // var myDoc = sketchDom.getSelectedDocument()
  // log (myDoc.getLayerWithID("C7D70841-5229-4717-A84D-491BE4F55C03").id)
  // var doc = Document.getSelectedDocument()
  // var selectedLayers = doc.selectedLayers
  // log (selectedLayers.layers.map(function(layer) {
  //   return sketchDom.fromNative(layer._object)
  // }))
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, console) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
    function webpackUniversalModuleDefinition(root, factory) {
        if (( false ? 'undefined' : _typeof(exports)) === 'object' && ( false ? 'undefined' : _typeof(module)) === 'object') module.exports = factory();else if (true) !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else {
            var a = factory();
            for (var i in a) {
                ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' ? exports : root)[i] = a[i];
            }
        }
    }

    return webpackUniversalModuleDefinition;
})()(undefined, function () {
    return (/******/function (modules) {
            // webpackBootstrap
            /******/ // The module cache
            /******/var installedModules = {};
            /******/
            /******/ // The require function
            /******/function __webpack_require__(moduleId) {
                /******/
                /******/ // Check if module is in cache
                /******/if (installedModules[moduleId]) {
                    /******/return installedModules[moduleId].exports;
                    /******/
                }
                /******/ // Create a new module (and put it into the cache)
                /******/var module = installedModules[moduleId] = {
                    /******/i: moduleId,
                    /******/l: false,
                    /******/exports: {}
                    /******/ };
                /******/
                /******/ // Execute the module function
                /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
                /******/
                /******/ // Flag the module as loaded
                /******/module.l = true;
                /******/
                /******/ // Return the exports of the module
                /******/return module.exports;
                /******/
            }
            /******/
            /******/
            /******/ // expose the modules object (__webpack_modules__)
            /******/__webpack_require__.m = modules;
            /******/
            /******/ // expose the module cache
            /******/__webpack_require__.c = installedModules;
            /******/
            /******/ // define getter function for harmony exports
            /******/__webpack_require__.d = function (exports, name, getter) {
                /******/if (!__webpack_require__.o(exports, name)) {
                    /******/Object.defineProperty(exports, name, {
                        /******/configurable: false,
                        /******/enumerable: true,
                        /******/get: getter
                        /******/ });
                    /******/
                }
                /******/
            };
            /******/
            /******/ // getDefaultExport function for compatibility with non-harmony modules
            /******/__webpack_require__.n = function (module) {
                /******/var getter = module && module.__esModule ?
                /******/function () {
                    function getDefault() {
                        return module['default'];
                    }

                    return getDefault;
                }() :
                /******/function () {
                    function getModuleExports() {
                        return module;
                    }

                    return getModuleExports;
                }();
                /******/__webpack_require__.d(getter, 'a', getter);
                /******/return getter;
                /******/
            };
            /******/
            /******/ // Object.prototype.hasOwnProperty.call
            /******/__webpack_require__.o = function (object, property) {
                return Object.prototype.hasOwnProperty.call(object, property);
            };
            /******/
            /******/ // __webpack_public_path__
            /******/__webpack_require__.p = "";
            /******/
            /******/ // Load entry module and return exports
            /******/return __webpack_require__(__webpack_require__.s = 44);
            /******/
        }(
        /************************************************************************/
        /******/[
        /* 0 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var $foreign = __webpack_require__(50);
            var Control_Semigroupoid = __webpack_require__(20);
            var Data_Function = __webpack_require__(14);
            var Data_Unit = __webpack_require__(1);
            var Functor = function Functor(map) {
                this.map = map;
            };
            var map = function map(dict) {
                return dict.map;
            };
            var mapFlipped = function mapFlipped(dictFunctor) {
                return function (fa) {
                    return function (f) {
                        return map(dictFunctor)(f)(fa);
                    };
                };
            };
            var $$void = function $$void(dictFunctor) {
                return map(dictFunctor)(Data_Function["const"](Data_Unit.unit));
            };
            var voidLeft = function voidLeft(dictFunctor) {
                return function (f) {
                    return function (x) {
                        return map(dictFunctor)(Data_Function["const"](x))(f);
                    };
                };
            };
            var voidRight = function voidRight(dictFunctor) {
                return function (x) {
                    return map(dictFunctor)(Data_Function["const"](x));
                };
            };
            var functorFn = new Functor(Control_Semigroupoid.compose(Control_Semigroupoid.semigroupoidFn));
            var functorArray = new Functor($foreign.arrayMap);
            var flap = function flap(dictFunctor) {
                return function (ff) {
                    return function (x) {
                        return map(dictFunctor)(function (f) {
                            return f(x);
                        })(ff);
                    };
                };
            };
            module.exports = {
                Functor: Functor,
                map: map,
                mapFlipped: mapFlipped,
                "void": $$void,
                voidRight: voidRight,
                voidLeft: voidLeft,
                flap: flap,
                functorFn: functorFn,
                functorArray: functorArray
            };

            /***/
        },
        /* 1 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var $foreign = __webpack_require__(51);
            var Data_Show = __webpack_require__(7);
            var showUnit = new Data_Show.Show(function (v) {
                return "unit";
            });
            module.exports = {
                showUnit: showUnit,
                unit: $foreign.unit
            };

            /***/
        },
        /* 2 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var $foreign = __webpack_require__(49);
            var Control_Category = __webpack_require__(13);
            var Data_Function = __webpack_require__(14);
            var Data_Functor = __webpack_require__(0);
            var Apply = function Apply(Functor0, apply) {
                this.Functor0 = Functor0;
                this.apply = apply;
            };
            var applyFn = new Apply(function () {
                return Data_Functor.functorFn;
            }, function (f) {
                return function (g) {
                    return function (x) {
                        return f(x)(g(x));
                    };
                };
            });
            var applyArray = new Apply(function () {
                return Data_Functor.functorArray;
            }, $foreign.arrayApply);
            var apply = function apply(dict) {
                return dict.apply;
            };
            var applyFirst = function applyFirst(dictApply) {
                return function (a) {
                    return function (b) {
                        return apply(dictApply)(Data_Functor.map(dictApply.Functor0())(Data_Function["const"])(a))(b);
                    };
                };
            };
            var applySecond = function applySecond(dictApply) {
                return function (a) {
                    return function (b) {
                        return apply(dictApply)(Data_Functor.map(dictApply.Functor0())(Data_Function["const"](Control_Category.id(Control_Category.categoryFn)))(a))(b);
                    };
                };
            };
            var lift2 = function lift2(dictApply) {
                return function (f) {
                    return function (a) {
                        return function (b) {
                            return apply(dictApply)(Data_Functor.map(dictApply.Functor0())(f)(a))(b);
                        };
                    };
                };
            };
            var lift3 = function lift3(dictApply) {
                return function (f) {
                    return function (a) {
                        return function (b) {
                            return function (c) {
                                return apply(dictApply)(apply(dictApply)(Data_Functor.map(dictApply.Functor0())(f)(a))(b))(c);
                            };
                        };
                    };
                };
            };
            var lift4 = function lift4(dictApply) {
                return function (f) {
                    return function (a) {
                        return function (b) {
                            return function (c) {
                                return function (d) {
                                    return apply(dictApply)(apply(dictApply)(apply(dictApply)(Data_Functor.map(dictApply.Functor0())(f)(a))(b))(c))(d);
                                };
                            };
                        };
                    };
                };
            };
            var lift5 = function lift5(dictApply) {
                return function (f) {
                    return function (a) {
                        return function (b) {
                            return function (c) {
                                return function (d) {
                                    return function (e) {
                                        return apply(dictApply)(apply(dictApply)(apply(dictApply)(apply(dictApply)(Data_Functor.map(dictApply.Functor0())(f)(a))(b))(c))(d))(e);
                                    };
                                };
                            };
                        };
                    };
                };
            };
            module.exports = {
                Apply: Apply,
                apply: apply,
                applyFirst: applyFirst,
                applySecond: applySecond,
                lift2: lift2,
                lift3: lift3,
                lift4: lift4,
                lift5: lift5,
                applyFn: applyFn,
                applyArray: applyArray
            };

            /***/
        },
        /* 3 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var Control_Apply = __webpack_require__(2);
            var Data_Functor = __webpack_require__(0);
            var Data_Unit = __webpack_require__(1);
            var Applicative = function Applicative(Apply0, pure) {
                this.Apply0 = Apply0;
                this.pure = pure;
            };
            var pure = function pure(dict) {
                return dict.pure;
            };
            var unless = function unless(dictApplicative) {
                return function (v) {
                    return function (v1) {
                        if (!v) {
                            return v1;
                        };
                        if (v) {
                            return pure(dictApplicative)(Data_Unit.unit);
                        };
                        throw new Error("Failed pattern match at Control.Applicative line 62, column 1 - line 62, column 65: " + [v.constructor.name, v1.constructor.name]);
                    };
                };
            };
            var when = function when(dictApplicative) {
                return function (v) {
                    return function (v1) {
                        if (v) {
                            return v1;
                        };
                        if (!v) {
                            return pure(dictApplicative)(Data_Unit.unit);
                        };
                        throw new Error("Failed pattern match at Control.Applicative line 57, column 1 - line 57, column 63: " + [v.constructor.name, v1.constructor.name]);
                    };
                };
            };
            var liftA1 = function liftA1(dictApplicative) {
                return function (f) {
                    return function (a) {
                        return Control_Apply.apply(dictApplicative.Apply0())(pure(dictApplicative)(f))(a);
                    };
                };
            };
            var applicativeFn = new Applicative(function () {
                return Control_Apply.applyFn;
            }, function (x) {
                return function (v) {
                    return x;
                };
            });
            var applicativeArray = new Applicative(function () {
                return Control_Apply.applyArray;
            }, function (x) {
                return [x];
            });
            module.exports = {
                Applicative: Applicative,
                pure: pure,
                liftA1: liftA1,
                unless: unless,
                when: when,
                applicativeFn: applicativeFn,
                applicativeArray: applicativeArray
            };

            /***/
        },
        /* 4 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var $foreign = __webpack_require__(62);
            var Data_Unit = __webpack_require__(1);
            var Data_Void = __webpack_require__(25);
            var Semigroup = function Semigroup(append) {
                this.append = append;
            };
            var semigroupVoid = new Semigroup(function (v) {
                return Data_Void.absurd;
            });
            var semigroupUnit = new Semigroup(function (v) {
                return function (v1) {
                    return Data_Unit.unit;
                };
            });
            var semigroupString = new Semigroup($foreign.concatString);
            var semigroupArray = new Semigroup($foreign.concatArray);
            var append = function append(dict) {
                return dict.append;
            };
            var semigroupFn = function semigroupFn(dictSemigroup) {
                return new Semigroup(function (f) {
                    return function (g) {
                        return function (x) {
                            return append(dictSemigroup)(f(x))(g(x));
                        };
                    };
                });
            };
            module.exports = {
                Semigroup: Semigroup,
                append: append,
                semigroupString: semigroupString,
                semigroupUnit: semigroupUnit,
                semigroupVoid: semigroupVoid,
                semigroupFn: semigroupFn,
                semigroupArray: semigroupArray
            };

            /***/
        },
        /* 5 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var Control_Applicative = __webpack_require__(3);
            var Control_Apply = __webpack_require__(2);
            var Control_Bind = __webpack_require__(8);
            var Control_Category = __webpack_require__(13);
            var Control_Monad = __webpack_require__(11);
            var Control_Semigroupoid = __webpack_require__(20);
            var Data_Boolean = __webpack_require__(32);
            var Data_BooleanAlgebra = __webpack_require__(33);
            var Data_Bounded = __webpack_require__(15);
            var Data_CommutativeRing = __webpack_require__(29);
            var Data_DivisionRing = __webpack_require__(34);
            var Data_Eq = __webpack_require__(6);
            var Data_EuclideanRing = __webpack_require__(26);
            var Data_Field = __webpack_require__(64);
            var Data_Function = __webpack_require__(14);
            var Data_Functor = __webpack_require__(0);
            var Data_HeytingAlgebra = __webpack_require__(21);
            var Data_NaturalTransformation = __webpack_require__(65);
            var Data_Ord = __webpack_require__(10);
            var Data_Ordering = __webpack_require__(19);
            var Data_Ring = __webpack_require__(22);
            var Data_Semigroup = __webpack_require__(4);
            var Data_Semiring = __webpack_require__(9);
            var Data_Show = __webpack_require__(7);
            var Data_Unit = __webpack_require__(1);
            var Data_Void = __webpack_require__(25);
            module.exports = {};

            /***/
        },
        /* 6 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var $foreign = __webpack_require__(54);
            var Data_Unit = __webpack_require__(1);
            var Data_Void = __webpack_require__(25);
            var Eq = function Eq(eq) {
                this.eq = eq;
            };
            var Eq1 = function Eq1(eq1) {
                this.eq1 = eq1;
            };
            var eqVoid = new Eq(function (v) {
                return function (v1) {
                    return true;
                };
            });
            var eqUnit = new Eq(function (v) {
                return function (v1) {
                    return true;
                };
            });
            var eqString = new Eq($foreign.refEq);
            var eqNumber = new Eq($foreign.refEq);
            var eqInt = new Eq($foreign.refEq);
            var eqChar = new Eq($foreign.refEq);
            var eqBoolean = new Eq($foreign.refEq);
            var eq1 = function eq1(dict) {
                return dict.eq1;
            };
            var eq = function eq(dict) {
                return dict.eq;
            };
            var eqArray = function eqArray(dictEq) {
                return new Eq($foreign.eqArrayImpl(eq(dictEq)));
            };
            var eq1Array = new Eq1(function (dictEq) {
                return eq(eqArray(dictEq));
            });
            var notEq = function notEq(dictEq) {
                return function (x) {
                    return function (y) {
                        return eq(eqBoolean)(eq(dictEq)(x)(y))(false);
                    };
                };
            };
            var notEq1 = function notEq1(dictEq1) {
                return function (dictEq) {
                    return function (x) {
                        return function (y) {
                            return eq(eqBoolean)(eq1(dictEq1)(dictEq)(x)(y))(false);
                        };
                    };
                };
            };
            module.exports = {
                Eq: Eq,
                eq: eq,
                notEq: notEq,
                Eq1: Eq1,
                eq1: eq1,
                notEq1: notEq1,
                eqBoolean: eqBoolean,
                eqInt: eqInt,
                eqNumber: eqNumber,
                eqChar: eqChar,
                eqString: eqString,
                eqUnit: eqUnit,
                eqVoid: eqVoid,
                eqArray: eqArray,
                eq1Array: eq1Array
            };

            /***/
        },
        /* 7 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var $foreign = __webpack_require__(52);
            var Show = function Show(show) {
                this.show = show;
            };
            var showString = new Show($foreign.showStringImpl);
            var showNumber = new Show($foreign.showNumberImpl);
            var showInt = new Show($foreign.showIntImpl);
            var showChar = new Show($foreign.showCharImpl);
            var showBoolean = new Show(function (v) {
                if (v) {
                    return "true";
                };
                if (!v) {
                    return "false";
                };
                throw new Error("Failed pattern match at Data.Show line 12, column 1 - line 12, column 37: " + [v.constructor.name]);
            });
            var show = function show(dict) {
                return dict.show;
            };
            var showArray = function showArray(dictShow) {
                return new Show($foreign.showArrayImpl(show(dictShow)));
            };
            module.exports = {
                Show: Show,
                show: show,
                showBoolean: showBoolean,
                showInt: showInt,
                showNumber: showNumber,
                showChar: showChar,
                showString: showString,
                showArray: showArray
            };

            /***/
        },
        /* 8 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var $foreign = __webpack_require__(53);
            var Control_Applicative = __webpack_require__(3);
            var Control_Apply = __webpack_require__(2);
            var Control_Category = __webpack_require__(13);
            var Data_Function = __webpack_require__(14);
            var Data_Functor = __webpack_require__(0);
            var Data_Unit = __webpack_require__(1);
            var Bind = function Bind(Apply0, bind) {
                this.Apply0 = Apply0;
                this.bind = bind;
            };
            var Discard = function Discard(discard) {
                this.discard = discard;
            };
            var discard = function discard(dict) {
                return dict.discard;
            };
            var bindFn = new Bind(function () {
                return Control_Apply.applyFn;
            }, function (m) {
                return function (f) {
                    return function (x) {
                        return f(m(x))(x);
                    };
                };
            });
            var bindArray = new Bind(function () {
                return Control_Apply.applyArray;
            }, $foreign.arrayBind);
            var bind = function bind(dict) {
                return dict.bind;
            };
            var bindFlipped = function bindFlipped(dictBind) {
                return Data_Function.flip(bind(dictBind));
            };
            var composeKleisliFlipped = function composeKleisliFlipped(dictBind) {
                return function (f) {
                    return function (g) {
                        return function (a) {
                            return bindFlipped(dictBind)(f)(g(a));
                        };
                    };
                };
            };
            var composeKleisli = function composeKleisli(dictBind) {
                return function (f) {
                    return function (g) {
                        return function (a) {
                            return bind(dictBind)(f(a))(g);
                        };
                    };
                };
            };
            var discardUnit = new Discard(function (dictBind) {
                return bind(dictBind);
            });
            var ifM = function ifM(dictBind) {
                return function (cond) {
                    return function (t) {
                        return function (f) {
                            return bind(dictBind)(cond)(function (cond$prime) {
                                if (cond$prime) {
                                    return t;
                                };
                                return f;
                            });
                        };
                    };
                };
            };
            var join = function join(dictBind) {
                return function (m) {
                    return bind(dictBind)(m)(Control_Category.id(Control_Category.categoryFn));
                };
            };
            module.exports = {
                Bind: Bind,
                bind: bind,
                bindFlipped: bindFlipped,
                Discard: Discard,
                discard: discard,
                join: join,
                composeKleisli: composeKleisli,
                composeKleisliFlipped: composeKleisliFlipped,
                ifM: ifM,
                bindFn: bindFn,
                bindArray: bindArray,
                discardUnit: discardUnit
            };

            /***/
        },
        /* 9 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var $foreign = __webpack_require__(58);
            var Data_Unit = __webpack_require__(1);
            var Semiring = function Semiring(add, mul, one, zero) {
                this.add = add;
                this.mul = mul;
                this.one = one;
                this.zero = zero;
            };
            var zero = function zero(dict) {
                return dict.zero;
            };
            var semiringUnit = new Semiring(function (v) {
                return function (v1) {
                    return Data_Unit.unit;
                };
            }, function (v) {
                return function (v1) {
                    return Data_Unit.unit;
                };
            }, Data_Unit.unit, Data_Unit.unit);
            var semiringNumber = new Semiring($foreign.numAdd, $foreign.numMul, 1.0, 0.0);
            var semiringInt = new Semiring($foreign.intAdd, $foreign.intMul, 1, 0);
            var one = function one(dict) {
                return dict.one;
            };
            var mul = function mul(dict) {
                return dict.mul;
            };
            var add = function add(dict) {
                return dict.add;
            };
            var semiringFn = function semiringFn(dictSemiring) {
                return new Semiring(function (f) {
                    return function (g) {
                        return function (x) {
                            return add(dictSemiring)(f(x))(g(x));
                        };
                    };
                }, function (f) {
                    return function (g) {
                        return function (x) {
                            return mul(dictSemiring)(f(x))(g(x));
                        };
                    };
                }, function (v) {
                    return one(dictSemiring);
                }, function (v) {
                    return zero(dictSemiring);
                });
            };
            module.exports = {
                Semiring: Semiring,
                add: add,
                zero: zero,
                mul: mul,
                one: one,
                semiringInt: semiringInt,
                semiringNumber: semiringNumber,
                semiringFn: semiringFn,
                semiringUnit: semiringUnit
            };

            /***/
        },
        /* 10 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var $foreign = __webpack_require__(59);
            var Data_Eq = __webpack_require__(6);
            var Data_Function = __webpack_require__(14);
            var Data_Ord_Unsafe = __webpack_require__(60);
            var Data_Ordering = __webpack_require__(19);
            var Data_Ring = __webpack_require__(22);
            var Data_Semiring = __webpack_require__(9);
            var Data_Unit = __webpack_require__(1);
            var Data_Void = __webpack_require__(25);
            var Ord = function Ord(Eq0, compare) {
                this.Eq0 = Eq0;
                this.compare = compare;
            };
            var Ord1 = function Ord1(Eq10, compare1) {
                this.Eq10 = Eq10;
                this.compare1 = compare1;
            };
            var ordVoid = new Ord(function () {
                return Data_Eq.eqVoid;
            }, function (v) {
                return function (v1) {
                    return Data_Ordering.EQ.value;
                };
            });
            var ordUnit = new Ord(function () {
                return Data_Eq.eqUnit;
            }, function (v) {
                return function (v1) {
                    return Data_Ordering.EQ.value;
                };
            });
            var ordString = new Ord(function () {
                return Data_Eq.eqString;
            }, Data_Ord_Unsafe.unsafeCompare);
            var ordOrdering = new Ord(function () {
                return Data_Ordering.eqOrdering;
            }, function (v) {
                return function (v1) {
                    if (v instanceof Data_Ordering.LT && v1 instanceof Data_Ordering.LT) {
                        return Data_Ordering.EQ.value;
                    };
                    if (v instanceof Data_Ordering.EQ && v1 instanceof Data_Ordering.EQ) {
                        return Data_Ordering.EQ.value;
                    };
                    if (v instanceof Data_Ordering.GT && v1 instanceof Data_Ordering.GT) {
                        return Data_Ordering.EQ.value;
                    };
                    if (v instanceof Data_Ordering.LT) {
                        return Data_Ordering.LT.value;
                    };
                    if (v instanceof Data_Ordering.EQ && v1 instanceof Data_Ordering.LT) {
                        return Data_Ordering.GT.value;
                    };
                    if (v instanceof Data_Ordering.EQ && v1 instanceof Data_Ordering.GT) {
                        return Data_Ordering.LT.value;
                    };
                    if (v instanceof Data_Ordering.GT) {
                        return Data_Ordering.GT.value;
                    };
                    throw new Error("Failed pattern match at Data.Ord line 68, column 1 - line 68, column 37: " + [v.constructor.name, v1.constructor.name]);
                };
            });
            var ordNumber = new Ord(function () {
                return Data_Eq.eqNumber;
            }, Data_Ord_Unsafe.unsafeCompare);
            var ordInt = new Ord(function () {
                return Data_Eq.eqInt;
            }, Data_Ord_Unsafe.unsafeCompare);
            var ordChar = new Ord(function () {
                return Data_Eq.eqChar;
            }, Data_Ord_Unsafe.unsafeCompare);
            var ordBoolean = new Ord(function () {
                return Data_Eq.eqBoolean;
            }, Data_Ord_Unsafe.unsafeCompare);
            var compare1 = function compare1(dict) {
                return dict.compare1;
            };
            var compare = function compare(dict) {
                return dict.compare;
            };
            var comparing = function comparing(dictOrd) {
                return function (f) {
                    return Data_Function.on(compare(dictOrd))(f);
                };
            };
            var greaterThan = function greaterThan(dictOrd) {
                return function (a1) {
                    return function (a2) {
                        var v = compare(dictOrd)(a1)(a2);
                        if (v instanceof Data_Ordering.GT) {
                            return true;
                        };
                        return false;
                    };
                };
            };
            var greaterThanOrEq = function greaterThanOrEq(dictOrd) {
                return function (a1) {
                    return function (a2) {
                        var v = compare(dictOrd)(a1)(a2);
                        if (v instanceof Data_Ordering.LT) {
                            return false;
                        };
                        return true;
                    };
                };
            };
            var signum = function signum(dictOrd) {
                return function (dictRing) {
                    return function (x) {
                        var $33 = greaterThanOrEq(dictOrd)(x)(Data_Semiring.zero(dictRing.Semiring0()));
                        if ($33) {
                            return Data_Semiring.one(dictRing.Semiring0());
                        };
                        return Data_Ring.negate(dictRing)(Data_Semiring.one(dictRing.Semiring0()));
                    };
                };
            };
            var lessThan = function lessThan(dictOrd) {
                return function (a1) {
                    return function (a2) {
                        var v = compare(dictOrd)(a1)(a2);
                        if (v instanceof Data_Ordering.LT) {
                            return true;
                        };
                        return false;
                    };
                };
            };
            var lessThanOrEq = function lessThanOrEq(dictOrd) {
                return function (a1) {
                    return function (a2) {
                        var v = compare(dictOrd)(a1)(a2);
                        if (v instanceof Data_Ordering.GT) {
                            return false;
                        };
                        return true;
                    };
                };
            };
            var max = function max(dictOrd) {
                return function (x) {
                    return function (y) {
                        var v = compare(dictOrd)(x)(y);
                        if (v instanceof Data_Ordering.LT) {
                            return y;
                        };
                        if (v instanceof Data_Ordering.EQ) {
                            return x;
                        };
                        if (v instanceof Data_Ordering.GT) {
                            return x;
                        };
                        throw new Error("Failed pattern match at Data.Ord line 123, column 3 - line 126, column 12: " + [v.constructor.name]);
                    };
                };
            };
            var min = function min(dictOrd) {
                return function (x) {
                    return function (y) {
                        var v = compare(dictOrd)(x)(y);
                        if (v instanceof Data_Ordering.LT) {
                            return x;
                        };
                        if (v instanceof Data_Ordering.EQ) {
                            return x;
                        };
                        if (v instanceof Data_Ordering.GT) {
                            return y;
                        };
                        throw new Error("Failed pattern match at Data.Ord line 114, column 3 - line 117, column 12: " + [v.constructor.name]);
                    };
                };
            };
            var ordArray = function ordArray(dictOrd) {
                return new Ord(function () {
                    return Data_Eq.eqArray(dictOrd.Eq0());
                }, function () {
                    var toDelta = function toDelta(x) {
                        return function (y) {
                            var v = compare(dictOrd)(x)(y);
                            if (v instanceof Data_Ordering.EQ) {
                                return 0;
                            };
                            if (v instanceof Data_Ordering.LT) {
                                return 1;
                            };
                            if (v instanceof Data_Ordering.GT) {
                                return -1 | 0;
                            };
                            throw new Error("Failed pattern match at Data.Ord line 61, column 7 - line 66, column 1: " + [v.constructor.name]);
                        };
                    };
                    return function (xs) {
                        return function (ys) {
                            return compare(ordInt)(0)($foreign.ordArrayImpl(toDelta)(xs)(ys));
                        };
                    };
                }());
            };
            var ord1Array = new Ord1(function () {
                return Data_Eq.eq1Array;
            }, function (dictOrd) {
                return compare(ordArray(dictOrd));
            });
            var clamp = function clamp(dictOrd) {
                return function (low) {
                    return function (hi) {
                        return function (x) {
                            return min(dictOrd)(hi)(max(dictOrd)(low)(x));
                        };
                    };
                };
            };
            var between = function between(dictOrd) {
                return function (low) {
                    return function (hi) {
                        return function (x) {
                            if (lessThan(dictOrd)(x)(low)) {
                                return false;
                            };
                            if (greaterThan(dictOrd)(x)(hi)) {
                                return false;
                            };
                            return true;
                        };
                    };
                };
            };
            var abs = function abs(dictOrd) {
                return function (dictRing) {
                    return function (x) {
                        var $42 = greaterThanOrEq(dictOrd)(x)(Data_Semiring.zero(dictRing.Semiring0()));
                        if ($42) {
                            return x;
                        };
                        return Data_Ring.negate(dictRing)(x);
                    };
                };
            };
            module.exports = {
                Ord: Ord,
                compare: compare,
                Ord1: Ord1,
                compare1: compare1,
                lessThan: lessThan,
                lessThanOrEq: lessThanOrEq,
                greaterThan: greaterThan,
                greaterThanOrEq: greaterThanOrEq,
                comparing: comparing,
                min: min,
                max: max,
                clamp: clamp,
                between: between,
                abs: abs,
                signum: signum,
                ordBoolean: ordBoolean,
                ordInt: ordInt,
                ordNumber: ordNumber,
                ordString: ordString,
                ordChar: ordChar,
                ordUnit: ordUnit,
                ordVoid: ordVoid,
                ordArray: ordArray,
                ordOrdering: ordOrdering,
                ord1Array: ord1Array
            };

            /***/
        },
        /* 11 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var Control_Applicative = __webpack_require__(3);
            var Control_Apply = __webpack_require__(2);
            var Control_Bind = __webpack_require__(8);
            var Data_Functor = __webpack_require__(0);
            var Data_Unit = __webpack_require__(1);
            var Monad = function Monad(Applicative0, Bind1) {
                this.Applicative0 = Applicative0;
                this.Bind1 = Bind1;
            };
            var whenM = function whenM(dictMonad) {
                return function (mb) {
                    return function (m) {
                        return Control_Bind.bind(dictMonad.Bind1())(mb)(function (v) {
                            return Control_Applicative.when(dictMonad.Applicative0())(v)(m);
                        });
                    };
                };
            };
            var unlessM = function unlessM(dictMonad) {
                return function (mb) {
                    return function (m) {
                        return Control_Bind.bind(dictMonad.Bind1())(mb)(function (v) {
                            return Control_Applicative.unless(dictMonad.Applicative0())(v)(m);
                        });
                    };
                };
            };
            var monadFn = new Monad(function () {
                return Control_Applicative.applicativeFn;
            }, function () {
                return Control_Bind.bindFn;
            });
            var monadArray = new Monad(function () {
                return Control_Applicative.applicativeArray;
            }, function () {
                return Control_Bind.bindArray;
            });
            var liftM1 = function liftM1(dictMonad) {
                return function (f) {
                    return function (a) {
                        return Control_Bind.bind(dictMonad.Bind1())(a)(function (v) {
                            return Control_Applicative.pure(dictMonad.Applicative0())(f(v));
                        });
                    };
                };
            };
            var ap = function ap(dictMonad) {
                return function (f) {
                    return function (a) {
                        return Control_Bind.bind(dictMonad.Bind1())(f)(function (v) {
                            return Control_Bind.bind(dictMonad.Bind1())(a)(function (v1) {
                                return Control_Applicative.pure(dictMonad.Applicative0())(v(v1));
                            });
                        });
                    };
                };
            };
            module.exports = {
                Monad: Monad,
                liftM1: liftM1,
                ap: ap,
                whenM: whenM,
                unlessM: unlessM,
                monadFn: monadFn,
                monadArray: monadArray
            };

            /***/
        },
        /* 12 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var Data_Boolean = __webpack_require__(32);
            var Data_Eq = __webpack_require__(6);
            var Data_EuclideanRing = __webpack_require__(26);
            var Data_Function = __webpack_require__(14);
            var Data_Ord = __webpack_require__(10);
            var Data_Ordering = __webpack_require__(19);
            var Data_Semigroup = __webpack_require__(4);
            var Data_Unit = __webpack_require__(1);
            var Prelude = __webpack_require__(5);
            var Monoid = function Monoid(Semigroup0, mempty) {
                this.Semigroup0 = Semigroup0;
                this.mempty = mempty;
            };
            var monoidUnit = new Monoid(function () {
                return Data_Semigroup.semigroupUnit;
            }, Data_Unit.unit);
            var monoidString = new Monoid(function () {
                return Data_Semigroup.semigroupString;
            }, "");
            var monoidOrdering = new Monoid(function () {
                return Data_Ordering.semigroupOrdering;
            }, Data_Ordering.EQ.value);
            var monoidArray = new Monoid(function () {
                return Data_Semigroup.semigroupArray;
            }, []);
            var mempty = function mempty(dict) {
                return dict.mempty;
            };
            var monoidFn = function monoidFn(dictMonoid) {
                return new Monoid(function () {
                    return Data_Semigroup.semigroupFn(dictMonoid.Semigroup0());
                }, Data_Function["const"](mempty(dictMonoid)));
            };
            var power = function power(dictMonoid) {
                return function (x) {
                    var go = function go(p) {
                        if (p <= 0) {
                            return mempty(dictMonoid);
                        };
                        if (p === 1) {
                            return x;
                        };
                        if (p % 2 === 0) {
                            var x$prime = go(p / 2 | 0);
                            return Data_Semigroup.append(dictMonoid.Semigroup0())(x$prime)(x$prime);
                        };
                        if (Data_Boolean.otherwise) {
                            var x$prime = go(p / 2 | 0);
                            return Data_Semigroup.append(dictMonoid.Semigroup0())(x$prime)(Data_Semigroup.append(dictMonoid.Semigroup0())(x$prime)(x));
                        };
                        throw new Error("Failed pattern match at Data.Monoid line 52, column 3 - line 52, column 17: " + [p.constructor.name]);
                    };
                    return go;
                };
            };
            var guard = function guard(dictMonoid) {
                return function (v) {
                    return function (v1) {
                        if (v) {
                            return v1;
                        };
                        if (!v) {
                            return mempty(dictMonoid);
                        };
                        throw new Error("Failed pattern match at Data.Monoid line 60, column 1 - line 60, column 49: " + [v.constructor.name, v1.constructor.name]);
                    };
                };
            };
            module.exports = {
                Monoid: Monoid,
                mempty: mempty,
                power: power,
                guard: guard,
                monoidUnit: monoidUnit,
                monoidOrdering: monoidOrdering,
                monoidFn: monoidFn,
                monoidString: monoidString,
                monoidArray: monoidArray
            };

            /***/
        },
        /* 13 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var Control_Semigroupoid = __webpack_require__(20);
            var Category = function Category(Semigroupoid0, id) {
                this.Semigroupoid0 = Semigroupoid0;
                this.id = id;
            };
            var id = function id(dict) {
                return dict.id;
            };
            var categoryFn = new Category(function () {
                return Control_Semigroupoid.semigroupoidFn;
            }, function (x) {
                return x;
            });
            module.exports = {
                Category: Category,
                id: id,
                categoryFn: categoryFn
            };

            /***/
        },
        /* 14 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var Control_Category = __webpack_require__(13);
            var on = function on(f) {
                return function (g) {
                    return function (x) {
                        return function (y) {
                            return f(g(x))(g(y));
                        };
                    };
                };
            };
            var flip = function flip(f) {
                return function (b) {
                    return function (a) {
                        return f(a)(b);
                    };
                };
            };
            var $$const = function $$const(a) {
                return function (v) {
                    return a;
                };
            };
            var applyFlipped = function applyFlipped(x) {
                return function (f) {
                    return f(x);
                };
            };
            var apply = function apply(f) {
                return function (x) {
                    return f(x);
                };
            };
            module.exports = {
                flip: flip,
                "const": $$const,
                apply: apply,
                applyFlipped: applyFlipped,
                on: on
            };

            /***/
        },
        /* 15 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var $foreign = __webpack_require__(63);
            var Data_Ord = __webpack_require__(10);
            var Data_Ordering = __webpack_require__(19);
            var Data_Unit = __webpack_require__(1);
            var Bounded = function Bounded(Ord0, bottom, top) {
                this.Ord0 = Ord0;
                this.bottom = bottom;
                this.top = top;
            };
            var top = function top(dict) {
                return dict.top;
            };
            var boundedUnit = new Bounded(function () {
                return Data_Ord.ordUnit;
            }, Data_Unit.unit, Data_Unit.unit);
            var boundedOrdering = new Bounded(function () {
                return Data_Ord.ordOrdering;
            }, Data_Ordering.LT.value, Data_Ordering.GT.value);
            var boundedInt = new Bounded(function () {
                return Data_Ord.ordInt;
            }, $foreign.bottomInt, $foreign.topInt);
            var boundedChar = new Bounded(function () {
                return Data_Ord.ordChar;
            }, $foreign.bottomChar, $foreign.topChar);
            var boundedBoolean = new Bounded(function () {
                return Data_Ord.ordBoolean;
            }, false, true);
            var bottom = function bottom(dict) {
                return dict.bottom;
            };
            module.exports = {
                Bounded: Bounded,
                bottom: bottom,
                top: top,
                boundedBoolean: boundedBoolean,
                boundedInt: boundedInt,
                boundedChar: boundedChar,
                boundedOrdering: boundedOrdering,
                boundedUnit: boundedUnit
            };

            /***/
        },
        /* 16 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var $foreign = __webpack_require__(72);
            var Control_Category = __webpack_require__(13);
            var Data_Functor = __webpack_require__(0);
            var Data_Semigroup = __webpack_require__(4);
            var Extend = function Extend(Functor0, extend) {
                this.Functor0 = Functor0;
                this.extend = extend;
            };
            var extendFn = function extendFn(dictSemigroup) {
                return new Extend(function () {
                    return Data_Functor.functorFn;
                }, function (f) {
                    return function (g) {
                        return function (w) {
                            return f(function (w$prime) {
                                return g(Data_Semigroup.append(dictSemigroup)(w)(w$prime));
                            });
                        };
                    };
                });
            };
            var extendArray = new Extend(function () {
                return Data_Functor.functorArray;
            }, $foreign.arrayExtend);
            var extend = function extend(dict) {
                return dict.extend;
            };
            var extendFlipped = function extendFlipped(dictExtend) {
                return function (w) {
                    return function (f) {
                        return extend(dictExtend)(f)(w);
                    };
                };
            };
            var duplicate = function duplicate(dictExtend) {
                return extend(dictExtend)(Control_Category.id(Control_Category.categoryFn));
            };
            var composeCoKleisliFlipped = function composeCoKleisliFlipped(dictExtend) {
                return function (f) {
                    return function (g) {
                        return function (w) {
                            return f(extend(dictExtend)(g)(w));
                        };
                    };
                };
            };
            var composeCoKleisli = function composeCoKleisli(dictExtend) {
                return function (f) {
                    return function (g) {
                        return function (w) {
                            return g(extend(dictExtend)(f)(w));
                        };
                    };
                };
            };
            module.exports = {
                Extend: Extend,
                extend: extend,
                extendFlipped: extendFlipped,
                composeCoKleisli: composeCoKleisli,
                composeCoKleisliFlipped: composeCoKleisliFlipped,
                duplicate: duplicate,
                extendFn: extendFn,
                extendArray: extendArray
            };

            /***/
        },
        /* 17 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var Data_Functor = __webpack_require__(0);
            var Invariant = function Invariant(imap) {
                this.imap = imap;
            };
            var imapF = function imapF(dictFunctor) {
                return function (f) {
                    return function (v) {
                        return Data_Functor.map(dictFunctor)(f);
                    };
                };
            };
            var invariantArray = new Invariant(imapF(Data_Functor.functorArray));
            var invariantFn = new Invariant(imapF(Data_Functor.functorFn));
            var imap = function imap(dict) {
                return dict.imap;
            };
            module.exports = {
                imap: imap,
                Invariant: Invariant,
                imapF: imapF,
                invariantFn: invariantFn,
                invariantArray: invariantArray
            };

            /***/
        },
        /* 18 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var Control_Semigroupoid = __webpack_require__(20);
            var Data_Function = __webpack_require__(14);
            var Data_Functor = __webpack_require__(0);
            var Prelude = __webpack_require__(5);
            var Newtype = function Newtype(unwrap, wrap) {
                this.unwrap = unwrap;
                this.wrap = wrap;
            };
            var wrap = function wrap(dict) {
                return dict.wrap;
            };
            var unwrap = function unwrap(dict) {
                return dict.unwrap;
            };
            var underF2 = function underF2(dictFunctor) {
                return function (dictFunctor1) {
                    return function (dictNewtype) {
                        return function (dictNewtype1) {
                            return function (v) {
                                return function (f) {
                                    return function ($50) {
                                        return function ($51) {
                                            return Data_Functor.map(dictFunctor1)(unwrap(dictNewtype1))(Data_Function.on(f)(Data_Functor.map(dictFunctor)(wrap(dictNewtype)))($50)($51));
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
            var underF = function underF(dictFunctor) {
                return function (dictFunctor1) {
                    return function (dictNewtype) {
                        return function (dictNewtype1) {
                            return function (v) {
                                return function (f) {
                                    return function ($52) {
                                        return Data_Functor.map(dictFunctor1)(unwrap(dictNewtype1))(f(Data_Functor.map(dictFunctor)(wrap(dictNewtype))($52)));
                                    };
                                };
                            };
                        };
                    };
                };
            };
            var under2 = function under2(dictNewtype) {
                return function (dictNewtype1) {
                    return function (v) {
                        return function (f) {
                            return function ($53) {
                                return function ($54) {
                                    return unwrap(dictNewtype1)(Data_Function.on(f)(wrap(dictNewtype))($53)($54));
                                };
                            };
                        };
                    };
                };
            };
            var under = function under(dictNewtype) {
                return function (dictNewtype1) {
                    return function (v) {
                        return function (f) {
                            return function ($55) {
                                return unwrap(dictNewtype1)(f(wrap(dictNewtype)($55)));
                            };
                        };
                    };
                };
            };
            var un = function un(dictNewtype) {
                return function (v) {
                    return unwrap(dictNewtype);
                };
            };
            var traverse = function traverse(dictFunctor) {
                return function (dictNewtype) {
                    return function (v) {
                        return function (f) {
                            return function ($56) {
                                return Data_Functor.map(dictFunctor)(wrap(dictNewtype))(f(unwrap(dictNewtype)($56)));
                            };
                        };
                    };
                };
            };
            var overF2 = function overF2(dictFunctor) {
                return function (dictFunctor1) {
                    return function (dictNewtype) {
                        return function (dictNewtype1) {
                            return function (v) {
                                return function (f) {
                                    return function ($57) {
                                        return function ($58) {
                                            return Data_Functor.map(dictFunctor1)(wrap(dictNewtype1))(Data_Function.on(f)(Data_Functor.map(dictFunctor)(unwrap(dictNewtype)))($57)($58));
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
            var overF = function overF(dictFunctor) {
                return function (dictFunctor1) {
                    return function (dictNewtype) {
                        return function (dictNewtype1) {
                            return function (v) {
                                return function (f) {
                                    return function ($59) {
                                        return Data_Functor.map(dictFunctor1)(wrap(dictNewtype1))(f(Data_Functor.map(dictFunctor)(unwrap(dictNewtype))($59)));
                                    };
                                };
                            };
                        };
                    };
                };
            };
            var over2 = function over2(dictNewtype) {
                return function (dictNewtype1) {
                    return function (v) {
                        return function (f) {
                            return function ($60) {
                                return function ($61) {
                                    return wrap(dictNewtype1)(Data_Function.on(f)(unwrap(dictNewtype))($60)($61));
                                };
                            };
                        };
                    };
                };
            };
            var over = function over(dictNewtype) {
                return function (dictNewtype1) {
                    return function (v) {
                        return function (f) {
                            return function ($62) {
                                return wrap(dictNewtype1)(f(unwrap(dictNewtype)($62)));
                            };
                        };
                    };
                };
            };
            var op = function op(dictNewtype) {
                return un(dictNewtype);
            };
            var collect = function collect(dictFunctor) {
                return function (dictNewtype) {
                    return function (v) {
                        return function (f) {
                            return function ($63) {
                                return wrap(dictNewtype)(f(Data_Functor.map(dictFunctor)(unwrap(dictNewtype))($63)));
                            };
                        };
                    };
                };
            };
            var alaF = function alaF(dictFunctor) {
                return function (dictFunctor1) {
                    return function (dictNewtype) {
                        return function (dictNewtype1) {
                            return function (v) {
                                return function (f) {
                                    return function ($64) {
                                        return Data_Functor.map(dictFunctor1)(unwrap(dictNewtype1))(f(Data_Functor.map(dictFunctor)(wrap(dictNewtype))($64)));
                                    };
                                };
                            };
                        };
                    };
                };
            };
            var ala = function ala(dictFunctor) {
                return function (dictNewtype) {
                    return function (dictNewtype1) {
                        return function (v) {
                            return function (f) {
                                return Data_Functor.map(dictFunctor)(unwrap(dictNewtype))(f(wrap(dictNewtype1)));
                            };
                        };
                    };
                };
            };
            module.exports = {
                unwrap: unwrap,
                wrap: wrap,
                Newtype: Newtype,
                un: un,
                op: op,
                ala: ala,
                alaF: alaF,
                over: over,
                overF: overF,
                under: under,
                underF: underF,
                over2: over2,
                overF2: overF2,
                under2: under2,
                underF2: underF2,
                traverse: traverse,
                collect: collect
            };

            /***/
        },
        /* 19 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var Data_Eq = __webpack_require__(6);
            var Data_Semigroup = __webpack_require__(4);
            var Data_Show = __webpack_require__(7);
            var LT = function () {
                function LT() {};
                LT.value = new LT();
                return LT;
            }();
            var GT = function () {
                function GT() {};
                GT.value = new GT();
                return GT;
            }();
            var EQ = function () {
                function EQ() {};
                EQ.value = new EQ();
                return EQ;
            }();
            var showOrdering = new Data_Show.Show(function (v) {
                if (v instanceof LT) {
                    return "LT";
                };
                if (v instanceof GT) {
                    return "GT";
                };
                if (v instanceof EQ) {
                    return "EQ";
                };
                throw new Error("Failed pattern match at Data.Ordering line 26, column 1 - line 26, column 39: " + [v.constructor.name]);
            });
            var semigroupOrdering = new Data_Semigroup.Semigroup(function (v) {
                return function (v1) {
                    if (v instanceof LT) {
                        return LT.value;
                    };
                    if (v instanceof GT) {
                        return GT.value;
                    };
                    if (v instanceof EQ) {
                        return v1;
                    };
                    throw new Error("Failed pattern match at Data.Ordering line 21, column 1 - line 21, column 49: " + [v.constructor.name, v1.constructor.name]);
                };
            });
            var invert = function invert(v) {
                if (v instanceof GT) {
                    return LT.value;
                };
                if (v instanceof EQ) {
                    return EQ.value;
                };
                if (v instanceof LT) {
                    return GT.value;
                };
                throw new Error("Failed pattern match at Data.Ordering line 33, column 1 - line 33, column 31: " + [v.constructor.name]);
            };
            var eqOrdering = new Data_Eq.Eq(function (v) {
                return function (v1) {
                    if (v instanceof LT && v1 instanceof LT) {
                        return true;
                    };
                    if (v instanceof GT && v1 instanceof GT) {
                        return true;
                    };
                    if (v instanceof EQ && v1 instanceof EQ) {
                        return true;
                    };
                    return false;
                };
            });
            module.exports = {
                LT: LT,
                GT: GT,
                EQ: EQ,
                invert: invert,
                eqOrdering: eqOrdering,
                semigroupOrdering: semigroupOrdering,
                showOrdering: showOrdering
            };

            /***/
        },
        /* 20 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var Semigroupoid = function Semigroupoid(compose) {
                this.compose = compose;
            };
            var semigroupoidFn = new Semigroupoid(function (f) {
                return function (g) {
                    return function (x) {
                        return f(g(x));
                    };
                };
            });
            var compose = function compose(dict) {
                return dict.compose;
            };
            var composeFlipped = function composeFlipped(dictSemigroupoid) {
                return function (f) {
                    return function (g) {
                        return compose(dictSemigroupoid)(g)(f);
                    };
                };
            };
            module.exports = {
                compose: compose,
                Semigroupoid: Semigroupoid,
                composeFlipped: composeFlipped,
                semigroupoidFn: semigroupoidFn
            };

            /***/
        },
        /* 21 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var $foreign = __webpack_require__(56);
            var Data_Unit = __webpack_require__(1);
            var HeytingAlgebra = function HeytingAlgebra(conj, disj, ff, implies, not, tt) {
                this.conj = conj;
                this.disj = disj;
                this.ff = ff;
                this.implies = implies;
                this.not = not;
                this.tt = tt;
            };
            var tt = function tt(dict) {
                return dict.tt;
            };
            var not = function not(dict) {
                return dict.not;
            };
            var implies = function implies(dict) {
                return dict.implies;
            };
            var heytingAlgebraUnit = new HeytingAlgebra(function (v) {
                return function (v1) {
                    return Data_Unit.unit;
                };
            }, function (v) {
                return function (v1) {
                    return Data_Unit.unit;
                };
            }, Data_Unit.unit, function (v) {
                return function (v1) {
                    return Data_Unit.unit;
                };
            }, function (v) {
                return Data_Unit.unit;
            }, Data_Unit.unit);
            var ff = function ff(dict) {
                return dict.ff;
            };
            var disj = function disj(dict) {
                return dict.disj;
            };
            var heytingAlgebraBoolean = new HeytingAlgebra($foreign.boolConj, $foreign.boolDisj, false, function (a) {
                return function (b) {
                    return disj(heytingAlgebraBoolean)(not(heytingAlgebraBoolean)(a))(b);
                };
            }, $foreign.boolNot, true);
            var conj = function conj(dict) {
                return dict.conj;
            };
            var heytingAlgebraFunction = function heytingAlgebraFunction(dictHeytingAlgebra) {
                return new HeytingAlgebra(function (f) {
                    return function (g) {
                        return function (a) {
                            return conj(dictHeytingAlgebra)(f(a))(g(a));
                        };
                    };
                }, function (f) {
                    return function (g) {
                        return function (a) {
                            return disj(dictHeytingAlgebra)(f(a))(g(a));
                        };
                    };
                }, function (v) {
                    return ff(dictHeytingAlgebra);
                }, function (f) {
                    return function (g) {
                        return function (a) {
                            return implies(dictHeytingAlgebra)(f(a))(g(a));
                        };
                    };
                }, function (f) {
                    return function (a) {
                        return not(dictHeytingAlgebra)(f(a));
                    };
                }, function (v) {
                    return tt(dictHeytingAlgebra);
                });
            };
            module.exports = {
                HeytingAlgebra: HeytingAlgebra,
                tt: tt,
                ff: ff,
                implies: implies,
                conj: conj,
                disj: disj,
                not: not,
                heytingAlgebraBoolean: heytingAlgebraBoolean,
                heytingAlgebraUnit: heytingAlgebraUnit,
                heytingAlgebraFunction: heytingAlgebraFunction
            };

            /***/
        },
        /* 22 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var $foreign = __webpack_require__(57);
            var Data_Semiring = __webpack_require__(9);
            var Data_Unit = __webpack_require__(1);
            var Ring = function Ring(Semiring0, sub) {
                this.Semiring0 = Semiring0;
                this.sub = sub;
            };
            var sub = function sub(dict) {
                return dict.sub;
            };
            var ringUnit = new Ring(function () {
                return Data_Semiring.semiringUnit;
            }, function (v) {
                return function (v1) {
                    return Data_Unit.unit;
                };
            });
            var ringNumber = new Ring(function () {
                return Data_Semiring.semiringNumber;
            }, $foreign.numSub);
            var ringInt = new Ring(function () {
                return Data_Semiring.semiringInt;
            }, $foreign.intSub);
            var ringFn = function ringFn(dictRing) {
                return new Ring(function () {
                    return Data_Semiring.semiringFn(dictRing.Semiring0());
                }, function (f) {
                    return function (g) {
                        return function (x) {
                            return sub(dictRing)(f(x))(g(x));
                        };
                    };
                });
            };
            var negate = function negate(dictRing) {
                return function (a) {
                    return sub(dictRing)(Data_Semiring.zero(dictRing.Semiring0()))(a);
                };
            };
            module.exports = {
                Ring: Ring,
                sub: sub,
                negate: negate,
                ringInt: ringInt,
                ringNumber: ringNumber,
                ringUnit: ringUnit,
                ringFn: ringFn
            };

            /***/
        },
        /* 23 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var Data_Functor = __webpack_require__(0);
            var Data_Semigroup = __webpack_require__(4);
            var Alt = function Alt(Functor0, alt) {
                this.Functor0 = Functor0;
                this.alt = alt;
            };
            var altArray = new Alt(function () {
                return Data_Functor.functorArray;
            }, Data_Semigroup.append(Data_Semigroup.semigroupArray));
            var alt = function alt(dict) {
                return dict.alt;
            };
            module.exports = {
                Alt: Alt,
                alt: alt,
                altArray: altArray
            };

            /***/
        },
        /* 24 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var Control_Extend = __webpack_require__(16);
            var Data_Functor = __webpack_require__(0);
            var Comonad = function Comonad(Extend0, extract) {
                this.Extend0 = Extend0;
                this.extract = extract;
            };
            var extract = function extract(dict) {
                return dict.extract;
            };
            module.exports = {
                Comonad: Comonad,
                extract: extract
            };

            /***/
        },
        /* 25 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var Data_Show = __webpack_require__(7);
            var Void = function Void(x) {
                return x;
            };
            var absurd = function absurd(a) {
                var spin = function spin($copy_v) {
                    var $tco_result;
                    function $tco_loop(v) {
                        $copy_v = v;
                        return;
                    };
                    while (!false) {
                        $tco_result = $tco_loop($copy_v);
                    };
                    return $tco_result;
                };
                return spin(a);
            };
            var showVoid = new Data_Show.Show(absurd);
            module.exports = {
                absurd: absurd,
                showVoid: showVoid
            };

            /***/
        },
        /* 26 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var $foreign = __webpack_require__(55);
            var Data_BooleanAlgebra = __webpack_require__(33);
            var Data_CommutativeRing = __webpack_require__(29);
            var Data_Eq = __webpack_require__(6);
            var Data_HeytingAlgebra = __webpack_require__(21);
            var Data_Ring = __webpack_require__(22);
            var Data_Semiring = __webpack_require__(9);
            var EuclideanRing = function EuclideanRing(CommutativeRing0, degree, div, mod) {
                this.CommutativeRing0 = CommutativeRing0;
                this.degree = degree;
                this.div = div;
                this.mod = mod;
            };
            var mod = function mod(dict) {
                return dict.mod;
            };
            var gcd = function gcd($copy_dictEq) {
                return function ($copy_dictEuclideanRing) {
                    return function ($copy_a) {
                        return function ($copy_b) {
                            var $tco_var_dictEq = $copy_dictEq;
                            var $tco_var_dictEuclideanRing = $copy_dictEuclideanRing;
                            var $tco_var_a = $copy_a;
                            var $tco_done = false;
                            var $tco_result;
                            function $tco_loop(dictEq, dictEuclideanRing, a, b) {
                                var $7 = Data_Eq.eq(dictEq)(b)(Data_Semiring.zero(dictEuclideanRing.CommutativeRing0().Ring0().Semiring0()));
                                if ($7) {
                                    $tco_done = true;
                                    return a;
                                };
                                $tco_var_dictEq = dictEq;
                                $tco_var_dictEuclideanRing = dictEuclideanRing;
                                $tco_var_a = b;
                                $copy_b = mod(dictEuclideanRing)(a)(b);
                                return;
                            };
                            while (!$tco_done) {
                                $tco_result = $tco_loop($tco_var_dictEq, $tco_var_dictEuclideanRing, $tco_var_a, $copy_b);
                            };
                            return $tco_result;
                        };
                    };
                };
            };
            var euclideanRingNumber = new EuclideanRing(function () {
                return Data_CommutativeRing.commutativeRingNumber;
            }, function (v) {
                return 1;
            }, $foreign.numDiv, function (v) {
                return function (v1) {
                    return 0.0;
                };
            });
            var euclideanRingInt = new EuclideanRing(function () {
                return Data_CommutativeRing.commutativeRingInt;
            }, $foreign.intDegree, $foreign.intDiv, $foreign.intMod);
            var div = function div(dict) {
                return dict.div;
            };
            var lcm = function lcm(dictEq) {
                return function (dictEuclideanRing) {
                    return function (a) {
                        return function (b) {
                            var $8 = Data_Eq.eq(dictEq)(a)(Data_Semiring.zero(dictEuclideanRing.CommutativeRing0().Ring0().Semiring0())) || Data_Eq.eq(dictEq)(b)(Data_Semiring.zero(dictEuclideanRing.CommutativeRing0().Ring0().Semiring0()));
                            if ($8) {
                                return Data_Semiring.zero(dictEuclideanRing.CommutativeRing0().Ring0().Semiring0());
                            };
                            return div(dictEuclideanRing)(Data_Semiring.mul(dictEuclideanRing.CommutativeRing0().Ring0().Semiring0())(a)(b))(gcd(dictEq)(dictEuclideanRing)(a)(b));
                        };
                    };
                };
            };
            var degree = function degree(dict) {
                return dict.degree;
            };
            module.exports = {
                EuclideanRing: EuclideanRing,
                degree: degree,
                div: div,
                mod: mod,
                gcd: gcd,
                lcm: lcm,
                euclideanRingInt: euclideanRingInt,
                euclideanRingNumber: euclideanRingNumber
            };

            /***/
        },
        /* 27 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var Control_Alt = __webpack_require__(23);
            var Data_Functor = __webpack_require__(0);
            var Plus = function Plus(Alt0, empty) {
                this.Alt0 = Alt0;
                this.empty = empty;
            };
            var plusArray = new Plus(function () {
                return Control_Alt.altArray;
            }, []);
            var empty = function empty(dict) {
                return dict.empty;
            };
            module.exports = {
                Plus: Plus,
                empty: empty,
                plusArray: plusArray
            };

            /***/
        },
        /* 28 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var Control_Alt = __webpack_require__(23);
            var Control_Alternative = __webpack_require__(35);
            var Control_Applicative = __webpack_require__(3);
            var Control_Apply = __webpack_require__(2);
            var Control_Bind = __webpack_require__(8);
            var Control_Category = __webpack_require__(13);
            var Control_Extend = __webpack_require__(16);
            var Control_Monad = __webpack_require__(11);
            var Control_MonadZero = __webpack_require__(73);
            var Control_Plus = __webpack_require__(27);
            var Data_Bounded = __webpack_require__(15);
            var Data_Eq = __webpack_require__(6);
            var Data_Function = __webpack_require__(14);
            var Data_Functor = __webpack_require__(0);
            var Data_Functor_Invariant = __webpack_require__(17);
            var Data_Monoid = __webpack_require__(12);
            var Data_Ord = __webpack_require__(10);
            var Data_Ordering = __webpack_require__(19);
            var Data_Semigroup = __webpack_require__(4);
            var Data_Show = __webpack_require__(7);
            var Data_Unit = __webpack_require__(1);
            var Prelude = __webpack_require__(5);
            var Nothing = function () {
                function Nothing() {};
                Nothing.value = new Nothing();
                return Nothing;
            }();
            var Just = function () {
                function Just(value0) {
                    this.value0 = value0;
                };
                Just.create = function (value0) {
                    return new Just(value0);
                };
                return Just;
            }();
            var showMaybe = function showMaybe(dictShow) {
                return new Data_Show.Show(function (v) {
                    if (v instanceof Just) {
                        return "(Just " + (Data_Show.show(dictShow)(v.value0) + ")");
                    };
                    if (v instanceof Nothing) {
                        return "Nothing";
                    };
                    throw new Error("Failed pattern match at Data.Maybe line 207, column 1 - line 207, column 47: " + [v.constructor.name]);
                });
            };
            var semigroupMaybe = function semigroupMaybe(dictSemigroup) {
                return new Data_Semigroup.Semigroup(function (v) {
                    return function (v1) {
                        if (v instanceof Nothing) {
                            return v1;
                        };
                        if (v1 instanceof Nothing) {
                            return v;
                        };
                        if (v instanceof Just && v1 instanceof Just) {
                            return new Just(Data_Semigroup.append(dictSemigroup)(v.value0)(v1.value0));
                        };
                        throw new Error("Failed pattern match at Data.Maybe line 176, column 1 - line 176, column 62: " + [v.constructor.name, v1.constructor.name]);
                    };
                });
            };
            var monoidMaybe = function monoidMaybe(dictSemigroup) {
                return new Data_Monoid.Monoid(function () {
                    return semigroupMaybe(dictSemigroup);
                }, Nothing.value);
            };
            var maybe$prime = function maybe$prime(v) {
                return function (v1) {
                    return function (v2) {
                        if (v2 instanceof Nothing) {
                            return v(Data_Unit.unit);
                        };
                        if (v2 instanceof Just) {
                            return v1(v2.value0);
                        };
                        throw new Error("Failed pattern match at Data.Maybe line 232, column 1 - line 232, column 62: " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
                    };
                };
            };
            var maybe = function maybe(v) {
                return function (v1) {
                    return function (v2) {
                        if (v2 instanceof Nothing) {
                            return v;
                        };
                        if (v2 instanceof Just) {
                            return v1(v2.value0);
                        };
                        throw new Error("Failed pattern match at Data.Maybe line 219, column 1 - line 219, column 51: " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
                    };
                };
            };
            var isNothing = maybe(true)(Data_Function["const"](false));
            var isJust = maybe(false)(Data_Function["const"](true));
            var functorMaybe = new Data_Functor.Functor(function (v) {
                return function (v1) {
                    if (v1 instanceof Just) {
                        return new Just(v(v1.value0));
                    };
                    return Nothing.value;
                };
            });
            var invariantMaybe = new Data_Functor_Invariant.Invariant(Data_Functor_Invariant.imapF(functorMaybe));
            var fromMaybe$prime = function fromMaybe$prime(a) {
                return maybe$prime(a)(Control_Category.id(Control_Category.categoryFn));
            };
            var fromMaybe = function fromMaybe(a) {
                return maybe(a)(Control_Category.id(Control_Category.categoryFn));
            };
            var fromJust = function fromJust(dictPartial) {
                return function (v) {
                    var __unused = function __unused(dictPartial1) {
                        return function ($dollar34) {
                            return $dollar34;
                        };
                    };
                    return __unused(dictPartial)(function () {
                        if (v instanceof Just) {
                            return v.value0;
                        };
                        throw new Error("Failed pattern match at Data.Maybe line 270, column 1 - line 270, column 46: " + [v.constructor.name]);
                    }());
                };
            };
            var extendMaybe = new Control_Extend.Extend(function () {
                return functorMaybe;
            }, function (v) {
                return function (v1) {
                    if (v1 instanceof Nothing) {
                        return Nothing.value;
                    };
                    return new Just(v(v1));
                };
            });
            var eqMaybe = function eqMaybe(dictEq) {
                return new Data_Eq.Eq(function (x) {
                    return function (y) {
                        if (x instanceof Nothing && y instanceof Nothing) {
                            return true;
                        };
                        if (x instanceof Just && y instanceof Just) {
                            return Data_Eq.eq(dictEq)(x.value0)(y.value0);
                        };
                        return false;
                    };
                });
            };
            var ordMaybe = function ordMaybe(dictOrd) {
                return new Data_Ord.Ord(function () {
                    return eqMaybe(dictOrd.Eq0());
                }, function (x) {
                    return function (y) {
                        if (x instanceof Nothing && y instanceof Nothing) {
                            return Data_Ordering.EQ.value;
                        };
                        if (x instanceof Nothing) {
                            return Data_Ordering.LT.value;
                        };
                        if (y instanceof Nothing) {
                            return Data_Ordering.GT.value;
                        };
                        if (x instanceof Just && y instanceof Just) {
                            return Data_Ord.compare(dictOrd)(x.value0)(y.value0);
                        };
                        throw new Error("Failed pattern match at Data.Maybe line 196, column 8 - line 196, column 51: " + [x.constructor.name, y.constructor.name]);
                    };
                });
            };
            var eq1Maybe = new Data_Eq.Eq1(function (dictEq) {
                return Data_Eq.eq(eqMaybe(dictEq));
            });
            var ord1Maybe = new Data_Ord.Ord1(function () {
                return eq1Maybe;
            }, function (dictOrd) {
                return Data_Ord.compare(ordMaybe(dictOrd));
            });
            var boundedMaybe = function boundedMaybe(dictBounded) {
                return new Data_Bounded.Bounded(function () {
                    return ordMaybe(dictBounded.Ord0());
                }, Nothing.value, new Just(Data_Bounded.top(dictBounded)));
            };
            var applyMaybe = new Control_Apply.Apply(function () {
                return functorMaybe;
            }, function (v) {
                return function (v1) {
                    if (v instanceof Just) {
                        return Data_Functor.map(functorMaybe)(v.value0)(v1);
                    };
                    if (v instanceof Nothing) {
                        return Nothing.value;
                    };
                    throw new Error("Failed pattern match at Data.Maybe line 68, column 1 - line 68, column 35: " + [v.constructor.name, v1.constructor.name]);
                };
            });
            var bindMaybe = new Control_Bind.Bind(function () {
                return applyMaybe;
            }, function (v) {
                return function (v1) {
                    if (v instanceof Just) {
                        return v1(v.value0);
                    };
                    if (v instanceof Nothing) {
                        return Nothing.value;
                    };
                    throw new Error("Failed pattern match at Data.Maybe line 127, column 1 - line 127, column 33: " + [v.constructor.name, v1.constructor.name]);
                };
            });
            var applicativeMaybe = new Control_Applicative.Applicative(function () {
                return applyMaybe;
            }, Just.create);
            var monadMaybe = new Control_Monad.Monad(function () {
                return applicativeMaybe;
            }, function () {
                return bindMaybe;
            });
            var altMaybe = new Control_Alt.Alt(function () {
                return functorMaybe;
            }, function (v) {
                return function (v1) {
                    if (v instanceof Nothing) {
                        return v1;
                    };
                    return v;
                };
            });
            var plusMaybe = new Control_Plus.Plus(function () {
                return altMaybe;
            }, Nothing.value);
            var alternativeMaybe = new Control_Alternative.Alternative(function () {
                return applicativeMaybe;
            }, function () {
                return plusMaybe;
            });
            var monadZeroMaybe = new Control_MonadZero.MonadZero(function () {
                return alternativeMaybe;
            }, function () {
                return monadMaybe;
            });
            module.exports = {
                Nothing: Nothing,
                Just: Just,
                maybe: maybe,
                "maybe'": maybe$prime,
                fromMaybe: fromMaybe,
                "fromMaybe'": fromMaybe$prime,
                isJust: isJust,
                isNothing: isNothing,
                fromJust: fromJust,
                functorMaybe: functorMaybe,
                applyMaybe: applyMaybe,
                applicativeMaybe: applicativeMaybe,
                altMaybe: altMaybe,
                plusMaybe: plusMaybe,
                alternativeMaybe: alternativeMaybe,
                bindMaybe: bindMaybe,
                monadMaybe: monadMaybe,
                monadZeroMaybe: monadZeroMaybe,
                extendMaybe: extendMaybe,
                invariantMaybe: invariantMaybe,
                semigroupMaybe: semigroupMaybe,
                monoidMaybe: monoidMaybe,
                eqMaybe: eqMaybe,
                eq1Maybe: eq1Maybe,
                ordMaybe: ordMaybe,
                ord1Maybe: ord1Maybe,
                boundedMaybe: boundedMaybe,
                showMaybe: showMaybe
            };

            /***/
        },
        /* 29 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var Data_Ring = __webpack_require__(22);
            var Data_Semiring = __webpack_require__(9);
            var Data_Unit = __webpack_require__(1);
            var CommutativeRing = function CommutativeRing(Ring0) {
                this.Ring0 = Ring0;
            };
            var commutativeRingUnit = new CommutativeRing(function () {
                return Data_Ring.ringUnit;
            });
            var commutativeRingNumber = new CommutativeRing(function () {
                return Data_Ring.ringNumber;
            });
            var commutativeRingInt = new CommutativeRing(function () {
                return Data_Ring.ringInt;
            });
            var commutativeRingFn = function commutativeRingFn(dictCommutativeRing) {
                return new CommutativeRing(function () {
                    return Data_Ring.ringFn(dictCommutativeRing.Ring0());
                });
            };
            module.exports = {
                CommutativeRing: CommutativeRing,
                commutativeRingInt: commutativeRingInt,
                commutativeRingNumber: commutativeRingNumber,
                commutativeRingUnit: commutativeRingUnit,
                commutativeRingFn: commutativeRingFn
            };

            /***/
        },
        /* 30 */
        /***/function (module, exports) {

            var sketch = eval('require("sketch")');

            exports.sketch = sketch;

            /***/
        },
        /* 31 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var $foreign = __webpack_require__(48);
            var Control_Applicative = __webpack_require__(3);
            var Control_Apply = __webpack_require__(2);
            var Control_Bind = __webpack_require__(8);
            var Control_Monad = __webpack_require__(11);
            var Data_Functor = __webpack_require__(0);
            var Data_Monoid = __webpack_require__(12);
            var Data_Semigroup = __webpack_require__(4);
            var Data_Unit = __webpack_require__(1);
            var monadEff = new Control_Monad.Monad(function () {
                return applicativeEff;
            }, function () {
                return bindEff;
            });
            var bindEff = new Control_Bind.Bind(function () {
                return applyEff;
            }, $foreign.bindE);
            var applyEff = new Control_Apply.Apply(function () {
                return functorEff;
            }, Control_Monad.ap(monadEff));
            var applicativeEff = new Control_Applicative.Applicative(function () {
                return applyEff;
            }, $foreign.pureE);
            var functorEff = new Data_Functor.Functor(Control_Applicative.liftA1(applicativeEff));
            var semigroupEff = function semigroupEff(dictSemigroup) {
                return new Data_Semigroup.Semigroup(Control_Apply.lift2(applyEff)(Data_Semigroup.append(dictSemigroup)));
            };
            var monoidEff = function monoidEff(dictMonoid) {
                return new Data_Monoid.Monoid(function () {
                    return semigroupEff(dictMonoid.Semigroup0());
                }, Control_Applicative.pure(applicativeEff)(Data_Monoid.mempty(dictMonoid)));
            };
            module.exports = {
                semigroupEff: semigroupEff,
                monoidEff: monoidEff,
                functorEff: functorEff,
                applyEff: applyEff,
                applicativeEff: applicativeEff,
                bindEff: bindEff,
                monadEff: monadEff,
                runPure: $foreign.runPure,
                untilE: $foreign.untilE,
                whileE: $foreign.whileE,
                forE: $foreign.forE,
                foreachE: $foreign.foreachE
            };

            /***/
        },
        /* 32 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var otherwise = true;
            module.exports = {
                otherwise: otherwise
            };

            /***/
        },
        /* 33 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var Data_HeytingAlgebra = __webpack_require__(21);
            var Data_Unit = __webpack_require__(1);
            var BooleanAlgebra = function BooleanAlgebra(HeytingAlgebra0) {
                this.HeytingAlgebra0 = HeytingAlgebra0;
            };
            var booleanAlgebraUnit = new BooleanAlgebra(function () {
                return Data_HeytingAlgebra.heytingAlgebraUnit;
            });
            var booleanAlgebraFn = function booleanAlgebraFn(dictBooleanAlgebra) {
                return new BooleanAlgebra(function () {
                    return Data_HeytingAlgebra.heytingAlgebraFunction(dictBooleanAlgebra.HeytingAlgebra0());
                });
            };
            var booleanAlgebraBoolean = new BooleanAlgebra(function () {
                return Data_HeytingAlgebra.heytingAlgebraBoolean;
            });
            module.exports = {
                BooleanAlgebra: BooleanAlgebra,
                booleanAlgebraBoolean: booleanAlgebraBoolean,
                booleanAlgebraUnit: booleanAlgebraUnit,
                booleanAlgebraFn: booleanAlgebraFn
            };

            /***/
        },
        /* 34 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var Data_EuclideanRing = __webpack_require__(26);
            var Data_Ring = __webpack_require__(22);
            var Data_Semiring = __webpack_require__(9);
            var DivisionRing = function DivisionRing(Ring0, recip) {
                this.Ring0 = Ring0;
                this.recip = recip;
            };
            var recip = function recip(dict) {
                return dict.recip;
            };
            var rightDiv = function rightDiv(dictDivisionRing) {
                return function (a) {
                    return function (b) {
                        return Data_Semiring.mul(dictDivisionRing.Ring0().Semiring0())(a)(recip(dictDivisionRing)(b));
                    };
                };
            };
            var leftDiv = function leftDiv(dictDivisionRing) {
                return function (a) {
                    return function (b) {
                        return Data_Semiring.mul(dictDivisionRing.Ring0().Semiring0())(recip(dictDivisionRing)(b))(a);
                    };
                };
            };
            var divisionringNumber = new DivisionRing(function () {
                return Data_Ring.ringNumber;
            }, function (x) {
                return 1.0 / x;
            });
            module.exports = {
                DivisionRing: DivisionRing,
                recip: recip,
                leftDiv: leftDiv,
                rightDiv: rightDiv,
                divisionringNumber: divisionringNumber
            };

            /***/
        },
        /* 35 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var Control_Alt = __webpack_require__(23);
            var Control_Applicative = __webpack_require__(3);
            var Control_Apply = __webpack_require__(2);
            var Control_Plus = __webpack_require__(27);
            var Data_Functor = __webpack_require__(0);
            var Alternative = function Alternative(Applicative0, Plus1) {
                this.Applicative0 = Applicative0;
                this.Plus1 = Plus1;
            };
            var alternativeArray = new Alternative(function () {
                return Control_Applicative.applicativeArray;
            }, function () {
                return Control_Plus.plusArray;
            });
            module.exports = {
                Alternative: Alternative,
                alternativeArray: alternativeArray
            };

            /***/
        },
        /* 36 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var Control_Applicative = __webpack_require__(3);
            var Control_Apply = __webpack_require__(2);
            var Control_Bind = __webpack_require__(8);
            var Control_Extend = __webpack_require__(16);
            var Control_Monad = __webpack_require__(11);
            var Data_Bounded = __webpack_require__(15);
            var Data_Eq = __webpack_require__(6);
            var Data_Functor = __webpack_require__(0);
            var Data_Functor_Invariant = __webpack_require__(17);
            var Data_Maybe = __webpack_require__(28);
            var Data_Monoid = __webpack_require__(12);
            var Data_Newtype = __webpack_require__(18);
            var Data_Ord = __webpack_require__(10);
            var Data_Semigroup = __webpack_require__(4);
            var Data_Show = __webpack_require__(7);
            var Prelude = __webpack_require__(5);
            var First = function First(x) {
                return x;
            };
            var showFirst = function showFirst(dictShow) {
                return new Data_Show.Show(function (v) {
                    return "First (" + (Data_Show.show(Data_Maybe.showMaybe(dictShow))(v) + ")");
                });
            };
            var semigroupFirst = new Data_Semigroup.Semigroup(function (v) {
                return function (v1) {
                    if (v instanceof Data_Maybe.Just) {
                        return v;
                    };
                    return v1;
                };
            });
            var ordFirst = function ordFirst(dictOrd) {
                return Data_Maybe.ordMaybe(dictOrd);
            };
            var ord1First = Data_Maybe.ord1Maybe;
            var newtypeFirst = new Data_Newtype.Newtype(function (n) {
                return n;
            }, First);
            var monoidFirst = new Data_Monoid.Monoid(function () {
                return semigroupFirst;
            }, Data_Maybe.Nothing.value);
            var monadFirst = Data_Maybe.monadMaybe;
            var invariantFirst = Data_Maybe.invariantMaybe;
            var functorFirst = Data_Maybe.functorMaybe;
            var extendFirst = Data_Maybe.extendMaybe;
            var eqFirst = function eqFirst(dictEq) {
                return Data_Maybe.eqMaybe(dictEq);
            };
            var eq1First = Data_Maybe.eq1Maybe;
            var boundedFirst = function boundedFirst(dictBounded) {
                return Data_Maybe.boundedMaybe(dictBounded);
            };
            var bindFirst = Data_Maybe.bindMaybe;
            var applyFirst = Data_Maybe.applyMaybe;
            var applicativeFirst = Data_Maybe.applicativeMaybe;
            module.exports = {
                First: First,
                newtypeFirst: newtypeFirst,
                eqFirst: eqFirst,
                eq1First: eq1First,
                ordFirst: ordFirst,
                ord1First: ord1First,
                boundedFirst: boundedFirst,
                functorFirst: functorFirst,
                invariantFirst: invariantFirst,
                applyFirst: applyFirst,
                applicativeFirst: applicativeFirst,
                bindFirst: bindFirst,
                monadFirst: monadFirst,
                extendFirst: extendFirst,
                showFirst: showFirst,
                semigroupFirst: semigroupFirst,
                monoidFirst: monoidFirst
            };

            /***/
        },
        /* 37 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var Control_Applicative = __webpack_require__(3);
            var Control_Apply = __webpack_require__(2);
            var Control_Bind = __webpack_require__(8);
            var Control_Extend = __webpack_require__(16);
            var Control_Monad = __webpack_require__(11);
            var Data_Bounded = __webpack_require__(15);
            var Data_Eq = __webpack_require__(6);
            var Data_Functor = __webpack_require__(0);
            var Data_Functor_Invariant = __webpack_require__(17);
            var Data_Maybe = __webpack_require__(28);
            var Data_Monoid = __webpack_require__(12);
            var Data_Newtype = __webpack_require__(18);
            var Data_Ord = __webpack_require__(10);
            var Data_Semigroup = __webpack_require__(4);
            var Data_Show = __webpack_require__(7);
            var Prelude = __webpack_require__(5);
            var Last = function Last(x) {
                return x;
            };
            var showLast = function showLast(dictShow) {
                return new Data_Show.Show(function (v) {
                    return "(Last " + (Data_Show.show(Data_Maybe.showMaybe(dictShow))(v) + ")");
                });
            };
            var semigroupLast = new Data_Semigroup.Semigroup(function (v) {
                return function (v1) {
                    if (v1 instanceof Data_Maybe.Just) {
                        return v1;
                    };
                    if (v1 instanceof Data_Maybe.Nothing) {
                        return v;
                    };
                    throw new Error("Failed pattern match at Data.Maybe.Last line 53, column 1 - line 53, column 45: " + [v.constructor.name, v1.constructor.name]);
                };
            });
            var ordLast = function ordLast(dictOrd) {
                return Data_Maybe.ordMaybe(dictOrd);
            };
            var ord1Last = Data_Maybe.ord1Maybe;
            var newtypeLast = new Data_Newtype.Newtype(function (n) {
                return n;
            }, Last);
            var monoidLast = new Data_Monoid.Monoid(function () {
                return semigroupLast;
            }, Data_Maybe.Nothing.value);
            var monadLast = Data_Maybe.monadMaybe;
            var invariantLast = Data_Maybe.invariantMaybe;
            var functorLast = Data_Maybe.functorMaybe;
            var extendLast = Data_Maybe.extendMaybe;
            var eqLast = function eqLast(dictEq) {
                return Data_Maybe.eqMaybe(dictEq);
            };
            var eq1Last = Data_Maybe.eq1Maybe;
            var boundedLast = function boundedLast(dictBounded) {
                return Data_Maybe.boundedMaybe(dictBounded);
            };
            var bindLast = Data_Maybe.bindMaybe;
            var applyLast = Data_Maybe.applyMaybe;
            var applicativeLast = Data_Maybe.applicativeMaybe;
            module.exports = {
                Last: Last,
                newtypeLast: newtypeLast,
                eqLast: eqLast,
                eq1Last: eq1Last,
                ordLast: ordLast,
                ord1Last: ord1Last,
                boundedLast: boundedLast,
                functorLast: functorLast,
                invariantLast: invariantLast,
                applyLast: applyLast,
                applicativeLast: applicativeLast,
                bindLast: bindLast,
                monadLast: monadLast,
                extendLast: extendLast,
                showLast: showLast,
                semigroupLast: semigroupLast,
                monoidLast: monoidLast
            };

            /***/
        },
        /* 38 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var Control_Applicative = __webpack_require__(3);
            var Control_Apply = __webpack_require__(2);
            var Control_Bind = __webpack_require__(8);
            var Control_Comonad = __webpack_require__(24);
            var Control_Extend = __webpack_require__(16);
            var Control_Monad = __webpack_require__(11);
            var Data_Bounded = __webpack_require__(15);
            var Data_Eq = __webpack_require__(6);
            var Data_Functor = __webpack_require__(0);
            var Data_Functor_Invariant = __webpack_require__(17);
            var Data_Monoid = __webpack_require__(12);
            var Data_Newtype = __webpack_require__(18);
            var Data_Ord = __webpack_require__(10);
            var Data_Semigroup = __webpack_require__(4);
            var Data_Semiring = __webpack_require__(9);
            var Data_Show = __webpack_require__(7);
            var Prelude = __webpack_require__(5);
            var Additive = function Additive(x) {
                return x;
            };
            var showAdditive = function showAdditive(dictShow) {
                return new Data_Show.Show(function (v) {
                    return "(Additive " + (Data_Show.show(dictShow)(v) + ")");
                });
            };
            var semigroupAdditive = function semigroupAdditive(dictSemiring) {
                return new Data_Semigroup.Semigroup(function (v) {
                    return function (v1) {
                        return Data_Semiring.add(dictSemiring)(v)(v1);
                    };
                });
            };
            var ordAdditive = function ordAdditive(dictOrd) {
                return dictOrd;
            };
            var newtypeAdditive = new Data_Newtype.Newtype(function (n) {
                return n;
            }, Additive);
            var monoidAdditive = function monoidAdditive(dictSemiring) {
                return new Data_Monoid.Monoid(function () {
                    return semigroupAdditive(dictSemiring);
                }, Data_Semiring.zero(dictSemiring));
            };
            var invariantAdditive = new Data_Functor_Invariant.Invariant(function (f) {
                return function (v) {
                    return function (v1) {
                        return f(v1);
                    };
                };
            });
            var functorAdditive = new Data_Functor.Functor(function (f) {
                return function (v) {
                    return f(v);
                };
            });
            var extendAdditive = new Control_Extend.Extend(function () {
                return functorAdditive;
            }, function (f) {
                return function (x) {
                    return f(x);
                };
            });
            var eqAdditive = function eqAdditive(dictEq) {
                return dictEq;
            };
            var comonadAdditive = new Control_Comonad.Comonad(function () {
                return extendAdditive;
            }, Data_Newtype.unwrap(newtypeAdditive));
            var boundedAdditive = function boundedAdditive(dictBounded) {
                return dictBounded;
            };
            var applyAdditive = new Control_Apply.Apply(function () {
                return functorAdditive;
            }, function (v) {
                return function (v1) {
                    return v(v1);
                };
            });
            var bindAdditive = new Control_Bind.Bind(function () {
                return applyAdditive;
            }, function (v) {
                return function (f) {
                    return f(v);
                };
            });
            var applicativeAdditive = new Control_Applicative.Applicative(function () {
                return applyAdditive;
            }, Additive);
            var monadAdditive = new Control_Monad.Monad(function () {
                return applicativeAdditive;
            }, function () {
                return bindAdditive;
            });
            module.exports = {
                Additive: Additive,
                newtypeAdditive: newtypeAdditive,
                eqAdditive: eqAdditive,
                ordAdditive: ordAdditive,
                boundedAdditive: boundedAdditive,
                functorAdditive: functorAdditive,
                invariantAdditive: invariantAdditive,
                applyAdditive: applyAdditive,
                applicativeAdditive: applicativeAdditive,
                bindAdditive: bindAdditive,
                monadAdditive: monadAdditive,
                extendAdditive: extendAdditive,
                comonadAdditive: comonadAdditive,
                showAdditive: showAdditive,
                semigroupAdditive: semigroupAdditive,
                monoidAdditive: monoidAdditive
            };

            /***/
        },
        /* 39 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var Control_Applicative = __webpack_require__(3);
            var Control_Apply = __webpack_require__(2);
            var Control_Bind = __webpack_require__(8);
            var Control_Comonad = __webpack_require__(24);
            var Control_Extend = __webpack_require__(16);
            var Control_Monad = __webpack_require__(11);
            var Data_Bounded = __webpack_require__(15);
            var Data_Eq = __webpack_require__(6);
            var Data_Functor = __webpack_require__(0);
            var Data_Functor_Invariant = __webpack_require__(17);
            var Data_HeytingAlgebra = __webpack_require__(21);
            var Data_Monoid = __webpack_require__(12);
            var Data_Newtype = __webpack_require__(18);
            var Data_Ord = __webpack_require__(10);
            var Data_Semigroup = __webpack_require__(4);
            var Data_Semiring = __webpack_require__(9);
            var Data_Show = __webpack_require__(7);
            var Prelude = __webpack_require__(5);
            var Conj = function Conj(x) {
                return x;
            };
            var showConj = function showConj(dictShow) {
                return new Data_Show.Show(function (v) {
                    return "(Conj " + (Data_Show.show(dictShow)(v) + ")");
                });
            };
            var semiringConj = function semiringConj(dictHeytingAlgebra) {
                return new Data_Semiring.Semiring(function (v) {
                    return function (v1) {
                        return Data_HeytingAlgebra.conj(dictHeytingAlgebra)(v)(v1);
                    };
                }, function (v) {
                    return function (v1) {
                        return Data_HeytingAlgebra.disj(dictHeytingAlgebra)(v)(v1);
                    };
                }, Data_HeytingAlgebra.ff(dictHeytingAlgebra), Data_HeytingAlgebra.tt(dictHeytingAlgebra));
            };
            var semigroupConj = function semigroupConj(dictHeytingAlgebra) {
                return new Data_Semigroup.Semigroup(function (v) {
                    return function (v1) {
                        return Data_HeytingAlgebra.conj(dictHeytingAlgebra)(v)(v1);
                    };
                });
            };
            var ordConj = function ordConj(dictOrd) {
                return dictOrd;
            };
            var newtypeConj = new Data_Newtype.Newtype(function (n) {
                return n;
            }, Conj);
            var monoidConj = function monoidConj(dictHeytingAlgebra) {
                return new Data_Monoid.Monoid(function () {
                    return semigroupConj(dictHeytingAlgebra);
                }, Data_HeytingAlgebra.tt(dictHeytingAlgebra));
            };
            var invariantConj = new Data_Functor_Invariant.Invariant(function (f) {
                return function (v) {
                    return function (v1) {
                        return f(v1);
                    };
                };
            });
            var functorConj = new Data_Functor.Functor(function (f) {
                return function (v) {
                    return f(v);
                };
            });
            var extendConj = new Control_Extend.Extend(function () {
                return functorConj;
            }, function (f) {
                return function (x) {
                    return f(x);
                };
            });
            var eqConj = function eqConj(dictEq) {
                return dictEq;
            };
            var comonadConj = new Control_Comonad.Comonad(function () {
                return extendConj;
            }, Data_Newtype.unwrap(newtypeConj));
            var boundedConj = function boundedConj(dictBounded) {
                return dictBounded;
            };
            var applyConj = new Control_Apply.Apply(function () {
                return functorConj;
            }, function (v) {
                return function (v1) {
                    return v(v1);
                };
            });
            var bindConj = new Control_Bind.Bind(function () {
                return applyConj;
            }, function (v) {
                return function (f) {
                    return f(v);
                };
            });
            var applicativeConj = new Control_Applicative.Applicative(function () {
                return applyConj;
            }, Conj);
            var monadConj = new Control_Monad.Monad(function () {
                return applicativeConj;
            }, function () {
                return bindConj;
            });
            module.exports = {
                Conj: Conj,
                newtypeConj: newtypeConj,
                eqConj: eqConj,
                ordConj: ordConj,
                boundedConj: boundedConj,
                functorConj: functorConj,
                invariantConj: invariantConj,
                applyConj: applyConj,
                applicativeConj: applicativeConj,
                bindConj: bindConj,
                monadConj: monadConj,
                extendConj: extendConj,
                comonadConj: comonadConj,
                showConj: showConj,
                semigroupConj: semigroupConj,
                monoidConj: monoidConj,
                semiringConj: semiringConj
            };

            /***/
        },
        /* 40 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var Control_Applicative = __webpack_require__(3);
            var Control_Apply = __webpack_require__(2);
            var Control_Bind = __webpack_require__(8);
            var Control_Comonad = __webpack_require__(24);
            var Control_Extend = __webpack_require__(16);
            var Control_Monad = __webpack_require__(11);
            var Data_Bounded = __webpack_require__(15);
            var Data_Eq = __webpack_require__(6);
            var Data_Functor = __webpack_require__(0);
            var Data_Functor_Invariant = __webpack_require__(17);
            var Data_HeytingAlgebra = __webpack_require__(21);
            var Data_Monoid = __webpack_require__(12);
            var Data_Newtype = __webpack_require__(18);
            var Data_Ord = __webpack_require__(10);
            var Data_Semigroup = __webpack_require__(4);
            var Data_Semiring = __webpack_require__(9);
            var Data_Show = __webpack_require__(7);
            var Prelude = __webpack_require__(5);
            var Disj = function Disj(x) {
                return x;
            };
            var showDisj = function showDisj(dictShow) {
                return new Data_Show.Show(function (v) {
                    return "(Disj " + (Data_Show.show(dictShow)(v) + ")");
                });
            };
            var semiringDisj = function semiringDisj(dictHeytingAlgebra) {
                return new Data_Semiring.Semiring(function (v) {
                    return function (v1) {
                        return Data_HeytingAlgebra.disj(dictHeytingAlgebra)(v)(v1);
                    };
                }, function (v) {
                    return function (v1) {
                        return Data_HeytingAlgebra.conj(dictHeytingAlgebra)(v)(v1);
                    };
                }, Data_HeytingAlgebra.tt(dictHeytingAlgebra), Data_HeytingAlgebra.ff(dictHeytingAlgebra));
            };
            var semigroupDisj = function semigroupDisj(dictHeytingAlgebra) {
                return new Data_Semigroup.Semigroup(function (v) {
                    return function (v1) {
                        return Data_HeytingAlgebra.disj(dictHeytingAlgebra)(v)(v1);
                    };
                });
            };
            var ordDisj = function ordDisj(dictOrd) {
                return dictOrd;
            };
            var newtypeDisj = new Data_Newtype.Newtype(function (n) {
                return n;
            }, Disj);
            var monoidDisj = function monoidDisj(dictHeytingAlgebra) {
                return new Data_Monoid.Monoid(function () {
                    return semigroupDisj(dictHeytingAlgebra);
                }, Data_HeytingAlgebra.ff(dictHeytingAlgebra));
            };
            var invariantDisj = new Data_Functor_Invariant.Invariant(function (f) {
                return function (v) {
                    return function (v1) {
                        return f(v1);
                    };
                };
            });
            var functorDisj = new Data_Functor.Functor(function (f) {
                return function (v) {
                    return f(v);
                };
            });
            var extendDisj = new Control_Extend.Extend(function () {
                return functorDisj;
            }, function (f) {
                return function (x) {
                    return f(x);
                };
            });
            var eqDisj = function eqDisj(dictEq) {
                return dictEq;
            };
            var comonadDisj = new Control_Comonad.Comonad(function () {
                return extendDisj;
            }, Data_Newtype.unwrap(newtypeDisj));
            var boundedDisj = function boundedDisj(dictBounded) {
                return dictBounded;
            };
            var applyDisj = new Control_Apply.Apply(function () {
                return functorDisj;
            }, function (v) {
                return function (v1) {
                    return v(v1);
                };
            });
            var bindDisj = new Control_Bind.Bind(function () {
                return applyDisj;
            }, function (v) {
                return function (f) {
                    return f(v);
                };
            });
            var applicativeDisj = new Control_Applicative.Applicative(function () {
                return applyDisj;
            }, Disj);
            var monadDisj = new Control_Monad.Monad(function () {
                return applicativeDisj;
            }, function () {
                return bindDisj;
            });
            module.exports = {
                Disj: Disj,
                newtypeDisj: newtypeDisj,
                eqDisj: eqDisj,
                ordDisj: ordDisj,
                boundedDisj: boundedDisj,
                functorDisj: functorDisj,
                invariantDisj: invariantDisj,
                applyDisj: applyDisj,
                applicativeDisj: applicativeDisj,
                bindDisj: bindDisj,
                monadDisj: monadDisj,
                extendDisj: extendDisj,
                comonadDisj: comonadDisj,
                showDisj: showDisj,
                semigroupDisj: semigroupDisj,
                monoidDisj: monoidDisj,
                semiringDisj: semiringDisj
            };

            /***/
        },
        /* 41 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var Control_Applicative = __webpack_require__(3);
            var Control_Apply = __webpack_require__(2);
            var Control_Bind = __webpack_require__(8);
            var Control_Comonad = __webpack_require__(24);
            var Control_Extend = __webpack_require__(16);
            var Control_Monad = __webpack_require__(11);
            var Data_Bounded = __webpack_require__(15);
            var Data_Eq = __webpack_require__(6);
            var Data_Functor = __webpack_require__(0);
            var Data_Functor_Invariant = __webpack_require__(17);
            var Data_Monoid = __webpack_require__(12);
            var Data_Newtype = __webpack_require__(18);
            var Data_Ord = __webpack_require__(10);
            var Data_Semigroup = __webpack_require__(4);
            var Data_Show = __webpack_require__(7);
            var Prelude = __webpack_require__(5);
            var Dual = function Dual(x) {
                return x;
            };
            var showDual = function showDual(dictShow) {
                return new Data_Show.Show(function (v) {
                    return "(Dual " + (Data_Show.show(dictShow)(v) + ")");
                });
            };
            var semigroupDual = function semigroupDual(dictSemigroup) {
                return new Data_Semigroup.Semigroup(function (v) {
                    return function (v1) {
                        return Data_Semigroup.append(dictSemigroup)(v1)(v);
                    };
                });
            };
            var ordDual = function ordDual(dictOrd) {
                return dictOrd;
            };
            var newtypeDual = new Data_Newtype.Newtype(function (n) {
                return n;
            }, Dual);
            var monoidDual = function monoidDual(dictMonoid) {
                return new Data_Monoid.Monoid(function () {
                    return semigroupDual(dictMonoid.Semigroup0());
                }, Data_Monoid.mempty(dictMonoid));
            };
            var invariantDual = new Data_Functor_Invariant.Invariant(function (f) {
                return function (v) {
                    return function (v1) {
                        return f(v1);
                    };
                };
            });
            var functorDual = new Data_Functor.Functor(function (f) {
                return function (v) {
                    return f(v);
                };
            });
            var extendDual = new Control_Extend.Extend(function () {
                return functorDual;
            }, function (f) {
                return function (x) {
                    return f(x);
                };
            });
            var eqDual = function eqDual(dictEq) {
                return dictEq;
            };
            var comonadDual = new Control_Comonad.Comonad(function () {
                return extendDual;
            }, Data_Newtype.unwrap(newtypeDual));
            var boundedDual = function boundedDual(dictBounded) {
                return dictBounded;
            };
            var applyDual = new Control_Apply.Apply(function () {
                return functorDual;
            }, function (v) {
                return function (v1) {
                    return v(v1);
                };
            });
            var bindDual = new Control_Bind.Bind(function () {
                return applyDual;
            }, function (v) {
                return function (f) {
                    return f(v);
                };
            });
            var applicativeDual = new Control_Applicative.Applicative(function () {
                return applyDual;
            }, Dual);
            var monadDual = new Control_Monad.Monad(function () {
                return applicativeDual;
            }, function () {
                return bindDual;
            });
            module.exports = {
                Dual: Dual,
                newtypeDual: newtypeDual,
                eqDual: eqDual,
                ordDual: ordDual,
                boundedDual: boundedDual,
                functorDual: functorDual,
                invariantDual: invariantDual,
                applyDual: applyDual,
                applicativeDual: applicativeDual,
                bindDual: bindDual,
                monadDual: monadDual,
                extendDual: extendDual,
                comonadDual: comonadDual,
                showDual: showDual,
                semigroupDual: semigroupDual,
                monoidDual: monoidDual
            };

            /***/
        },
        /* 42 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var Control_Applicative = __webpack_require__(3);
            var Control_Apply = __webpack_require__(2);
            var Control_Bind = __webpack_require__(8);
            var Control_Comonad = __webpack_require__(24);
            var Control_Extend = __webpack_require__(16);
            var Control_Monad = __webpack_require__(11);
            var Data_Bounded = __webpack_require__(15);
            var Data_Eq = __webpack_require__(6);
            var Data_Functor = __webpack_require__(0);
            var Data_Functor_Invariant = __webpack_require__(17);
            var Data_Monoid = __webpack_require__(12);
            var Data_Newtype = __webpack_require__(18);
            var Data_Ord = __webpack_require__(10);
            var Data_Semigroup = __webpack_require__(4);
            var Data_Semiring = __webpack_require__(9);
            var Data_Show = __webpack_require__(7);
            var Prelude = __webpack_require__(5);
            var Multiplicative = function Multiplicative(x) {
                return x;
            };
            var showMultiplicative = function showMultiplicative(dictShow) {
                return new Data_Show.Show(function (v) {
                    return "(Multiplicative " + (Data_Show.show(dictShow)(v) + ")");
                });
            };
            var semigroupMultiplicative = function semigroupMultiplicative(dictSemiring) {
                return new Data_Semigroup.Semigroup(function (v) {
                    return function (v1) {
                        return Data_Semiring.mul(dictSemiring)(v)(v1);
                    };
                });
            };
            var ordMultiplicative = function ordMultiplicative(dictOrd) {
                return dictOrd;
            };
            var newtypeMultiplicative = new Data_Newtype.Newtype(function (n) {
                return n;
            }, Multiplicative);
            var monoidMultiplicative = function monoidMultiplicative(dictSemiring) {
                return new Data_Monoid.Monoid(function () {
                    return semigroupMultiplicative(dictSemiring);
                }, Data_Semiring.one(dictSemiring));
            };
            var invariantMultiplicative = new Data_Functor_Invariant.Invariant(function (f) {
                return function (v) {
                    return function (v1) {
                        return f(v1);
                    };
                };
            });
            var functorMultiplicative = new Data_Functor.Functor(function (f) {
                return function (v) {
                    return f(v);
                };
            });
            var extendMultiplicative = new Control_Extend.Extend(function () {
                return functorMultiplicative;
            }, function (f) {
                return function (x) {
                    return f(x);
                };
            });
            var eqMultiplicative = function eqMultiplicative(dictEq) {
                return dictEq;
            };
            var comonadMultiplicative = new Control_Comonad.Comonad(function () {
                return extendMultiplicative;
            }, Data_Newtype.unwrap(newtypeMultiplicative));
            var boundedMultiplicative = function boundedMultiplicative(dictBounded) {
                return dictBounded;
            };
            var applyMultiplicative = new Control_Apply.Apply(function () {
                return functorMultiplicative;
            }, function (v) {
                return function (v1) {
                    return v(v1);
                };
            });
            var bindMultiplicative = new Control_Bind.Bind(function () {
                return applyMultiplicative;
            }, function (v) {
                return function (f) {
                    return f(v);
                };
            });
            var applicativeMultiplicative = new Control_Applicative.Applicative(function () {
                return applyMultiplicative;
            }, Multiplicative);
            var monadMultiplicative = new Control_Monad.Monad(function () {
                return applicativeMultiplicative;
            }, function () {
                return bindMultiplicative;
            });
            module.exports = {
                Multiplicative: Multiplicative,
                newtypeMultiplicative: newtypeMultiplicative,
                eqMultiplicative: eqMultiplicative,
                ordMultiplicative: ordMultiplicative,
                boundedMultiplicative: boundedMultiplicative,
                functorMultiplicative: functorMultiplicative,
                invariantMultiplicative: invariantMultiplicative,
                applyMultiplicative: applyMultiplicative,
                applicativeMultiplicative: applicativeMultiplicative,
                bindMultiplicative: bindMultiplicative,
                monadMultiplicative: monadMultiplicative,
                extendMultiplicative: extendMultiplicative,
                comonadMultiplicative: comonadMultiplicative,
                showMultiplicative: showMultiplicative,
                semigroupMultiplicative: semigroupMultiplicative,
                monoidMultiplicative: monoidMultiplicative
            };

            /***/
        },
        /* 43 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            module.exports = {};

            /***/
        },
        /* 44 */
        /***/function (module, exports, __webpack_require__) {

            module.exports = __webpack_require__(45);

            /***/
        },
        /* 45 */
        /***/function (module, exports, __webpack_require__) {

            var purescript = __webpack_require__(46);

            exports.main = function () {
                purescript.main();
            };

            /***/
        },
        /* 46 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            var $foreign = __webpack_require__(47);
            var Control_Monad_Eff = __webpack_require__(31);
            var Control_Monad_Eff_Console = __webpack_require__(66);
            var Data_Array = __webpack_require__(94);
            var Data_Function = __webpack_require__(14);
            var Data_Traversable = __webpack_require__(68);
            var Partial_Unsafe = __webpack_require__(80);
            var Prelude = __webpack_require__(5);
            var Sketch_Component = __webpack_require__(116);
            var main = $foreign.log($foreign["getSelection"][0].name);
            module.exports = {
                main: main,
                log: $foreign.log,
                getSelection: $foreign.getSelection
            };

            /***/
        },
        /* 47 */
        /***/function (module, exports, __webpack_require__) {

            /* WEBPACK VAR INJECTION */(function (cocoa) {
                exports.log = function (val) {
                    return function () {
                        log(val);
                    };
                };

                exports.getDocument = cocoa.sketch.getSelectedDocument();

                exports.showMessage = function (document) {
                    return function (msg) {
                        return document.showMessage(msg);
                    };
                };

                exports.getSelection = _getSelection();

                function _getSelection() {
                    var document = cocoa.sketch.getSelectedDocument();
                    return document.selectedLayers.layers;
                }
                /* WEBPACK VAR INJECTION */
            }).call(exports, __webpack_require__(30));

            /***/
        },
        /* 48 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            exports.pureE = function (a) {
                return function () {
                    return a;
                };
            };

            exports.bindE = function (a) {
                return function (f) {
                    return function () {
                        return f(a())();
                    };
                };
            };

            exports.runPure = function (f) {
                return f();
            };

            exports.untilE = function (f) {
                return function () {
                    while (!f()) {}
                    return {};
                };
            };

            exports.whileE = function (f) {
                return function (a) {
                    return function () {
                        while (f()) {
                            a();
                        }
                        return {};
                    };
                };
            };

            exports.forE = function (lo) {
                return function (hi) {
                    return function (f) {
                        return function () {
                            for (var i = lo; i < hi; i++) {
                                f(i)();
                            }
                        };
                    };
                };
            };

            exports.foreachE = function (as) {
                return function (f) {
                    return function () {
                        for (var i = 0, l = as.length; i < l; i++) {
                            f(as[i])();
                        }
                    };
                };
            };

            /***/
        },
        /* 49 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            exports.arrayApply = function (fs) {
                return function (xs) {
                    var l = fs.length;
                    var k = xs.length;
                    var result = new Array(l * k);
                    var n = 0;
                    for (var i = 0; i < l; i++) {
                        var f = fs[i];
                        for (var j = 0; j < k; j++) {
                            result[n++] = f(xs[j]);
                        }
                    }
                    return result;
                };
            };

            /***/
        },
        /* 50 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            exports.arrayMap = function (f) {
                return function (arr) {
                    var l = arr.length;
                    var result = new Array(l);
                    for (var i = 0; i < l; i++) {
                        result[i] = f(arr[i]);
                    }
                    return result;
                };
            };

            /***/
        },
        /* 51 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            exports.unit = {};

            /***/
        },
        /* 52 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            exports.showIntImpl = function (n) {
                return n.toString();
            };

            exports.showNumberImpl = function (n) {
                var str = n.toString();
                return isNaN(str + ".0") ? str : str + ".0";
            };

            exports.showCharImpl = function (c) {
                var code = c.charCodeAt(0);
                if (code < 0x20 || code === 0x7F) {
                    switch (c) {
                        case "\x07":
                            return "'\\a'";
                        case "\b":
                            return "'\\b'";
                        case "\f":
                            return "'\\f'";
                        case "\n":
                            return "'\\n'";
                        case "\r":
                            return "'\\r'";
                        case "\t":
                            return "'\\t'";
                        case "\v":
                            return "'\\v'";
                    }
                    return "'\\" + code.toString(10) + "'";
                }
                return c === "'" || c === "\\" ? "'\\" + c + "'" : "'" + c + "'";
            };

            exports.showStringImpl = function (s) {
                var l = s.length;
                return "\"" + s.replace(/[\0-\x1F\x7F"\\]/g, // eslint-disable-line no-control-regex
                function (c, i) {
                    switch (c) {
                        case "\"":
                        case "\\":
                            return "\\" + c;
                        case "\x07":
                            return "\\a";
                        case "\b":
                            return "\\b";
                        case "\f":
                            return "\\f";
                        case "\n":
                            return "\\n";
                        case "\r":
                            return "\\r";
                        case "\t":
                            return "\\t";
                        case "\v":
                            return "\\v";
                    }
                    var k = i + 1;
                    var empty = k < l && s[k] >= "0" && s[k] <= "9" ? "\\&" : "";
                    return "\\" + c.charCodeAt(0).toString(10) + empty;
                }) + "\"";
            };

            exports.showArrayImpl = function (f) {
                return function (xs) {
                    var ss = [];
                    for (var i = 0, l = xs.length; i < l; i++) {
                        ss[i] = f(xs[i]);
                    }
                    return "[" + ss.join(",") + "]";
                };
            };

            /***/
        },
        /* 53 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            exports.arrayBind = function (arr) {
                return function (f) {
                    var result = [];
                    for (var i = 0, l = arr.length; i < l; i++) {
                        Array.prototype.push.apply(result, f(arr[i]));
                    }
                    return result;
                };
            };

            /***/
        },
        /* 54 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            exports.refEq = function (r1) {
                return function (r2) {
                    return r1 === r2;
                };
            };

            exports.eqArrayImpl = function (f) {
                return function (xs) {
                    return function (ys) {
                        if (xs.length !== ys.length) return false;
                        for (var i = 0; i < xs.length; i++) {
                            if (!f(xs[i])(ys[i])) return false;
                        }
                        return true;
                    };
                };
            };

            /***/
        },
        /* 55 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            exports.intDegree = function (x) {
                return Math.min(Math.abs(x), 2147483647);
            };

            exports.intDiv = function (x) {
                return function (y) {
                    /* jshint bitwise: false */
                    return x / y | 0;
                };
            };

            exports.intMod = function (x) {
                return function (y) {
                    return x % y;
                };
            };

            exports.numDiv = function (n1) {
                return function (n2) {
                    return n1 / n2;
                };
            };

            /***/
        },
        /* 56 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            exports.boolConj = function (b1) {
                return function (b2) {
                    return b1 && b2;
                };
            };

            exports.boolDisj = function (b1) {
                return function (b2) {
                    return b1 || b2;
                };
            };

            exports.boolNot = function (b) {
                return !b;
            };

            /***/
        },
        /* 57 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            exports.intSub = function (x) {
                return function (y) {
                    /* jshint bitwise: false */
                    return x - y | 0;
                };
            };

            exports.numSub = function (n1) {
                return function (n2) {
                    return n1 - n2;
                };
            };

            /***/
        },
        /* 58 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            exports.intAdd = function (x) {
                return function (y) {
                    /* jshint bitwise: false */
                    return x + y | 0;
                };
            };

            exports.intMul = function (x) {
                return function (y) {
                    /* jshint bitwise: false */
                    return x * y | 0;
                };
            };

            exports.numAdd = function (n1) {
                return function (n2) {
                    return n1 + n2;
                };
            };

            exports.numMul = function (n1) {
                return function (n2) {
                    return n1 * n2;
                };
            };

            /***/
        },
        /* 59 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            exports.ordArrayImpl = function (f) {
                return function (xs) {
                    return function (ys) {
                        var i = 0;
                        var xlen = xs.length;
                        var ylen = ys.length;
                        while (i < xlen && i < ylen) {
                            var x = xs[i];
                            var y = ys[i];
                            var o = f(x)(y);
                            if (o !== 0) {
                                return o;
                            }
                            i++;
                        }
                        if (xlen === ylen) {
                            return 0;
                        } else if (xlen > ylen) {
                            return -1;
                        } else {
                            return 1;
                        }
                    };
                };
            };

            /***/
        },
        /* 60 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var $foreign = __webpack_require__(61);
            var Data_Ordering = __webpack_require__(19);
            var unsafeCompare = $foreign.unsafeCompareImpl(Data_Ordering.LT.value)(Data_Ordering.EQ.value)(Data_Ordering.GT.value);
            module.exports = {
                unsafeCompare: unsafeCompare
            };

            /***/
        },
        /* 61 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            exports.unsafeCompareImpl = function (lt) {
                return function (eq) {
                    return function (gt) {
                        return function (x) {
                            return function (y) {
                                return x < y ? lt : x === y ? eq : gt;
                            };
                        };
                    };
                };
            };

            /***/
        },
        /* 62 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            exports.concatString = function (s1) {
                return function (s2) {
                    return s1 + s2;
                };
            };

            exports.concatArray = function (xs) {
                return function (ys) {
                    if (xs.length === 0) return ys;
                    if (ys.length === 0) return xs;
                    return xs.concat(ys);
                };
            };

            /***/
        },
        /* 63 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            exports.topInt = 2147483647;
            exports.bottomInt = -2147483648;

            exports.topChar = String.fromCharCode(65535);
            exports.bottomChar = String.fromCharCode(0);

            /***/
        },
        /* 64 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var Data_CommutativeRing = __webpack_require__(29);
            var Data_DivisionRing = __webpack_require__(34);
            var Data_EuclideanRing = __webpack_require__(26);
            var Data_Ring = __webpack_require__(22);
            var Data_Semiring = __webpack_require__(9);
            var Field = function Field(EuclideanRing0) {
                this.EuclideanRing0 = EuclideanRing0;
            };
            var fieldNumber = new Field(function () {
                return Data_EuclideanRing.euclideanRingNumber;
            });
            module.exports = {
                Field: Field,
                fieldNumber: fieldNumber
            };

            /***/
        },
        /* 65 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            module.exports = {};

            /***/
        },
        /* 66 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var $foreign = __webpack_require__(67);
            var Control_Monad_Eff = __webpack_require__(31);
            var Data_Show = __webpack_require__(7);
            var Data_Unit = __webpack_require__(1);
            var warnShow = function warnShow(dictShow) {
                return function (a) {
                    return $foreign.warn(Data_Show.show(dictShow)(a));
                };
            };
            var logShow = function logShow(dictShow) {
                return function (a) {
                    return $foreign.log(Data_Show.show(dictShow)(a));
                };
            };
            var infoShow = function infoShow(dictShow) {
                return function (a) {
                    return $foreign.info(Data_Show.show(dictShow)(a));
                };
            };
            var errorShow = function errorShow(dictShow) {
                return function (a) {
                    return $foreign.error(Data_Show.show(dictShow)(a));
                };
            };
            module.exports = {
                logShow: logShow,
                warnShow: warnShow,
                errorShow: errorShow,
                infoShow: infoShow,
                log: $foreign.log,
                warn: $foreign.warn,
                error: $foreign.error,
                info: $foreign.info
            };

            /***/
        },
        /* 67 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            exports.log = function (s) {
                return function () {
                    console.log(s);
                    return {};
                };
            };

            exports.warn = function (s) {
                return function () {
                    console.warn(s);
                    return {};
                };
            };

            exports.error = function (s) {
                return function () {
                    console.error(s);
                    return {};
                };
            };

            exports.info = function (s) {
                return function () {
                    console.info(s);
                    return {};
                };
            };

            /***/
        },
        /* 68 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var $foreign = __webpack_require__(69);
            var Control_Applicative = __webpack_require__(3);
            var Control_Apply = __webpack_require__(2);
            var Control_Category = __webpack_require__(13);
            var Data_Foldable = __webpack_require__(70);
            var Data_Functor = __webpack_require__(0);
            var Data_Maybe = __webpack_require__(28);
            var Data_Maybe_First = __webpack_require__(36);
            var Data_Maybe_Last = __webpack_require__(37);
            var Data_Monoid_Additive = __webpack_require__(38);
            var Data_Monoid_Conj = __webpack_require__(39);
            var Data_Monoid_Disj = __webpack_require__(40);
            var Data_Monoid_Dual = __webpack_require__(41);
            var Data_Monoid_Multiplicative = __webpack_require__(42);
            var Data_Traversable_Accum = __webpack_require__(43);
            var Data_Traversable_Accum_Internal = __webpack_require__(75);
            var Prelude = __webpack_require__(5);
            var Traversable = function Traversable(Foldable1, Functor0, sequence, traverse) {
                this.Foldable1 = Foldable1;
                this.Functor0 = Functor0;
                this.sequence = sequence;
                this.traverse = traverse;
            };
            var traverse = function traverse(dict) {
                return dict.traverse;
            };
            var traversableMultiplicative = new Traversable(function () {
                return Data_Foldable.foldableMultiplicative;
            }, function () {
                return Data_Monoid_Multiplicative.functorMultiplicative;
            }, function (dictApplicative) {
                return function (v) {
                    return Data_Functor.map(dictApplicative.Apply0().Functor0())(Data_Monoid_Multiplicative.Multiplicative)(v);
                };
            }, function (dictApplicative) {
                return function (f) {
                    return function (v) {
                        return Data_Functor.map(dictApplicative.Apply0().Functor0())(Data_Monoid_Multiplicative.Multiplicative)(f(v));
                    };
                };
            });
            var traversableMaybe = new Traversable(function () {
                return Data_Foldable.foldableMaybe;
            }, function () {
                return Data_Maybe.functorMaybe;
            }, function (dictApplicative) {
                return function (v) {
                    if (v instanceof Data_Maybe.Nothing) {
                        return Control_Applicative.pure(dictApplicative)(Data_Maybe.Nothing.value);
                    };
                    if (v instanceof Data_Maybe.Just) {
                        return Data_Functor.map(dictApplicative.Apply0().Functor0())(Data_Maybe.Just.create)(v.value0);
                    };
                    throw new Error("Failed pattern match at Data.Traversable line 86, column 1 - line 86, column 47: " + [v.constructor.name]);
                };
            }, function (dictApplicative) {
                return function (v) {
                    return function (v1) {
                        if (v1 instanceof Data_Maybe.Nothing) {
                            return Control_Applicative.pure(dictApplicative)(Data_Maybe.Nothing.value);
                        };
                        if (v1 instanceof Data_Maybe.Just) {
                            return Data_Functor.map(dictApplicative.Apply0().Functor0())(Data_Maybe.Just.create)(v(v1.value0));
                        };
                        throw new Error("Failed pattern match at Data.Traversable line 86, column 1 - line 86, column 47: " + [v.constructor.name, v1.constructor.name]);
                    };
                };
            });
            var traversableDual = new Traversable(function () {
                return Data_Foldable.foldableDual;
            }, function () {
                return Data_Monoid_Dual.functorDual;
            }, function (dictApplicative) {
                return function (v) {
                    return Data_Functor.map(dictApplicative.Apply0().Functor0())(Data_Monoid_Dual.Dual)(v);
                };
            }, function (dictApplicative) {
                return function (f) {
                    return function (v) {
                        return Data_Functor.map(dictApplicative.Apply0().Functor0())(Data_Monoid_Dual.Dual)(f(v));
                    };
                };
            });
            var traversableDisj = new Traversable(function () {
                return Data_Foldable.foldableDisj;
            }, function () {
                return Data_Monoid_Disj.functorDisj;
            }, function (dictApplicative) {
                return function (v) {
                    return Data_Functor.map(dictApplicative.Apply0().Functor0())(Data_Monoid_Disj.Disj)(v);
                };
            }, function (dictApplicative) {
                return function (f) {
                    return function (v) {
                        return Data_Functor.map(dictApplicative.Apply0().Functor0())(Data_Monoid_Disj.Disj)(f(v));
                    };
                };
            });
            var traversableConj = new Traversable(function () {
                return Data_Foldable.foldableConj;
            }, function () {
                return Data_Monoid_Conj.functorConj;
            }, function (dictApplicative) {
                return function (v) {
                    return Data_Functor.map(dictApplicative.Apply0().Functor0())(Data_Monoid_Conj.Conj)(v);
                };
            }, function (dictApplicative) {
                return function (f) {
                    return function (v) {
                        return Data_Functor.map(dictApplicative.Apply0().Functor0())(Data_Monoid_Conj.Conj)(f(v));
                    };
                };
            });
            var traversableAdditive = new Traversable(function () {
                return Data_Foldable.foldableAdditive;
            }, function () {
                return Data_Monoid_Additive.functorAdditive;
            }, function (dictApplicative) {
                return function (v) {
                    return Data_Functor.map(dictApplicative.Apply0().Functor0())(Data_Monoid_Additive.Additive)(v);
                };
            }, function (dictApplicative) {
                return function (f) {
                    return function (v) {
                        return Data_Functor.map(dictApplicative.Apply0().Functor0())(Data_Monoid_Additive.Additive)(f(v));
                    };
                };
            });
            var sequenceDefault = function sequenceDefault(dictTraversable) {
                return function (dictApplicative) {
                    return traverse(dictTraversable)(dictApplicative)(Control_Category.id(Control_Category.categoryFn));
                };
            };
            var traversableArray = new Traversable(function () {
                return Data_Foldable.foldableArray;
            }, function () {
                return Data_Functor.functorArray;
            }, function (dictApplicative) {
                return sequenceDefault(traversableArray)(dictApplicative);
            }, function (dictApplicative) {
                return $foreign.traverseArrayImpl(Control_Apply.apply(dictApplicative.Apply0()))(Data_Functor.map(dictApplicative.Apply0().Functor0()))(Control_Applicative.pure(dictApplicative));
            });
            var sequence = function sequence(dict) {
                return dict.sequence;
            };
            var traversableFirst = new Traversable(function () {
                return Data_Foldable.foldableFirst;
            }, function () {
                return Data_Maybe_First.functorFirst;
            }, function (dictApplicative) {
                return function (v) {
                    return Data_Functor.map(dictApplicative.Apply0().Functor0())(Data_Maybe_First.First)(sequence(traversableMaybe)(dictApplicative)(v));
                };
            }, function (dictApplicative) {
                return function (f) {
                    return function (v) {
                        return Data_Functor.map(dictApplicative.Apply0().Functor0())(Data_Maybe_First.First)(traverse(traversableMaybe)(dictApplicative)(f)(v));
                    };
                };
            });
            var traversableLast = new Traversable(function () {
                return Data_Foldable.foldableLast;
            }, function () {
                return Data_Maybe_Last.functorLast;
            }, function (dictApplicative) {
                return function (v) {
                    return Data_Functor.map(dictApplicative.Apply0().Functor0())(Data_Maybe_Last.Last)(sequence(traversableMaybe)(dictApplicative)(v));
                };
            }, function (dictApplicative) {
                return function (f) {
                    return function (v) {
                        return Data_Functor.map(dictApplicative.Apply0().Functor0())(Data_Maybe_Last.Last)(traverse(traversableMaybe)(dictApplicative)(f)(v));
                    };
                };
            });
            var traverseDefault = function traverseDefault(dictTraversable) {
                return function (dictApplicative) {
                    return function (f) {
                        return function (ta) {
                            return sequence(dictTraversable)(dictApplicative)(Data_Functor.map(dictTraversable.Functor0())(f)(ta));
                        };
                    };
                };
            };
            var mapAccumR = function mapAccumR(dictTraversable) {
                return function (f) {
                    return function (s0) {
                        return function (xs) {
                            return Data_Traversable_Accum_Internal.stateR(traverse(dictTraversable)(Data_Traversable_Accum_Internal.applicativeStateR)(function (a) {
                                return function (s) {
                                    return f(s)(a);
                                };
                            })(xs))(s0);
                        };
                    };
                };
            };
            var scanr = function scanr(dictTraversable) {
                return function (f) {
                    return function (b0) {
                        return function (xs) {
                            return mapAccumR(dictTraversable)(function (b) {
                                return function (a) {
                                    var b$prime = f(a)(b);
                                    return {
                                        accum: b$prime,
                                        value: b$prime
                                    };
                                };
                            })(b0)(xs).value;
                        };
                    };
                };
            };
            var mapAccumL = function mapAccumL(dictTraversable) {
                return function (f) {
                    return function (s0) {
                        return function (xs) {
                            return Data_Traversable_Accum_Internal.stateL(traverse(dictTraversable)(Data_Traversable_Accum_Internal.applicativeStateL)(function (a) {
                                return function (s) {
                                    return f(s)(a);
                                };
                            })(xs))(s0);
                        };
                    };
                };
            };
            var scanl = function scanl(dictTraversable) {
                return function (f) {
                    return function (b0) {
                        return function (xs) {
                            return mapAccumL(dictTraversable)(function (b) {
                                return function (a) {
                                    var b$prime = f(b)(a);
                                    return {
                                        accum: b$prime,
                                        value: b$prime
                                    };
                                };
                            })(b0)(xs).value;
                        };
                    };
                };
            };
            var $$for = function $$for(dictApplicative) {
                return function (dictTraversable) {
                    return function (x) {
                        return function (f) {
                            return traverse(dictTraversable)(dictApplicative)(f)(x);
                        };
                    };
                };
            };
            module.exports = {
                Traversable: Traversable,
                traverse: traverse,
                sequence: sequence,
                traverseDefault: traverseDefault,
                sequenceDefault: sequenceDefault,
                "for": $$for,
                scanl: scanl,
                scanr: scanr,
                mapAccumL: mapAccumL,
                mapAccumR: mapAccumR,
                traversableArray: traversableArray,
                traversableMaybe: traversableMaybe,
                traversableFirst: traversableFirst,
                traversableLast: traversableLast,
                traversableAdditive: traversableAdditive,
                traversableDual: traversableDual,
                traversableConj: traversableConj,
                traversableDisj: traversableDisj,
                traversableMultiplicative: traversableMultiplicative
            };

            /***/
        },
        /* 69 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            // jshint maxparams: 3

            exports.traverseArrayImpl = function () {
                function Cont(fn) {
                    this.fn = fn;
                }

                var emptyList = {};

                var ConsCell = function ConsCell(head, tail) {
                    this.head = head;
                    this.tail = tail;
                };

                function consList(x) {
                    return function (xs) {
                        return new ConsCell(x, xs);
                    };
                }

                function listToArray(list) {
                    var arr = [];
                    var xs = list;
                    while (xs !== emptyList) {
                        arr.push(xs.head);
                        xs = xs.tail;
                    }
                    return arr;
                }

                return function (apply) {
                    return function (map) {
                        return function (pure) {
                            return function (f) {
                                var buildFrom = function buildFrom(x, ys) {
                                    return apply(map(consList)(f(x)))(ys);
                                };

                                var go = function go(acc, currentLen, xs) {
                                    if (currentLen === 0) {
                                        return acc;
                                    } else {
                                        var last = xs[currentLen - 1];
                                        return new Cont(function () {
                                            return go(buildFrom(last, acc), currentLen - 1, xs);
                                        });
                                    }
                                };

                                return function (array) {
                                    var result = go(pure(emptyList), array.length, array);
                                    while (result instanceof Cont) {
                                        result = result.fn();
                                    }

                                    return map(listToArray)(result);
                                };
                            };
                        };
                    };
                };
            }();

            /***/
        },
        /* 70 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var $foreign = __webpack_require__(71);
            var Control_Alt = __webpack_require__(23);
            var Control_Applicative = __webpack_require__(3);
            var Control_Apply = __webpack_require__(2);
            var Control_Bind = __webpack_require__(8);
            var Control_Category = __webpack_require__(13);
            var Control_Plus = __webpack_require__(27);
            var Control_Semigroupoid = __webpack_require__(20);
            var Data_Eq = __webpack_require__(6);
            var Data_Function = __webpack_require__(14);
            var Data_Functor = __webpack_require__(0);
            var Data_HeytingAlgebra = __webpack_require__(21);
            var Data_Maybe = __webpack_require__(28);
            var Data_Maybe_First = __webpack_require__(36);
            var Data_Maybe_Last = __webpack_require__(37);
            var Data_Monoid = __webpack_require__(12);
            var Data_Monoid_Additive = __webpack_require__(38);
            var Data_Monoid_Conj = __webpack_require__(39);
            var Data_Monoid_Disj = __webpack_require__(40);
            var Data_Monoid_Dual = __webpack_require__(41);
            var Data_Monoid_Endo = __webpack_require__(74);
            var Data_Monoid_Multiplicative = __webpack_require__(42);
            var Data_Newtype = __webpack_require__(18);
            var Data_Ord = __webpack_require__(10);
            var Data_Ordering = __webpack_require__(19);
            var Data_Semigroup = __webpack_require__(4);
            var Data_Semiring = __webpack_require__(9);
            var Data_Unit = __webpack_require__(1);
            var Prelude = __webpack_require__(5);
            var Foldable = function Foldable(foldMap, foldl, foldr) {
                this.foldMap = foldMap;
                this.foldl = foldl;
                this.foldr = foldr;
            };
            var foldr = function foldr(dict) {
                return dict.foldr;
            };
            var indexr = function indexr(dictFoldable) {
                return function (idx) {
                    var go = function go(a) {
                        return function (cursor) {
                            if (cursor.elem instanceof Data_Maybe.Just) {
                                return cursor;
                            };
                            var $106 = cursor.pos === idx;
                            if ($106) {
                                return {
                                    elem: new Data_Maybe.Just(a),
                                    pos: cursor.pos
                                };
                            };
                            return {
                                pos: cursor.pos + 1 | 0,
                                elem: cursor.elem
                            };
                        };
                    };
                    return function ($193) {
                        return function (v) {
                            return v.elem;
                        }(foldr(dictFoldable)(go)({
                            elem: Data_Maybe.Nothing.value,
                            pos: 0
                        })($193));
                    };
                };
            };
            var $$null = function $$null(dictFoldable) {
                return foldr(dictFoldable)(function (v) {
                    return function (v1) {
                        return false;
                    };
                })(true);
            };
            var oneOf = function oneOf(dictFoldable) {
                return function (dictPlus) {
                    return foldr(dictFoldable)(Control_Alt.alt(dictPlus.Alt0()))(Control_Plus.empty(dictPlus));
                };
            };
            var oneOfMap = function oneOfMap(dictFoldable) {
                return function (dictPlus) {
                    return function (f) {
                        return foldr(dictFoldable)(function ($194) {
                            return Control_Alt.alt(dictPlus.Alt0())(f($194));
                        })(Control_Plus.empty(dictPlus));
                    };
                };
            };
            var traverse_ = function traverse_(dictApplicative) {
                return function (dictFoldable) {
                    return function (f) {
                        return foldr(dictFoldable)(function ($195) {
                            return Control_Apply.applySecond(dictApplicative.Apply0())(f($195));
                        })(Control_Applicative.pure(dictApplicative)(Data_Unit.unit));
                    };
                };
            };
            var for_ = function for_(dictApplicative) {
                return function (dictFoldable) {
                    return Data_Function.flip(traverse_(dictApplicative)(dictFoldable));
                };
            };
            var sequence_ = function sequence_(dictApplicative) {
                return function (dictFoldable) {
                    return traverse_(dictApplicative)(dictFoldable)(Control_Category.id(Control_Category.categoryFn));
                };
            };
            var foldl = function foldl(dict) {
                return dict.foldl;
            };
            var indexl = function indexl(dictFoldable) {
                return function (idx) {
                    var go = function go(cursor) {
                        return function (a) {
                            if (cursor.elem instanceof Data_Maybe.Just) {
                                return cursor;
                            };
                            var $109 = cursor.pos === idx;
                            if ($109) {
                                return {
                                    elem: new Data_Maybe.Just(a),
                                    pos: cursor.pos
                                };
                            };
                            return {
                                pos: cursor.pos + 1 | 0,
                                elem: cursor.elem
                            };
                        };
                    };
                    return function ($196) {
                        return function (v) {
                            return v.elem;
                        }(foldl(dictFoldable)(go)({
                            elem: Data_Maybe.Nothing.value,
                            pos: 0
                        })($196));
                    };
                };
            };
            var intercalate = function intercalate(dictFoldable) {
                return function (dictMonoid) {
                    return function (sep) {
                        return function (xs) {
                            var go = function go(v) {
                                return function (x) {
                                    if (v.init) {
                                        return {
                                            init: false,
                                            acc: x
                                        };
                                    };
                                    return {
                                        init: false,
                                        acc: Data_Semigroup.append(dictMonoid.Semigroup0())(v.acc)(Data_Semigroup.append(dictMonoid.Semigroup0())(sep)(x))
                                    };
                                };
                            };
                            return foldl(dictFoldable)(go)({
                                init: true,
                                acc: Data_Monoid.mempty(dictMonoid)
                            })(xs).acc;
                        };
                    };
                };
            };
            var length = function length(dictFoldable) {
                return function (dictSemiring) {
                    return foldl(dictFoldable)(function (c) {
                        return function (v) {
                            return Data_Semiring.add(dictSemiring)(Data_Semiring.one(dictSemiring))(c);
                        };
                    })(Data_Semiring.zero(dictSemiring));
                };
            };
            var maximumBy = function maximumBy(dictFoldable) {
                return function (cmp) {
                    var max$prime = function max$prime(v) {
                        return function (v1) {
                            if (v instanceof Data_Maybe.Nothing) {
                                return new Data_Maybe.Just(v1);
                            };
                            if (v instanceof Data_Maybe.Just) {
                                return new Data_Maybe.Just(function () {
                                    var $116 = Data_Eq.eq(Data_Ordering.eqOrdering)(cmp(v.value0)(v1))(Data_Ordering.GT.value);
                                    if ($116) {
                                        return v.value0;
                                    };
                                    return v1;
                                }());
                            };
                            throw new Error("Failed pattern match at Data.Foldable line 378, column 3 - line 378, column 27: " + [v.constructor.name, v1.constructor.name]);
                        };
                    };
                    return foldl(dictFoldable)(max$prime)(Data_Maybe.Nothing.value);
                };
            };
            var maximum = function maximum(dictOrd) {
                return function (dictFoldable) {
                    return maximumBy(dictFoldable)(Data_Ord.compare(dictOrd));
                };
            };
            var minimumBy = function minimumBy(dictFoldable) {
                return function (cmp) {
                    var min$prime = function min$prime(v) {
                        return function (v1) {
                            if (v instanceof Data_Maybe.Nothing) {
                                return new Data_Maybe.Just(v1);
                            };
                            if (v instanceof Data_Maybe.Just) {
                                return new Data_Maybe.Just(function () {
                                    var $120 = Data_Eq.eq(Data_Ordering.eqOrdering)(cmp(v.value0)(v1))(Data_Ordering.LT.value);
                                    if ($120) {
                                        return v.value0;
                                    };
                                    return v1;
                                }());
                            };
                            throw new Error("Failed pattern match at Data.Foldable line 391, column 3 - line 391, column 27: " + [v.constructor.name, v1.constructor.name]);
                        };
                    };
                    return foldl(dictFoldable)(min$prime)(Data_Maybe.Nothing.value);
                };
            };
            var minimum = function minimum(dictOrd) {
                return function (dictFoldable) {
                    return minimumBy(dictFoldable)(Data_Ord.compare(dictOrd));
                };
            };
            var product = function product(dictFoldable) {
                return function (dictSemiring) {
                    return foldl(dictFoldable)(Data_Semiring.mul(dictSemiring))(Data_Semiring.one(dictSemiring));
                };
            };
            var sum = function sum(dictFoldable) {
                return function (dictSemiring) {
                    return foldl(dictFoldable)(Data_Semiring.add(dictSemiring))(Data_Semiring.zero(dictSemiring));
                };
            };
            var foldableMultiplicative = new Foldable(function (dictMonoid) {
                return function (f) {
                    return function (v) {
                        return f(v);
                    };
                };
            }, function (f) {
                return function (z) {
                    return function (v) {
                        return f(z)(v);
                    };
                };
            }, function (f) {
                return function (z) {
                    return function (v) {
                        return f(v)(z);
                    };
                };
            });
            var foldableMaybe = new Foldable(function (dictMonoid) {
                return function (f) {
                    return function (v) {
                        if (v instanceof Data_Maybe.Nothing) {
                            return Data_Monoid.mempty(dictMonoid);
                        };
                        if (v instanceof Data_Maybe.Just) {
                            return f(v.value0);
                        };
                        throw new Error("Failed pattern match at Data.Foldable line 131, column 1 - line 131, column 41: " + [f.constructor.name, v.constructor.name]);
                    };
                };
            }, function (v) {
                return function (z) {
                    return function (v1) {
                        if (v1 instanceof Data_Maybe.Nothing) {
                            return z;
                        };
                        if (v1 instanceof Data_Maybe.Just) {
                            return v(z)(v1.value0);
                        };
                        throw new Error("Failed pattern match at Data.Foldable line 131, column 1 - line 131, column 41: " + [v.constructor.name, z.constructor.name, v1.constructor.name]);
                    };
                };
            }, function (v) {
                return function (z) {
                    return function (v1) {
                        if (v1 instanceof Data_Maybe.Nothing) {
                            return z;
                        };
                        if (v1 instanceof Data_Maybe.Just) {
                            return v(v1.value0)(z);
                        };
                        throw new Error("Failed pattern match at Data.Foldable line 131, column 1 - line 131, column 41: " + [v.constructor.name, z.constructor.name, v1.constructor.name]);
                    };
                };
            });
            var foldableDual = new Foldable(function (dictMonoid) {
                return function (f) {
                    return function (v) {
                        return f(v);
                    };
                };
            }, function (f) {
                return function (z) {
                    return function (v) {
                        return f(z)(v);
                    };
                };
            }, function (f) {
                return function (z) {
                    return function (v) {
                        return f(v)(z);
                    };
                };
            });
            var foldableDisj = new Foldable(function (dictMonoid) {
                return function (f) {
                    return function (v) {
                        return f(v);
                    };
                };
            }, function (f) {
                return function (z) {
                    return function (v) {
                        return f(z)(v);
                    };
                };
            }, function (f) {
                return function (z) {
                    return function (v) {
                        return f(v)(z);
                    };
                };
            });
            var foldableConj = new Foldable(function (dictMonoid) {
                return function (f) {
                    return function (v) {
                        return f(v);
                    };
                };
            }, function (f) {
                return function (z) {
                    return function (v) {
                        return f(z)(v);
                    };
                };
            }, function (f) {
                return function (z) {
                    return function (v) {
                        return f(v)(z);
                    };
                };
            });
            var foldableAdditive = new Foldable(function (dictMonoid) {
                return function (f) {
                    return function (v) {
                        return f(v);
                    };
                };
            }, function (f) {
                return function (z) {
                    return function (v) {
                        return f(z)(v);
                    };
                };
            }, function (f) {
                return function (z) {
                    return function (v) {
                        return f(v)(z);
                    };
                };
            });
            var foldMapDefaultR = function foldMapDefaultR(dictFoldable) {
                return function (dictMonoid) {
                    return function (f) {
                        return foldr(dictFoldable)(function (x) {
                            return function (acc) {
                                return Data_Semigroup.append(dictMonoid.Semigroup0())(f(x))(acc);
                            };
                        })(Data_Monoid.mempty(dictMonoid));
                    };
                };
            };
            var foldableArray = new Foldable(function (dictMonoid) {
                return foldMapDefaultR(foldableArray)(dictMonoid);
            }, $foreign.foldlArray, $foreign.foldrArray);
            var foldMapDefaultL = function foldMapDefaultL(dictFoldable) {
                return function (dictMonoid) {
                    return function (f) {
                        return foldl(dictFoldable)(function (acc) {
                            return function (x) {
                                return Data_Semigroup.append(dictMonoid.Semigroup0())(acc)(f(x));
                            };
                        })(Data_Monoid.mempty(dictMonoid));
                    };
                };
            };
            var foldMap = function foldMap(dict) {
                return dict.foldMap;
            };
            var foldableFirst = new Foldable(function (dictMonoid) {
                return function (f) {
                    return function (v) {
                        return foldMap(foldableMaybe)(dictMonoid)(f)(v);
                    };
                };
            }, function (f) {
                return function (z) {
                    return function (v) {
                        return foldl(foldableMaybe)(f)(z)(v);
                    };
                };
            }, function (f) {
                return function (z) {
                    return function (v) {
                        return foldr(foldableMaybe)(f)(z)(v);
                    };
                };
            });
            var foldableLast = new Foldable(function (dictMonoid) {
                return function (f) {
                    return function (v) {
                        return foldMap(foldableMaybe)(dictMonoid)(f)(v);
                    };
                };
            }, function (f) {
                return function (z) {
                    return function (v) {
                        return foldl(foldableMaybe)(f)(z)(v);
                    };
                };
            }, function (f) {
                return function (z) {
                    return function (v) {
                        return foldr(foldableMaybe)(f)(z)(v);
                    };
                };
            });
            var foldlDefault = function foldlDefault(dictFoldable) {
                return function (c) {
                    return function (u) {
                        return function (xs) {
                            return Data_Newtype.unwrap(Data_Monoid_Endo.newtypeEndo)(Data_Newtype.unwrap(Data_Monoid_Dual.newtypeDual)(foldMap(dictFoldable)(Data_Monoid_Dual.monoidDual(Data_Monoid_Endo.monoidEndo))(function ($197) {
                                return Data_Monoid_Dual.Dual(Data_Monoid_Endo.Endo(Data_Function.flip(c)($197)));
                            })(xs)))(u);
                        };
                    };
                };
            };
            var foldrDefault = function foldrDefault(dictFoldable) {
                return function (c) {
                    return function (u) {
                        return function (xs) {
                            return Data_Newtype.unwrap(Data_Monoid_Endo.newtypeEndo)(foldMap(dictFoldable)(Data_Monoid_Endo.monoidEndo)(function ($198) {
                                return Data_Monoid_Endo.Endo(c($198));
                            })(xs))(u);
                        };
                    };
                };
            };
            var surroundMap = function surroundMap(dictFoldable) {
                return function (dictSemigroup) {
                    return function (d) {
                        return function (t) {
                            return function (f) {
                                var joined = function joined(a) {
                                    return function (m) {
                                        return Data_Semigroup.append(dictSemigroup)(d)(Data_Semigroup.append(dictSemigroup)(t(a))(m));
                                    };
                                };
                                return Data_Newtype.unwrap(Data_Monoid_Endo.newtypeEndo)(foldMap(dictFoldable)(Data_Monoid_Endo.monoidEndo)(joined)(f))(d);
                            };
                        };
                    };
                };
            };
            var surround = function surround(dictFoldable) {
                return function (dictSemigroup) {
                    return function (d) {
                        return surroundMap(dictFoldable)(dictSemigroup)(d)(Control_Category.id(Control_Category.categoryFn));
                    };
                };
            };
            var foldM = function foldM(dictFoldable) {
                return function (dictMonad) {
                    return function (f) {
                        return function (a0) {
                            return foldl(dictFoldable)(function (ma) {
                                return function (b) {
                                    return Control_Bind.bind(dictMonad.Bind1())(ma)(Data_Function.flip(f)(b));
                                };
                            })(Control_Applicative.pure(dictMonad.Applicative0())(a0));
                        };
                    };
                };
            };
            var fold = function fold(dictFoldable) {
                return function (dictMonoid) {
                    return foldMap(dictFoldable)(dictMonoid)(Control_Category.id(Control_Category.categoryFn));
                };
            };
            var findMap = function findMap(dictFoldable) {
                return function (p) {
                    var go = function go(v) {
                        return function (v1) {
                            if (v instanceof Data_Maybe.Nothing) {
                                return p(v1);
                            };
                            return v;
                        };
                    };
                    return foldl(dictFoldable)(go)(Data_Maybe.Nothing.value);
                };
            };
            var find = function find(dictFoldable) {
                return function (p) {
                    var go = function go(v) {
                        return function (v1) {
                            if (v instanceof Data_Maybe.Nothing && p(v1)) {
                                return new Data_Maybe.Just(v1);
                            };
                            return v;
                        };
                    };
                    return foldl(dictFoldable)(go)(Data_Maybe.Nothing.value);
                };
            };
            var any = function any(dictFoldable) {
                return function (dictHeytingAlgebra) {
                    return Data_Newtype.alaF(Data_Functor.functorFn)(Data_Functor.functorFn)(Data_Monoid_Disj.newtypeDisj)(Data_Monoid_Disj.newtypeDisj)(Data_Monoid_Disj.Disj)(foldMap(dictFoldable)(Data_Monoid_Disj.monoidDisj(dictHeytingAlgebra)));
                };
            };
            var elem = function elem(dictFoldable) {
                return function (dictEq) {
                    return function ($199) {
                        return any(dictFoldable)(Data_HeytingAlgebra.heytingAlgebraBoolean)(Data_Eq.eq(dictEq)($199));
                    };
                };
            };
            var notElem = function notElem(dictFoldable) {
                return function (dictEq) {
                    return function (x) {
                        return function ($200) {
                            return !elem(dictFoldable)(dictEq)(x)($200);
                        };
                    };
                };
            };
            var or = function or(dictFoldable) {
                return function (dictHeytingAlgebra) {
                    return any(dictFoldable)(dictHeytingAlgebra)(Control_Category.id(Control_Category.categoryFn));
                };
            };
            var all = function all(dictFoldable) {
                return function (dictHeytingAlgebra) {
                    return Data_Newtype.alaF(Data_Functor.functorFn)(Data_Functor.functorFn)(Data_Monoid_Conj.newtypeConj)(Data_Monoid_Conj.newtypeConj)(Data_Monoid_Conj.Conj)(foldMap(dictFoldable)(Data_Monoid_Conj.monoidConj(dictHeytingAlgebra)));
                };
            };
            var and = function and(dictFoldable) {
                return function (dictHeytingAlgebra) {
                    return all(dictFoldable)(dictHeytingAlgebra)(Control_Category.id(Control_Category.categoryFn));
                };
            };
            module.exports = {
                Foldable: Foldable,
                foldr: foldr,
                foldl: foldl,
                foldMap: foldMap,
                foldrDefault: foldrDefault,
                foldlDefault: foldlDefault,
                foldMapDefaultL: foldMapDefaultL,
                foldMapDefaultR: foldMapDefaultR,
                fold: fold,
                foldM: foldM,
                traverse_: traverse_,
                for_: for_,
                sequence_: sequence_,
                oneOf: oneOf,
                oneOfMap: oneOfMap,
                intercalate: intercalate,
                surroundMap: surroundMap,
                surround: surround,
                and: and,
                or: or,
                all: all,
                any: any,
                sum: sum,
                product: product,
                elem: elem,
                notElem: notElem,
                indexl: indexl,
                indexr: indexr,
                find: find,
                findMap: findMap,
                maximum: maximum,
                maximumBy: maximumBy,
                minimum: minimum,
                minimumBy: minimumBy,
                "null": $$null,
                length: length,
                foldableArray: foldableArray,
                foldableMaybe: foldableMaybe,
                foldableFirst: foldableFirst,
                foldableLast: foldableLast,
                foldableAdditive: foldableAdditive,
                foldableDual: foldableDual,
                foldableDisj: foldableDisj,
                foldableConj: foldableConj,
                foldableMultiplicative: foldableMultiplicative
            };

            /***/
        },
        /* 71 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            exports.foldrArray = function (f) {
                return function (init) {
                    return function (xs) {
                        var acc = init;
                        var len = xs.length;
                        for (var i = len - 1; i >= 0; i--) {
                            acc = f(xs[i])(acc);
                        }
                        return acc;
                    };
                };
            };

            exports.foldlArray = function (f) {
                return function (init) {
                    return function (xs) {
                        var acc = init;
                        var len = xs.length;
                        for (var i = 0; i < len; i++) {
                            acc = f(acc)(xs[i]);
                        }
                        return acc;
                    };
                };
            };

            /***/
        },
        /* 72 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            exports.arrayExtend = function (f) {
                return function (xs) {
                    return xs.map(function (_, i, xs) {
                        return f(xs.slice(i));
                    });
                };
            };

            /***/
        },
        /* 73 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var Control_Alt = __webpack_require__(23);
            var Control_Alternative = __webpack_require__(35);
            var Control_Applicative = __webpack_require__(3);
            var Control_Apply = __webpack_require__(2);
            var Control_Bind = __webpack_require__(8);
            var Control_Monad = __webpack_require__(11);
            var Control_Plus = __webpack_require__(27);
            var Data_Functor = __webpack_require__(0);
            var Data_Unit = __webpack_require__(1);
            var MonadZero = function MonadZero(Alternative1, Monad0) {
                this.Alternative1 = Alternative1;
                this.Monad0 = Monad0;
            };
            var monadZeroArray = new MonadZero(function () {
                return Control_Alternative.alternativeArray;
            }, function () {
                return Control_Monad.monadArray;
            });
            var guard = function guard(dictMonadZero) {
                return function (v) {
                    if (v) {
                        return Control_Applicative.pure(dictMonadZero.Alternative1().Applicative0())(Data_Unit.unit);
                    };
                    if (!v) {
                        return Control_Plus.empty(dictMonadZero.Alternative1().Plus1());
                    };
                    throw new Error("Failed pattern match at Control.MonadZero line 54, column 1 - line 54, column 52: " + [v.constructor.name]);
                };
            };
            module.exports = {
                MonadZero: MonadZero,
                guard: guard,
                monadZeroArray: monadZeroArray
            };

            /***/
        },
        /* 74 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var Control_Category = __webpack_require__(13);
            var Control_Semigroupoid = __webpack_require__(20);
            var Data_Functor_Invariant = __webpack_require__(17);
            var Data_Monoid = __webpack_require__(12);
            var Data_Newtype = __webpack_require__(18);
            var Data_Semigroup = __webpack_require__(4);
            var Prelude = __webpack_require__(5);
            var Endo = function Endo(x) {
                return x;
            };
            var semigroupEndo = new Data_Semigroup.Semigroup(function (v) {
                return function (v1) {
                    return function ($11) {
                        return v(v1($11));
                    };
                };
            });
            var newtypeEndo = new Data_Newtype.Newtype(function (n) {
                return n;
            }, Endo);
            var monoidEndo = new Data_Monoid.Monoid(function () {
                return semigroupEndo;
            }, Control_Category.id(Control_Category.categoryFn));
            var invariantEndo = new Data_Functor_Invariant.Invariant(function (ab) {
                return function (ba) {
                    return function (v) {
                        return function ($12) {
                            return ab(v(ba($12)));
                        };
                    };
                };
            });
            module.exports = {
                Endo: Endo,
                newtypeEndo: newtypeEndo,
                invariantEndo: invariantEndo,
                semigroupEndo: semigroupEndo,
                monoidEndo: monoidEndo
            };

            /***/
        },
        /* 75 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var Control_Applicative = __webpack_require__(3);
            var Control_Apply = __webpack_require__(2);
            var Data_Functor = __webpack_require__(0);
            var Data_Traversable_Accum = __webpack_require__(43);
            var Prelude = __webpack_require__(5);
            var StateR = function StateR(x) {
                return x;
            };
            var StateL = function StateL(x) {
                return x;
            };
            var stateR = function stateR(v) {
                return v;
            };
            var stateL = function stateL(v) {
                return v;
            };
            var functorStateR = new Data_Functor.Functor(function (f) {
                return function (k) {
                    return function (s) {
                        var v = stateR(k)(s);
                        return {
                            accum: v.accum,
                            value: f(v.value)
                        };
                    };
                };
            });
            var functorStateL = new Data_Functor.Functor(function (f) {
                return function (k) {
                    return function (s) {
                        var v = stateL(k)(s);
                        return {
                            accum: v.accum,
                            value: f(v.value)
                        };
                    };
                };
            });
            var applyStateR = new Control_Apply.Apply(function () {
                return functorStateR;
            }, function (f) {
                return function (x) {
                    return function (s) {
                        var v = stateR(x)(s);
                        var v1 = stateR(f)(v.accum);
                        return {
                            accum: v1.accum,
                            value: v1.value(v.value)
                        };
                    };
                };
            });
            var applyStateL = new Control_Apply.Apply(function () {
                return functorStateL;
            }, function (f) {
                return function (x) {
                    return function (s) {
                        var v = stateL(f)(s);
                        var v1 = stateL(x)(v.accum);
                        return {
                            accum: v1.accum,
                            value: v.value(v1.value)
                        };
                    };
                };
            });
            var applicativeStateR = new Control_Applicative.Applicative(function () {
                return applyStateR;
            }, function (a) {
                return function (s) {
                    return {
                        accum: s,
                        value: a
                    };
                };
            });
            var applicativeStateL = new Control_Applicative.Applicative(function () {
                return applyStateL;
            }, function (a) {
                return function (s) {
                    return {
                        accum: s,
                        value: a
                    };
                };
            });
            module.exports = {
                StateL: StateL,
                stateL: stateL,
                StateR: StateR,
                stateR: stateR,
                functorStateL: functorStateL,
                applyStateL: applyStateL,
                applicativeStateL: applicativeStateL,
                functorStateR: functorStateR,
                applyStateR: applyStateR,
                applicativeStateR: applicativeStateR
            };

            /***/
        },
        /* 76 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var Control_Category = __webpack_require__(13);
            var Bifunctor = function Bifunctor(bimap) {
                this.bimap = bimap;
            };
            var bimap = function bimap(dict) {
                return dict.bimap;
            };
            var lmap = function lmap(dictBifunctor) {
                return function (f) {
                    return bimap(dictBifunctor)(f)(Control_Category.id(Control_Category.categoryFn));
                };
            };
            var rmap = function rmap(dictBifunctor) {
                return bimap(dictBifunctor)(Control_Category.id(Control_Category.categoryFn));
            };
            module.exports = {
                bimap: bimap,
                Bifunctor: Bifunctor,
                lmap: lmap,
                rmap: rmap
            };

            /***/
        },
        /* 77 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var Control_Category = __webpack_require__(13);
            var Data_Bifunctor = __webpack_require__(76);
            var Data_Function = __webpack_require__(14);
            var Biapply = function Biapply(Bifunctor0, biapply) {
                this.Bifunctor0 = Bifunctor0;
                this.biapply = biapply;
            };
            var biapply = function biapply(dict) {
                return dict.biapply;
            };
            var biapplyFirst = function biapplyFirst(dictBiapply) {
                return function (a) {
                    return function (b) {
                        return biapply(dictBiapply)(Control_Category.id(Control_Category.categoryFn)(Data_Bifunctor.bimap(dictBiapply.Bifunctor0())(Data_Function["const"](Control_Category.id(Control_Category.categoryFn)))(Data_Function["const"](Control_Category.id(Control_Category.categoryFn))))(a))(b);
                    };
                };
            };
            var biapplySecond = function biapplySecond(dictBiapply) {
                return function (a) {
                    return function (b) {
                        return biapply(dictBiapply)(Control_Category.id(Control_Category.categoryFn)(Data_Bifunctor.bimap(dictBiapply.Bifunctor0())(Data_Function["const"])(Data_Function["const"]))(a))(b);
                    };
                };
            };
            var bilift2 = function bilift2(dictBiapply) {
                return function (f) {
                    return function (g) {
                        return function (a) {
                            return function (b) {
                                return biapply(dictBiapply)(Control_Category.id(Control_Category.categoryFn)(Data_Bifunctor.bimap(dictBiapply.Bifunctor0())(f)(g))(a))(b);
                            };
                        };
                    };
                };
            };
            var bilift3 = function bilift3(dictBiapply) {
                return function (f) {
                    return function (g) {
                        return function (a) {
                            return function (b) {
                                return function (c) {
                                    return biapply(dictBiapply)(biapply(dictBiapply)(Control_Category.id(Control_Category.categoryFn)(Data_Bifunctor.bimap(dictBiapply.Bifunctor0())(f)(g))(a))(b))(c);
                                };
                            };
                        };
                    };
                };
            };
            module.exports = {
                biapply: biapply,
                Biapply: Biapply,
                biapplyFirst: biapplyFirst,
                biapplySecond: biapplySecond,
                bilift2: bilift2,
                bilift3: bilift3
            };

            /***/
        },
        /* 78 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var Control_Biapply = __webpack_require__(77);
            var Biapplicative = function Biapplicative(Biapply0, bipure) {
                this.Biapply0 = Biapply0;
                this.bipure = bipure;
            };
            var bipure = function bipure(dict) {
                return dict.bipure;
            };
            module.exports = {
                bipure: bipure,
                Biapplicative: Biapplicative
            };

            /***/
        },
        /* 79 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var $foreign = __webpack_require__(99);
            var Control_Monad_Eff = __webpack_require__(31);
            var pureST = function pureST(st) {
                return Control_Monad_Eff.runPure($foreign.runST(st));
            };
            module.exports = {
                pureST: pureST,
                newSTRef: $foreign.newSTRef,
                readSTRef: $foreign.readSTRef,
                modifySTRef: $foreign.modifySTRef,
                writeSTRef: $foreign.writeSTRef,
                runST: $foreign.runST
            };

            /***/
        },
        /* 80 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var $foreign = __webpack_require__(101);
            var Partial = __webpack_require__(102);
            var unsafePartialBecause = function unsafePartialBecause(v) {
                return function (x) {
                    return $foreign.unsafePartial(function (dictPartial) {
                        return x(dictPartial);
                    });
                };
            };
            var unsafeCrashWith = function unsafeCrashWith(msg) {
                return $foreign.unsafePartial(function (dictPartial) {
                    return Partial.crashWith(dictPartial)(msg);
                });
            };
            module.exports = {
                unsafePartialBecause: unsafePartialBecause,
                unsafeCrashWith: unsafeCrashWith,
                unsafePartial: $foreign.unsafePartial
            };

            /***/
        },
        /* 81 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var Data_Unit = __webpack_require__(1);
            var Lazy = function Lazy(defer) {
                this.defer = defer;
            };
            var lazyUnit = new Lazy(function (v) {
                return Data_Unit.unit;
            });
            var lazyFn = new Lazy(function (f) {
                return function (x) {
                    return f(Data_Unit.unit)(x);
                };
            });
            var defer = function defer(dict) {
                return dict.defer;
            };
            var fix = function fix(dictLazy) {
                return function (f) {
                    return defer(dictLazy)(function (v) {
                        return f(fix(dictLazy)(f));
                    });
                };
            };
            module.exports = {
                defer: defer,
                Lazy: Lazy,
                fix: fix,
                lazyFn: lazyFn,
                lazyUnit: lazyUnit
            };

            /***/
        },
        /* 82 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var Control_Applicative = __webpack_require__(3);
            var Control_Apply = __webpack_require__(2);
            var Control_Category = __webpack_require__(13);
            var Control_Semigroupoid = __webpack_require__(20);
            var Data_Bifunctor_Clown = __webpack_require__(84);
            var Data_Bifunctor_Flip = __webpack_require__(85);
            var Data_Bifunctor_Joker = __webpack_require__(86);
            var Data_Bifunctor_Product = __webpack_require__(87);
            var Data_Bifunctor_Wrap = __webpack_require__(88);
            var Data_Foldable = __webpack_require__(70);
            var Data_Function = __webpack_require__(14);
            var Data_Monoid = __webpack_require__(12);
            var Data_Monoid_Conj = __webpack_require__(39);
            var Data_Monoid_Disj = __webpack_require__(40);
            var Data_Monoid_Dual = __webpack_require__(41);
            var Data_Monoid_Endo = __webpack_require__(74);
            var Data_Newtype = __webpack_require__(18);
            var Data_Semigroup = __webpack_require__(4);
            var Data_Unit = __webpack_require__(1);
            var Prelude = __webpack_require__(5);
            var Bifoldable = function Bifoldable(bifoldMap, bifoldl, bifoldr) {
                this.bifoldMap = bifoldMap;
                this.bifoldl = bifoldl;
                this.bifoldr = bifoldr;
            };
            var bifoldr = function bifoldr(dict) {
                return dict.bifoldr;
            };
            var bitraverse_ = function bitraverse_(dictBifoldable) {
                return function (dictApplicative) {
                    return function (f) {
                        return function (g) {
                            return bifoldr(dictBifoldable)(function ($97) {
                                return Control_Apply.applySecond(dictApplicative.Apply0())(f($97));
                            })(function ($98) {
                                return Control_Apply.applySecond(dictApplicative.Apply0())(g($98));
                            })(Control_Applicative.pure(dictApplicative)(Data_Unit.unit));
                        };
                    };
                };
            };
            var bifor_ = function bifor_(dictBifoldable) {
                return function (dictApplicative) {
                    return function (t) {
                        return function (f) {
                            return function (g) {
                                return bitraverse_(dictBifoldable)(dictApplicative)(f)(g)(t);
                            };
                        };
                    };
                };
            };
            var bisequence_ = function bisequence_(dictBifoldable) {
                return function (dictApplicative) {
                    return bitraverse_(dictBifoldable)(dictApplicative)(Control_Category.id(Control_Category.categoryFn))(Control_Category.id(Control_Category.categoryFn));
                };
            };
            var bifoldl = function bifoldl(dict) {
                return dict.bifoldl;
            };
            var bifoldableJoker = function bifoldableJoker(dictFoldable) {
                return new Bifoldable(function (dictMonoid) {
                    return function (v) {
                        return function (r) {
                            return function (v1) {
                                return Data_Foldable.foldMap(dictFoldable)(dictMonoid)(r)(v1);
                            };
                        };
                    };
                }, function (v) {
                    return function (r) {
                        return function (u) {
                            return function (v1) {
                                return Data_Foldable.foldl(dictFoldable)(r)(u)(v1);
                            };
                        };
                    };
                }, function (v) {
                    return function (r) {
                        return function (u) {
                            return function (v1) {
                                return Data_Foldable.foldr(dictFoldable)(r)(u)(v1);
                            };
                        };
                    };
                });
            };
            var bifoldableClown = function bifoldableClown(dictFoldable) {
                return new Bifoldable(function (dictMonoid) {
                    return function (l) {
                        return function (v) {
                            return function (v1) {
                                return Data_Foldable.foldMap(dictFoldable)(dictMonoid)(l)(v1);
                            };
                        };
                    };
                }, function (l) {
                    return function (v) {
                        return function (u) {
                            return function (v1) {
                                return Data_Foldable.foldl(dictFoldable)(l)(u)(v1);
                            };
                        };
                    };
                }, function (l) {
                    return function (v) {
                        return function (u) {
                            return function (v1) {
                                return Data_Foldable.foldr(dictFoldable)(l)(u)(v1);
                            };
                        };
                    };
                });
            };
            var bifoldMapDefaultR = function bifoldMapDefaultR(dictBifoldable) {
                return function (dictMonoid) {
                    return function (f) {
                        return function (g) {
                            return bifoldr(dictBifoldable)(function ($99) {
                                return Data_Semigroup.append(dictMonoid.Semigroup0())(f($99));
                            })(function ($100) {
                                return Data_Semigroup.append(dictMonoid.Semigroup0())(g($100));
                            })(Data_Monoid.mempty(dictMonoid));
                        };
                    };
                };
            };
            var bifoldMapDefaultL = function bifoldMapDefaultL(dictBifoldable) {
                return function (dictMonoid) {
                    return function (f) {
                        return function (g) {
                            return bifoldl(dictBifoldable)(function (m) {
                                return function (a) {
                                    return Data_Semigroup.append(dictMonoid.Semigroup0())(m)(f(a));
                                };
                            })(function (m) {
                                return function (b) {
                                    return Data_Semigroup.append(dictMonoid.Semigroup0())(m)(g(b));
                                };
                            })(Data_Monoid.mempty(dictMonoid));
                        };
                    };
                };
            };
            var bifoldMap = function bifoldMap(dict) {
                return dict.bifoldMap;
            };
            var bifoldableFlip = function bifoldableFlip(dictBifoldable) {
                return new Bifoldable(function (dictMonoid) {
                    return function (r) {
                        return function (l) {
                            return function (v) {
                                return bifoldMap(dictBifoldable)(dictMonoid)(l)(r)(v);
                            };
                        };
                    };
                }, function (r) {
                    return function (l) {
                        return function (u) {
                            return function (v) {
                                return bifoldl(dictBifoldable)(l)(r)(u)(v);
                            };
                        };
                    };
                }, function (r) {
                    return function (l) {
                        return function (u) {
                            return function (v) {
                                return bifoldr(dictBifoldable)(l)(r)(u)(v);
                            };
                        };
                    };
                });
            };
            var bifoldableWrap = function bifoldableWrap(dictBifoldable) {
                return new Bifoldable(function (dictMonoid) {
                    return function (l) {
                        return function (r) {
                            return function (v) {
                                return bifoldMap(dictBifoldable)(dictMonoid)(l)(r)(v);
                            };
                        };
                    };
                }, function (l) {
                    return function (r) {
                        return function (u) {
                            return function (v) {
                                return bifoldl(dictBifoldable)(l)(r)(u)(v);
                            };
                        };
                    };
                }, function (l) {
                    return function (r) {
                        return function (u) {
                            return function (v) {
                                return bifoldr(dictBifoldable)(l)(r)(u)(v);
                            };
                        };
                    };
                });
            };
            var bifoldlDefault = function bifoldlDefault(dictBifoldable) {
                return function (f) {
                    return function (g) {
                        return function (z) {
                            return function (p) {
                                return Data_Newtype.unwrap(Data_Monoid_Endo.newtypeEndo)(Data_Newtype.unwrap(Data_Monoid_Dual.newtypeDual)(bifoldMap(dictBifoldable)(Data_Monoid_Dual.monoidDual(Data_Monoid_Endo.monoidEndo))(function ($101) {
                                    return Data_Monoid_Dual.Dual(Data_Monoid_Endo.Endo(Data_Function.flip(f)($101)));
                                })(function ($102) {
                                    return Data_Monoid_Dual.Dual(Data_Monoid_Endo.Endo(Data_Function.flip(g)($102)));
                                })(p)))(z);
                            };
                        };
                    };
                };
            };
            var bifoldrDefault = function bifoldrDefault(dictBifoldable) {
                return function (f) {
                    return function (g) {
                        return function (z) {
                            return function (p) {
                                return Data_Newtype.unwrap(Data_Monoid_Endo.newtypeEndo)(bifoldMap(dictBifoldable)(Data_Monoid_Endo.monoidEndo)(function ($103) {
                                    return Data_Monoid_Endo.Endo(f($103));
                                })(function ($104) {
                                    return Data_Monoid_Endo.Endo(g($104));
                                })(p))(z);
                            };
                        };
                    };
                };
            };
            var bifoldableProduct = function bifoldableProduct(dictBifoldable) {
                return function (dictBifoldable1) {
                    return new Bifoldable(function (dictMonoid) {
                        return function (l) {
                            return function (r) {
                                return function (v) {
                                    return Data_Semigroup.append(dictMonoid.Semigroup0())(bifoldMap(dictBifoldable)(dictMonoid)(l)(r)(v.value0))(bifoldMap(dictBifoldable1)(dictMonoid)(l)(r)(v.value1));
                                };
                            };
                        };
                    }, function (l) {
                        return function (r) {
                            return function (u) {
                                return function (m) {
                                    return bifoldlDefault(bifoldableProduct(dictBifoldable)(dictBifoldable1))(l)(r)(u)(m);
                                };
                            };
                        };
                    }, function (l) {
                        return function (r) {
                            return function (u) {
                                return function (m) {
                                    return bifoldrDefault(bifoldableProduct(dictBifoldable)(dictBifoldable1))(l)(r)(u)(m);
                                };
                            };
                        };
                    });
                };
            };
            var bifold = function bifold(dictBifoldable) {
                return function (dictMonoid) {
                    return bifoldMap(dictBifoldable)(dictMonoid)(Control_Category.id(Control_Category.categoryFn))(Control_Category.id(Control_Category.categoryFn));
                };
            };
            var biany = function biany(dictBifoldable) {
                return function (dictBooleanAlgebra) {
                    return function (p) {
                        return function (q) {
                            return function ($105) {
                                return Data_Newtype.unwrap(Data_Monoid_Disj.newtypeDisj)(bifoldMap(dictBifoldable)(Data_Monoid_Disj.monoidDisj(dictBooleanAlgebra.HeytingAlgebra0()))(function ($106) {
                                    return Data_Monoid_Disj.Disj(p($106));
                                })(function ($107) {
                                    return Data_Monoid_Disj.Disj(q($107));
                                })($105));
                            };
                        };
                    };
                };
            };
            var biall = function biall(dictBifoldable) {
                return function (dictBooleanAlgebra) {
                    return function (p) {
                        return function (q) {
                            return function ($108) {
                                return Data_Newtype.unwrap(Data_Monoid_Conj.newtypeConj)(bifoldMap(dictBifoldable)(Data_Monoid_Conj.monoidConj(dictBooleanAlgebra.HeytingAlgebra0()))(function ($109) {
                                    return Data_Monoid_Conj.Conj(p($109));
                                })(function ($110) {
                                    return Data_Monoid_Conj.Conj(q($110));
                                })($108));
                            };
                        };
                    };
                };
            };
            module.exports = {
                bifoldMap: bifoldMap,
                bifoldl: bifoldl,
                bifoldr: bifoldr,
                Bifoldable: Bifoldable,
                bifoldrDefault: bifoldrDefault,
                bifoldlDefault: bifoldlDefault,
                bifoldMapDefaultR: bifoldMapDefaultR,
                bifoldMapDefaultL: bifoldMapDefaultL,
                bifold: bifold,
                bitraverse_: bitraverse_,
                bifor_: bifor_,
                bisequence_: bisequence_,
                biany: biany,
                biall: biall,
                bifoldableClown: bifoldableClown,
                bifoldableJoker: bifoldableJoker,
                bifoldableFlip: bifoldableFlip,
                bifoldableProduct: bifoldableProduct,
                bifoldableWrap: bifoldableWrap
            };

            /***/
        },
        /* 83 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var $foreign = __webpack_require__(109);
            var Data_Function = __webpack_require__(14);
            var Data_Functor = __webpack_require__(0);
            var Data_Maybe = __webpack_require__(28);
            var Data_Maybe_First = __webpack_require__(36);
            var Data_Maybe_Last = __webpack_require__(37);
            var Data_Monoid_Additive = __webpack_require__(38);
            var Data_Monoid_Conj = __webpack_require__(39);
            var Data_Monoid_Disj = __webpack_require__(40);
            var Data_Monoid_Dual = __webpack_require__(41);
            var Data_Monoid_Multiplicative = __webpack_require__(42);
            var Data_Unit = __webpack_require__(1);
            var Prelude = __webpack_require__(5);
            var FunctorWithIndex = function FunctorWithIndex(Functor0, mapWithIndex) {
                this.Functor0 = Functor0;
                this.mapWithIndex = mapWithIndex;
            };
            var mapWithIndex = function mapWithIndex(dict) {
                return dict.mapWithIndex;
            };
            var functorWithIndexMultiplicative = new FunctorWithIndex(function () {
                return Data_Monoid_Multiplicative.functorMultiplicative;
            }, function (f) {
                return Data_Functor.map(Data_Monoid_Multiplicative.functorMultiplicative)(f(Data_Unit.unit));
            });
            var functorWithIndexMaybe = new FunctorWithIndex(function () {
                return Data_Maybe.functorMaybe;
            }, function (f) {
                return Data_Functor.map(Data_Maybe.functorMaybe)(f(Data_Unit.unit));
            });
            var functorWithIndexLast = new FunctorWithIndex(function () {
                return Data_Maybe_Last.functorLast;
            }, function (f) {
                return Data_Functor.map(Data_Maybe_Last.functorLast)(f(Data_Unit.unit));
            });
            var functorWithIndexFirst = new FunctorWithIndex(function () {
                return Data_Maybe_First.functorFirst;
            }, function (f) {
                return Data_Functor.map(Data_Maybe_First.functorFirst)(f(Data_Unit.unit));
            });
            var functorWithIndexDual = new FunctorWithIndex(function () {
                return Data_Monoid_Dual.functorDual;
            }, function (f) {
                return Data_Functor.map(Data_Monoid_Dual.functorDual)(f(Data_Unit.unit));
            });
            var functorWithIndexDisj = new FunctorWithIndex(function () {
                return Data_Monoid_Disj.functorDisj;
            }, function (f) {
                return Data_Functor.map(Data_Monoid_Disj.functorDisj)(f(Data_Unit.unit));
            });
            var functorWithIndexConj = new FunctorWithIndex(function () {
                return Data_Monoid_Conj.functorConj;
            }, function (f) {
                return Data_Functor.map(Data_Monoid_Conj.functorConj)(f(Data_Unit.unit));
            });
            var functorWithIndexArray = new FunctorWithIndex(function () {
                return Data_Functor.functorArray;
            }, $foreign.mapWithIndexArray);
            var functorWithIndexAdditive = new FunctorWithIndex(function () {
                return Data_Monoid_Additive.functorAdditive;
            }, function (f) {
                return Data_Functor.map(Data_Monoid_Additive.functorAdditive)(f(Data_Unit.unit));
            });
            module.exports = {
                FunctorWithIndex: FunctorWithIndex,
                mapWithIndex: mapWithIndex,
                functorWithIndexArray: functorWithIndexArray,
                functorWithIndexMaybe: functorWithIndexMaybe,
                functorWithIndexFirst: functorWithIndexFirst,
                functorWithIndexLast: functorWithIndexLast,
                functorWithIndexAdditive: functorWithIndexAdditive,
                functorWithIndexDual: functorWithIndexDual,
                functorWithIndexConj: functorWithIndexConj,
                functorWithIndexDisj: functorWithIndexDisj,
                functorWithIndexMultiplicative: functorWithIndexMultiplicative
            };

            /***/
        },
        /* 84 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var Control_Applicative = __webpack_require__(3);
            var Control_Apply = __webpack_require__(2);
            var Control_Biapplicative = __webpack_require__(78);
            var Control_Biapply = __webpack_require__(77);
            var Data_Bifunctor = __webpack_require__(76);
            var Data_Eq = __webpack_require__(6);
            var Data_Functor = __webpack_require__(0);
            var Data_Newtype = __webpack_require__(18);
            var Data_Ord = __webpack_require__(10);
            var Data_Semigroup = __webpack_require__(4);
            var Data_Show = __webpack_require__(7);
            var Prelude = __webpack_require__(5);
            var Clown = function Clown(x) {
                return x;
            };
            var showClown = function showClown(dictShow) {
                return new Data_Show.Show(function (v) {
                    return "(Clown " + (Data_Show.show(dictShow)(v) + ")");
                });
            };
            var ordClown = function ordClown(dictOrd) {
                return dictOrd;
            };
            var newtypeClown = new Data_Newtype.Newtype(function (n) {
                return n;
            }, Clown);
            var functorClown = new Data_Functor.Functor(function (v) {
                return function (v1) {
                    return v1;
                };
            });
            var eqClown = function eqClown(dictEq) {
                return dictEq;
            };
            var bifunctorClown = function bifunctorClown(dictFunctor) {
                return new Data_Bifunctor.Bifunctor(function (f) {
                    return function (v) {
                        return function (v1) {
                            return Data_Functor.map(dictFunctor)(f)(v1);
                        };
                    };
                });
            };
            var biapplyClown = function biapplyClown(dictApply) {
                return new Control_Biapply.Biapply(function () {
                    return bifunctorClown(dictApply.Functor0());
                }, function (v) {
                    return function (v1) {
                        return Control_Apply.apply(dictApply)(v)(v1);
                    };
                });
            };
            var biapplicativeClown = function biapplicativeClown(dictApplicative) {
                return new Control_Biapplicative.Biapplicative(function () {
                    return biapplyClown(dictApplicative.Apply0());
                }, function (a) {
                    return function (v) {
                        return Control_Applicative.pure(dictApplicative)(a);
                    };
                });
            };
            module.exports = {
                Clown: Clown,
                newtypeClown: newtypeClown,
                eqClown: eqClown,
                ordClown: ordClown,
                showClown: showClown,
                functorClown: functorClown,
                bifunctorClown: bifunctorClown,
                biapplyClown: biapplyClown,
                biapplicativeClown: biapplicativeClown
            };

            /***/
        },
        /* 85 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var Control_Biapplicative = __webpack_require__(78);
            var Control_Biapply = __webpack_require__(77);
            var Data_Bifunctor = __webpack_require__(76);
            var Data_Eq = __webpack_require__(6);
            var Data_Functor = __webpack_require__(0);
            var Data_Newtype = __webpack_require__(18);
            var Data_Ord = __webpack_require__(10);
            var Data_Semigroup = __webpack_require__(4);
            var Data_Show = __webpack_require__(7);
            var Prelude = __webpack_require__(5);
            var Flip = function Flip(x) {
                return x;
            };
            var showFlip = function showFlip(dictShow) {
                return new Data_Show.Show(function (v) {
                    return "(Flip " + (Data_Show.show(dictShow)(v) + ")");
                });
            };
            var ordFlip = function ordFlip(dictOrd) {
                return dictOrd;
            };
            var newtypeFlip = new Data_Newtype.Newtype(function (n) {
                return n;
            }, Flip);
            var functorFlip = function functorFlip(dictBifunctor) {
                return new Data_Functor.Functor(function (f) {
                    return function (v) {
                        return Data_Bifunctor.lmap(dictBifunctor)(f)(v);
                    };
                });
            };
            var eqFlip = function eqFlip(dictEq) {
                return dictEq;
            };
            var bifunctorFlip = function bifunctorFlip(dictBifunctor) {
                return new Data_Bifunctor.Bifunctor(function (f) {
                    return function (g) {
                        return function (v) {
                            return Data_Bifunctor.bimap(dictBifunctor)(g)(f)(v);
                        };
                    };
                });
            };
            var biapplyFlip = function biapplyFlip(dictBiapply) {
                return new Control_Biapply.Biapply(function () {
                    return bifunctorFlip(dictBiapply.Bifunctor0());
                }, function (v) {
                    return function (v1) {
                        return Control_Biapply.biapply(dictBiapply)(v)(v1);
                    };
                });
            };
            var biapplicativeFlip = function biapplicativeFlip(dictBiapplicative) {
                return new Control_Biapplicative.Biapplicative(function () {
                    return biapplyFlip(dictBiapplicative.Biapply0());
                }, function (a) {
                    return function (b) {
                        return Control_Biapplicative.bipure(dictBiapplicative)(b)(a);
                    };
                });
            };
            module.exports = {
                Flip: Flip,
                newtypeFlip: newtypeFlip,
                eqFlip: eqFlip,
                ordFlip: ordFlip,
                showFlip: showFlip,
                functorFlip: functorFlip,
                bifunctorFlip: bifunctorFlip,
                biapplyFlip: biapplyFlip,
                biapplicativeFlip: biapplicativeFlip
            };

            /***/
        },
        /* 86 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var Control_Applicative = __webpack_require__(3);
            var Control_Apply = __webpack_require__(2);
            var Control_Biapplicative = __webpack_require__(78);
            var Control_Biapply = __webpack_require__(77);
            var Data_Bifunctor = __webpack_require__(76);
            var Data_Eq = __webpack_require__(6);
            var Data_Functor = __webpack_require__(0);
            var Data_Newtype = __webpack_require__(18);
            var Data_Ord = __webpack_require__(10);
            var Data_Semigroup = __webpack_require__(4);
            var Data_Show = __webpack_require__(7);
            var Prelude = __webpack_require__(5);
            var Joker = function Joker(x) {
                return x;
            };
            var showJoker = function showJoker(dictShow) {
                return new Data_Show.Show(function (v) {
                    return "(Joker " + (Data_Show.show(dictShow)(v) + ")");
                });
            };
            var ordJoker = function ordJoker(dictOrd) {
                return dictOrd;
            };
            var newtypeJoker = new Data_Newtype.Newtype(function (n) {
                return n;
            }, Joker);
            var functorJoker = function functorJoker(dictFunctor) {
                return new Data_Functor.Functor(function (g) {
                    return function (v) {
                        return Data_Functor.map(dictFunctor)(g)(v);
                    };
                });
            };
            var eqJoker = function eqJoker(dictEq) {
                return dictEq;
            };
            var bifunctorJoker = function bifunctorJoker(dictFunctor) {
                return new Data_Bifunctor.Bifunctor(function (v) {
                    return function (g) {
                        return function (v1) {
                            return Data_Functor.map(dictFunctor)(g)(v1);
                        };
                    };
                });
            };
            var biapplyJoker = function biapplyJoker(dictApply) {
                return new Control_Biapply.Biapply(function () {
                    return bifunctorJoker(dictApply.Functor0());
                }, function (v) {
                    return function (v1) {
                        return Control_Apply.apply(dictApply)(v)(v1);
                    };
                });
            };
            var biapplicativeJoker = function biapplicativeJoker(dictApplicative) {
                return new Control_Biapplicative.Biapplicative(function () {
                    return biapplyJoker(dictApplicative.Apply0());
                }, function (v) {
                    return function (b) {
                        return Control_Applicative.pure(dictApplicative)(b);
                    };
                });
            };
            module.exports = {
                Joker: Joker,
                newtypeJoker: newtypeJoker,
                eqJoker: eqJoker,
                ordJoker: ordJoker,
                showJoker: showJoker,
                functorJoker: functorJoker,
                bifunctorJoker: bifunctorJoker,
                biapplyJoker: biapplyJoker,
                biapplicativeJoker: biapplicativeJoker
            };

            /***/
        },
        /* 87 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var Control_Biapplicative = __webpack_require__(78);
            var Control_Biapply = __webpack_require__(77);
            var Data_Bifunctor = __webpack_require__(76);
            var Data_Eq = __webpack_require__(6);
            var Data_HeytingAlgebra = __webpack_require__(21);
            var Data_Ord = __webpack_require__(10);
            var Data_Ordering = __webpack_require__(19);
            var Data_Semigroup = __webpack_require__(4);
            var Data_Show = __webpack_require__(7);
            var Prelude = __webpack_require__(5);
            var Product = function () {
                function Product(value0, value1) {
                    this.value0 = value0;
                    this.value1 = value1;
                };
                Product.create = function (value0) {
                    return function (value1) {
                        return new Product(value0, value1);
                    };
                };
                return Product;
            }();
            var showProduct = function showProduct(dictShow) {
                return function (dictShow1) {
                    return new Data_Show.Show(function (v) {
                        return "(Product " + (Data_Show.show(dictShow)(v.value0) + (" " + (Data_Show.show(dictShow1)(v.value1) + ")")));
                    });
                };
            };
            var eqProduct = function eqProduct(dictEq) {
                return function (dictEq1) {
                    return new Data_Eq.Eq(function (x) {
                        return function (y) {
                            return Data_Eq.eq(dictEq)(x.value0)(y.value0) && Data_Eq.eq(dictEq1)(x.value1)(y.value1);
                        };
                    });
                };
            };
            var ordProduct = function ordProduct(dictOrd) {
                return function (dictOrd1) {
                    return new Data_Ord.Ord(function () {
                        return eqProduct(dictOrd.Eq0())(dictOrd1.Eq0());
                    }, function (x) {
                        return function (y) {
                            var v = Data_Ord.compare(dictOrd)(x.value0)(y.value0);
                            if (v instanceof Data_Ordering.LT) {
                                return Data_Ordering.LT.value;
                            };
                            if (v instanceof Data_Ordering.GT) {
                                return Data_Ordering.GT.value;
                            };
                            return Data_Ord.compare(dictOrd1)(x.value1)(y.value1);
                        };
                    });
                };
            };
            var bifunctorProduct = function bifunctorProduct(dictBifunctor) {
                return function (dictBifunctor1) {
                    return new Data_Bifunctor.Bifunctor(function (f) {
                        return function (g) {
                            return function (v) {
                                return new Product(Data_Bifunctor.bimap(dictBifunctor)(f)(g)(v.value0), Data_Bifunctor.bimap(dictBifunctor1)(f)(g)(v.value1));
                            };
                        };
                    });
                };
            };
            var biapplyProduct = function biapplyProduct(dictBiapply) {
                return function (dictBiapply1) {
                    return new Control_Biapply.Biapply(function () {
                        return bifunctorProduct(dictBiapply.Bifunctor0())(dictBiapply1.Bifunctor0());
                    }, function (v) {
                        return function (v1) {
                            return new Product(Control_Biapply.biapply(dictBiapply)(v.value0)(v1.value0), Control_Biapply.biapply(dictBiapply1)(v.value1)(v1.value1));
                        };
                    });
                };
            };
            var biapplicativeProduct = function biapplicativeProduct(dictBiapplicative) {
                return function (dictBiapplicative1) {
                    return new Control_Biapplicative.Biapplicative(function () {
                        return biapplyProduct(dictBiapplicative.Biapply0())(dictBiapplicative1.Biapply0());
                    }, function (a) {
                        return function (b) {
                            return new Product(Control_Biapplicative.bipure(dictBiapplicative)(a)(b), Control_Biapplicative.bipure(dictBiapplicative1)(a)(b));
                        };
                    });
                };
            };
            module.exports = {
                Product: Product,
                eqProduct: eqProduct,
                ordProduct: ordProduct,
                showProduct: showProduct,
                bifunctorProduct: bifunctorProduct,
                biapplyProduct: biapplyProduct,
                biapplicativeProduct: biapplicativeProduct
            };

            /***/
        },
        /* 88 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var Control_Biapplicative = __webpack_require__(78);
            var Control_Biapply = __webpack_require__(77);
            var Data_Bifunctor = __webpack_require__(76);
            var Data_Eq = __webpack_require__(6);
            var Data_Functor = __webpack_require__(0);
            var Data_Newtype = __webpack_require__(18);
            var Data_Ord = __webpack_require__(10);
            var Data_Semigroup = __webpack_require__(4);
            var Data_Show = __webpack_require__(7);
            var Prelude = __webpack_require__(5);
            var Wrap = function Wrap(x) {
                return x;
            };
            var showWrap = function showWrap(dictShow) {
                return new Data_Show.Show(function (v) {
                    return "(Wrap " + (Data_Show.show(dictShow)(v) + ")");
                });
            };
            var ordWrap = function ordWrap(dictOrd) {
                return dictOrd;
            };
            var newtypeWrap = new Data_Newtype.Newtype(function (n) {
                return n;
            }, Wrap);
            var functorWrap = function functorWrap(dictBifunctor) {
                return new Data_Functor.Functor(function (f) {
                    return function (v) {
                        return Data_Bifunctor.rmap(dictBifunctor)(f)(v);
                    };
                });
            };
            var eqWrap = function eqWrap(dictEq) {
                return dictEq;
            };
            var bifunctorWrap = function bifunctorWrap(dictBifunctor) {
                return new Data_Bifunctor.Bifunctor(function (f) {
                    return function (g) {
                        return function (v) {
                            return Data_Bifunctor.bimap(dictBifunctor)(f)(g)(v);
                        };
                    };
                });
            };
            var biapplyWrap = function biapplyWrap(dictBiapply) {
                return new Control_Biapply.Biapply(function () {
                    return bifunctorWrap(dictBiapply.Bifunctor0());
                }, function (v) {
                    return function (v1) {
                        return Control_Biapply.biapply(dictBiapply)(v)(v1);
                    };
                });
            };
            var biapplicativeWrap = function biapplicativeWrap(dictBiapplicative) {
                return new Control_Biapplicative.Biapplicative(function () {
                    return biapplyWrap(dictBiapplicative.Biapply0());
                }, function (a) {
                    return function (b) {
                        return Control_Biapplicative.bipure(dictBiapplicative)(a)(b);
                    };
                });
            };
            module.exports = {
                Wrap: Wrap,
                newtypeWrap: newtypeWrap,
                eqWrap: eqWrap,
                ordWrap: ordWrap,
                showWrap: showWrap,
                functorWrap: functorWrap,
                bifunctorWrap: bifunctorWrap,
                biapplyWrap: biapplyWrap,
                biapplicativeWrap: biapplicativeWrap
            };

            /***/
        },
        /* 89 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var Control_Applicative = __webpack_require__(3);
            var Control_Apply = __webpack_require__(2);
            var Control_Category = __webpack_require__(13);
            var Data_Bifoldable = __webpack_require__(82);
            var Data_Bifunctor = __webpack_require__(76);
            var Data_Bifunctor_Clown = __webpack_require__(84);
            var Data_Bifunctor_Flip = __webpack_require__(85);
            var Data_Bifunctor_Joker = __webpack_require__(86);
            var Data_Bifunctor_Product = __webpack_require__(87);
            var Data_Bifunctor_Wrap = __webpack_require__(88);
            var Data_Functor = __webpack_require__(0);
            var Data_Traversable = __webpack_require__(68);
            var Prelude = __webpack_require__(5);
            var Bitraversable = function Bitraversable(Bifoldable1, Bifunctor0, bisequence, bitraverse) {
                this.Bifoldable1 = Bifoldable1;
                this.Bifunctor0 = Bifunctor0;
                this.bisequence = bisequence;
                this.bitraverse = bitraverse;
            };
            var bitraverse = function bitraverse(dict) {
                return dict.bitraverse;
            };
            var lfor = function lfor(dictBitraversable) {
                return function (dictApplicative) {
                    return function (t) {
                        return function (f) {
                            return bitraverse(dictBitraversable)(dictApplicative)(f)(Control_Applicative.pure(dictApplicative))(t);
                        };
                    };
                };
            };
            var ltraverse = function ltraverse(dictBitraversable) {
                return function (dictApplicative) {
                    return function (f) {
                        return bitraverse(dictBitraversable)(dictApplicative)(f)(Control_Applicative.pure(dictApplicative));
                    };
                };
            };
            var rfor = function rfor(dictBitraversable) {
                return function (dictApplicative) {
                    return function (t) {
                        return function (f) {
                            return bitraverse(dictBitraversable)(dictApplicative)(Control_Applicative.pure(dictApplicative))(f)(t);
                        };
                    };
                };
            };
            var rtraverse = function rtraverse(dictBitraversable) {
                return function (dictApplicative) {
                    return bitraverse(dictBitraversable)(dictApplicative)(Control_Applicative.pure(dictApplicative));
                };
            };
            var bitraversableJoker = function bitraversableJoker(dictTraversable) {
                return new Bitraversable(function () {
                    return Data_Bifoldable.bifoldableJoker(dictTraversable.Foldable1());
                }, function () {
                    return Data_Bifunctor_Joker.bifunctorJoker(dictTraversable.Functor0());
                }, function (dictApplicative) {
                    return function (v) {
                        return Data_Functor.map(dictApplicative.Apply0().Functor0())(Data_Bifunctor_Joker.Joker)(Data_Traversable.sequence(dictTraversable)(dictApplicative)(v));
                    };
                }, function (dictApplicative) {
                    return function (v) {
                        return function (r) {
                            return function (v1) {
                                return Data_Functor.map(dictApplicative.Apply0().Functor0())(Data_Bifunctor_Joker.Joker)(Data_Traversable.traverse(dictTraversable)(dictApplicative)(r)(v1));
                            };
                        };
                    };
                });
            };
            var bitraversableClown = function bitraversableClown(dictTraversable) {
                return new Bitraversable(function () {
                    return Data_Bifoldable.bifoldableClown(dictTraversable.Foldable1());
                }, function () {
                    return Data_Bifunctor_Clown.bifunctorClown(dictTraversable.Functor0());
                }, function (dictApplicative) {
                    return function (v) {
                        return Data_Functor.map(dictApplicative.Apply0().Functor0())(Data_Bifunctor_Clown.Clown)(Data_Traversable.sequence(dictTraversable)(dictApplicative)(v));
                    };
                }, function (dictApplicative) {
                    return function (l) {
                        return function (v) {
                            return function (v1) {
                                return Data_Functor.map(dictApplicative.Apply0().Functor0())(Data_Bifunctor_Clown.Clown)(Data_Traversable.traverse(dictTraversable)(dictApplicative)(l)(v1));
                            };
                        };
                    };
                });
            };
            var bisequenceDefault = function bisequenceDefault(dictBitraversable) {
                return function (dictApplicative) {
                    return bitraverse(dictBitraversable)(dictApplicative)(Control_Category.id(Control_Category.categoryFn))(Control_Category.id(Control_Category.categoryFn));
                };
            };
            var bisequence = function bisequence(dict) {
                return dict.bisequence;
            };
            var bitraversableFlip = function bitraversableFlip(dictBitraversable) {
                return new Bitraversable(function () {
                    return Data_Bifoldable.bifoldableFlip(dictBitraversable.Bifoldable1());
                }, function () {
                    return Data_Bifunctor_Flip.bifunctorFlip(dictBitraversable.Bifunctor0());
                }, function (dictApplicative) {
                    return function (v) {
                        return Data_Functor.map(dictApplicative.Apply0().Functor0())(Data_Bifunctor_Flip.Flip)(bisequence(dictBitraversable)(dictApplicative)(v));
                    };
                }, function (dictApplicative) {
                    return function (r) {
                        return function (l) {
                            return function (v) {
                                return Data_Functor.map(dictApplicative.Apply0().Functor0())(Data_Bifunctor_Flip.Flip)(bitraverse(dictBitraversable)(dictApplicative)(l)(r)(v));
                            };
                        };
                    };
                });
            };
            var bitraversableProduct = function bitraversableProduct(dictBitraversable) {
                return function (dictBitraversable1) {
                    return new Bitraversable(function () {
                        return Data_Bifoldable.bifoldableProduct(dictBitraversable.Bifoldable1())(dictBitraversable1.Bifoldable1());
                    }, function () {
                        return Data_Bifunctor_Product.bifunctorProduct(dictBitraversable.Bifunctor0())(dictBitraversable1.Bifunctor0());
                    }, function (dictApplicative) {
                        return function (v) {
                            return Control_Apply.apply(dictApplicative.Apply0())(Data_Functor.map(dictApplicative.Apply0().Functor0())(Data_Bifunctor_Product.Product.create)(bisequence(dictBitraversable)(dictApplicative)(v.value0)))(bisequence(dictBitraversable1)(dictApplicative)(v.value1));
                        };
                    }, function (dictApplicative) {
                        return function (l) {
                            return function (r) {
                                return function (v) {
                                    return Control_Apply.apply(dictApplicative.Apply0())(Data_Functor.map(dictApplicative.Apply0().Functor0())(Data_Bifunctor_Product.Product.create)(bitraverse(dictBitraversable)(dictApplicative)(l)(r)(v.value0)))(bitraverse(dictBitraversable1)(dictApplicative)(l)(r)(v.value1));
                                };
                            };
                        };
                    });
                };
            };
            var bitraversableWrap = function bitraversableWrap(dictBitraversable) {
                return new Bitraversable(function () {
                    return Data_Bifoldable.bifoldableWrap(dictBitraversable.Bifoldable1());
                }, function () {
                    return Data_Bifunctor_Wrap.bifunctorWrap(dictBitraversable.Bifunctor0());
                }, function (dictApplicative) {
                    return function (v) {
                        return Data_Functor.map(dictApplicative.Apply0().Functor0())(Data_Bifunctor_Wrap.Wrap)(bisequence(dictBitraversable)(dictApplicative)(v));
                    };
                }, function (dictApplicative) {
                    return function (l) {
                        return function (r) {
                            return function (v) {
                                return Data_Functor.map(dictApplicative.Apply0().Functor0())(Data_Bifunctor_Wrap.Wrap)(bitraverse(dictBitraversable)(dictApplicative)(l)(r)(v));
                            };
                        };
                    };
                });
            };
            var bitraverseDefault = function bitraverseDefault(dictBitraversable) {
                return function (dictApplicative) {
                    return function (f) {
                        return function (g) {
                            return function (t) {
                                return bisequence(dictBitraversable)(dictApplicative)(Data_Bifunctor.bimap(dictBitraversable.Bifunctor0())(f)(g)(t));
                            };
                        };
                    };
                };
            };
            var bifor = function bifor(dictBitraversable) {
                return function (dictApplicative) {
                    return function (t) {
                        return function (f) {
                            return function (g) {
                                return bitraverse(dictBitraversable)(dictApplicative)(f)(g)(t);
                            };
                        };
                    };
                };
            };
            module.exports = {
                Bitraversable: Bitraversable,
                bitraverse: bitraverse,
                bisequence: bisequence,
                bitraverseDefault: bitraverseDefault,
                bisequenceDefault: bisequenceDefault,
                ltraverse: ltraverse,
                rtraverse: rtraverse,
                bifor: bifor,
                lfor: lfor,
                rfor: rfor,
                bitraversableClown: bitraversableClown,
                bitraversableJoker: bitraversableJoker,
                bitraversableFlip: bitraversableFlip,
                bitraversableProduct: bitraversableProduct,
                bitraversableWrap: bitraversableWrap
            };

            /***/
        },
        /* 90 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var Control_Alt = __webpack_require__(23);
            var Control_Applicative = __webpack_require__(3);
            var Control_Apply = __webpack_require__(2);
            var Control_Bind = __webpack_require__(8);
            var Control_Comonad = __webpack_require__(24);
            var Control_Extend = __webpack_require__(16);
            var Control_Lazy = __webpack_require__(81);
            var Control_Monad = __webpack_require__(11);
            var Data_BooleanAlgebra = __webpack_require__(33);
            var Data_Bounded = __webpack_require__(15);
            var Data_CommutativeRing = __webpack_require__(29);
            var Data_Eq = __webpack_require__(6);
            var Data_EuclideanRing = __webpack_require__(26);
            var Data_Field = __webpack_require__(64);
            var Data_Foldable = __webpack_require__(70);
            var Data_Functor = __webpack_require__(0);
            var Data_Functor_Invariant = __webpack_require__(17);
            var Data_HeytingAlgebra = __webpack_require__(21);
            var Data_Monoid = __webpack_require__(12);
            var Data_Newtype = __webpack_require__(18);
            var Data_Ord = __webpack_require__(10);
            var Data_Ring = __webpack_require__(22);
            var Data_Semigroup = __webpack_require__(4);
            var Data_Semiring = __webpack_require__(9);
            var Data_Show = __webpack_require__(7);
            var Data_Traversable = __webpack_require__(68);
            var Prelude = __webpack_require__(5);
            var Identity = function Identity(x) {
                return x;
            };
            var showIdentity = function showIdentity(dictShow) {
                return new Data_Show.Show(function (v) {
                    return "(Identity " + (Data_Show.show(dictShow)(v) + ")");
                });
            };
            var semiringIdentity = function semiringIdentity(dictSemiring) {
                return dictSemiring;
            };
            var semigroupIdenity = function semigroupIdenity(dictSemigroup) {
                return dictSemigroup;
            };
            var ringIdentity = function ringIdentity(dictRing) {
                return dictRing;
            };
            var ordIdentity = function ordIdentity(dictOrd) {
                return dictOrd;
            };
            var newtypeIdentity = new Data_Newtype.Newtype(function (n) {
                return n;
            }, Identity);
            var monoidIdentity = function monoidIdentity(dictMonoid) {
                return dictMonoid;
            };
            var lazyIdentity = function lazyIdentity(dictLazy) {
                return dictLazy;
            };
            var heytingAlgebraIdentity = function heytingAlgebraIdentity(dictHeytingAlgebra) {
                return dictHeytingAlgebra;
            };
            var functorIdentity = new Data_Functor.Functor(function (f) {
                return function (v) {
                    return f(v);
                };
            });
            var invariantIdentity = new Data_Functor_Invariant.Invariant(Data_Functor_Invariant.imapF(functorIdentity));
            var foldableIdentity = new Data_Foldable.Foldable(function (dictMonoid) {
                return function (f) {
                    return function (v) {
                        return f(v);
                    };
                };
            }, function (f) {
                return function (z) {
                    return function (v) {
                        return f(z)(v);
                    };
                };
            }, function (f) {
                return function (z) {
                    return function (v) {
                        return f(v)(z);
                    };
                };
            });
            var traversableIdentity = new Data_Traversable.Traversable(function () {
                return foldableIdentity;
            }, function () {
                return functorIdentity;
            }, function (dictApplicative) {
                return function (v) {
                    return Data_Functor.map(dictApplicative.Apply0().Functor0())(Identity)(v);
                };
            }, function (dictApplicative) {
                return function (f) {
                    return function (v) {
                        return Data_Functor.map(dictApplicative.Apply0().Functor0())(Identity)(f(v));
                    };
                };
            });
            var fieldIdentity = function fieldIdentity(dictField) {
                return dictField;
            };
            var extendIdentity = new Control_Extend.Extend(function () {
                return functorIdentity;
            }, function (f) {
                return function (m) {
                    return f(m);
                };
            });
            var euclideanRingIdentity = function euclideanRingIdentity(dictEuclideanRing) {
                return dictEuclideanRing;
            };
            var eqIdentity = function eqIdentity(dictEq) {
                return dictEq;
            };
            var eq1Identity = new Data_Eq.Eq1(function (dictEq) {
                return Data_Eq.eq(eqIdentity(dictEq));
            });
            var ord1Identity = new Data_Ord.Ord1(function () {
                return eq1Identity;
            }, function (dictOrd) {
                return Data_Ord.compare(ordIdentity(dictOrd));
            });
            var comonadIdentity = new Control_Comonad.Comonad(function () {
                return extendIdentity;
            }, function (v) {
                return v;
            });
            var commutativeRingIdentity = function commutativeRingIdentity(dictCommutativeRing) {
                return dictCommutativeRing;
            };
            var boundedIdentity = function boundedIdentity(dictBounded) {
                return dictBounded;
            };
            var booleanAlgebraIdentity = function booleanAlgebraIdentity(dictBooleanAlgebra) {
                return dictBooleanAlgebra;
            };
            var applyIdentity = new Control_Apply.Apply(function () {
                return functorIdentity;
            }, function (v) {
                return function (v1) {
                    return v(v1);
                };
            });
            var bindIdentity = new Control_Bind.Bind(function () {
                return applyIdentity;
            }, function (v) {
                return function (f) {
                    return f(v);
                };
            });
            var applicativeIdentity = new Control_Applicative.Applicative(function () {
                return applyIdentity;
            }, Identity);
            var monadIdentity = new Control_Monad.Monad(function () {
                return applicativeIdentity;
            }, function () {
                return bindIdentity;
            });
            var altIdentity = new Control_Alt.Alt(function () {
                return functorIdentity;
            }, function (x) {
                return function (v) {
                    return x;
                };
            });
            module.exports = {
                Identity: Identity,
                newtypeIdentity: newtypeIdentity,
                eqIdentity: eqIdentity,
                ordIdentity: ordIdentity,
                boundedIdentity: boundedIdentity,
                heytingAlgebraIdentity: heytingAlgebraIdentity,
                booleanAlgebraIdentity: booleanAlgebraIdentity,
                semigroupIdenity: semigroupIdenity,
                monoidIdentity: monoidIdentity,
                semiringIdentity: semiringIdentity,
                euclideanRingIdentity: euclideanRingIdentity,
                ringIdentity: ringIdentity,
                commutativeRingIdentity: commutativeRingIdentity,
                fieldIdentity: fieldIdentity,
                lazyIdentity: lazyIdentity,
                showIdentity: showIdentity,
                eq1Identity: eq1Identity,
                ord1Identity: ord1Identity,
                functorIdentity: functorIdentity,
                invariantIdentity: invariantIdentity,
                altIdentity: altIdentity,
                applyIdentity: applyIdentity,
                applicativeIdentity: applicativeIdentity,
                bindIdentity: bindIdentity,
                monadIdentity: monadIdentity,
                extendIdentity: extendIdentity,
                comonadIdentity: comonadIdentity,
                foldableIdentity: foldableIdentity,
                traversableIdentity: traversableIdentity
            };

            /***/
        },
        /* 91 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var $foreign = __webpack_require__(104);
            var Control_Applicative = __webpack_require__(3);
            var Control_Bind = __webpack_require__(8);
            var Control_Monad_Eff = __webpack_require__(31);
            var Control_Monad_ST = __webpack_require__(79);
            var Control_Semigroupoid = __webpack_require__(20);
            var Data_Maybe = __webpack_require__(28);
            var Prelude = __webpack_require__(5);
            var Unsafe_Coerce = __webpack_require__(105);
            var unsafeThaw = function unsafeThaw($7) {
                return Control_Applicative.pure(Control_Monad_Eff.applicativeEff)($7);
            };
            var unsafeFreeze = function unsafeFreeze($8) {
                return Control_Applicative.pure(Control_Monad_Eff.applicativeEff)($8);
            };
            var thaw = $foreign.copyImpl;
            var withArray = function withArray(f) {
                return function (xs) {
                    return function () {
                        function __do() {
                            var v = thaw(xs)();
                            var v1 = f(v)();
                            return unsafeFreeze(v)();
                        }

                        return __do;
                    }();
                };
            };
            var pushSTArray = function pushSTArray(arr) {
                return function (a) {
                    return $foreign.pushAllSTArray(arr)([a]);
                };
            };
            var peekSTArray = $foreign.peekSTArrayImpl(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
            var modifySTArray = function modifySTArray(xs) {
                return function (i) {
                    return function (f) {
                        return function () {
                            function __do() {
                                var v = peekSTArray(xs)(i)();
                                if (v instanceof Data_Maybe.Just) {
                                    return $foreign.pokeSTArray(xs)(i)(f(v.value0))();
                                };
                                if (v instanceof Data_Maybe.Nothing) {
                                    return false;
                                };
                                throw new Error("Failed pattern match at Data.Array.ST line 127, column 3 - line 129, column 26: " + [v.constructor.name]);
                            }

                            return __do;
                        }();
                    };
                };
            };
            var freeze = $foreign.copyImpl;
            module.exports = {
                withArray: withArray,
                peekSTArray: peekSTArray,
                pushSTArray: pushSTArray,
                modifySTArray: modifySTArray,
                freeze: freeze,
                thaw: thaw,
                unsafeFreeze: unsafeFreeze,
                unsafeThaw: unsafeThaw,
                runSTArray: $foreign.runSTArray,
                emptySTArray: $foreign.emptySTArray,
                pokeSTArray: $foreign.pokeSTArray,
                pushAllSTArray: $foreign.pushAllSTArray,
                spliceSTArray: $foreign.spliceSTArray,
                toAssocArray: $foreign.toAssocArray
            };

            /***/
        },
        /* 92 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var Control_Applicative = __webpack_require__(3);
            var Control_Apply = __webpack_require__(2);
            var Control_Bind = __webpack_require__(8);
            var Control_Semigroupoid = __webpack_require__(20);
            var Data_Foldable = __webpack_require__(70);
            var Data_Function = __webpack_require__(14);
            var Data_FunctorWithIndex = __webpack_require__(83);
            var Data_Maybe = __webpack_require__(28);
            var Data_Maybe_First = __webpack_require__(36);
            var Data_Maybe_Last = __webpack_require__(37);
            var Data_Monoid = __webpack_require__(12);
            var Data_Monoid_Additive = __webpack_require__(38);
            var Data_Monoid_Conj = __webpack_require__(39);
            var Data_Monoid_Disj = __webpack_require__(40);
            var Data_Monoid_Dual = __webpack_require__(41);
            var Data_Monoid_Endo = __webpack_require__(74);
            var Data_Monoid_Multiplicative = __webpack_require__(42);
            var Data_Newtype = __webpack_require__(18);
            var Data_Semigroup = __webpack_require__(4);
            var Data_Unit = __webpack_require__(1);
            var Prelude = __webpack_require__(5);
            var Tuple = function () {
                function Tuple(value0, value1) {
                    this.value0 = value0;
                    this.value1 = value1;
                };
                Tuple.create = function (value0) {
                    return function (value1) {
                        return new Tuple(value0, value1);
                    };
                };
                return Tuple;
            }();
            var FoldableWithIndex = function FoldableWithIndex(Foldable0, foldMapWithIndex, foldlWithIndex, foldrWithIndex) {
                this.Foldable0 = Foldable0;
                this.foldMapWithIndex = foldMapWithIndex;
                this.foldlWithIndex = foldlWithIndex;
                this.foldrWithIndex = foldrWithIndex;
            };
            var foldrWithIndex = function foldrWithIndex(dict) {
                return dict.foldrWithIndex;
            };
            var traverseWithIndex_ = function traverseWithIndex_(dictApplicative) {
                return function (dictFoldableWithIndex) {
                    return function (f) {
                        return foldrWithIndex(dictFoldableWithIndex)(function (i) {
                            return function ($41) {
                                return Control_Apply.applySecond(dictApplicative.Apply0())(f(i)($41));
                            };
                        })(Control_Applicative.pure(dictApplicative)(Data_Unit.unit));
                    };
                };
            };
            var forWithIndex_ = function forWithIndex_(dictApplicative) {
                return function (dictFoldableWithIndex) {
                    return Data_Function.flip(traverseWithIndex_(dictApplicative)(dictFoldableWithIndex));
                };
            };
            var foldlWithIndex = function foldlWithIndex(dict) {
                return dict.foldlWithIndex;
            };
            var foldableWithIndexMultiplicative = new FoldableWithIndex(function () {
                return Data_Foldable.foldableMultiplicative;
            }, function (dictMonoid) {
                return function (f) {
                    return Data_Foldable.foldMap(Data_Foldable.foldableMultiplicative)(dictMonoid)(f(Data_Unit.unit));
                };
            }, function (f) {
                return Data_Foldable.foldl(Data_Foldable.foldableMultiplicative)(f(Data_Unit.unit));
            }, function (f) {
                return Data_Foldable.foldr(Data_Foldable.foldableMultiplicative)(f(Data_Unit.unit));
            });
            var foldableWithIndexMaybe = new FoldableWithIndex(function () {
                return Data_Foldable.foldableMaybe;
            }, function (dictMonoid) {
                return function (f) {
                    return Data_Foldable.foldMap(Data_Foldable.foldableMaybe)(dictMonoid)(f(Data_Unit.unit));
                };
            }, function (f) {
                return Data_Foldable.foldl(Data_Foldable.foldableMaybe)(f(Data_Unit.unit));
            }, function (f) {
                return Data_Foldable.foldr(Data_Foldable.foldableMaybe)(f(Data_Unit.unit));
            });
            var foldableWithIndexLast = new FoldableWithIndex(function () {
                return Data_Foldable.foldableLast;
            }, function (dictMonoid) {
                return function (f) {
                    return Data_Foldable.foldMap(Data_Foldable.foldableLast)(dictMonoid)(f(Data_Unit.unit));
                };
            }, function (f) {
                return Data_Foldable.foldl(Data_Foldable.foldableLast)(f(Data_Unit.unit));
            }, function (f) {
                return Data_Foldable.foldr(Data_Foldable.foldableLast)(f(Data_Unit.unit));
            });
            var foldableWithIndexFirst = new FoldableWithIndex(function () {
                return Data_Foldable.foldableFirst;
            }, function (dictMonoid) {
                return function (f) {
                    return Data_Foldable.foldMap(Data_Foldable.foldableFirst)(dictMonoid)(f(Data_Unit.unit));
                };
            }, function (f) {
                return Data_Foldable.foldl(Data_Foldable.foldableFirst)(f(Data_Unit.unit));
            }, function (f) {
                return Data_Foldable.foldr(Data_Foldable.foldableFirst)(f(Data_Unit.unit));
            });
            var foldableWithIndexDual = new FoldableWithIndex(function () {
                return Data_Foldable.foldableDual;
            }, function (dictMonoid) {
                return function (f) {
                    return Data_Foldable.foldMap(Data_Foldable.foldableDual)(dictMonoid)(f(Data_Unit.unit));
                };
            }, function (f) {
                return Data_Foldable.foldl(Data_Foldable.foldableDual)(f(Data_Unit.unit));
            }, function (f) {
                return Data_Foldable.foldr(Data_Foldable.foldableDual)(f(Data_Unit.unit));
            });
            var foldableWithIndexDisj = new FoldableWithIndex(function () {
                return Data_Foldable.foldableDisj;
            }, function (dictMonoid) {
                return function (f) {
                    return Data_Foldable.foldMap(Data_Foldable.foldableDisj)(dictMonoid)(f(Data_Unit.unit));
                };
            }, function (f) {
                return Data_Foldable.foldl(Data_Foldable.foldableDisj)(f(Data_Unit.unit));
            }, function (f) {
                return Data_Foldable.foldr(Data_Foldable.foldableDisj)(f(Data_Unit.unit));
            });
            var foldableWithIndexConj = new FoldableWithIndex(function () {
                return Data_Foldable.foldableConj;
            }, function (dictMonoid) {
                return function (f) {
                    return Data_Foldable.foldMap(Data_Foldable.foldableConj)(dictMonoid)(f(Data_Unit.unit));
                };
            }, function (f) {
                return Data_Foldable.foldl(Data_Foldable.foldableConj)(f(Data_Unit.unit));
            }, function (f) {
                return Data_Foldable.foldr(Data_Foldable.foldableConj)(f(Data_Unit.unit));
            });
            var foldableWithIndexAdditive = new FoldableWithIndex(function () {
                return Data_Foldable.foldableAdditive;
            }, function (dictMonoid) {
                return function (f) {
                    return Data_Foldable.foldMap(Data_Foldable.foldableAdditive)(dictMonoid)(f(Data_Unit.unit));
                };
            }, function (f) {
                return Data_Foldable.foldl(Data_Foldable.foldableAdditive)(f(Data_Unit.unit));
            }, function (f) {
                return Data_Foldable.foldr(Data_Foldable.foldableAdditive)(f(Data_Unit.unit));
            });
            var foldWithIndexM = function foldWithIndexM(dictFoldableWithIndex) {
                return function (dictMonad) {
                    return function (f) {
                        return function (a0) {
                            return foldlWithIndex(dictFoldableWithIndex)(function (i) {
                                return function (ma) {
                                    return function (b) {
                                        return Control_Bind.bind(dictMonad.Bind1())(ma)(Data_Function.flip(f(i))(b));
                                    };
                                };
                            })(Control_Applicative.pure(dictMonad.Applicative0())(a0));
                        };
                    };
                };
            };
            var foldMapWithIndexDefaultR = function foldMapWithIndexDefaultR(dictFoldableWithIndex) {
                return function (dictMonoid) {
                    return function (f) {
                        return foldrWithIndex(dictFoldableWithIndex)(function (i) {
                            return function (x) {
                                return function (acc) {
                                    return Data_Semigroup.append(dictMonoid.Semigroup0())(f(i)(x))(acc);
                                };
                            };
                        })(Data_Monoid.mempty(dictMonoid));
                    };
                };
            };
            var foldableWithIndexArray = new FoldableWithIndex(function () {
                return Data_Foldable.foldableArray;
            }, function (dictMonoid) {
                return foldMapWithIndexDefaultR(foldableWithIndexArray)(dictMonoid);
            }, function (f) {
                return function (z) {
                    return function ($42) {
                        return Data_Foldable.foldl(Data_Foldable.foldableArray)(function (y) {
                            return function (v) {
                                return f(v.value0)(y)(v.value1);
                            };
                        })(z)(Data_FunctorWithIndex.mapWithIndex(Data_FunctorWithIndex.functorWithIndexArray)(Tuple.create)($42));
                    };
                };
            }, function (f) {
                return function (z) {
                    return function ($43) {
                        return Data_Foldable.foldr(Data_Foldable.foldableArray)(function (v) {
                            return function (y) {
                                return f(v.value0)(v.value1)(y);
                            };
                        })(z)(Data_FunctorWithIndex.mapWithIndex(Data_FunctorWithIndex.functorWithIndexArray)(Tuple.create)($43));
                    };
                };
            });
            var foldMapWithIndexDefaultL = function foldMapWithIndexDefaultL(dictFoldableWithIndex) {
                return function (dictMonoid) {
                    return function (f) {
                        return foldlWithIndex(dictFoldableWithIndex)(function (i) {
                            return function (acc) {
                                return function (x) {
                                    return Data_Semigroup.append(dictMonoid.Semigroup0())(acc)(f(i)(x));
                                };
                            };
                        })(Data_Monoid.mempty(dictMonoid));
                    };
                };
            };
            var foldMapWithIndex = function foldMapWithIndex(dict) {
                return dict.foldMapWithIndex;
            };
            var foldlWithIndexDefault = function foldlWithIndexDefault(dictFoldableWithIndex) {
                return function (c) {
                    return function (u) {
                        return function (xs) {
                            return Data_Newtype.unwrap(Data_Monoid_Endo.newtypeEndo)(Data_Newtype.unwrap(Data_Monoid_Dual.newtypeDual)(foldMapWithIndex(dictFoldableWithIndex)(Data_Monoid_Dual.monoidDual(Data_Monoid_Endo.monoidEndo))(function (i) {
                                return function ($44) {
                                    return Data_Monoid_Dual.Dual(Data_Monoid_Endo.Endo(Data_Function.flip(c(i))($44)));
                                };
                            })(xs)))(u);
                        };
                    };
                };
            };
            var foldrWithIndexDefault = function foldrWithIndexDefault(dictFoldableWithIndex) {
                return function (c) {
                    return function (u) {
                        return function (xs) {
                            return Data_Newtype.unwrap(Data_Monoid_Endo.newtypeEndo)(foldMapWithIndex(dictFoldableWithIndex)(Data_Monoid_Endo.monoidEndo)(function (i) {
                                return function ($45) {
                                    return Data_Monoid_Endo.Endo(c(i)($45));
                                };
                            })(xs))(u);
                        };
                    };
                };
            };
            var surroundMapWithIndex = function surroundMapWithIndex(dictFoldableWithIndex) {
                return function (dictSemigroup) {
                    return function (d) {
                        return function (t) {
                            return function (f) {
                                var joined = function joined(i) {
                                    return function (a) {
                                        return function (m) {
                                            return Data_Semigroup.append(dictSemigroup)(d)(Data_Semigroup.append(dictSemigroup)(t(i)(a))(m));
                                        };
                                    };
                                };
                                return Data_Newtype.unwrap(Data_Monoid_Endo.newtypeEndo)(foldMapWithIndex(dictFoldableWithIndex)(Data_Monoid_Endo.monoidEndo)(joined)(f))(d);
                            };
                        };
                    };
                };
            };
            var findWithIndex = function findWithIndex(dictFoldableWithIndex) {
                return function (p) {
                    var go = function go(i) {
                        return function (v) {
                            return function (v1) {
                                if (v instanceof Data_Maybe.Nothing && p(i)(v1)) {
                                    return new Data_Maybe.Just(v1);
                                };
                                return v;
                            };
                        };
                    };
                    return foldlWithIndex(dictFoldableWithIndex)(go)(Data_Maybe.Nothing.value);
                };
            };
            var anyWithIndex = function anyWithIndex(dictFoldableWithIndex) {
                return function (dictHeytingAlgebra) {
                    return function (t) {
                        return function ($46) {
                            return Data_Newtype.unwrap(Data_Monoid_Disj.newtypeDisj)(foldMapWithIndex(dictFoldableWithIndex)(Data_Monoid_Disj.monoidDisj(dictHeytingAlgebra))(function (i) {
                                return function ($47) {
                                    return Data_Monoid_Disj.Disj(t(i)($47));
                                };
                            })($46));
                        };
                    };
                };
            };
            var allWithIndex = function allWithIndex(dictFoldableWithIndex) {
                return function (dictHeytingAlgebra) {
                    return function (t) {
                        return function ($48) {
                            return Data_Newtype.unwrap(Data_Monoid_Conj.newtypeConj)(foldMapWithIndex(dictFoldableWithIndex)(Data_Monoid_Conj.monoidConj(dictHeytingAlgebra))(function (i) {
                                return function ($49) {
                                    return Data_Monoid_Conj.Conj(t(i)($49));
                                };
                            })($48));
                        };
                    };
                };
            };
            module.exports = {
                FoldableWithIndex: FoldableWithIndex,
                foldrWithIndex: foldrWithIndex,
                foldlWithIndex: foldlWithIndex,
                foldMapWithIndex: foldMapWithIndex,
                foldrWithIndexDefault: foldrWithIndexDefault,
                foldlWithIndexDefault: foldlWithIndexDefault,
                foldMapWithIndexDefaultR: foldMapWithIndexDefaultR,
                foldMapWithIndexDefaultL: foldMapWithIndexDefaultL,
                foldWithIndexM: foldWithIndexM,
                traverseWithIndex_: traverseWithIndex_,
                forWithIndex_: forWithIndex_,
                surroundMapWithIndex: surroundMapWithIndex,
                allWithIndex: allWithIndex,
                anyWithIndex: anyWithIndex,
                findWithIndex: findWithIndex,
                foldableWithIndexArray: foldableWithIndexArray,
                foldableWithIndexMaybe: foldableWithIndexMaybe,
                foldableWithIndexFirst: foldableWithIndexFirst,
                foldableWithIndexLast: foldableWithIndexLast,
                foldableWithIndexAdditive: foldableWithIndexAdditive,
                foldableWithIndexDual: foldableWithIndexDual,
                foldableWithIndexDisj: foldableWithIndexDisj,
                foldableWithIndexConj: foldableWithIndexConj,
                foldableWithIndexMultiplicative: foldableWithIndexMultiplicative
            };

            /***/
        },
        /* 93 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var Control_Applicative = __webpack_require__(3);
            var Control_Apply = __webpack_require__(2);
            var Control_Biapplicative = __webpack_require__(78);
            var Control_Biapply = __webpack_require__(77);
            var Control_Bind = __webpack_require__(8);
            var Control_Comonad = __webpack_require__(24);
            var Control_Extend = __webpack_require__(16);
            var Control_Lazy = __webpack_require__(81);
            var Control_Monad = __webpack_require__(11);
            var Control_Semigroupoid = __webpack_require__(20);
            var Data_Bifoldable = __webpack_require__(82);
            var Data_Bifunctor = __webpack_require__(76);
            var Data_Bitraversable = __webpack_require__(89);
            var Data_BooleanAlgebra = __webpack_require__(33);
            var Data_Bounded = __webpack_require__(15);
            var Data_CommutativeRing = __webpack_require__(29);
            var Data_Distributive = __webpack_require__(112);
            var Data_Eq = __webpack_require__(6);
            var Data_Foldable = __webpack_require__(70);
            var Data_Function = __webpack_require__(14);
            var Data_Functor = __webpack_require__(0);
            var Data_Functor_Invariant = __webpack_require__(17);
            var Data_HeytingAlgebra = __webpack_require__(21);
            var Data_Maybe = __webpack_require__(28);
            var Data_Maybe_First = __webpack_require__(36);
            var Data_Monoid = __webpack_require__(12);
            var Data_Newtype = __webpack_require__(18);
            var Data_Ord = __webpack_require__(10);
            var Data_Ordering = __webpack_require__(19);
            var Data_Ring = __webpack_require__(22);
            var Data_Semigroup = __webpack_require__(4);
            var Data_Semiring = __webpack_require__(9);
            var Data_Show = __webpack_require__(7);
            var Data_Traversable = __webpack_require__(68);
            var Data_Unit = __webpack_require__(1);
            var Prelude = __webpack_require__(5);
            var Type_Equality = __webpack_require__(113);
            var Tuple = function () {
                function Tuple(value0, value1) {
                    this.value0 = value0;
                    this.value1 = value1;
                };
                Tuple.create = function (value0) {
                    return function (value1) {
                        return new Tuple(value0, value1);
                    };
                };
                return Tuple;
            }();
            var uncurry = function uncurry(f) {
                return function (v) {
                    return f(v.value0)(v.value1);
                };
            };
            var swap = function swap(v) {
                return new Tuple(v.value1, v.value0);
            };
            var snd = function snd(v) {
                return v.value1;
            };
            var showTuple = function showTuple(dictShow) {
                return function (dictShow1) {
                    return new Data_Show.Show(function (v) {
                        return "(Tuple " + (Data_Show.show(dictShow)(v.value0) + (" " + (Data_Show.show(dictShow1)(v.value1) + ")")));
                    });
                };
            };
            var semiringTuple = function semiringTuple(dictSemiring) {
                return function (dictSemiring1) {
                    return new Data_Semiring.Semiring(function (v) {
                        return function (v1) {
                            return new Tuple(Data_Semiring.add(dictSemiring)(v.value0)(v1.value0), Data_Semiring.add(dictSemiring1)(v.value1)(v1.value1));
                        };
                    }, function (v) {
                        return function (v1) {
                            return new Tuple(Data_Semiring.mul(dictSemiring)(v.value0)(v1.value0), Data_Semiring.mul(dictSemiring1)(v.value1)(v1.value1));
                        };
                    }, new Tuple(Data_Semiring.one(dictSemiring), Data_Semiring.one(dictSemiring1)), new Tuple(Data_Semiring.zero(dictSemiring), Data_Semiring.zero(dictSemiring1)));
                };
            };
            var semigroupoidTuple = new Control_Semigroupoid.Semigroupoid(function (v) {
                return function (v1) {
                    return new Tuple(v1.value0, v.value1);
                };
            });
            var semigroupTuple = function semigroupTuple(dictSemigroup) {
                return function (dictSemigroup1) {
                    return new Data_Semigroup.Semigroup(function (v) {
                        return function (v1) {
                            return new Tuple(Data_Semigroup.append(dictSemigroup)(v.value0)(v1.value0), Data_Semigroup.append(dictSemigroup1)(v.value1)(v1.value1));
                        };
                    });
                };
            };
            var ringTuple = function ringTuple(dictRing) {
                return function (dictRing1) {
                    return new Data_Ring.Ring(function () {
                        return semiringTuple(dictRing.Semiring0())(dictRing1.Semiring0());
                    }, function (v) {
                        return function (v1) {
                            return new Tuple(Data_Ring.sub(dictRing)(v.value0)(v1.value0), Data_Ring.sub(dictRing1)(v.value1)(v1.value1));
                        };
                    });
                };
            };
            var monoidTuple = function monoidTuple(dictMonoid) {
                return function (dictMonoid1) {
                    return new Data_Monoid.Monoid(function () {
                        return semigroupTuple(dictMonoid.Semigroup0())(dictMonoid1.Semigroup0());
                    }, new Tuple(Data_Monoid.mempty(dictMonoid), Data_Monoid.mempty(dictMonoid1)));
                };
            };
            var lookup = function lookup(dictFoldable) {
                return function (dictEq) {
                    return function (a) {
                        return function ($264) {
                            return Data_Newtype.unwrap(Data_Maybe_First.newtypeFirst)(Data_Foldable.foldMap(dictFoldable)(Data_Maybe_First.monoidFirst)(function (v) {
                                var $146 = Data_Eq.eq(dictEq)(a)(v.value0);
                                if ($146) {
                                    return new Data_Maybe.Just(v.value1);
                                };
                                return Data_Maybe.Nothing.value;
                            })($264));
                        };
                    };
                };
            };
            var heytingAlgebraTuple = function heytingAlgebraTuple(dictHeytingAlgebra) {
                return function (dictHeytingAlgebra1) {
                    return new Data_HeytingAlgebra.HeytingAlgebra(function (v) {
                        return function (v1) {
                            return new Tuple(Data_HeytingAlgebra.conj(dictHeytingAlgebra)(v.value0)(v1.value0), Data_HeytingAlgebra.conj(dictHeytingAlgebra1)(v.value1)(v1.value1));
                        };
                    }, function (v) {
                        return function (v1) {
                            return new Tuple(Data_HeytingAlgebra.disj(dictHeytingAlgebra)(v.value0)(v1.value0), Data_HeytingAlgebra.disj(dictHeytingAlgebra1)(v.value1)(v1.value1));
                        };
                    }, new Tuple(Data_HeytingAlgebra.ff(dictHeytingAlgebra), Data_HeytingAlgebra.ff(dictHeytingAlgebra1)), function (v) {
                        return function (v1) {
                            return new Tuple(Data_HeytingAlgebra.implies(dictHeytingAlgebra)(v.value0)(v1.value0), Data_HeytingAlgebra.implies(dictHeytingAlgebra1)(v.value1)(v1.value1));
                        };
                    }, function (v) {
                        return new Tuple(Data_HeytingAlgebra.not(dictHeytingAlgebra)(v.value0), Data_HeytingAlgebra.not(dictHeytingAlgebra1)(v.value1));
                    }, new Tuple(Data_HeytingAlgebra.tt(dictHeytingAlgebra), Data_HeytingAlgebra.tt(dictHeytingAlgebra1)));
                };
            };
            var functorTuple = new Data_Functor.Functor(function (f) {
                return function (v) {
                    return new Tuple(v.value0, f(v.value1));
                };
            });
            var invariantTuple = new Data_Functor_Invariant.Invariant(Data_Functor_Invariant.imapF(functorTuple));
            var fst = function fst(v) {
                return v.value0;
            };
            var lazyTuple = function lazyTuple(dictLazy) {
                return function (dictLazy1) {
                    return new Control_Lazy.Lazy(function (f) {
                        return new Tuple(Control_Lazy.defer(dictLazy)(function (v) {
                            return fst(f(Data_Unit.unit));
                        }), Control_Lazy.defer(dictLazy1)(function (v) {
                            return snd(f(Data_Unit.unit));
                        }));
                    });
                };
            };
            var foldableTuple = new Data_Foldable.Foldable(function (dictMonoid) {
                return function (f) {
                    return function (v) {
                        return f(v.value1);
                    };
                };
            }, function (f) {
                return function (z) {
                    return function (v) {
                        return f(z)(v.value1);
                    };
                };
            }, function (f) {
                return function (z) {
                    return function (v) {
                        return f(v.value1)(z);
                    };
                };
            });
            var traversableTuple = new Data_Traversable.Traversable(function () {
                return foldableTuple;
            }, function () {
                return functorTuple;
            }, function (dictApplicative) {
                return function (v) {
                    return Data_Functor.map(dictApplicative.Apply0().Functor0())(Tuple.create(v.value0))(v.value1);
                };
            }, function (dictApplicative) {
                return function (f) {
                    return function (v) {
                        return Data_Functor.map(dictApplicative.Apply0().Functor0())(Tuple.create(v.value0))(f(v.value1));
                    };
                };
            });
            var extendTuple = new Control_Extend.Extend(function () {
                return functorTuple;
            }, function (f) {
                return function (v) {
                    return new Tuple(v.value0, f(v));
                };
            });
            var eqTuple = function eqTuple(dictEq) {
                return function (dictEq1) {
                    return new Data_Eq.Eq(function (x) {
                        return function (y) {
                            return Data_Eq.eq(dictEq)(x.value0)(y.value0) && Data_Eq.eq(dictEq1)(x.value1)(y.value1);
                        };
                    });
                };
            };
            var ordTuple = function ordTuple(dictOrd) {
                return function (dictOrd1) {
                    return new Data_Ord.Ord(function () {
                        return eqTuple(dictOrd.Eq0())(dictOrd1.Eq0());
                    }, function (x) {
                        return function (y) {
                            var v = Data_Ord.compare(dictOrd)(x.value0)(y.value0);
                            if (v instanceof Data_Ordering.LT) {
                                return Data_Ordering.LT.value;
                            };
                            if (v instanceof Data_Ordering.GT) {
                                return Data_Ordering.GT.value;
                            };
                            return Data_Ord.compare(dictOrd1)(x.value1)(y.value1);
                        };
                    });
                };
            };
            var eq1Tuple = function eq1Tuple(dictEq) {
                return new Data_Eq.Eq1(function (dictEq1) {
                    return Data_Eq.eq(eqTuple(dictEq)(dictEq1));
                });
            };
            var ord1Tuple = function ord1Tuple(dictOrd) {
                return new Data_Ord.Ord1(function () {
                    return eq1Tuple(dictOrd.Eq0());
                }, function (dictOrd1) {
                    return Data_Ord.compare(ordTuple(dictOrd)(dictOrd1));
                });
            };
            var distributiveTuple = function distributiveTuple(dictTypeEquals) {
                return new Data_Distributive.Distributive(function () {
                    return functorTuple;
                }, function (dictFunctor) {
                    return Data_Distributive.collectDefault(distributiveTuple(dictTypeEquals))(dictFunctor);
                }, function (dictFunctor) {
                    return function ($265) {
                        return Tuple.create(Type_Equality.from(dictTypeEquals)(Data_Unit.unit))(Data_Functor.map(dictFunctor)(snd)($265));
                    };
                });
            };
            var curry = function curry(f) {
                return function (a) {
                    return function (b) {
                        return f(new Tuple(a, b));
                    };
                };
            };
            var comonadTuple = new Control_Comonad.Comonad(function () {
                return extendTuple;
            }, snd);
            var commutativeRingTuple = function commutativeRingTuple(dictCommutativeRing) {
                return function (dictCommutativeRing1) {
                    return new Data_CommutativeRing.CommutativeRing(function () {
                        return ringTuple(dictCommutativeRing.Ring0())(dictCommutativeRing1.Ring0());
                    });
                };
            };
            var boundedTuple = function boundedTuple(dictBounded) {
                return function (dictBounded1) {
                    return new Data_Bounded.Bounded(function () {
                        return ordTuple(dictBounded.Ord0())(dictBounded1.Ord0());
                    }, new Tuple(Data_Bounded.bottom(dictBounded), Data_Bounded.bottom(dictBounded1)), new Tuple(Data_Bounded.top(dictBounded), Data_Bounded.top(dictBounded1)));
                };
            };
            var booleanAlgebraTuple = function booleanAlgebraTuple(dictBooleanAlgebra) {
                return function (dictBooleanAlgebra1) {
                    return new Data_BooleanAlgebra.BooleanAlgebra(function () {
                        return heytingAlgebraTuple(dictBooleanAlgebra.HeytingAlgebra0())(dictBooleanAlgebra1.HeytingAlgebra0());
                    });
                };
            };
            var bifunctorTuple = new Data_Bifunctor.Bifunctor(function (f) {
                return function (g) {
                    return function (v) {
                        return new Tuple(f(v.value0), g(v.value1));
                    };
                };
            });
            var bifoldableTuple = new Data_Bifoldable.Bifoldable(function (dictMonoid) {
                return function (f) {
                    return function (g) {
                        return function (v) {
                            return Data_Semigroup.append(dictMonoid.Semigroup0())(f(v.value0))(g(v.value1));
                        };
                    };
                };
            }, function (f) {
                return function (g) {
                    return function (z) {
                        return function (v) {
                            return g(f(z)(v.value0))(v.value1);
                        };
                    };
                };
            }, function (f) {
                return function (g) {
                    return function (z) {
                        return function (v) {
                            return f(v.value0)(g(v.value1)(z));
                        };
                    };
                };
            });
            var bitraversableTuple = new Data_Bitraversable.Bitraversable(function () {
                return bifoldableTuple;
            }, function () {
                return bifunctorTuple;
            }, function (dictApplicative) {
                return function (v) {
                    return Control_Apply.apply(dictApplicative.Apply0())(Data_Functor.map(dictApplicative.Apply0().Functor0())(Tuple.create)(v.value0))(v.value1);
                };
            }, function (dictApplicative) {
                return function (f) {
                    return function (g) {
                        return function (v) {
                            return Control_Apply.apply(dictApplicative.Apply0())(Data_Functor.map(dictApplicative.Apply0().Functor0())(Tuple.create)(f(v.value0)))(g(v.value1));
                        };
                    };
                };
            });
            var biapplyTuple = new Control_Biapply.Biapply(function () {
                return bifunctorTuple;
            }, function (v) {
                return function (v1) {
                    return new Tuple(v.value0(v1.value0), v.value1(v1.value1));
                };
            });
            var biapplicativeTuple = new Control_Biapplicative.Biapplicative(function () {
                return biapplyTuple;
            }, Tuple.create);
            var applyTuple = function applyTuple(dictSemigroup) {
                return new Control_Apply.Apply(function () {
                    return functorTuple;
                }, function (v) {
                    return function (v1) {
                        return new Tuple(Data_Semigroup.append(dictSemigroup)(v.value0)(v1.value0), v.value1(v1.value1));
                    };
                });
            };
            var bindTuple = function bindTuple(dictSemigroup) {
                return new Control_Bind.Bind(function () {
                    return applyTuple(dictSemigroup);
                }, function (v) {
                    return function (f) {
                        var v1 = f(v.value1);
                        return new Tuple(Data_Semigroup.append(dictSemigroup)(v.value0)(v1.value0), v1.value1);
                    };
                });
            };
            var applicativeTuple = function applicativeTuple(dictMonoid) {
                return new Control_Applicative.Applicative(function () {
                    return applyTuple(dictMonoid.Semigroup0());
                }, Tuple.create(Data_Monoid.mempty(dictMonoid)));
            };
            var monadTuple = function monadTuple(dictMonoid) {
                return new Control_Monad.Monad(function () {
                    return applicativeTuple(dictMonoid);
                }, function () {
                    return bindTuple(dictMonoid.Semigroup0());
                });
            };
            module.exports = {
                Tuple: Tuple,
                fst: fst,
                snd: snd,
                curry: curry,
                uncurry: uncurry,
                swap: swap,
                lookup: lookup,
                showTuple: showTuple,
                eqTuple: eqTuple,
                eq1Tuple: eq1Tuple,
                ordTuple: ordTuple,
                ord1Tuple: ord1Tuple,
                boundedTuple: boundedTuple,
                semigroupoidTuple: semigroupoidTuple,
                semigroupTuple: semigroupTuple,
                monoidTuple: monoidTuple,
                semiringTuple: semiringTuple,
                ringTuple: ringTuple,
                commutativeRingTuple: commutativeRingTuple,
                heytingAlgebraTuple: heytingAlgebraTuple,
                booleanAlgebraTuple: booleanAlgebraTuple,
                functorTuple: functorTuple,
                invariantTuple: invariantTuple,
                bifunctorTuple: bifunctorTuple,
                applyTuple: applyTuple,
                biapplyTuple: biapplyTuple,
                applicativeTuple: applicativeTuple,
                biapplicativeTuple: biapplicativeTuple,
                bindTuple: bindTuple,
                monadTuple: monadTuple,
                extendTuple: extendTuple,
                comonadTuple: comonadTuple,
                lazyTuple: lazyTuple,
                foldableTuple: foldableTuple,
                bifoldableTuple: bifoldableTuple,
                traversableTuple: traversableTuple,
                bitraversableTuple: bitraversableTuple,
                distributiveTuple: distributiveTuple
            };

            /***/
        },
        /* 94 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var $foreign = __webpack_require__(95);
            var Control_Alt = __webpack_require__(23);
            var Control_Alternative = __webpack_require__(35);
            var Control_Applicative = __webpack_require__(3);
            var Control_Apply = __webpack_require__(2);
            var Control_Bind = __webpack_require__(8);
            var Control_Category = __webpack_require__(13);
            var Control_Lazy = __webpack_require__(81);
            var Control_Monad_Eff = __webpack_require__(31);
            var Control_Monad_Rec_Class = __webpack_require__(96);
            var Control_Monad_ST = __webpack_require__(79);
            var Control_Semigroupoid = __webpack_require__(20);
            var Data_Array_ST = __webpack_require__(91);
            var Data_Array_ST_Iterator = __webpack_require__(107);
            var Data_Boolean = __webpack_require__(32);
            var Data_Eq = __webpack_require__(6);
            var Data_Foldable = __webpack_require__(70);
            var Data_Function = __webpack_require__(14);
            var Data_Functor = __webpack_require__(0);
            var Data_HeytingAlgebra = __webpack_require__(21);
            var Data_Maybe = __webpack_require__(28);
            var Data_NonEmpty = __webpack_require__(108);
            var Data_Ord = __webpack_require__(10);
            var Data_Ordering = __webpack_require__(19);
            var Data_Ring = __webpack_require__(22);
            var Data_Semigroup = __webpack_require__(4);
            var Data_Semiring = __webpack_require__(9);
            var Data_Traversable = __webpack_require__(68);
            var Data_Tuple = __webpack_require__(93);
            var Data_Unfoldable = __webpack_require__(114);
            var Partial_Unsafe = __webpack_require__(80);
            var Prelude = __webpack_require__(5);
            var zipWithA = function zipWithA(dictApplicative) {
                return function (f) {
                    return function (xs) {
                        return function (ys) {
                            return Data_Traversable.sequence(Data_Traversable.traversableArray)(dictApplicative)($foreign.zipWith(f)(xs)(ys));
                        };
                    };
                };
            };
            var zip = $foreign.zipWith(Data_Tuple.Tuple.create);
            var updateAtIndices = function updateAtIndices(dictFoldable) {
                return function (us) {
                    return function (xs) {
                        return Control_Monad_ST.pureST(Data_Array_ST.withArray(function (res) {
                            return Data_Foldable.traverse_(Control_Monad_Eff.applicativeEff)(dictFoldable)(Data_Tuple.uncurry(Data_Array_ST.pokeSTArray(res)))(us);
                        })(xs));
                    };
                };
            };
            var updateAt = $foreign._updateAt(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
            var unsafeIndex = function unsafeIndex(dictPartial) {
                return $foreign.unsafeIndexImpl;
            };
            var uncons = $foreign["uncons'"](Data_Function["const"](Data_Maybe.Nothing.value))(function (x) {
                return function (xs) {
                    return new Data_Maybe.Just({
                        head: x,
                        tail: xs
                    });
                };
            });
            var toUnfoldable = function toUnfoldable(dictUnfoldable) {
                return function (xs) {
                    var len = $foreign.length(xs);
                    var f = function f(i) {
                        if (i < len) {
                            return new Data_Maybe.Just(new Data_Tuple.Tuple(unsafeIndex()(xs)(i), i + 1 | 0));
                        };
                        if (Data_Boolean.otherwise) {
                            return Data_Maybe.Nothing.value;
                        };
                        throw new Error("Failed pattern match at Data.Array line 139, column 3 - line 141, column 26: " + [i.constructor.name]);
                    };
                    return Data_Unfoldable.unfoldr(dictUnfoldable)(f)(0);
                };
            };
            var takeEnd = function takeEnd(n) {
                return function (xs) {
                    return $foreign.drop($foreign.length(xs) - n | 0)(xs);
                };
            };
            var tail = $foreign["uncons'"](Data_Function["const"](Data_Maybe.Nothing.value))(function (v) {
                return function (xs) {
                    return new Data_Maybe.Just(xs);
                };
            });
            var sortBy = function sortBy(comp) {
                return function (xs) {
                    var comp$prime = function comp$prime(x) {
                        return function (y) {
                            var v = comp(x)(y);
                            if (v instanceof Data_Ordering.GT) {
                                return 1;
                            };
                            if (v instanceof Data_Ordering.EQ) {
                                return 0;
                            };
                            if (v instanceof Data_Ordering.LT) {
                                return -1 | 0;
                            };
                            throw new Error("Failed pattern match at Data.Array line 698, column 15 - line 703, column 1: " + [v.constructor.name]);
                        };
                    };
                    return $foreign.sortImpl(comp$prime)(xs);
                };
            };
            var sortWith = function sortWith(dictOrd) {
                return function (f) {
                    return sortBy(Data_Ord.comparing(dictOrd)(f));
                };
            };
            var sort = function sort(dictOrd) {
                return function (xs) {
                    return sortBy(Data_Ord.compare(dictOrd))(xs);
                };
            };
            var singleton = function singleton(a) {
                return [a];
            };
            var $$null = function $$null(xs) {
                return $foreign.length(xs) === 0;
            };
            var nubBy = function nubBy(eq) {
                return function (xs) {
                    var v = uncons(xs);
                    if (v instanceof Data_Maybe.Just) {
                        return $foreign.cons(v.value0.head)(nubBy(eq)($foreign.filter(function (y) {
                            return !eq(v.value0.head)(y);
                        })(v.value0.tail)));
                    };
                    if (v instanceof Data_Maybe.Nothing) {
                        return [];
                    };
                    throw new Error("Failed pattern match at Data.Array line 888, column 3 - line 890, column 18: " + [v.constructor.name]);
                };
            };
            var nub = function nub(dictEq) {
                return nubBy(Data_Eq.eq(dictEq));
            };
            var modifyAtIndices = function modifyAtIndices(dictFoldable) {
                return function (is) {
                    return function (f) {
                        return function (xs) {
                            return Control_Monad_ST.pureST(Data_Array_ST.withArray(function (res) {
                                return Data_Foldable.traverse_(Control_Monad_Eff.applicativeEff)(dictFoldable)(function (i) {
                                    return Data_Array_ST.modifySTArray(res)(i)(f);
                                })(is);
                            })(xs));
                        };
                    };
                };
            };
            var mapWithIndex = function mapWithIndex(f) {
                return function (xs) {
                    return $foreign.zipWith(f)($foreign.range(0)($foreign.length(xs) - 1 | 0))(xs);
                };
            };
            var some = function some(dictAlternative) {
                return function (dictLazy) {
                    return function (v) {
                        return Control_Apply.apply(dictAlternative.Applicative0().Apply0())(Data_Functor.map(dictAlternative.Plus1().Alt0().Functor0())($foreign.cons)(v))(Control_Lazy.defer(dictLazy)(function (v1) {
                            return many(dictAlternative)(dictLazy)(v);
                        }));
                    };
                };
            };
            var many = function many(dictAlternative) {
                return function (dictLazy) {
                    return function (v) {
                        return Control_Alt.alt(dictAlternative.Plus1().Alt0())(some(dictAlternative)(dictLazy)(v))(Control_Applicative.pure(dictAlternative.Applicative0())([]));
                    };
                };
            };
            var insertAt = $foreign._insertAt(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
            var init = function init(xs) {
                if ($$null(xs)) {
                    return Data_Maybe.Nothing.value;
                };
                if (Data_Boolean.otherwise) {
                    return new Data_Maybe.Just($foreign.slice(0)($foreign.length(xs) - 1 | 0)(xs));
                };
                throw new Error("Failed pattern match at Data.Array line 319, column 1 - line 319, column 45: " + [xs.constructor.name]);
            };
            var index = $foreign.indexImpl(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
            var last = function last(xs) {
                return index(xs)($foreign.length(xs) - 1 | 0);
            };
            var unsnoc = function unsnoc(xs) {
                return Control_Apply.apply(Data_Maybe.applyMaybe)(Data_Functor.map(Data_Maybe.functorMaybe)(function (v) {
                    return function (v1) {
                        return {
                            init: v,
                            last: v1
                        };
                    };
                })(init(xs)))(last(xs));
            };
            var modifyAt = function modifyAt(i) {
                return function (f) {
                    return function (xs) {
                        var go = function go(x) {
                            return updateAt(i)(f(x))(xs);
                        };
                        return Data_Maybe.maybe(Data_Maybe.Nothing.value)(go)(index(xs)(i));
                    };
                };
            };
            var span = function span(p) {
                return function (arr) {
                    var go = function go($copy_i) {
                        var $tco_done = false;
                        var $tco_result;
                        function $tco_loop(i) {
                            var v = index(arr)(i);
                            if (v instanceof Data_Maybe.Just) {
                                var $64 = p(v.value0);
                                if ($64) {
                                    $copy_i = i + 1 | 0;
                                    return;
                                };
                                $tco_done = true;
                                return new Data_Maybe.Just(i);
                            };
                            if (v instanceof Data_Maybe.Nothing) {
                                $tco_done = true;
                                return Data_Maybe.Nothing.value;
                            };
                            throw new Error("Failed pattern match at Data.Array line 830, column 5 - line 832, column 25: " + [v.constructor.name]);
                        };
                        while (!$tco_done) {
                            $tco_result = $tco_loop($copy_i);
                        };
                        return $tco_result;
                    };
                    var breakIndex = go(0);
                    if (breakIndex instanceof Data_Maybe.Just && breakIndex.value0 === 0) {
                        return {
                            init: [],
                            rest: arr
                        };
                    };
                    if (breakIndex instanceof Data_Maybe.Just) {
                        return {
                            init: $foreign.slice(0)(breakIndex.value0)(arr),
                            rest: $foreign.slice(breakIndex.value0)($foreign.length(arr))(arr)
                        };
                    };
                    if (breakIndex instanceof Data_Maybe.Nothing) {
                        return {
                            init: arr,
                            rest: []
                        };
                    };
                    throw new Error("Failed pattern match at Data.Array line 817, column 3 - line 823, column 30: " + [breakIndex.constructor.name]);
                };
            };
            var takeWhile = function takeWhile(p) {
                return function (xs) {
                    return span(p)(xs).init;
                };
            };
            var unzip = function unzip(xs) {
                return Control_Monad_ST.pureST(function () {
                    function __do() {
                        var v = Data_Array_ST.emptySTArray();
                        var v1 = Data_Array_ST.emptySTArray();
                        var v2 = Data_Array_ST_Iterator.iterator(function (v2) {
                            return index(xs)(v2);
                        })();
                        Data_Array_ST_Iterator.iterate(v2)(function (v3) {
                            return function () {
                                function __do() {
                                    Data_Functor["void"](Control_Monad_Eff.functorEff)(Data_Array_ST.pushSTArray(v)(v3.value0))();
                                    return Data_Functor["void"](Control_Monad_Eff.functorEff)(Data_Array_ST.pushSTArray(v1)(v3.value1))();
                                }

                                return __do;
                            }();
                        })();
                        var v3 = Data_Array_ST.unsafeFreeze(v)();
                        var v4 = Data_Array_ST.unsafeFreeze(v1)();
                        return new Data_Tuple.Tuple(v3, v4);
                    }

                    return __do;
                }());
            };
            var head = function head(xs) {
                return index(xs)(0);
            };
            var groupBy = function groupBy(op) {
                return function (xs) {
                    return Control_Monad_ST.pureST(function () {
                        function __do() {
                            var v = Data_Array_ST.emptySTArray();
                            var v1 = Data_Array_ST_Iterator.iterator(function (v1) {
                                return index(xs)(v1);
                            })();
                            Data_Array_ST_Iterator.iterate(v1)(function (x) {
                                return Data_Functor["void"](Control_Monad_Eff.functorEff)(function () {
                                    function __do() {
                                        var v2 = Data_Array_ST.emptySTArray();
                                        Data_Array_ST_Iterator.pushWhile(op(x))(v1)(v2)();
                                        var v3 = Data_Array_ST.unsafeFreeze(v2)();
                                        return Data_Array_ST.pushSTArray(v)(new Data_NonEmpty.NonEmpty(x, v3))();
                                    }

                                    return __do;
                                }());
                            })();
                            return Data_Array_ST.unsafeFreeze(v)();
                        }

                        return __do;
                    }());
                };
            };
            var group = function group(dictEq) {
                return function (xs) {
                    return groupBy(Data_Eq.eq(dictEq))(xs);
                };
            };
            var group$prime = function group$prime(dictOrd) {
                return function ($93) {
                    return group(dictOrd.Eq0())(sort(dictOrd)($93));
                };
            };
            var fromFoldable = function fromFoldable(dictFoldable) {
                return $foreign.fromFoldableImpl(Data_Foldable.foldr(dictFoldable));
            };
            var foldRecM = function foldRecM(dictMonadRec) {
                return function (f) {
                    return function (a) {
                        return function (array) {
                            var go = function go(res) {
                                return function (i) {
                                    if (i >= $foreign.length(array)) {
                                        return Control_Applicative.pure(dictMonadRec.Monad0().Applicative0())(new Control_Monad_Rec_Class.Done(res));
                                    };
                                    if (Data_Boolean.otherwise) {
                                        return Control_Bind.bind(dictMonadRec.Monad0().Bind1())(f(res)(unsafeIndex()(array)(i)))(function (v) {
                                            return Control_Applicative.pure(dictMonadRec.Monad0().Applicative0())(new Control_Monad_Rec_Class.Loop({
                                                a: v,
                                                b: i + 1 | 0
                                            }));
                                        });
                                    };
                                    throw new Error("Failed pattern match at Data.Array line 1057, column 3 - line 1061, column 42: " + [res.constructor.name, i.constructor.name]);
                                };
                            };
                            return Control_Monad_Rec_Class.tailRecM2(dictMonadRec)(go)(a)(0);
                        };
                    };
                };
            };
            var foldM = function foldM(dictMonad) {
                return function (f) {
                    return function (a) {
                        return $foreign["uncons'"](function (v) {
                            return Control_Applicative.pure(dictMonad.Applicative0())(a);
                        })(function (b) {
                            return function (bs) {
                                return Control_Bind.bind(dictMonad.Bind1())(f(a)(b))(function (a$prime) {
                                    return foldM(dictMonad)(f)(a$prime)(bs);
                                });
                            };
                        });
                    };
                };
            };
            var findLastIndex = $foreign.findLastIndexImpl(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
            var insertBy = function insertBy(cmp) {
                return function (x) {
                    return function (ys) {
                        var i = Data_Maybe.maybe(0)(function (v) {
                            return v + 1 | 0;
                        })(findLastIndex(function (y) {
                            return Data_Eq.eq(Data_Ordering.eqOrdering)(cmp(x)(y))(Data_Ordering.GT.value);
                        })(ys));
                        return Data_Maybe.fromJust()(insertAt(i)(x)(ys));
                    };
                };
            };
            var insert = function insert(dictOrd) {
                return insertBy(Data_Ord.compare(dictOrd));
            };
            var findIndex = $foreign.findIndexImpl(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
            var intersectBy = function intersectBy(eq) {
                return function (xs) {
                    return function (ys) {
                        return $foreign.filter(function (x) {
                            return Data_Maybe.isJust(findIndex(eq(x))(ys));
                        })(xs);
                    };
                };
            };
            var intersect = function intersect(dictEq) {
                return intersectBy(Data_Eq.eq(dictEq));
            };
            var elemLastIndex = function elemLastIndex(dictEq) {
                return function (x) {
                    return findLastIndex(function (v) {
                        return Data_Eq.eq(dictEq)(v)(x);
                    });
                };
            };
            var elemIndex = function elemIndex(dictEq) {
                return function (x) {
                    return findIndex(function (v) {
                        return Data_Eq.eq(dictEq)(v)(x);
                    });
                };
            };
            var dropWhile = function dropWhile(p) {
                return function (xs) {
                    return span(p)(xs).rest;
                };
            };
            var dropEnd = function dropEnd(n) {
                return function (xs) {
                    return $foreign.take($foreign.length(xs) - n | 0)(xs);
                };
            };
            var deleteAt = $foreign._deleteAt(Data_Maybe.Just.create)(Data_Maybe.Nothing.value);
            var deleteBy = function deleteBy(v) {
                return function (v1) {
                    return function (v2) {
                        if (v2.length === 0) {
                            return [];
                        };
                        return Data_Maybe.maybe(v2)(function (i) {
                            return Data_Maybe.fromJust()(deleteAt(i)(v2));
                        })(findIndex(v(v1))(v2));
                    };
                };
            };
            var unionBy = function unionBy(eq) {
                return function (xs) {
                    return function (ys) {
                        return Data_Semigroup.append(Data_Semigroup.semigroupArray)(xs)(Data_Foldable.foldl(Data_Foldable.foldableArray)(Data_Function.flip(deleteBy(eq)))(nubBy(eq)(ys))(xs));
                    };
                };
            };
            var union = function union(dictEq) {
                return unionBy(Data_Eq.eq(dictEq));
            };
            var $$delete = function $$delete(dictEq) {
                return deleteBy(Data_Eq.eq(dictEq));
            };
            var difference = function difference(dictEq) {
                return Data_Foldable.foldr(Data_Foldable.foldableArray)($$delete(dictEq));
            };
            var concatMap = Data_Function.flip(Control_Bind.bind(Control_Bind.bindArray));
            var mapMaybe = function mapMaybe(f) {
                return concatMap(function ($94) {
                    return Data_Maybe.maybe([])(singleton)(f($94));
                });
            };
            var filterA = function filterA(dictApplicative) {
                return function (p) {
                    return function ($95) {
                        return Data_Functor.map(dictApplicative.Apply0().Functor0())(mapMaybe(function (v) {
                            if (v.value1) {
                                return new Data_Maybe.Just(v.value0);
                            };
                            return Data_Maybe.Nothing.value;
                        }))(Data_Traversable.traverse(Data_Traversable.traversableArray)(dictApplicative)(function (x) {
                            return Data_Functor.map(dictApplicative.Apply0().Functor0())(Data_Tuple.Tuple.create(x))(p(x));
                        })($95));
                    };
                };
            };
            var catMaybes = mapMaybe(Control_Category.id(Control_Category.categoryFn));
            var alterAt = function alterAt(i) {
                return function (f) {
                    return function (xs) {
                        var go = function go(x) {
                            var v = f(x);
                            if (v instanceof Data_Maybe.Nothing) {
                                return deleteAt(i)(xs);
                            };
                            if (v instanceof Data_Maybe.Just) {
                                return updateAt(i)(v.value0)(xs);
                            };
                            throw new Error("Failed pattern match at Data.Array line 540, column 10 - line 542, column 32: " + [v.constructor.name]);
                        };
                        return Data_Maybe.maybe(Data_Maybe.Nothing.value)(go)(index(xs)(i));
                    };
                };
            };
            module.exports = {
                fromFoldable: fromFoldable,
                toUnfoldable: toUnfoldable,
                singleton: singleton,
                some: some,
                many: many,
                "null": $$null,
                insert: insert,
                insertBy: insertBy,
                head: head,
                last: last,
                tail: tail,
                init: init,
                uncons: uncons,
                unsnoc: unsnoc,
                index: index,
                elemIndex: elemIndex,
                elemLastIndex: elemLastIndex,
                findIndex: findIndex,
                findLastIndex: findLastIndex,
                insertAt: insertAt,
                deleteAt: deleteAt,
                updateAt: updateAt,
                updateAtIndices: updateAtIndices,
                modifyAt: modifyAt,
                modifyAtIndices: modifyAtIndices,
                alterAt: alterAt,
                concatMap: concatMap,
                filterA: filterA,
                mapMaybe: mapMaybe,
                catMaybes: catMaybes,
                mapWithIndex: mapWithIndex,
                sort: sort,
                sortBy: sortBy,
                sortWith: sortWith,
                takeEnd: takeEnd,
                takeWhile: takeWhile,
                dropEnd: dropEnd,
                dropWhile: dropWhile,
                span: span,
                group: group,
                "group'": group$prime,
                groupBy: groupBy,
                nub: nub,
                nubBy: nubBy,
                union: union,
                unionBy: unionBy,
                "delete": $$delete,
                deleteBy: deleteBy,
                difference: difference,
                intersect: intersect,
                intersectBy: intersectBy,
                zipWithA: zipWithA,
                zip: zip,
                unzip: unzip,
                foldM: foldM,
                foldRecM: foldRecM,
                unsafeIndex: unsafeIndex,
                range: $foreign.range,
                replicate: $foreign.replicate,
                length: $foreign.length,
                cons: $foreign.cons,
                snoc: $foreign.snoc,
                reverse: $foreign.reverse,
                concat: $foreign.concat,
                filter: $foreign.filter,
                partition: $foreign.partition,
                slice: $foreign.slice,
                take: $foreign.take,
                drop: $foreign.drop,
                zipWith: $foreign.zipWith
            };

            /***/
        },
        /* 95 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            //------------------------------------------------------------------------------
            // Array creation --------------------------------------------------------------
            //------------------------------------------------------------------------------

            exports.range = function (start) {
                return function (end) {
                    var step = start > end ? -1 : 1;
                    var result = new Array(step * (end - start) + 1);
                    var i = start,
                        n = 0;
                    while (i !== end) {
                        result[n++] = i;
                        i += step;
                    }
                    result[n] = i;
                    return result;
                };
            };

            var replicate = function replicate(count) {
                return function (value) {
                    if (count < 1) {
                        return [];
                    }
                    var result = new Array(count);
                    return result.fill(value);
                };
            };

            var replicatePolyfill = function replicatePolyfill(count) {
                return function (value) {
                    var result = [];
                    var n = 0;
                    for (var i = 0; i < count; i++) {
                        result[n++] = value;
                    }
                    return result;
                };
            };

            // In browsers that have Array.prototype.fill we use it, as it's faster.
            exports.replicate = typeof Array.prototype.fill === "function" ? replicate : replicatePolyfill;

            exports.fromFoldableImpl = function () {
                function Cons(head, tail) {
                    this.head = head;
                    this.tail = tail;
                }
                var emptyList = {};

                function curryCons(head) {
                    return function (tail) {
                        return new Cons(head, tail);
                    };
                }

                function listToArray(list) {
                    var result = [];
                    var count = 0;
                    var xs = list;
                    while (xs !== emptyList) {
                        result[count++] = xs.head;
                        xs = xs.tail;
                    }
                    return result;
                }

                return function (foldr) {
                    return function (xs) {
                        return listToArray(foldr(curryCons)(emptyList)(xs));
                    };
                };
            }();

            //------------------------------------------------------------------------------
            // Array size ------------------------------------------------------------------
            //------------------------------------------------------------------------------

            exports.length = function (xs) {
                return xs.length;
            };

            //------------------------------------------------------------------------------
            // Extending arrays ------------------------------------------------------------
            //------------------------------------------------------------------------------

            exports.cons = function (e) {
                return function (l) {
                    return [e].concat(l);
                };
            };

            exports.snoc = function (l) {
                return function (e) {
                    var l1 = l.slice();
                    l1.push(e);
                    return l1;
                };
            };

            //------------------------------------------------------------------------------
            // Non-indexed reads -----------------------------------------------------------
            //------------------------------------------------------------------------------

            exports["uncons'"] = function (empty) {
                return function (next) {
                    return function (xs) {
                        return xs.length === 0 ? empty({}) : next(xs[0])(xs.slice(1));
                    };
                };
            };

            //------------------------------------------------------------------------------
            // Indexed operations ----------------------------------------------------------
            //------------------------------------------------------------------------------

            exports.indexImpl = function (just) {
                return function (nothing) {
                    return function (xs) {
                        return function (i) {
                            return i < 0 || i >= xs.length ? nothing : just(xs[i]);
                        };
                    };
                };
            };

            exports.findIndexImpl = function (just) {
                return function (nothing) {
                    return function (f) {
                        return function (xs) {
                            for (var i = 0, l = xs.length; i < l; i++) {
                                if (f(xs[i])) return just(i);
                            }
                            return nothing;
                        };
                    };
                };
            };

            exports.findLastIndexImpl = function (just) {
                return function (nothing) {
                    return function (f) {
                        return function (xs) {
                            for (var i = xs.length - 1; i >= 0; i--) {
                                if (f(xs[i])) return just(i);
                            }
                            return nothing;
                        };
                    };
                };
            };

            exports._insertAt = function (just) {
                return function (nothing) {
                    return function (i) {
                        return function (a) {
                            return function (l) {
                                if (i < 0 || i > l.length) return nothing;
                                var l1 = l.slice();
                                l1.splice(i, 0, a);
                                return just(l1);
                            };
                        };
                    };
                };
            };

            exports._deleteAt = function (just) {
                return function (nothing) {
                    return function (i) {
                        return function (l) {
                            if (i < 0 || i >= l.length) return nothing;
                            var l1 = l.slice();
                            l1.splice(i, 1);
                            return just(l1);
                        };
                    };
                };
            };

            exports._updateAt = function (just) {
                return function (nothing) {
                    return function (i) {
                        return function (a) {
                            return function (l) {
                                if (i < 0 || i >= l.length) return nothing;
                                var l1 = l.slice();
                                l1[i] = a;
                                return just(l1);
                            };
                        };
                    };
                };
            };

            //------------------------------------------------------------------------------
            // Transformations -------------------------------------------------------------
            //------------------------------------------------------------------------------

            exports.reverse = function (l) {
                return l.slice().reverse();
            };

            exports.concat = function (xss) {
                if (xss.length <= 10000) {
                    // This method is faster, but it crashes on big arrays.
                    // So we use it when can and fallback to simple variant otherwise.
                    return Array.prototype.concat.apply([], xss);
                }

                var result = [];
                for (var i = 0, l = xss.length; i < l; i++) {
                    var xs = xss[i];
                    for (var j = 0, m = xs.length; j < m; j++) {
                        result.push(xs[j]);
                    }
                }
                return result;
            };

            exports.filter = function (f) {
                return function (xs) {
                    return xs.filter(f);
                };
            };

            exports.partition = function (f) {
                return function (xs) {
                    var yes = [];
                    var no = [];
                    for (var i = 0; i < xs.length; i++) {
                        var x = xs[i];
                        if (f(x)) yes.push(x);else no.push(x);
                    }
                    return { yes: yes, no: no };
                };
            };

            //------------------------------------------------------------------------------
            // Sorting ---------------------------------------------------------------------
            //------------------------------------------------------------------------------

            exports.sortImpl = function (f) {
                return function (l) {
                    return l.slice().sort(function (x, y) {
                        return f(x)(y);
                    });
                };
            };

            //------------------------------------------------------------------------------
            // Subarrays -------------------------------------------------------------------
            //------------------------------------------------------------------------------

            exports.slice = function (s) {
                return function (e) {
                    return function (l) {
                        return l.slice(s, e);
                    };
                };
            };

            exports.take = function (n) {
                return function (l) {
                    return n < 1 ? [] : l.slice(0, n);
                };
            };

            exports.drop = function (n) {
                return function (l) {
                    return n < 1 ? l : l.slice(n);
                };
            };

            //------------------------------------------------------------------------------
            // Zipping ---------------------------------------------------------------------
            //------------------------------------------------------------------------------

            exports.zipWith = function (f) {
                return function (xs) {
                    return function (ys) {
                        var l = xs.length < ys.length ? xs.length : ys.length;
                        var result = new Array(l);
                        for (var i = 0; i < l; i++) {
                            result[i] = f(xs[i])(ys[i]);
                        }
                        return result;
                    };
                };
            };

            //------------------------------------------------------------------------------
            // Partial ---------------------------------------------------------------------
            //------------------------------------------------------------------------------

            exports.unsafeIndexImpl = function (xs) {
                return function (n) {
                    return xs[n];
                };
            };

            /***/
        },
        /* 96 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var Control_Applicative = __webpack_require__(3);
            var Control_Bind = __webpack_require__(8);
            var Control_Monad = __webpack_require__(11);
            var Control_Monad_Eff = __webpack_require__(31);
            var Control_Monad_Eff_Unsafe = __webpack_require__(97);
            var Control_Monad_ST = __webpack_require__(79);
            var Control_Semigroupoid = __webpack_require__(20);
            var Data_Bifunctor = __webpack_require__(76);
            var Data_Either = __webpack_require__(100);
            var Data_Functor = __webpack_require__(0);
            var Data_Identity = __webpack_require__(90);
            var Data_Maybe = __webpack_require__(28);
            var Data_Unit = __webpack_require__(1);
            var Partial_Unsafe = __webpack_require__(80);
            var Prelude = __webpack_require__(5);
            var Loop = function () {
                function Loop(value0) {
                    this.value0 = value0;
                };
                Loop.create = function (value0) {
                    return new Loop(value0);
                };
                return Loop;
            }();
            var Done = function () {
                function Done(value0) {
                    this.value0 = value0;
                };
                Done.create = function (value0) {
                    return new Done(value0);
                };
                return Done;
            }();
            var MonadRec = function MonadRec(Monad0, tailRecM) {
                this.Monad0 = Monad0;
                this.tailRecM = tailRecM;
            };
            var tailRecM = function tailRecM(dict) {
                return dict.tailRecM;
            };
            var tailRecM2 = function tailRecM2(dictMonadRec) {
                return function (f) {
                    return function (a) {
                        return function (b) {
                            return tailRecM(dictMonadRec)(function (o) {
                                return f(o.a)(o.b);
                            })({
                                a: a,
                                b: b
                            });
                        };
                    };
                };
            };
            var tailRecM3 = function tailRecM3(dictMonadRec) {
                return function (f) {
                    return function (a) {
                        return function (b) {
                            return function (c) {
                                return tailRecM(dictMonadRec)(function (o) {
                                    return f(o.a)(o.b)(o.c);
                                })({
                                    a: a,
                                    b: b,
                                    c: c
                                });
                            };
                        };
                    };
                };
            };
            var tailRecEff = function tailRecEff(f) {
                return function (a) {
                    var fromDone = function fromDone(v) {
                        var __unused = function __unused(dictPartial1) {
                            return function ($dollar16) {
                                return $dollar16;
                            };
                        };
                        return __unused()(function () {
                            if (v instanceof Done) {
                                return v.value0;
                            };
                            throw new Error("Failed pattern match at Control.Monad.Rec.Class line 141, column 28 - line 141, column 42: " + [v.constructor.name]);
                        }());
                    };
                    var f$prime = function f$prime($52) {
                        return Control_Monad_Eff_Unsafe.unsafeCoerceEff(f($52));
                    };
                    return function () {
                        function __do() {
                            var v = Control_Bind.bindFlipped(Control_Monad_Eff.bindEff)(Control_Monad_ST.newSTRef)(f$prime(a))();
                            (function () {
                                while (!function () {
                                    function __do() {
                                        var v1 = v.value;
                                        if (v1 instanceof Loop) {
                                            var v2 = f$prime(v1.value0)();
                                            var v3 = v.value = v2;
                                            return false;
                                        };
                                        if (v1 instanceof Done) {
                                            return true;
                                        };
                                        throw new Error("Failed pattern match at Control.Monad.Rec.Class line 130, column 5 - line 135, column 26: " + [v1.constructor.name]);
                                    }

                                    return __do;
                                }()()) {};
                                return {};
                            })();
                            return Data_Functor.map(Control_Monad_Eff.functorEff)(fromDone)(Control_Monad_ST.readSTRef(v))();
                        }

                        return __do;
                    }();
                };
            };
            var tailRec = function tailRec(f) {
                var go = function go($copy_v) {
                    var $tco_done = false;
                    var $tco_result;
                    function $tco_loop(v) {
                        if (v instanceof Loop) {
                            $copy_v = f(v.value0);
                            return;
                        };
                        if (v instanceof Done) {
                            $tco_done = true;
                            return v.value0;
                        };
                        throw new Error("Failed pattern match at Control.Monad.Rec.Class line 96, column 3 - line 96, column 25: " + [v.constructor.name]);
                    };
                    while (!$tco_done) {
                        $tco_result = $tco_loop($copy_v);
                    };
                    return $tco_result;
                };
                return function ($53) {
                    return go(f($53));
                };
            };
            var monadRecMaybe = new MonadRec(function () {
                return Data_Maybe.monadMaybe;
            }, function (f) {
                return function (a0) {
                    var g = function g(v) {
                        if (v instanceof Data_Maybe.Nothing) {
                            return new Done(Data_Maybe.Nothing.value);
                        };
                        if (v instanceof Data_Maybe.Just && v.value0 instanceof Loop) {
                            return new Loop(f(v.value0.value0));
                        };
                        if (v instanceof Data_Maybe.Just && v.value0 instanceof Done) {
                            return new Done(new Data_Maybe.Just(v.value0.value0));
                        };
                        throw new Error("Failed pattern match at Control.Monad.Rec.Class line 120, column 7 - line 120, column 31: " + [v.constructor.name]);
                    };
                    return tailRec(g)(f(a0));
                };
            });
            var monadRecIdentity = new MonadRec(function () {
                return Data_Identity.monadIdentity;
            }, function (f) {
                var runIdentity = function runIdentity(v) {
                    return v;
                };
                return function ($54) {
                    return Data_Identity.Identity(tailRec(function ($55) {
                        return runIdentity(f($55));
                    })($54));
                };
            });
            var monadRecFunction = new MonadRec(function () {
                return Control_Monad.monadFn;
            }, function (f) {
                return function (a0) {
                    return function (e) {
                        return tailRec(function (a) {
                            return f(a)(e);
                        })(a0);
                    };
                };
            });
            var monadRecEither = new MonadRec(function () {
                return Data_Either.monadEither;
            }, function (f) {
                return function (a0) {
                    var g = function g(v) {
                        if (v instanceof Data_Either.Left) {
                            return new Done(new Data_Either.Left(v.value0));
                        };
                        if (v instanceof Data_Either.Right && v.value0 instanceof Loop) {
                            return new Loop(f(v.value0.value0));
                        };
                        if (v instanceof Data_Either.Right && v.value0 instanceof Done) {
                            return new Done(new Data_Either.Right(v.value0.value0));
                        };
                        throw new Error("Failed pattern match at Control.Monad.Rec.Class line 112, column 7 - line 112, column 33: " + [v.constructor.name]);
                    };
                    return tailRec(g)(f(a0));
                };
            });
            var monadRecEff = new MonadRec(function () {
                return Control_Monad_Eff.monadEff;
            }, tailRecEff);
            var functorStep = new Data_Functor.Functor(function (f) {
                return function (v) {
                    if (v instanceof Loop) {
                        return new Loop(v.value0);
                    };
                    if (v instanceof Done) {
                        return new Done(f(v.value0));
                    };
                    throw new Error("Failed pattern match at Control.Monad.Rec.Class line 28, column 1 - line 28, column 41: " + [f.constructor.name, v.constructor.name]);
                };
            });
            var forever = function forever(dictMonadRec) {
                return function (ma) {
                    return tailRecM(dictMonadRec)(function (u) {
                        return Data_Functor.voidRight(dictMonadRec.Monad0().Bind1().Apply0().Functor0())(new Loop(u))(ma);
                    })(Data_Unit.unit);
                };
            };
            var bifunctorStep = new Data_Bifunctor.Bifunctor(function (v) {
                return function (v1) {
                    return function (v2) {
                        if (v2 instanceof Loop) {
                            return new Loop(v(v2.value0));
                        };
                        if (v2 instanceof Done) {
                            return new Done(v1(v2.value0));
                        };
                        throw new Error("Failed pattern match at Control.Monad.Rec.Class line 32, column 1 - line 32, column 41: " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
                    };
                };
            });
            module.exports = {
                Loop: Loop,
                Done: Done,
                MonadRec: MonadRec,
                tailRec: tailRec,
                tailRecM: tailRecM,
                tailRecM2: tailRecM2,
                tailRecM3: tailRecM3,
                forever: forever,
                functorStep: functorStep,
                bifunctorStep: bifunctorStep,
                monadRecIdentity: monadRecIdentity,
                monadRecEff: monadRecEff,
                monadRecFunction: monadRecFunction,
                monadRecEither: monadRecEither,
                monadRecMaybe: monadRecMaybe
            };

            /***/
        },
        /* 97 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var $foreign = __webpack_require__(98);
            var Control_Monad_Eff = __webpack_require__(31);
            var Control_Semigroupoid = __webpack_require__(20);
            var unsafePerformEff = function unsafePerformEff($0) {
                return Control_Monad_Eff.runPure($foreign.unsafeCoerceEff($0));
            };
            module.exports = {
                unsafePerformEff: unsafePerformEff,
                unsafeCoerceEff: $foreign.unsafeCoerceEff
            };

            /***/
        },
        /* 98 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            exports.unsafeCoerceEff = function (f) {
                return f;
            };

            /***/
        },
        /* 99 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            exports.newSTRef = function (val) {
                return function () {
                    return { value: val };
                };
            };

            exports.readSTRef = function (ref) {
                return function () {
                    return ref.value;
                };
            };

            exports.modifySTRef = function (ref) {
                return function (f) {
                    return function () {
                        return ref.value = f(ref.value); // eslint-disable-line no-return-assign
                    };
                };
            };

            exports.writeSTRef = function (ref) {
                return function (a) {
                    return function () {
                        return ref.value = a; // eslint-disable-line no-return-assign
                    };
                };
            };

            exports.runST = function (f) {
                return f;
            };

            /***/
        },
        /* 100 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var Control_Alt = __webpack_require__(23);
            var Control_Applicative = __webpack_require__(3);
            var Control_Apply = __webpack_require__(2);
            var Control_Bind = __webpack_require__(8);
            var Control_Extend = __webpack_require__(16);
            var Control_Monad = __webpack_require__(11);
            var Data_Bifoldable = __webpack_require__(82);
            var Data_Bifunctor = __webpack_require__(76);
            var Data_Bitraversable = __webpack_require__(89);
            var Data_Bounded = __webpack_require__(15);
            var Data_Eq = __webpack_require__(6);
            var Data_Foldable = __webpack_require__(70);
            var Data_Function = __webpack_require__(14);
            var Data_Functor = __webpack_require__(0);
            var Data_Functor_Invariant = __webpack_require__(17);
            var Data_Maybe = __webpack_require__(28);
            var Data_Monoid = __webpack_require__(12);
            var Data_Ord = __webpack_require__(10);
            var Data_Ordering = __webpack_require__(19);
            var Data_Semigroup = __webpack_require__(4);
            var Data_Semiring = __webpack_require__(9);
            var Data_Show = __webpack_require__(7);
            var Data_Traversable = __webpack_require__(68);
            var Prelude = __webpack_require__(5);
            var Left = function () {
                function Left(value0) {
                    this.value0 = value0;
                };
                Left.create = function (value0) {
                    return new Left(value0);
                };
                return Left;
            }();
            var Right = function () {
                function Right(value0) {
                    this.value0 = value0;
                };
                Right.create = function (value0) {
                    return new Right(value0);
                };
                return Right;
            }();
            var showEither = function showEither(dictShow) {
                return function (dictShow1) {
                    return new Data_Show.Show(function (v) {
                        if (v instanceof Left) {
                            return "(Left " + (Data_Show.show(dictShow)(v.value0) + ")");
                        };
                        if (v instanceof Right) {
                            return "(Right " + (Data_Show.show(dictShow1)(v.value0) + ")");
                        };
                        throw new Error("Failed pattern match at Data.Either line 160, column 1 - line 160, column 61: " + [v.constructor.name]);
                    });
                };
            };
            var note = function note(a) {
                return Data_Maybe.maybe(new Left(a))(Right.create);
            };
            var functorEither = new Data_Functor.Functor(function (v) {
                return function (v1) {
                    if (v1 instanceof Left) {
                        return new Left(v1.value0);
                    };
                    if (v1 instanceof Right) {
                        return new Right(v(v1.value0));
                    };
                    throw new Error("Failed pattern match at Data.Either line 36, column 1 - line 36, column 45: " + [v.constructor.name, v1.constructor.name]);
                };
            });
            var invariantEither = new Data_Functor_Invariant.Invariant(Data_Functor_Invariant.imapF(functorEither));
            var fromRight = function fromRight(dictPartial) {
                return function (v) {
                    var __unused = function __unused(dictPartial1) {
                        return function ($dollar62) {
                            return $dollar62;
                        };
                    };
                    return __unused(dictPartial)(function () {
                        if (v instanceof Right) {
                            return v.value0;
                        };
                        throw new Error("Failed pattern match at Data.Either line 252, column 1 - line 252, column 52: " + [v.constructor.name]);
                    }());
                };
            };
            var fromLeft = function fromLeft(dictPartial) {
                return function (v) {
                    var __unused = function __unused(dictPartial1) {
                        return function ($dollar66) {
                            return $dollar66;
                        };
                    };
                    return __unused(dictPartial)(function () {
                        if (v instanceof Left) {
                            return v.value0;
                        };
                        throw new Error("Failed pattern match at Data.Either line 247, column 1 - line 247, column 51: " + [v.constructor.name]);
                    }());
                };
            };
            var foldableEither = new Data_Foldable.Foldable(function (dictMonoid) {
                return function (f) {
                    return function (v) {
                        if (v instanceof Left) {
                            return Data_Monoid.mempty(dictMonoid);
                        };
                        if (v instanceof Right) {
                            return f(v.value0);
                        };
                        throw new Error("Failed pattern match at Data.Either line 184, column 1 - line 184, column 47: " + [f.constructor.name, v.constructor.name]);
                    };
                };
            }, function (v) {
                return function (z) {
                    return function (v1) {
                        if (v1 instanceof Left) {
                            return z;
                        };
                        if (v1 instanceof Right) {
                            return v(z)(v1.value0);
                        };
                        throw new Error("Failed pattern match at Data.Either line 184, column 1 - line 184, column 47: " + [v.constructor.name, z.constructor.name, v1.constructor.name]);
                    };
                };
            }, function (v) {
                return function (z) {
                    return function (v1) {
                        if (v1 instanceof Left) {
                            return z;
                        };
                        if (v1 instanceof Right) {
                            return v(v1.value0)(z);
                        };
                        throw new Error("Failed pattern match at Data.Either line 184, column 1 - line 184, column 47: " + [v.constructor.name, z.constructor.name, v1.constructor.name]);
                    };
                };
            });
            var traversableEither = new Data_Traversable.Traversable(function () {
                return foldableEither;
            }, function () {
                return functorEither;
            }, function (dictApplicative) {
                return function (v) {
                    if (v instanceof Left) {
                        return Control_Applicative.pure(dictApplicative)(new Left(v.value0));
                    };
                    if (v instanceof Right) {
                        return Data_Functor.map(dictApplicative.Apply0().Functor0())(Right.create)(v.value0);
                    };
                    throw new Error("Failed pattern match at Data.Either line 200, column 1 - line 200, column 53: " + [v.constructor.name]);
                };
            }, function (dictApplicative) {
                return function (v) {
                    return function (v1) {
                        if (v1 instanceof Left) {
                            return Control_Applicative.pure(dictApplicative)(new Left(v1.value0));
                        };
                        if (v1 instanceof Right) {
                            return Data_Functor.map(dictApplicative.Apply0().Functor0())(Right.create)(v(v1.value0));
                        };
                        throw new Error("Failed pattern match at Data.Either line 200, column 1 - line 200, column 53: " + [v.constructor.name, v1.constructor.name]);
                    };
                };
            });
            var extendEither = new Control_Extend.Extend(function () {
                return functorEither;
            }, function (v) {
                return function (v1) {
                    if (v1 instanceof Left) {
                        return new Left(v1.value0);
                    };
                    return new Right(v(v1));
                };
            });
            var eqEither = function eqEither(dictEq) {
                return function (dictEq1) {
                    return new Data_Eq.Eq(function (x) {
                        return function (y) {
                            if (x instanceof Left && y instanceof Left) {
                                return Data_Eq.eq(dictEq)(x.value0)(y.value0);
                            };
                            if (x instanceof Right && y instanceof Right) {
                                return Data_Eq.eq(dictEq1)(x.value0)(y.value0);
                            };
                            return false;
                        };
                    });
                };
            };
            var ordEither = function ordEither(dictOrd) {
                return function (dictOrd1) {
                    return new Data_Ord.Ord(function () {
                        return eqEither(dictOrd.Eq0())(dictOrd1.Eq0());
                    }, function (x) {
                        return function (y) {
                            if (x instanceof Left && y instanceof Left) {
                                return Data_Ord.compare(dictOrd)(x.value0)(y.value0);
                            };
                            if (x instanceof Left) {
                                return Data_Ordering.LT.value;
                            };
                            if (y instanceof Left) {
                                return Data_Ordering.GT.value;
                            };
                            if (x instanceof Right && y instanceof Right) {
                                return Data_Ord.compare(dictOrd1)(x.value0)(y.value0);
                            };
                            throw new Error("Failed pattern match at Data.Either line 176, column 8 - line 176, column 64: " + [x.constructor.name, y.constructor.name]);
                        };
                    });
                };
            };
            var eq1Either = function eq1Either(dictEq) {
                return new Data_Eq.Eq1(function (dictEq1) {
                    return Data_Eq.eq(eqEither(dictEq)(dictEq1));
                });
            };
            var ord1Either = function ord1Either(dictOrd) {
                return new Data_Ord.Ord1(function () {
                    return eq1Either(dictOrd.Eq0());
                }, function (dictOrd1) {
                    return Data_Ord.compare(ordEither(dictOrd)(dictOrd1));
                });
            };
            var either = function either(v) {
                return function (v1) {
                    return function (v2) {
                        if (v2 instanceof Left) {
                            return v(v2.value0);
                        };
                        if (v2 instanceof Right) {
                            return v1(v2.value0);
                        };
                        throw new Error("Failed pattern match at Data.Either line 229, column 1 - line 229, column 64: " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
                    };
                };
            };
            var hush = either(Data_Function["const"](Data_Maybe.Nothing.value))(Data_Maybe.Just.create);
            var isLeft = either(Data_Function["const"](true))(Data_Function["const"](false));
            var isRight = either(Data_Function["const"](false))(Data_Function["const"](true));
            var choose = function choose(dictAlt) {
                return function (a) {
                    return function (b) {
                        return Control_Alt.alt(dictAlt)(Data_Functor.map(dictAlt.Functor0())(Left.create)(a))(Data_Functor.map(dictAlt.Functor0())(Right.create)(b));
                    };
                };
            };
            var boundedEither = function boundedEither(dictBounded) {
                return function (dictBounded1) {
                    return new Data_Bounded.Bounded(function () {
                        return ordEither(dictBounded.Ord0())(dictBounded1.Ord0());
                    }, new Left(Data_Bounded.bottom(dictBounded)), new Right(Data_Bounded.top(dictBounded1)));
                };
            };
            var bifunctorEither = new Data_Bifunctor.Bifunctor(function (v) {
                return function (v1) {
                    return function (v2) {
                        if (v2 instanceof Left) {
                            return new Left(v(v2.value0));
                        };
                        if (v2 instanceof Right) {
                            return new Right(v1(v2.value0));
                        };
                        throw new Error("Failed pattern match at Data.Either line 43, column 1 - line 43, column 45: " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
                    };
                };
            });
            var bifoldableEither = new Data_Bifoldable.Bifoldable(function (dictMonoid) {
                return function (v) {
                    return function (v1) {
                        return function (v2) {
                            if (v2 instanceof Left) {
                                return v(v2.value0);
                            };
                            if (v2 instanceof Right) {
                                return v1(v2.value0);
                            };
                            throw new Error("Failed pattern match at Data.Either line 192, column 1 - line 192, column 47: " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
                        };
                    };
                };
            }, function (v) {
                return function (v1) {
                    return function (z) {
                        return function (v2) {
                            if (v2 instanceof Left) {
                                return v(z)(v2.value0);
                            };
                            if (v2 instanceof Right) {
                                return v1(z)(v2.value0);
                            };
                            throw new Error("Failed pattern match at Data.Either line 192, column 1 - line 192, column 47: " + [v.constructor.name, v1.constructor.name, z.constructor.name, v2.constructor.name]);
                        };
                    };
                };
            }, function (v) {
                return function (v1) {
                    return function (z) {
                        return function (v2) {
                            if (v2 instanceof Left) {
                                return v(v2.value0)(z);
                            };
                            if (v2 instanceof Right) {
                                return v1(v2.value0)(z);
                            };
                            throw new Error("Failed pattern match at Data.Either line 192, column 1 - line 192, column 47: " + [v.constructor.name, v1.constructor.name, z.constructor.name, v2.constructor.name]);
                        };
                    };
                };
            });
            var bitraversableEither = new Data_Bitraversable.Bitraversable(function () {
                return bifoldableEither;
            }, function () {
                return bifunctorEither;
            }, function (dictApplicative) {
                return function (v) {
                    if (v instanceof Left) {
                        return Data_Functor.map(dictApplicative.Apply0().Functor0())(Left.create)(v.value0);
                    };
                    if (v instanceof Right) {
                        return Data_Functor.map(dictApplicative.Apply0().Functor0())(Right.create)(v.value0);
                    };
                    throw new Error("Failed pattern match at Data.Either line 206, column 1 - line 206, column 53: " + [v.constructor.name]);
                };
            }, function (dictApplicative) {
                return function (v) {
                    return function (v1) {
                        return function (v2) {
                            if (v2 instanceof Left) {
                                return Data_Functor.map(dictApplicative.Apply0().Functor0())(Left.create)(v(v2.value0));
                            };
                            if (v2 instanceof Right) {
                                return Data_Functor.map(dictApplicative.Apply0().Functor0())(Right.create)(v1(v2.value0));
                            };
                            throw new Error("Failed pattern match at Data.Either line 206, column 1 - line 206, column 53: " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
                        };
                    };
                };
            });
            var applyEither = new Control_Apply.Apply(function () {
                return functorEither;
            }, function (v) {
                return function (v1) {
                    if (v instanceof Left) {
                        return new Left(v.value0);
                    };
                    if (v instanceof Right) {
                        return Data_Functor.map(functorEither)(v.value0)(v1);
                    };
                    throw new Error("Failed pattern match at Data.Either line 79, column 1 - line 79, column 41: " + [v.constructor.name, v1.constructor.name]);
                };
            });
            var bindEither = new Control_Bind.Bind(function () {
                return applyEither;
            }, either(function (e) {
                return function (v) {
                    return new Left(e);
                };
            })(function (a) {
                return function (f) {
                    return f(a);
                };
            }));
            var semigroupEither = function semigroupEither(dictSemigroup) {
                return new Data_Semigroup.Semigroup(function (x) {
                    return function (y) {
                        return Control_Apply.apply(applyEither)(Data_Functor.map(functorEither)(Data_Semigroup.append(dictSemigroup))(x))(y);
                    };
                });
            };
            var semiringEither = function semiringEither(dictSemiring) {
                return new Data_Semiring.Semiring(function (x) {
                    return function (y) {
                        return Control_Apply.apply(applyEither)(Data_Functor.map(functorEither)(Data_Semiring.add(dictSemiring))(x))(y);
                    };
                }, function (x) {
                    return function (y) {
                        return Control_Apply.apply(applyEither)(Data_Functor.map(functorEither)(Data_Semiring.mul(dictSemiring))(x))(y);
                    };
                }, new Right(Data_Semiring.one(dictSemiring)), new Right(Data_Semiring.zero(dictSemiring)));
            };
            var applicativeEither = new Control_Applicative.Applicative(function () {
                return applyEither;
            }, Right.create);
            var monadEither = new Control_Monad.Monad(function () {
                return applicativeEither;
            }, function () {
                return bindEither;
            });
            var altEither = new Control_Alt.Alt(function () {
                return functorEither;
            }, function (v) {
                return function (v1) {
                    if (v instanceof Left) {
                        return v1;
                    };
                    return v;
                };
            });
            module.exports = {
                Left: Left,
                Right: Right,
                either: either,
                choose: choose,
                isLeft: isLeft,
                isRight: isRight,
                fromLeft: fromLeft,
                fromRight: fromRight,
                note: note,
                hush: hush,
                functorEither: functorEither,
                invariantEither: invariantEither,
                bifunctorEither: bifunctorEither,
                applyEither: applyEither,
                applicativeEither: applicativeEither,
                altEither: altEither,
                bindEither: bindEither,
                monadEither: monadEither,
                extendEither: extendEither,
                showEither: showEither,
                eqEither: eqEither,
                eq1Either: eq1Either,
                ordEither: ordEither,
                ord1Either: ord1Either,
                boundedEither: boundedEither,
                foldableEither: foldableEither,
                bifoldableEither: bifoldableEither,
                traversableEither: traversableEither,
                bitraversableEither: bitraversableEither,
                semiringEither: semiringEither,
                semigroupEither: semigroupEither
            };

            /***/
        },
        /* 101 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            // module Partial.Unsafe

            exports.unsafePartial = function (f) {
                return f();
            };

            /***/
        },
        /* 102 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var $foreign = __webpack_require__(103);
            var crash = function crash(dictPartial) {
                return $foreign.crashWith(dictPartial)("Partial.crash: partial function");
            };
            module.exports = {
                crash: crash,
                crashWith: $foreign.crashWith
            };

            /***/
        },
        /* 103 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            // module Partial

            exports.crashWith = function () {
                return function (msg) {
                    throw new Error(msg);
                };
            };

            /***/
        },
        /* 104 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            exports.runSTArray = function (f) {
                return f;
            };

            exports.emptySTArray = function () {
                return [];
            };

            exports.peekSTArrayImpl = function (just) {
                return function (nothing) {
                    return function (xs) {
                        return function (i) {
                            return function () {
                                return i >= 0 && i < xs.length ? just(xs[i]) : nothing;
                            };
                        };
                    };
                };
            };

            exports.pokeSTArray = function (xs) {
                return function (i) {
                    return function (a) {
                        return function () {
                            var ret = i >= 0 && i < xs.length;
                            if (ret) xs[i] = a;
                            return ret;
                        };
                    };
                };
            };

            exports.pushAllSTArray = function (xs) {
                return function (as) {
                    return function () {
                        return xs.push.apply(xs, as);
                    };
                };
            };

            exports.spliceSTArray = function (xs) {
                return function (i) {
                    return function (howMany) {
                        return function (bs) {
                            return function () {
                                return xs.splice.apply(xs, [i, howMany].concat(bs));
                            };
                        };
                    };
                };
            };

            exports.copyImpl = function (xs) {
                return function () {
                    return xs.slice();
                };
            };

            exports.toAssocArray = function (xs) {
                return function () {
                    var n = xs.length;
                    var as = new Array(n);
                    for (var i = 0; i < n; i++) {
                        as[i] = { value: xs[i], index: i };
                    }return as;
                };
            };

            /***/
        },
        /* 105 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var $foreign = __webpack_require__(106);
            module.exports = {
                unsafeCoerce: $foreign.unsafeCoerce
            };

            /***/
        },
        /* 106 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            // module Unsafe.Coerce

            exports.unsafeCoerce = function (x) {
                return x;
            };

            /***/
        },
        /* 107 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var Control_Applicative = __webpack_require__(3);
            var Control_Bind = __webpack_require__(8);
            var Control_Monad_Eff = __webpack_require__(31);
            var Control_Monad_ST = __webpack_require__(79);
            var Control_Semigroupoid = __webpack_require__(20);
            var Data_Array_ST = __webpack_require__(91);
            var Data_Function = __webpack_require__(14);
            var Data_Functor = __webpack_require__(0);
            var Data_HeytingAlgebra = __webpack_require__(21);
            var Data_Maybe = __webpack_require__(28);
            var Data_Semiring = __webpack_require__(9);
            var Prelude = __webpack_require__(5);
            var Iterator = function () {
                function Iterator(value0, value1) {
                    this.value0 = value0;
                    this.value1 = value1;
                };
                Iterator.create = function (value0) {
                    return function (value1) {
                        return new Iterator(value0, value1);
                    };
                };
                return Iterator;
            }();
            var peek = function peek(v) {
                return function () {
                    function __do() {
                        var v1 = Control_Monad_ST.readSTRef(v.value1)();
                        return v.value0(v1);
                    }

                    return __do;
                }();
            };
            var next = function next(v) {
                return function () {
                    function __do() {
                        var v1 = Control_Monad_ST.readSTRef(v.value1)();
                        var v2 = Control_Monad_ST.modifySTRef(v.value1)(function (v2) {
                            return v2 + 1 | 0;
                        })();
                        return v.value0(v1);
                    }

                    return __do;
                }();
            };
            var pushWhile = function pushWhile(p) {
                return function (iter) {
                    return function (array) {
                        return function () {
                            function __do() {
                                var v = Control_Monad_ST.newSTRef(false)();
                                while (Data_Functor.map(Control_Monad_Eff.functorEff)(Data_HeytingAlgebra.not(Data_HeytingAlgebra.heytingAlgebraBoolean))(Control_Monad_ST.readSTRef(v))()) {
                                    (function () {
                                        function __do() {
                                            var v1 = peek(iter)();
                                            if (v1 instanceof Data_Maybe.Just && p(v1.value0)) {
                                                var v2 = Data_Array_ST.pushSTArray(array)(v1.value0)();
                                                return Data_Functor["void"](Control_Monad_Eff.functorEff)(next(iter))();
                                            };
                                            return Data_Functor["void"](Control_Monad_Eff.functorEff)(Control_Monad_ST.writeSTRef(v)(true))();
                                        }

                                        return __do;
                                    })()();
                                };
                                return {};
                            }

                            return __do;
                        }();
                    };
                };
            };
            var pushAll = pushWhile(Data_Function["const"](true));
            var iterator = function iterator(f) {
                return Data_Functor.map(Control_Monad_Eff.functorEff)(Iterator.create(f))(Control_Monad_ST.newSTRef(0));
            };
            var iterate = function iterate(iter) {
                return function (f) {
                    return function () {
                        function __do() {
                            var v = Control_Monad_ST.newSTRef(false)();
                            while (Data_Functor.map(Control_Monad_Eff.functorEff)(Data_HeytingAlgebra.not(Data_HeytingAlgebra.heytingAlgebraBoolean))(Control_Monad_ST.readSTRef(v))()) {
                                (function () {
                                    function __do() {
                                        var v1 = next(iter)();
                                        if (v1 instanceof Data_Maybe.Just) {
                                            return f(v1.value0)();
                                        };
                                        if (v1 instanceof Data_Maybe.Nothing) {
                                            return Data_Functor["void"](Control_Monad_Eff.functorEff)(Control_Monad_ST.writeSTRef(v)(true))();
                                        };
                                        throw new Error("Failed pattern match at Data.Array.ST.Iterator line 39, column 5 - line 41, column 46: " + [v1.constructor.name]);
                                    }

                                    return __do;
                                })()();
                            };
                            return {};
                        }

                        return __do;
                    }();
                };
            };
            var exhausted = function exhausted($27) {
                return Data_Functor.map(Control_Monad_Eff.functorEff)(Data_Maybe.isNothing)(peek($27));
            };
            module.exports = {
                iterator: iterator,
                iterate: iterate,
                next: next,
                peek: peek,
                exhausted: exhausted,
                pushWhile: pushWhile,
                pushAll: pushAll
            };

            /***/
        },
        /* 108 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var Control_Alt = __webpack_require__(23);
            var Control_Alternative = __webpack_require__(35);
            var Control_Applicative = __webpack_require__(3);
            var Control_Apply = __webpack_require__(2);
            var Control_Category = __webpack_require__(13);
            var Control_Plus = __webpack_require__(27);
            var Control_Semigroupoid = __webpack_require__(20);
            var Data_Eq = __webpack_require__(6);
            var Data_Foldable = __webpack_require__(70);
            var Data_FoldableWithIndex = __webpack_require__(92);
            var Data_Functor = __webpack_require__(0);
            var Data_FunctorWithIndex = __webpack_require__(83);
            var Data_HeytingAlgebra = __webpack_require__(21);
            var Data_Maybe = __webpack_require__(28);
            var Data_Ord = __webpack_require__(10);
            var Data_Ordering = __webpack_require__(19);
            var Data_Semigroup = __webpack_require__(4);
            var Data_Semigroup_Foldable = __webpack_require__(110);
            var Data_Show = __webpack_require__(7);
            var Data_Traversable = __webpack_require__(68);
            var Data_TraversableWithIndex = __webpack_require__(111);
            var Prelude = __webpack_require__(5);
            var NonEmpty = function () {
                function NonEmpty(value0, value1) {
                    this.value0 = value0;
                    this.value1 = value1;
                };
                NonEmpty.create = function (value0) {
                    return function (value1) {
                        return new NonEmpty(value0, value1);
                    };
                };
                return NonEmpty;
            }();
            var tail = function tail(v) {
                return v.value1;
            };
            var singleton = function singleton(dictPlus) {
                return function (a) {
                    return new NonEmpty(a, Control_Plus.empty(dictPlus));
                };
            };
            var showNonEmpty = function showNonEmpty(dictShow) {
                return function (dictShow1) {
                    return new Data_Show.Show(function (v) {
                        return "(NonEmpty " + (Data_Show.show(dictShow)(v.value0) + (" " + (Data_Show.show(dictShow1)(v.value1) + ")")));
                    });
                };
            };
            var oneOf = function oneOf(dictAlternative) {
                return function (v) {
                    return Control_Alt.alt(dictAlternative.Plus1().Alt0())(Control_Applicative.pure(dictAlternative.Applicative0())(v.value0))(v.value1);
                };
            };
            var head = function head(v) {
                return v.value0;
            };
            var functorNonEmpty = function functorNonEmpty(dictFunctor) {
                return new Data_Functor.Functor(function (f) {
                    return function (v) {
                        return new NonEmpty(f(v.value0), Data_Functor.map(dictFunctor)(f)(v.value1));
                    };
                });
            };
            var functorWithIndex = function functorWithIndex(dictFunctorWithIndex) {
                return new Data_FunctorWithIndex.FunctorWithIndex(function () {
                    return functorNonEmpty(dictFunctorWithIndex.Functor0());
                }, function (f) {
                    return function (v) {
                        return new NonEmpty(f(Data_Maybe.Nothing.value)(v.value0), Data_FunctorWithIndex.mapWithIndex(dictFunctorWithIndex)(function ($139) {
                            return f(Data_Maybe.Just.create($139));
                        })(v.value1));
                    };
                });
            };
            var fromNonEmpty = function fromNonEmpty(f) {
                return function (v) {
                    return f(v.value0)(v.value1);
                };
            };
            var foldl1 = function foldl1(dictFoldable) {
                return function (f) {
                    return function (v) {
                        return Data_Foldable.foldl(dictFoldable)(f)(v.value0)(v.value1);
                    };
                };
            };
            var foldableNonEmpty = function foldableNonEmpty(dictFoldable) {
                return new Data_Foldable.Foldable(function (dictMonoid) {
                    return function (f) {
                        return function (v) {
                            return Data_Semigroup.append(dictMonoid.Semigroup0())(f(v.value0))(Data_Foldable.foldMap(dictFoldable)(dictMonoid)(f)(v.value1));
                        };
                    };
                }, function (f) {
                    return function (b) {
                        return function (v) {
                            return Data_Foldable.foldl(dictFoldable)(f)(f(b)(v.value0))(v.value1);
                        };
                    };
                }, function (f) {
                    return function (b) {
                        return function (v) {
                            return f(v.value0)(Data_Foldable.foldr(dictFoldable)(f)(b)(v.value1));
                        };
                    };
                });
            };
            var foldableWithIndexNonEmpty = function foldableWithIndexNonEmpty(dictFoldableWithIndex) {
                return new Data_FoldableWithIndex.FoldableWithIndex(function () {
                    return foldableNonEmpty(dictFoldableWithIndex.Foldable0());
                }, function (dictMonoid) {
                    return function (f) {
                        return function (v) {
                            return Data_Semigroup.append(dictMonoid.Semigroup0())(f(Data_Maybe.Nothing.value)(v.value0))(Data_FoldableWithIndex.foldMapWithIndex(dictFoldableWithIndex)(dictMonoid)(function ($140) {
                                return f(Data_Maybe.Just.create($140));
                            })(v.value1));
                        };
                    };
                }, function (f) {
                    return function (b) {
                        return function (v) {
                            return Data_FoldableWithIndex.foldlWithIndex(dictFoldableWithIndex)(function ($141) {
                                return f(Data_Maybe.Just.create($141));
                            })(f(Data_Maybe.Nothing.value)(b)(v.value0))(v.value1);
                        };
                    };
                }, function (f) {
                    return function (b) {
                        return function (v) {
                            return f(Data_Maybe.Nothing.value)(v.value0)(Data_FoldableWithIndex.foldrWithIndex(dictFoldableWithIndex)(function ($142) {
                                return f(Data_Maybe.Just.create($142));
                            })(b)(v.value1));
                        };
                    };
                });
            };
            var traversableNonEmpty = function traversableNonEmpty(dictTraversable) {
                return new Data_Traversable.Traversable(function () {
                    return foldableNonEmpty(dictTraversable.Foldable1());
                }, function () {
                    return functorNonEmpty(dictTraversable.Functor0());
                }, function (dictApplicative) {
                    return function (v) {
                        return Control_Apply.apply(dictApplicative.Apply0())(Data_Functor.map(dictApplicative.Apply0().Functor0())(NonEmpty.create)(v.value0))(Data_Traversable.sequence(dictTraversable)(dictApplicative)(v.value1));
                    };
                }, function (dictApplicative) {
                    return function (f) {
                        return function (v) {
                            return Control_Apply.apply(dictApplicative.Apply0())(Data_Functor.map(dictApplicative.Apply0().Functor0())(NonEmpty.create)(f(v.value0)))(Data_Traversable.traverse(dictTraversable)(dictApplicative)(f)(v.value1));
                        };
                    };
                });
            };
            var traversableWithIndexNonEmpty = function traversableWithIndexNonEmpty(dictTraversableWithIndex) {
                return new Data_TraversableWithIndex.TraversableWithIndex(function () {
                    return foldableWithIndexNonEmpty(dictTraversableWithIndex.FoldableWithIndex1());
                }, function () {
                    return functorWithIndex(dictTraversableWithIndex.FunctorWithIndex0());
                }, function () {
                    return traversableNonEmpty(dictTraversableWithIndex.Traversable2());
                }, function (dictApplicative) {
                    return function (f) {
                        return function (v) {
                            return Control_Apply.apply(dictApplicative.Apply0())(Data_Functor.map(dictApplicative.Apply0().Functor0())(NonEmpty.create)(f(Data_Maybe.Nothing.value)(v.value0)))(Data_TraversableWithIndex.traverseWithIndex(dictTraversableWithIndex)(dictApplicative)(function ($143) {
                                return f(Data_Maybe.Just.create($143));
                            })(v.value1));
                        };
                    };
                });
            };
            var foldable1NonEmpty = function foldable1NonEmpty(dictFoldable) {
                return new Data_Semigroup_Foldable.Foldable1(function () {
                    return foldableNonEmpty(dictFoldable);
                }, function (dictSemigroup) {
                    return foldMap1(dictSemigroup)(dictFoldable)(Control_Category.id(Control_Category.categoryFn));
                }, function (dictSemigroup) {
                    return function (f) {
                        return function (v) {
                            return Data_Foldable.foldl(dictFoldable)(function (s) {
                                return function (a1) {
                                    return Data_Semigroup.append(dictSemigroup)(s)(f(a1));
                                };
                            })(f(v.value0))(v.value1);
                        };
                    };
                });
            };
            var foldMap1 = function foldMap1(dictSemigroup) {
                return function (dictFoldable) {
                    return Data_Semigroup_Foldable.foldMap1(foldable1NonEmpty(dictFoldable))(dictSemigroup);
                };
            };
            var fold1 = function fold1(dictSemigroup) {
                return function (dictFoldable) {
                    return Data_Semigroup_Foldable.fold1(foldable1NonEmpty(dictFoldable))(dictSemigroup);
                };
            };
            var eq1NonEmpty = function eq1NonEmpty(dictEq1) {
                return new Data_Eq.Eq1(function (dictEq) {
                    return function (v) {
                        return function (v1) {
                            return Data_Eq.eq(dictEq)(v.value0)(v1.value0) && Data_Eq.eq1(dictEq1)(dictEq)(v.value1)(v1.value1);
                        };
                    };
                });
            };
            var eqNonEmpty = function eqNonEmpty(dictEq1) {
                return function (dictEq) {
                    return new Data_Eq.Eq(Data_Eq.eq1(eq1NonEmpty(dictEq1))(dictEq));
                };
            };
            var ord1NonEmpty = function ord1NonEmpty(dictOrd1) {
                return new Data_Ord.Ord1(function () {
                    return eq1NonEmpty(dictOrd1.Eq10());
                }, function (dictOrd) {
                    return function (v) {
                        return function (v1) {
                            var v2 = Data_Ord.compare(dictOrd)(v.value0)(v1.value0);
                            if (v2 instanceof Data_Ordering.EQ) {
                                return Data_Ord.compare1(dictOrd1)(dictOrd)(v.value1)(v1.value1);
                            };
                            return v2;
                        };
                    };
                });
            };
            var ordNonEmpty = function ordNonEmpty(dictOrd1) {
                return function (dictOrd) {
                    return new Data_Ord.Ord(function () {
                        return eqNonEmpty(dictOrd1.Eq10())(dictOrd.Eq0());
                    }, Data_Ord.compare1(ord1NonEmpty(dictOrd1))(dictOrd));
                };
            };
            module.exports = {
                NonEmpty: NonEmpty,
                singleton: singleton,
                foldl1: foldl1,
                foldMap1: foldMap1,
                fold1: fold1,
                fromNonEmpty: fromNonEmpty,
                oneOf: oneOf,
                head: head,
                tail: tail,
                showNonEmpty: showNonEmpty,
                eqNonEmpty: eqNonEmpty,
                eq1NonEmpty: eq1NonEmpty,
                ordNonEmpty: ordNonEmpty,
                ord1NonEmpty: ord1NonEmpty,
                functorNonEmpty: functorNonEmpty,
                functorWithIndex: functorWithIndex,
                foldableNonEmpty: foldableNonEmpty,
                foldableWithIndexNonEmpty: foldableWithIndexNonEmpty,
                traversableNonEmpty: traversableNonEmpty,
                traversableWithIndexNonEmpty: traversableWithIndexNonEmpty,
                foldable1NonEmpty: foldable1NonEmpty
            };

            /***/
        },
        /* 109 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            exports.mapWithIndexArray = function (f) {
                return function (xs) {
                    var l = xs.length;
                    var result = Array(l);
                    for (var i = 0; i < l; i++) {
                        result[i] = f(i)(xs[i]);
                    }
                    return result;
                };
            };

            /***/
        },
        /* 110 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var Control_Apply = __webpack_require__(2);
            var Control_Category = __webpack_require__(13);
            var Control_Semigroupoid = __webpack_require__(20);
            var Data_Foldable = __webpack_require__(70);
            var Data_Function = __webpack_require__(14);
            var Data_Functor = __webpack_require__(0);
            var Data_Monoid_Dual = __webpack_require__(41);
            var Data_Monoid_Multiplicative = __webpack_require__(42);
            var Data_Semigroup = __webpack_require__(4);
            var Data_Unit = __webpack_require__(1);
            var Prelude = __webpack_require__(5);
            var Act = function Act(x) {
                return x;
            };
            var Foldable1 = function Foldable1(Foldable0, fold1, foldMap1) {
                this.Foldable0 = Foldable0;
                this.fold1 = fold1;
                this.foldMap1 = foldMap1;
            };
            var semigroupAct = function semigroupAct(dictApply) {
                return new Data_Semigroup.Semigroup(function (v) {
                    return function (v1) {
                        return Control_Apply.applySecond(dictApply)(v)(v1);
                    };
                });
            };
            var getAct = function getAct(v) {
                return v;
            };
            var foldMap1 = function foldMap1(dict) {
                return dict.foldMap1;
            };
            var traverse1_ = function traverse1_(dictFoldable1) {
                return function (dictApply) {
                    return function (f) {
                        return function (t) {
                            return Data_Functor.voidRight(dictApply.Functor0())(Data_Unit.unit)(getAct(foldMap1(dictFoldable1)(semigroupAct(dictApply))(function ($28) {
                                return Act(f($28));
                            })(t)));
                        };
                    };
                };
            };
            var for1_ = function for1_(dictFoldable1) {
                return function (dictApply) {
                    return Data_Function.flip(traverse1_(dictFoldable1)(dictApply));
                };
            };
            var sequence1_ = function sequence1_(dictFoldable1) {
                return function (dictApply) {
                    return traverse1_(dictFoldable1)(dictApply)(Control_Category.id(Control_Category.categoryFn));
                };
            };
            var fold1Default = function fold1Default(dictFoldable1) {
                return function (dictSemigroup) {
                    return foldMap1(dictFoldable1)(dictSemigroup)(Control_Category.id(Control_Category.categoryFn));
                };
            };
            var foldableDual = new Foldable1(function () {
                return Data_Foldable.foldableDual;
            }, function (dictSemigroup) {
                return fold1Default(foldableDual)(dictSemigroup);
            }, function (dictSemigroup) {
                return function (f) {
                    return function (v) {
                        return f(v);
                    };
                };
            });
            var foldableMultiplicative = new Foldable1(function () {
                return Data_Foldable.foldableMultiplicative;
            }, function (dictSemigroup) {
                return fold1Default(foldableMultiplicative)(dictSemigroup);
            }, function (dictSemigroup) {
                return function (f) {
                    return function (v) {
                        return f(v);
                    };
                };
            });
            var fold1 = function fold1(dict) {
                return dict.fold1;
            };
            var foldMap1Default = function foldMap1Default(dictFoldable1) {
                return function (dictFunctor) {
                    return function (dictSemigroup) {
                        return function (f) {
                            return function ($29) {
                                return fold1(dictFoldable1)(dictSemigroup)(Data_Functor.map(dictFunctor)(f)($29));
                            };
                        };
                    };
                };
            };
            module.exports = {
                Foldable1: Foldable1,
                foldMap1: foldMap1,
                fold1: fold1,
                traverse1_: traverse1_,
                for1_: for1_,
                sequence1_: sequence1_,
                foldMap1Default: foldMap1Default,
                fold1Default: fold1Default,
                foldableDual: foldableDual,
                foldableMultiplicative: foldableMultiplicative
            };

            /***/
        },
        /* 111 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var Control_Semigroupoid = __webpack_require__(20);
            var Data_FoldableWithIndex = __webpack_require__(92);
            var Data_Function = __webpack_require__(14);
            var Data_FunctorWithIndex = __webpack_require__(83);
            var Data_Maybe = __webpack_require__(28);
            var Data_Maybe_First = __webpack_require__(36);
            var Data_Maybe_Last = __webpack_require__(37);
            var Data_Monoid_Additive = __webpack_require__(38);
            var Data_Monoid_Conj = __webpack_require__(39);
            var Data_Monoid_Disj = __webpack_require__(40);
            var Data_Monoid_Dual = __webpack_require__(41);
            var Data_Monoid_Multiplicative = __webpack_require__(42);
            var Data_Traversable = __webpack_require__(68);
            var Data_Traversable_Accum = __webpack_require__(43);
            var Data_Traversable_Accum_Internal = __webpack_require__(75);
            var Data_Unit = __webpack_require__(1);
            var Prelude = __webpack_require__(5);
            var TraversableWithIndex = function TraversableWithIndex(FoldableWithIndex1, FunctorWithIndex0, Traversable2, traverseWithIndex) {
                this.FoldableWithIndex1 = FoldableWithIndex1;
                this.FunctorWithIndex0 = FunctorWithIndex0;
                this.Traversable2 = Traversable2;
                this.traverseWithIndex = traverseWithIndex;
            };
            var traverseWithIndexDefault = function traverseWithIndexDefault(dictTraversableWithIndex) {
                return function (dictApplicative) {
                    return function (f) {
                        return function ($17) {
                            return Data_Traversable.sequence(dictTraversableWithIndex.Traversable2())(dictApplicative)(Data_FunctorWithIndex.mapWithIndex(dictTraversableWithIndex.FunctorWithIndex0())(f)($17));
                        };
                    };
                };
            };
            var traverseWithIndex = function traverseWithIndex(dict) {
                return dict.traverseWithIndex;
            };
            var traversableWithIndexMultiplicative = new TraversableWithIndex(function () {
                return Data_FoldableWithIndex.foldableWithIndexMultiplicative;
            }, function () {
                return Data_FunctorWithIndex.functorWithIndexMultiplicative;
            }, function () {
                return Data_Traversable.traversableMultiplicative;
            }, function (dictApplicative) {
                return function (f) {
                    return Data_Traversable.traverse(Data_Traversable.traversableMultiplicative)(dictApplicative)(f(Data_Unit.unit));
                };
            });
            var traversableWithIndexMaybe = new TraversableWithIndex(function () {
                return Data_FoldableWithIndex.foldableWithIndexMaybe;
            }, function () {
                return Data_FunctorWithIndex.functorWithIndexMaybe;
            }, function () {
                return Data_Traversable.traversableMaybe;
            }, function (dictApplicative) {
                return function (f) {
                    return Data_Traversable.traverse(Data_Traversable.traversableMaybe)(dictApplicative)(f(Data_Unit.unit));
                };
            });
            var traversableWithIndexLast = new TraversableWithIndex(function () {
                return Data_FoldableWithIndex.foldableWithIndexLast;
            }, function () {
                return Data_FunctorWithIndex.functorWithIndexLast;
            }, function () {
                return Data_Traversable.traversableLast;
            }, function (dictApplicative) {
                return function (f) {
                    return Data_Traversable.traverse(Data_Traversable.traversableLast)(dictApplicative)(f(Data_Unit.unit));
                };
            });
            var traversableWithIndexFirst = new TraversableWithIndex(function () {
                return Data_FoldableWithIndex.foldableWithIndexFirst;
            }, function () {
                return Data_FunctorWithIndex.functorWithIndexFirst;
            }, function () {
                return Data_Traversable.traversableFirst;
            }, function (dictApplicative) {
                return function (f) {
                    return Data_Traversable.traverse(Data_Traversable.traversableFirst)(dictApplicative)(f(Data_Unit.unit));
                };
            });
            var traversableWithIndexDual = new TraversableWithIndex(function () {
                return Data_FoldableWithIndex.foldableWithIndexDual;
            }, function () {
                return Data_FunctorWithIndex.functorWithIndexDual;
            }, function () {
                return Data_Traversable.traversableDual;
            }, function (dictApplicative) {
                return function (f) {
                    return Data_Traversable.traverse(Data_Traversable.traversableDual)(dictApplicative)(f(Data_Unit.unit));
                };
            });
            var traversableWithIndexDisj = new TraversableWithIndex(function () {
                return Data_FoldableWithIndex.foldableWithIndexDisj;
            }, function () {
                return Data_FunctorWithIndex.functorWithIndexDisj;
            }, function () {
                return Data_Traversable.traversableDisj;
            }, function (dictApplicative) {
                return function (f) {
                    return Data_Traversable.traverse(Data_Traversable.traversableDisj)(dictApplicative)(f(Data_Unit.unit));
                };
            });
            var traversableWithIndexConj = new TraversableWithIndex(function () {
                return Data_FoldableWithIndex.foldableWithIndexConj;
            }, function () {
                return Data_FunctorWithIndex.functorWithIndexConj;
            }, function () {
                return Data_Traversable.traversableConj;
            }, function (dictApplicative) {
                return function (f) {
                    return Data_Traversable.traverse(Data_Traversable.traversableConj)(dictApplicative)(f(Data_Unit.unit));
                };
            });
            var traversableWithIndexArray = new TraversableWithIndex(function () {
                return Data_FoldableWithIndex.foldableWithIndexArray;
            }, function () {
                return Data_FunctorWithIndex.functorWithIndexArray;
            }, function () {
                return Data_Traversable.traversableArray;
            }, function (dictApplicative) {
                return traverseWithIndexDefault(traversableWithIndexArray)(dictApplicative);
            });
            var traversableWithIndexAdditive = new TraversableWithIndex(function () {
                return Data_FoldableWithIndex.foldableWithIndexAdditive;
            }, function () {
                return Data_FunctorWithIndex.functorWithIndexAdditive;
            }, function () {
                return Data_Traversable.traversableAdditive;
            }, function (dictApplicative) {
                return function (f) {
                    return Data_Traversable.traverse(Data_Traversable.traversableAdditive)(dictApplicative)(f(Data_Unit.unit));
                };
            });
            var mapAccumRWithIndex = function mapAccumRWithIndex(dictTraversableWithIndex) {
                return function (f) {
                    return function (s0) {
                        return function (xs) {
                            return Data_Traversable_Accum_Internal.stateR(traverseWithIndex(dictTraversableWithIndex)(Data_Traversable_Accum_Internal.applicativeStateR)(function (i) {
                                return function (a) {
                                    return function (s) {
                                        return f(i)(s)(a);
                                    };
                                };
                            })(xs))(s0);
                        };
                    };
                };
            };
            var scanrWithIndex = function scanrWithIndex(dictTraversableWithIndex) {
                return function (f) {
                    return function (b0) {
                        return function (xs) {
                            return mapAccumRWithIndex(dictTraversableWithIndex)(function (i) {
                                return function (b) {
                                    return function (a) {
                                        var b$prime = f(i)(a)(b);
                                        return {
                                            accum: b$prime,
                                            value: b$prime
                                        };
                                    };
                                };
                            })(b0)(xs).value;
                        };
                    };
                };
            };
            var mapAccumLWithIndex = function mapAccumLWithIndex(dictTraversableWithIndex) {
                return function (f) {
                    return function (s0) {
                        return function (xs) {
                            return Data_Traversable_Accum_Internal.stateL(traverseWithIndex(dictTraversableWithIndex)(Data_Traversable_Accum_Internal.applicativeStateL)(function (i) {
                                return function (a) {
                                    return function (s) {
                                        return f(i)(s)(a);
                                    };
                                };
                            })(xs))(s0);
                        };
                    };
                };
            };
            var scanlWithIndex = function scanlWithIndex(dictTraversableWithIndex) {
                return function (f) {
                    return function (b0) {
                        return function (xs) {
                            return mapAccumLWithIndex(dictTraversableWithIndex)(function (i) {
                                return function (b) {
                                    return function (a) {
                                        var b$prime = f(i)(b)(a);
                                        return {
                                            accum: b$prime,
                                            value: b$prime
                                        };
                                    };
                                };
                            })(b0)(xs).value;
                        };
                    };
                };
            };
            var forWithIndex = function forWithIndex(dictApplicative) {
                return function (dictTraversableWithIndex) {
                    return Data_Function.flip(traverseWithIndex(dictTraversableWithIndex)(dictApplicative));
                };
            };
            module.exports = {
                TraversableWithIndex: TraversableWithIndex,
                traverseWithIndex: traverseWithIndex,
                traverseWithIndexDefault: traverseWithIndexDefault,
                forWithIndex: forWithIndex,
                scanlWithIndex: scanlWithIndex,
                mapAccumLWithIndex: mapAccumLWithIndex,
                scanrWithIndex: scanrWithIndex,
                mapAccumRWithIndex: mapAccumRWithIndex,
                traversableWithIndexArray: traversableWithIndexArray,
                traversableWithIndexMaybe: traversableWithIndexMaybe,
                traversableWithIndexFirst: traversableWithIndexFirst,
                traversableWithIndexLast: traversableWithIndexLast,
                traversableWithIndexAdditive: traversableWithIndexAdditive,
                traversableWithIndexDual: traversableWithIndexDual,
                traversableWithIndexConj: traversableWithIndexConj,
                traversableWithIndexDisj: traversableWithIndexDisj,
                traversableWithIndexMultiplicative: traversableWithIndexMultiplicative
            };

            /***/
        },
        /* 112 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var Control_Category = __webpack_require__(13);
            var Control_Semigroupoid = __webpack_require__(20);
            var Data_Function = __webpack_require__(14);
            var Data_Functor = __webpack_require__(0);
            var Data_Identity = __webpack_require__(90);
            var Data_Newtype = __webpack_require__(18);
            var Prelude = __webpack_require__(5);
            var Distributive = function Distributive(Functor0, collect, distribute) {
                this.Functor0 = Functor0;
                this.collect = collect;
                this.distribute = distribute;
            };
            var distributiveIdentity = new Distributive(function () {
                return Data_Identity.functorIdentity;
            }, function (dictFunctor) {
                return function (f) {
                    return function ($11) {
                        return Data_Identity.Identity(Data_Functor.map(dictFunctor)(function ($12) {
                            return Data_Newtype.unwrap(Data_Identity.newtypeIdentity)(f($12));
                        })($11));
                    };
                };
            }, function (dictFunctor) {
                return function ($13) {
                    return Data_Identity.Identity(Data_Functor.map(dictFunctor)(Data_Newtype.unwrap(Data_Identity.newtypeIdentity))($13));
                };
            });
            var distribute = function distribute(dict) {
                return dict.distribute;
            };
            var distributiveFunction = new Distributive(function () {
                return Data_Functor.functorFn;
            }, function (dictFunctor) {
                return function (f) {
                    return function ($14) {
                        return distribute(distributiveFunction)(dictFunctor)(Data_Functor.map(dictFunctor)(f)($14));
                    };
                };
            }, function (dictFunctor) {
                return function (a) {
                    return function (e) {
                        return Data_Functor.map(dictFunctor)(function (v) {
                            return v(e);
                        })(a);
                    };
                };
            });
            var cotraverse = function cotraverse(dictDistributive) {
                return function (dictFunctor) {
                    return function (f) {
                        return function ($15) {
                            return Data_Functor.map(dictDistributive.Functor0())(f)(distribute(dictDistributive)(dictFunctor)($15));
                        };
                    };
                };
            };
            var collectDefault = function collectDefault(dictDistributive) {
                return function (dictFunctor) {
                    return function (f) {
                        return function ($16) {
                            return distribute(dictDistributive)(dictFunctor)(Data_Functor.map(dictFunctor)(f)($16));
                        };
                    };
                };
            };
            var collect = function collect(dict) {
                return dict.collect;
            };
            var distributeDefault = function distributeDefault(dictDistributive) {
                return function (dictFunctor) {
                    return collect(dictDistributive)(dictFunctor)(Control_Category.id(Control_Category.categoryFn));
                };
            };
            module.exports = {
                collect: collect,
                distribute: distribute,
                Distributive: Distributive,
                distributeDefault: distributeDefault,
                collectDefault: collectDefault,
                cotraverse: cotraverse,
                distributiveIdentity: distributiveIdentity,
                distributiveFunction: distributiveFunction
            };

            /***/
        },
        /* 113 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var TypeEquals = function TypeEquals(from, to) {
                this.from = from;
                this.to = to;
            };
            var to = function to(dict) {
                return dict.to;
            };
            var refl = new TypeEquals(function (a) {
                return a;
            }, function (a) {
                return a;
            });
            var from = function from(dict) {
                return dict.from;
            };
            module.exports = {
                TypeEquals: TypeEquals,
                to: to,
                from: from,
                refl: refl
            };

            /***/
        },
        /* 114 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";
            // Generated by purs version 0.11.7


            var $foreign = __webpack_require__(115);
            var Data_Function = __webpack_require__(14);
            var Data_Functor = __webpack_require__(0);
            var Data_Maybe = __webpack_require__(28);
            var Data_Ord = __webpack_require__(10);
            var Data_Ring = __webpack_require__(22);
            var Data_Semiring = __webpack_require__(9);
            var Data_Traversable = __webpack_require__(68);
            var Data_Tuple = __webpack_require__(93);
            var Data_Unit = __webpack_require__(1);
            var Partial_Unsafe = __webpack_require__(80);
            var Prelude = __webpack_require__(5);
            var Unfoldable = function Unfoldable(unfoldr) {
                this.unfoldr = unfoldr;
            };
            var unfoldr = function unfoldr(dict) {
                return dict.unfoldr;
            };
            var unfoldableArray = new Unfoldable($foreign.unfoldrArrayImpl(Data_Maybe.isNothing)(Data_Maybe.fromJust())(Data_Tuple.fst)(Data_Tuple.snd));
            var replicate = function replicate(dictUnfoldable) {
                return function (n) {
                    return function (v) {
                        var step = function step(i) {
                            var $9 = i <= 0;
                            if ($9) {
                                return Data_Maybe.Nothing.value;
                            };
                            return new Data_Maybe.Just(new Data_Tuple.Tuple(v, i - 1 | 0));
                        };
                        return unfoldr(dictUnfoldable)(step)(n);
                    };
                };
            };
            var replicateA = function replicateA(dictApplicative) {
                return function (dictUnfoldable) {
                    return function (dictTraversable) {
                        return function (n) {
                            return function (m) {
                                return Data_Traversable.sequence(dictTraversable)(dictApplicative)(replicate(dictUnfoldable)(n)(m));
                            };
                        };
                    };
                };
            };
            var singleton = function singleton(dictUnfoldable) {
                return replicate(dictUnfoldable)(1);
            };
            var range = function range(dictUnfoldable) {
                return function (start) {
                    return function (end) {
                        return unfoldr(dictUnfoldable)(function (i) {
                            var $10 = i <= end;
                            if ($10) {
                                return new Data_Maybe.Just(Data_Tuple.Tuple.create(i)(i + 1 | 0));
                            };
                            return Data_Maybe.Nothing.value;
                        })(start);
                    };
                };
            };
            var none = function none(dictUnfoldable) {
                return unfoldr(dictUnfoldable)(Data_Function["const"](Data_Maybe.Nothing.value))(Data_Unit.unit);
            };
            var fromMaybe = function fromMaybe(dictUnfoldable) {
                return unfoldr(dictUnfoldable)(function (b) {
                    return Data_Functor.map(Data_Maybe.functorMaybe)(Data_Function.flip(Data_Tuple.Tuple.create)(Data_Maybe.Nothing.value))(b);
                });
            };
            module.exports = {
                Unfoldable: Unfoldable,
                unfoldr: unfoldr,
                replicate: replicate,
                replicateA: replicateA,
                none: none,
                singleton: singleton,
                range: range,
                fromMaybe: fromMaybe,
                unfoldableArray: unfoldableArray
            };

            /***/
        },
        /* 115 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            exports.unfoldrArrayImpl = function (isNothing) {
                return function (fromJust) {
                    return function (fst) {
                        return function (snd) {
                            return function (f) {
                                return function (b) {
                                    var result = [];
                                    var value = b;
                                    while (true) {
                                        // eslint-disable-line no-constant-condition
                                        var maybe = f(value);
                                        if (isNothing(maybe)) return result;
                                        var tuple = fromJust(maybe);
                                        result.push(fst(tuple));
                                        value = snd(tuple);
                                    }
                                };
                            };
                        };
                    };
                };
            };

            /***/
        },
        /* 116 */
        /***/function (module, exports, __webpack_require__) {

            "use strict";

            var Group = function Group(x) {
                return x;
            };
            module.exports = {
                Group: Group
            };

            /***/
        }]
        /******/)
    );
});
//# sourceMappingURL=plugin_bundle.js.map
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(13)(module), __webpack_require__(0)))

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var prepareValue = __webpack_require__(8)

module.exports.toArray = __webpack_require__(2)
module.exports.prepareStackTrace = __webpack_require__(1)
module.exports.prepareValue = prepareValue
module.exports.prepareObject = prepareValue.prepareObject
module.exports.prepareArray = prepareValue.prepareArray


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-not-accumulator-reassign/no-not-accumulator-reassign, no-var, vars-on-top, prefer-template, prefer-arrow-callback, func-names, prefer-destructuring, object-shorthand */
var prepareStackTrace = __webpack_require__(1)
var toArray = __webpack_require__(2)

function prepareArray(array, options) {
  return array.map(function(i) {
    return prepareValue(i, options)
  })
}

function prepareObject(object, options) {
  const deep = {}
  Object.keys(object).forEach(function(key) {
    deep[key] = prepareValue(object[key], options)
  })
  return deep
}

function getName(x) {
  return {
    type: 'String',
    primitive: 'String',
    value: String(x.name()),
  }
}

function getSelector(x) {
  return {
    type: 'String',
    primitive: 'String',
    value: String(x.selector()),
  }
}

function introspectMochaObject(value, options) {
  options = options || {}
  var mocha = value.class().mocha()
  var introspection = {
    properties: {
      type: 'Array',
      primitive: 'Array',
      value: toArray(
        mocha['properties' + (options.withAncestors ? 'WithAncestors' : '')]()
      ).map(getName),
    },
    classMethods: {
      type: 'Array',
      primitive: 'Array',
      value: toArray(
        mocha['classMethods' + (options.withAncestors ? 'WithAncestors' : '')]()
      ).map(getSelector),
    },
    instanceMethods: {
      type: 'Array',
      primitive: 'Array',
      value: toArray(
        mocha['instanceMethods' + (options.withAncestors ? 'WithAncestors' : '')]()
      ).map(getSelector),
    },
    protocols: {
      type: 'Array',
      primitive: 'Array',
      value: toArray(
        mocha['protocols' + (options.withAncestors ? 'WithAncestors' : '')]()
      ).map(getName),
    },
  }
  if (mocha.treeAsDictionary && options.withTree) {
    introspection.treeAsDictionary = {
      type: 'Object',
      primitive: 'Object',
      value: prepareObject(mocha.treeAsDictionary())
    }
  }
  return introspection
}

function prepareValue(value, options) {
  var type = 'String'
  var primitive = 'String'
  const typeOf = typeof value
  if (value instanceof Error) {
    type = 'Error'
    primitive = 'Error'
    value = {
      message: value.message,
      name: value.name,
      stack: prepareStackTrace(value.stack),
    }
  } else if (Array.isArray(value)) {
    type = 'Array'
    primitive = 'Array'
    value = prepareArray(value, options)
  } else if (value === null || value === undefined || Number.isNaN(value)) {
    type = 'Empty'
    primitive = 'Empty'
    value = String(value)
  } else if (typeOf === 'object') {
    if (value.isKindOfClass && typeof value.class === 'function') {
      type = String(value.class())
      // TODO: Here could come some meta data saved as value
      if (
        type === 'NSDictionary' ||
        type === '__NSDictionaryM' ||
        type === '__NSSingleEntryDictionaryI' ||
        type === '__NSDictionaryI' ||
        type === '__NSCFDictionary'
      ) {
        primitive = 'Object'
        value = prepareObject(Object(value), options)
      } else if (
        type === 'NSArray' ||
        type === 'NSMutableArray' ||
        type === '__NSArrayM' ||
        type === '__NSSingleObjectArrayI' ||
        type === '__NSArray0'
      ) {
        primitive = 'Array'
        value = prepareArray(toArray(value), options)
      } else if (
        type === 'NSString' ||
        type === '__NSCFString' ||
        type === 'NSTaggedPointerString' ||
        type === '__NSCFConstantString'
      ) {
        primitive = 'String'
        value = String(value)
      } else if (type === '__NSCFNumber' || type === 'NSNumber') {
        primitive = 'Number'
        value = 0 + value
      } else if (type === 'MOStruct') {
        type = String(value.name())
        primitive = 'Object'
        value = value.memberNames().reduce(function(prev, k) {
          prev[k] = prepareValue(value[k], options)
          return prev
        }, {})
      } else if (value.class().mocha) {
        primitive = 'Mocha'
        value = (options || {}).skipMocha ? type : introspectMochaObject(value, options)
      } else {
        primitive = 'Unknown'
        value = type
      }
    } else {
      type = 'Object'
      primitive = 'Object'
      value = prepareObject(value, options)
    }
  } else if (typeOf === 'function') {
    type = 'Function'
    primitive = 'Function'
    value = String(value)
  } else if (value === true || value === false) {
    type = 'Boolean'
    primitive = 'Boolean'
  } else if (typeOf === 'number') {
    primitive = 'Number'
    type = 'Number'
  }

  return {
    value,
    type,
    primitive,
  }
}

module.exports = prepareValue
module.exports.prepareObject = prepareObject
module.exports.prepareArray = prepareArray


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-not-accumulator-reassign/no-not-accumulator-reassign, no-var, vars-on-top, prefer-template, prefer-arrow-callback, func-names, prefer-destructuring, object-shorthand */
var remoteWebview = __webpack_require__(10)

module.exports.identifier = 'skpm.debugger'

module.exports.isDebuggerPresent = remoteWebview.isWebviewPresent.bind(
  this,
  module.exports.identifier
)

module.exports.sendToDebugger = function sendToDebugger(name, payload) {
  return remoteWebview.sendToWebview(
    module.exports.identifier,
    'sketchBridge(' +
      JSON.stringify({
        name: name,
        payload: payload,
      }) +
      ');'
  )
}


/***/ }),
/* 10 */
/***/ (function(module, exports) {

/* globals NSThread */

var threadDictionary = NSThread.mainThread().threadDictionary()

module.exports.isWebviewPresent = function isWebviewPresent (identifier) {
  return !!threadDictionary[identifier]
}

module.exports.sendToWebview = function sendToWebview (identifier, evalString) {
  if (!module.exports.isWebviewPresent(identifier)) {
    throw new Error('Webview ' + identifier + ' not found')
  }

  var webview = threadDictionary[identifier]
    .contentView()
    .subviews()
  webview = webview[webview.length - 1]

  return webview.stringByEvaluatingJavaScriptFromString(evalString)
}


/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports.SET_TREE = 'elements/SET_TREE'
module.exports.SET_PAGE_METADATA = 'elements/SET_PAGE_METADATA'
module.exports.SET_LAYER_METADATA = 'elements/SET_LAYER_METADATA'
module.exports.ADD_LOG = 'logs/ADD_LOG'
module.exports.CLEAR_LOGS = 'logs/CLEAR_LOGS'
module.exports.GROUP = 'logs/GROUP'
module.exports.GROUP_END = 'logs/GROUP_END'
module.exports.TIMER_START = 'logs/TIMER_START'
module.exports.TIMER_END = 'logs/TIMER_END'
module.exports.ADD_REQUEST = 'network/ADD_REQUEST'
module.exports.SET_RESPONSE = 'network/SET_RESPONSE'
module.exports.ADD_ACTION = 'actions/ADD_ACTION'
module.exports.SET_SCRIPT_RESULT = 'playground/SET_SCRIPT_RESULT'


/***/ }),
/* 12 */,
/* 13 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ })
/******/ ]);
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['test'] = __skpm_run.bind(this, 'test');
that['onRun'] = __skpm_run.bind(this, 'default');
that['api'] = __skpm_run.bind(this, 'api')
