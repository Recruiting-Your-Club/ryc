"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToastContainer = ToastContainer;
var _react = _interopRequireDefault(require("react"));
var _reactDom = require("react-dom");
var _Toast = require("./Toast");
var _Toast2 = require("./Toast.style");
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
      css: [_Toast2.Container, _Toast2.ContainerPosition[position], process.env.NODE_ENV === "production" ? "" : ";label:ToastContainer;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Ub2FzdC9Ub2FzdENvbnRhaW5lci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBZXdCIiwiZmlsZSI6Ii4uLy4uLy4uL3NyYy9Ub2FzdC9Ub2FzdENvbnRhaW5lci50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNyZWF0ZVBvcnRhbCB9IGZyb20gJ3JlYWN0LWRvbSc7XG5cbmltcG9ydCB7IFRvYXN0IH0gZnJvbSAnLi9Ub2FzdCc7XG5pbXBvcnQgeyBDb250YWluZXIsIENvbnRhaW5lclBvc2l0aW9uIH0gZnJvbSAnLi9Ub2FzdC5zdHlsZSc7XG5pbXBvcnQgdHlwZSB7IFRvYXN0UG9zaXRpb24gfSBmcm9tICcuL3R5cGUnO1xuaW1wb3J0IHR5cGUgeyBnZXRUb2FzdEFuZFBvc2l0aW9uUHJvcHMsIFRvYXN0UHJvcHMgfSBmcm9tICcuL3R5cGUnO1xuXG5mdW5jdGlvbiBUb2FzdENvbnRhaW5lcih7IGdldFRvYXN0UG9zaXRpb24gfTogZ2V0VG9hc3RBbmRQb3NpdGlvblByb3BzKSB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPD5cbiAgICAgICAgICAgIHtPYmplY3QuZW50cmllcyhnZXRUb2FzdFBvc2l0aW9uKCkpLm1hcCgoW3Bvc2l0aW9uLCB0b2FzdHNdKSA9PlxuICAgICAgICAgICAgICAgIGNyZWF0ZVBvcnRhbChcbiAgICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtwb3NpdGlvbn1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNzcz17W0NvbnRhaW5lciwgQ29udGFpbmVyUG9zaXRpb25bcG9zaXRpb24gYXMgVG9hc3RQb3NpdGlvbl1dfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7dG9hc3RzLm1hcCgodG9hc3Q6IFRvYXN0UHJvcHMpID0+IChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VG9hc3Qga2V5PXt0b2FzdC5pZH0gey4uLnRvYXN0fSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PixcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keSxcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgKX1cbiAgICAgICAgPC8+XG4gICAgKTtcbn1cbmV4cG9ydCB7IFRvYXN0Q29udGFpbmVyIH07XG4iXX0= */"]
    }, toasts.map(toast => (0, _react2.jsx)(_Toast.Toast, _extends({
      key: toast.id
    }, toast)))), document.body);
  }));
}