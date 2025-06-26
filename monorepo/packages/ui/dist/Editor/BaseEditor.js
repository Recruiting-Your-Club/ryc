"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Editor = void 0;
var _react = _interopRequireDefault(require("react"));
var _EditorRoot = require("./EditorRoot");
var _EditorTextarea = require("./EditorTextarea");
var _EditorToolbar = require("./EditorToolbar");
var _react2 = require("@emotion/react");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function BaseEditor() {
  return (0, _react2.jsx)(_react.default.Fragment, null, (0, _react2.jsx)(_EditorRoot.EditorRoot, null, (0, _react2.jsx)(_EditorToolbar.EditorToolbar, null), (0, _react2.jsx)(_EditorTextarea.EditorTextarea, null)));
}
var Editor = exports.Editor = Object.assign(BaseEditor, {
  Root: _EditorRoot.EditorRoot,
  Toolbar: _EditorToolbar.EditorToolbar,
  Textarea: _EditorTextarea.EditorTextarea
});