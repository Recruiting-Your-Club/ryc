"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Radio = Radio;
var _Radio = require("./Radio.style");
var _RadioItem = require("./RadioItem");
var _react = require("@emotion/react");
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
  return (0, _react.jsx)("div", {
    css: [(0, _Radio.radioContainer)(orientation), sx, process.env.NODE_ENV === "production" ? "" : ";label:Radio;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9SYWRpby9SYWRpby50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBd0JhIiwiZmlsZSI6Ii4uLy4uLy4uL3NyYy9SYWRpby9SYWRpby50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IENTU09iamVjdCB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcblxuaW1wb3J0IHsgcmFkaW9Db250YWluZXIgfSBmcm9tICcuL1JhZGlvLnN0eWxlJztcbmltcG9ydCB7IFJhZGlvSXRlbSB9IGZyb20gJy4vUmFkaW9JdGVtJztcblxuZXhwb3J0IHR5cGUgUmFkaW9PcmllbnRhdGlvbiA9ICdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCc7XG5cbmludGVyZmFjZSBSYWRpb09wdGlvbiB7XG4gICAgbGFiZWw/OiBzdHJpbmc7IC8vIOyLpOygnOuhnCDrs7Tsl6zsp4gg7Ji17IWYIOqwklxuICAgIHZhbHVlOiBzdHJpbmc7IC8vIOyEnOuyhOyXkCDrhJjqsqjsp4gg7Ji17IWYIOqwkijsp4HsoJEg7ISk7KCVIOqwgOuKpSlcbn1cblxuaW50ZXJmYWNlIFJhZGlvUHJvcHMge1xuICAgIG9wdGlvbnM6IFJhZGlvT3B0aW9uW107XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHZhbHVlPzogc3RyaW5nO1xuICAgIGRpc2FibGVkPzogYm9vbGVhbjtcbiAgICBvcmllbnRhdGlvbjogUmFkaW9PcmllbnRhdGlvbjtcbiAgICBvbkNoYW5nZTogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gICAgc3g/OiBDU1NPYmplY3Q7XG59XG5cbmZ1bmN0aW9uIFJhZGlvKHsgb3B0aW9ucywgbmFtZSwgdmFsdWUsIGRpc2FibGVkLCBvcmllbnRhdGlvbiwgb25DaGFuZ2UsIHN4IH06IFJhZGlvUHJvcHMpIHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IGNzcz17W3JhZGlvQ29udGFpbmVyKG9yaWVudGF0aW9uKSwgc3hdfT5cbiAgICAgICAgICAgIHtvcHRpb25zLm1hcCgoeyBsYWJlbCwgdmFsdWU6IGl0ZW1WYWx1ZSB9LCBpbmRleCkgPT4gKFxuICAgICAgICAgICAgICAgIDxSYWRpb0l0ZW1cbiAgICAgICAgICAgICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uPXtsYWJlbH1cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2l0ZW1WYWx1ZX1cbiAgICAgICAgICAgICAgICAgICAgbmFtZT17bmFtZX1cbiAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17dmFsdWUgPT09IGl0ZW1WYWx1ZX1cbiAgICAgICAgICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KCkgPT4gb25DaGFuZ2U/LihpdGVtVmFsdWUpfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApKX1cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn1cblxuZXhwb3J0IHsgUmFkaW8gfTtcbiJdfQ== */"]
  }, options.map((_ref2, index) => {
    var {
      label,
      value: itemValue
    } = _ref2;
    return (0, _react.jsx)(_RadioItem.RadioItem, {
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