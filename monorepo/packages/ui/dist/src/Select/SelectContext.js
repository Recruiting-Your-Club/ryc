"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectContext = void 0;
exports.useSelectContext = useSelectContext;
var _react = require("react");
var SelectContext = exports.SelectContext = (0, _react.createContext)(undefined);
function useSelectContext() {
  var context = (0, _react.useContext)(SelectContext);
  if (context === undefined) {
    throw new Error('useSelectContext must be use within a SelectContext.Provider');
  }
  return context;
}