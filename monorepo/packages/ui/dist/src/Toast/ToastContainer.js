"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToastContainer = ToastContainer;
var _react = _interopRequireDefault(require("react"));
var _Toast = require("./Toast.style");
var _reactDom = require("react-dom");
var _Toast2 = require("./Toast");
var _react2 = require("@emotion/react");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ToastContainer(_ref) {
  var {
    getToastPosition
  } = _ref;
  return (0, _react2.jsx)(_react.default.Fragment, null, Object.entries(getToastPosition()).map(_ref2 => {
    var [position, toasts] = _ref2;
    return (0, _reactDom.createPortal)((0, _react2.jsx)("div", {
      key: position,
      css: [_Toast.Container, _Toast.ContainerPosition[position], process.env.NODE_ENV === "production" ? "" : ";label:ToastContainer;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Ub2FzdC9Ub2FzdENvbnRhaW5lci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBY3dCIiwiZmlsZSI6Ii4uLy4uLy4uL3NyYy9Ub2FzdC9Ub2FzdENvbnRhaW5lci50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IENvbnRhaW5lciwgQ29udGFpbmVyUG9zaXRpb24gfSBmcm9tICcuL1RvYXN0LnN0eWxlJztcbmltcG9ydCB7IGNyZWF0ZVBvcnRhbCB9IGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgdHlwZSB7IFRvYXN0UG9zaXRpb24gfSBmcm9tICcuL3R5cGUnO1xuaW1wb3J0IHsgVG9hc3QgfSBmcm9tICcuL1RvYXN0JztcbmltcG9ydCB0eXBlIHsgVG9hc3RQcm9wcywgZ2V0VG9hc3RBbmRQb3NpdGlvblByb3BzIH0gZnJvbSAnLi90eXBlJztcblxuZnVuY3Rpb24gVG9hc3RDb250YWluZXIoeyBnZXRUb2FzdFBvc2l0aW9uIH06IGdldFRvYXN0QW5kUG9zaXRpb25Qcm9wcykge1xuICAgIHJldHVybiAoXG4gICAgICAgIDw+XG4gICAgICAgICAgICB7T2JqZWN0LmVudHJpZXMoZ2V0VG9hc3RQb3NpdGlvbigpKS5tYXAoKFtwb3NpdGlvbiwgdG9hc3RzXSkgPT5cbiAgICAgICAgICAgICAgICBjcmVhdGVQb3J0YWwoXG4gICAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleT17cG9zaXRpb259XG4gICAgICAgICAgICAgICAgICAgICAgICBjc3M9e1tDb250YWluZXIsIENvbnRhaW5lclBvc2l0aW9uW3Bvc2l0aW9uIGFzIFRvYXN0UG9zaXRpb25dXX1cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAge3RvYXN0cy5tYXAoKHRvYXN0OiBUb2FzdFByb3BzKSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRvYXN0IGtleT17dG9hc3QuaWR9IHsuLi50b2FzdH0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj4sXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHksXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICl9XG4gICAgICAgIDwvPlxuICAgICk7XG59XG5leHBvcnQgeyBUb2FzdENvbnRhaW5lciB9O1xuIl19 */"]
    }, toasts.map(toast => (0, _react2.jsx)(_Toast2.Toast, _extends({
      key: toast.id
    }, toast)))), document.body);
  }));
}