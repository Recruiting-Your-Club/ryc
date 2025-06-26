"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useToast = void 0;
var _react = require("react");
var _ToastProvider = require("./ToastProvider");
var useToast = () => {
  var toastContext = (0, _react.useContext)(_ToastProvider.ToastContext);
  if (!toastContext) {
    throw new Error('ToastContext를 사용할 수 없는 컴포넌트입니다.');
  }
  var {
    toast
  } = toastContext;
  return {
    toast
  };
};
exports.useToast = useToast;