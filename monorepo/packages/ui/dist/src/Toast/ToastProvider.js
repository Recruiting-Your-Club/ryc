"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToastContext = void 0;
exports.ToastProvider = ToastProvider;
var _react = _interopRequireWildcard(require("react"));
var _ToastContainer = require("./ToastContainer");
var _react2 = require("@emotion/react");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var defaultOptions = {
  type: 'default',
  toastTheme: 'white',
  status: 'entering',
  progressBar: true,
  duration: 3000,
  autoClose: true
};
var ToastContext = exports.ToastContext = (0, _react.createContext)(null);
function ToastProvider(_ref) {
  var {
    children,
    limit
  } = _ref;
  var [toasts, setToasts] = (0, _react.useState)([]);
  function toast(content, options) {
    return createToast(content, mergeOptions('default', options));
  }
  function createToastByType(type) {
    return (content, options) => createToast(content, mergeOptions(type, options));
  }
  function mergeOptions(type, options) {
    return _objectSpread(_objectSpread({}, defaultOptions), {}, {
      type: type
    }, options);
  }
  function createToast(content, options) {
    var id = Date.now();
    var newToast = _objectSpread({
      id: id,
      content: content
    }, options);
    checkLimitAndRemoveToast();
    setToasts(prev => [...prev, newToast]);
    if (options !== null && options !== void 0 && options.autoClose) AutoRemoveToast(id, options);
  }
  function checkLimitAndRemoveToast() {
    if (toasts.length >= (limit || 3)) {
      setToasts(prev => prev.map((toast, index) => index === 0 ? _objectSpread(_objectSpread({}, toast), {}, {
        status: 'exiting'
      }) : toast));
      var removeToast = () => setToasts(prev => prev.slice(1));
      setTimeout(removeToast, 500);
    }
  }
  function AutoRemoveToast(id, options) {
    var removeAnimation = () => setToasts(prev => prev.map(toast => toast.id === id ? _objectSpread(_objectSpread({}, toast), {}, {
      status: 'exiting'
    }) : toast));
    setTimeout(removeAnimation, options.duration || 3000);
    var removeToast = () => setToasts(prev => prev.filter(toast => toast.id !== id));
    setTimeout(removeToast, (options.duration || 3000) + 1000);
  }
  function getToastPosition() {
    var positionMap = {
      topRight: [],
      topCenter: [],
      topLeft: [],
      bottomRight: [],
      bottomCenter: [],
      bottomLeft: []
    };
    toasts.forEach(toast => {
      var position = toast.position || 'topCenter';
      positionMap[position].push(toast);
    });
    return positionMap;
  }
  toast.info = createToastByType('info');
  toast.success = createToastByType('success');
  toast.error = createToastByType('error');
  return (0, _react2.jsx)(ToastContext.Provider, {
    value: {
      toast
    }
  }, children, (0, _react2.jsx)(_ToastContainer.ToastContainer, {
    getToastPosition: getToastPosition
  }));
}