"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useEditorContext = exports.EditorContext = void 0;
var _react = require("react");
var EditorContext = exports.EditorContext = (0, _react.createContext)(undefined);
var useEditorContext = () => {
  var context = (0, _react.useContext)(EditorContext);
  if (context === undefined) {
    throw new Error('useEditorContext는 useEditorContext.Provider 내부에서만 사용할 수 있습니다.');
  }
  return context;
};
exports.useEditorContext = useEditorContext;