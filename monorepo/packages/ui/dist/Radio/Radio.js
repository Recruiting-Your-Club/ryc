"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Radio = Radio;
var _react = _interopRequireDefault(require("react"));
var _Radio = require("./Radio.style");
var _RadioItem = require("./RadioItem");
var _react2 = require("@emotion/react");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function Radio(_ref) {
  var {
    options,
    name,
    value,
    disabled,
    orientation,
    onChange: _onChange,
    sx
  } = _ref;
  return (0, _react2.jsx)("div", {
    css: [(0, _Radio.radioContainer)(orientation), sx, process.env.NODE_ENV === "production" ? "" : ";label:Radio;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9SYWRpby9SYWRpby50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBd0JhIiwiZmlsZSI6Ii4uLy4uL3NyYy9SYWRpby9SYWRpby50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IENTU09iamVjdCB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcbmltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHJhZGlvQ29udGFpbmVyIH0gZnJvbSAnLi9SYWRpby5zdHlsZSc7XG5pbXBvcnQgeyBSYWRpb0l0ZW0gfSBmcm9tICcuL1JhZGlvSXRlbSc7XG5cbmV4cG9ydCB0eXBlIFJhZGlvT3JpZW50YXRpb24gPSAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnO1xuXG5pbnRlcmZhY2UgUmFkaW9PcHRpb24ge1xuICAgIGxhYmVsPzogc3RyaW5nOyAvLyDsi6TsoJzroZwg67O07Jes7KeIIOyYteyFmCDqsJJcbiAgICB2YWx1ZTogc3RyaW5nOyAvLyDshJzrsoTsl5Ag64SY6rKo7KeIIOyYteyFmCDqsJIo7KeB7KCRIOyEpOyglSDqsIDriqUpXG59XG5cbmludGVyZmFjZSBSYWRpb1Byb3BzIHtcbiAgICBvcHRpb25zOiBSYWRpb09wdGlvbltdO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICB2YWx1ZT86IHN0cmluZztcbiAgICBkaXNhYmxlZD86IGJvb2xlYW47XG4gICAgb3JpZW50YXRpb246IFJhZGlvT3JpZW50YXRpb247XG4gICAgb25DaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xuICAgIHN4PzogQ1NTT2JqZWN0O1xufVxuXG5mdW5jdGlvbiBSYWRpbyh7IG9wdGlvbnMsIG5hbWUsIHZhbHVlLCBkaXNhYmxlZCwgb3JpZW50YXRpb24sIG9uQ2hhbmdlLCBzeCB9OiBSYWRpb1Byb3BzKSB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjc3M9e1tyYWRpb0NvbnRhaW5lcihvcmllbnRhdGlvbiksIHN4XX0+XG4gICAgICAgICAgICB7b3B0aW9ucy5tYXAoKHsgbGFiZWwsIHZhbHVlOiBpdGVtVmFsdWUgfSwgaW5kZXgpID0+IChcbiAgICAgICAgICAgICAgICA8UmFkaW9JdGVtXG4gICAgICAgICAgICAgICAgICAgIGtleT17aW5kZXh9XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbj17bGFiZWx9XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXtpdGVtVmFsdWV9XG4gICAgICAgICAgICAgICAgICAgIG5hbWU9e25hbWV9XG4gICAgICAgICAgICAgICAgICAgIGNoZWNrZWQ9e3ZhbHVlID09PSBpdGVtVmFsdWV9XG4gICAgICAgICAgICAgICAgICAgIGRpc2FibGVkPXtkaXNhYmxlZH1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eygpID0+IG9uQ2hhbmdlPy4oaXRlbVZhbHVlKX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKSl9XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59XG5cbmV4cG9ydCB7IFJhZGlvIH07XG4iXX0= */"]
  }, options.map((_ref2, index) => {
    var {
      label,
      value: itemValue
    } = _ref2;
    return (0, _react2.jsx)(_RadioItem.RadioItem, {
      key: index,
      option: label,
      value: itemValue,
      name: name,
      checked: value === itemValue,
      disabled: disabled,
      onChange: () => _onChange === null || _onChange === void 0 ? void 0 : _onChange(itemValue)
    });
  }));
}