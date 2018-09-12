(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.withForm = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function withForm(WrappedComponent) {
    return function (_ref) {
        var inputs = _ref.inputs;
        var asNonPure = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;


        /**
         * The namespace of the input which will
         * contain the default input to focus on when 
         * wrapped component mounts (if available)
         */
        var defaultFocusInput = '';

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = Object.entries(inputs)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var _step$value = _slicedToArray(_step.value, 2),
                    namespace = _step$value[0],
                    focusOnMount = _step$value[1].focusOnMount;

                if (focusOnMount) {
                    defaultFocusInput = namespace;
                    break;
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

        var ComponentType = asNonPure ? _react.Component : _react.PureComponent;

        var InputComponentsHOC = function (_ComponentType) {
            _inherits(InputComponentsHOC, _ComponentType);

            function InputComponentsHOC(props) {
                _classCallCheck(this, InputComponentsHOC);

                /** 
                 * Any element or React element refs are
                 * to be added to this namespace for simplicity
                 * and convenience with IDE
                 **/
                var _this = _possibleConstructorReturn(this, (InputComponentsHOC.__proto__ || Object.getPrototypeOf(InputComponentsHOC)).call(this, props));

                _this.validateInputs = function (namespaces, context) {
                    var nextErrorState = {};

                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = namespaces[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var ns = _step2.value;

                            var value = context.values[ns];
                            var error = _this.validate(ns, value, context);

                            nextErrorState[ns + 'InputError'] = error;
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }

                    if (Object.keys(nextErrorState).length) {
                        return nextErrorState;
                    } else {
                        return undefined;
                    }
                };

                _this.validate = function (namespace, value, context) {
                    switch (_typeof(inputs[namespace].validate)) {
                        case 'function':
                            return inputs[namespace].validate({ context: context, value: value });
                        case 'object':
                            var validate = inputs[namespace].validate;

                            if (validate.regex && validate.errorMessage) {
                                var regex = validate.regex,
                                    errorMessage = validate.errorMessage;

                                return !value.match(regex) ? errorMessage : '';
                            } else {
                                return '';
                            }
                    }
                };

                _this.onKeyPressed = function (event) {
                    switch (event.keyCode) {

                        case 13:
                            // ENTER
                            var activeElement = document.activeElement;

                            var _iteratorNormalCompletion3 = true;
                            var _didIteratorError3 = false;
                            var _iteratorError3 = undefined;

                            try {
                                for (var _iterator3 = Object.entries(inputs)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                    var _step3$value = _slicedToArray(_step3.value, 2),
                                        namespace = _step3$value[0],
                                        _step3$value$ = _step3$value[1],
                                        onAction = _step3$value$.onAction,
                                        elementId = _step3$value$.elementId;

                                    var element = _this.R[namespace + 'Ref'];
                                    if (element == activeElement && onAction) {
                                        onAction.apply(_this.R.componentRef, _this.props);
                                    }
                                }
                            } catch (err) {
                                _didIteratorError3 = true;
                                _iteratorError3 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                        _iterator3.return();
                                    }
                                } finally {
                                    if (_didIteratorError3) {
                                        throw _iteratorError3;
                                    }
                                }
                            }

                    }
                };

                _this.R = { componentRef: undefined };

                _this.listeners = {};

                var initialState = { context: { values: {} } };

                var _iteratorNormalCompletion4 = true;
                var _didIteratorError4 = false;
                var _iteratorError4 = undefined;

                try {
                    for (var _iterator4 = Object.keys(inputs)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                        var namespace = _step4.value;

                        initialState.context.values[namespace] = '';
                    }
                } catch (err) {
                    _didIteratorError4 = true;
                    _iteratorError4 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion4 && _iterator4.return) {
                            _iterator4.return();
                        }
                    } finally {
                        if (_didIteratorError4) {
                            throw _iteratorError4;
                        }
                    }
                }

                var _iteratorNormalCompletion5 = true;
                var _didIteratorError5 = false;
                var _iteratorError5 = undefined;

                try {
                    var _loop = function _loop() {
                        var _step5$value = _slicedToArray(_step5.value, 2),
                            namespace = _step5$value[0],
                            _step5$value$ = _step5$value[1],
                            elementId = _step5$value$.elementId,
                            validate = _step5$value$.validate;

                        // for each input of [xxx], create a 
                        // change listener in the form "onChange[Xxx]" 
                        // These callbacks detect input changes, and sets 
                        // state[xxx] to the new input values. 
                        // They are made available to the HOC's wrapped
                        // components via props.

                        var capitalizedName = namespace.charAt(0).toUpperCase() + namespace.substr(1);

                        var inputValueNs = namespace + 'InputValue';

                        var listenerNS = 'onChange' + capitalizedName;
                        _this.listeners[listenerNS] = function (event) {
                            var _nextState;

                            var value = event.target.value;


                            var context = _extends({}, _this.state.context);
                            context.values[namespace] = value;

                            context.revalidate = function (namespaces) {
                                var contextSupplied = _extends({}, context, {
                                    values: Object.assign({}, context.values, _defineProperty({}, namespace, value))
                                });

                                var newErrorState = _this.validateInputs(namespaces, contextSupplied);

                                if (newErrorState) {
                                    _this.setState(newErrorState);
                                }
                            };

                            var nextState = (_nextState = {}, _defineProperty(_nextState, inputValueNs, value), _defineProperty(_nextState, 'context', context), _nextState);

                            var nextErrorState = _this.validateInputs([namespace], context);
                            if (nextErrorState) {
                                nextState = Object.assign(nextState, nextErrorState);
                            }

                            _this.setState(nextState);
                        };

                        // also be sure while iterating to assign a default
                        // value to inputs so that they do not register as
                        // "uncontrolled" and start to throw React warnings

                        initialState[inputValueNs] = '';
                    };

                    for (var _iterator5 = Object.entries(inputs)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                        _loop();
                    }
                } catch (err) {
                    _didIteratorError5 = true;
                    _iteratorError5 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion5 && _iterator5.return) {
                            _iterator5.return();
                        }
                    } finally {
                        if (_didIteratorError5) {
                            throw _iteratorError5;
                        }
                    }
                }

                _this.state = initialState;
                return _this;
            }

            /**
             * Returns whether or not a namespace
             * is valid with a given value with
             * another context.
             * 
             * Note : we are returning rather than
             * directly setting state so we can aggregate 
             * multiple validation checks before setting 
             * state here and avoid perf hits.
             * 
             */


            _createClass(InputComponentsHOC, [{
                key: 'componentDidMount',
                value: function componentDidMount() {
                    document.addEventListener('keypress', this.onKeyPressed);

                    var _iteratorNormalCompletion6 = true;
                    var _didIteratorError6 = false;
                    var _iteratorError6 = undefined;

                    try {
                        for (var _iterator6 = Object.entries(inputs)[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                            var _step6$value = _slicedToArray(_step6.value, 2),
                                namespace = _step6$value[0],
                                elementId = _step6$value[1].elementId;

                            var element = document.getElementById(elementId);

                            if (element) {
                                this.R[namespace + 'Ref'] = element;

                                // allows for keyboard navigation
                                // (must be specified because MUI
                                // lib hides input component)

                                this.R[namespace + 'Ref'].tabIndex = 0;
                            }
                        }
                    } catch (err) {
                        _didIteratorError6 = true;
                        _iteratorError6 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion6 && _iterator6.return) {
                                _iterator6.return();
                            }
                        } finally {
                            if (_didIteratorError6) {
                                throw _iteratorError6;
                            }
                        }
                    }

                    if (defaultFocusInput && this.R[defaultFocusInput + 'Ref']) {
                        this.R[defaultFocusInput + 'Ref'].focus();
                    }
                }
            }, {
                key: 'componentWillUnmount',
                value: function componentWillUnmount() {
                    document.removeEventListener('keypress', this.onKeyPressed);

                    // element references should be let
                    // go to free up RAM

                    var _iteratorNormalCompletion7 = true;
                    var _didIteratorError7 = false;
                    var _iteratorError7 = undefined;

                    try {
                        for (var _iterator7 = Object.entries(this.R)[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                            var _step7$value = _slicedToArray(_step7.value, 2),
                                namespace = _step7$value[0],
                                element = _step7$value[1];

                            this.R[namespace + 'Ref'] = '';
                        }
                    } catch (err) {
                        _didIteratorError7 = true;
                        _iteratorError7 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion7 && _iterator7.return) {
                                _iterator7.return();
                            }
                        } finally {
                            if (_didIteratorError7) {
                                throw _iteratorError7;
                            }
                        }
                    }
                }

                /**
                 * Listens for the enter key and
                 * if one of our inputs are focused,
                 * apply a supplied action (via an input.onAction callback)
                 * run from the wrapped component's scope
                 */

            }, {
                key: 'render',
                value: function render() {
                    var _this2 = this;

                    var _R = this.R,
                        componentRef = _R.componentRef,
                        refs = _objectWithoutProperties(_R, ['componentRef']);

                    return _react2.default.createElement(WrappedComponent, _extends({
                        ref: function ref(c) {
                            return _this2.R.componentRef = c;
                        }
                    }, this.props, this.state, this.listeners, refs));
                }
            }]);

            return InputComponentsHOC;
        }(ComponentType);

        return InputComponentsHOC;
    };
}

exports.default = withForm;
module.exports = exports['default'];

},{"react":"react"}]},{},[1])(1)
});
