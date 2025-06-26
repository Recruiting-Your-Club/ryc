"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCheckboxContext = exports.CheckboxContext = void 0;
var _react = require("react");
var CheckboxContext = exports.CheckboxContext = (0, _react.createContext)(undefined);
var useCheckboxContext = () => {
  var context = (0, _react.useContext)(CheckboxContext);
  if (context === undefined) {
    throw new Error('useCheckboxContext는 useCheckboxContext.Provider 내부에서만 사용할 수 있습니다.');
  }
  return context;
};
exports.useCheckboxContext = useCheckboxContext;