"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Text = Text;
var _react = _interopRequireDefault(require("react"));
var _Text = require("./Text.style");
var _react2 = require("@emotion/react");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function HighLight(_ref) {
  var {
    children,
    sx
  } = _ref;
  return (0, _react2.jsx)("span", {
    css: [_Text.highlightStyle, sx, process.env.NODE_ENV === "production" ? "" : ";label:HighLight;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9UZXh0L1RleHQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXFCaUIiLCJmaWxlIjoiLi4vLi4vc3JjL1RleHQvVGV4dC50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdGhlbWUgZnJvbSAnQHNzb2Mvc3R5bGVzJztcbmltcG9ydCB0eXBlIHsgQ1NTUHJvcGVydGllcywgRWxlbWVudFR5cGUsIFByb3BzV2l0aENoaWxkcmVuIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHRleHRTdHlsZSwgaGlnaGxpZ2h0U3R5bGUgfSBmcm9tICcuL1RleHQuc3R5bGUnO1xuaW1wb3J0IHR5cGUgeyBDU1NPYmplY3QgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5pbXBvcnQgdHlwZSB7IFJlYWN0Tm9kZSB9IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IHR5cGUgVGV4dFR5cGUgPSBrZXlvZiB0eXBlb2YgdGhlbWUudHlwb2dyYXBoeTtcbmV4cG9ydCB0eXBlIFRleHRDb2xvciA9ICdibGFjaycgfCAncHJpbWFyeScgfCAnd2FybmluZycgfCAnY2FwdGlvbicgfCAnc3ViQ2FwdGlvbicgfCAnaGVscGVyJztcblxuaW50ZXJmYWNlIFRleHRQcm9wcyBleHRlbmRzIFByb3BzV2l0aENoaWxkcmVuIHtcbiAgICB0eXBlPzogVGV4dFR5cGU7XG4gICAgY29sb3I/OiBUZXh0Q29sb3I7XG4gICAgdGV4dEFsaWduPzogQ1NTUHJvcGVydGllc1sndGV4dEFsaWduJ107XG4gICAgbm9XcmFwPzogYm9vbGVhbjtcbiAgICBjcm9wcGVkPzogYm9vbGVhbjtcbiAgICBzeD86IENTU09iamVjdDtcbiAgICBhcz86IEVsZW1lbnRUeXBlO1xufVxuXG5mdW5jdGlvbiBIaWdoTGlnaHQoeyBjaGlsZHJlbiwgc3ggfTogeyBjaGlsZHJlbj86IFJlYWN0Tm9kZTsgc3g/OiBDU1NPYmplY3QgfSkge1xuICAgIHJldHVybiA8c3BhbiBjc3M9e1toaWdobGlnaHRTdHlsZSwgc3hdfT57Y2hpbGRyZW59PC9zcGFuPjtcbn1cbmZ1bmN0aW9uIFRleHQoe1xuICAgIHR5cGUgPSAnYm9keVJlZ3VsYXInLFxuICAgIGNvbG9yID0gJ2JsYWNrJyxcbiAgICB0ZXh0QWxpZ24gPSAnY2VudGVyJyxcbiAgICBub1dyYXAgPSBmYWxzZSxcbiAgICBjcm9wcGVkID0gZmFsc2UsXG4gICAgY2hpbGRyZW4sXG4gICAgc3gsXG4gICAgYXM6IFRhZyA9ICdwJyxcbn06IFRleHRQcm9wcykge1xuICAgIHJldHVybiA8VGFnIGNzcz17W3RleHRTdHlsZSh7IHR5cGUsIGNvbG9yLCB0ZXh0QWxpZ24sIG5vV3JhcCwgY3JvcHBlZCB9KSwgc3hdfT57Y2hpbGRyZW59PC9UYWc+O1xufVxuXG5UZXh0LkhpZ2hMaWdodCA9IEhpZ2hMaWdodDtcbmV4cG9ydCB7IFRleHQgfTtcbiJdfQ== */"]
  }, children);
}
function Text(_ref2) {
  var {
    type = 'bodyRegular',
    color = 'black',
    textAlign = 'center',
    noWrap = false,
    cropped = false,
    children,
    sx,
    as: Tag = 'p'
  } = _ref2;
  return (0, _react2.jsx)(Tag, {
    css: [(0, _Text.textStyle)({
      type,
      color,
      textAlign,
      noWrap,
      cropped
    }), sx, process.env.NODE_ENV === "production" ? "" : ";label:Text;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9UZXh0L1RleHQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQWlDZ0IiLCJmaWxlIjoiLi4vLi4vc3JjL1RleHQvVGV4dC50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdGhlbWUgZnJvbSAnQHNzb2Mvc3R5bGVzJztcbmltcG9ydCB0eXBlIHsgQ1NTUHJvcGVydGllcywgRWxlbWVudFR5cGUsIFByb3BzV2l0aENoaWxkcmVuIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHRleHRTdHlsZSwgaGlnaGxpZ2h0U3R5bGUgfSBmcm9tICcuL1RleHQuc3R5bGUnO1xuaW1wb3J0IHR5cGUgeyBDU1NPYmplY3QgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5pbXBvcnQgdHlwZSB7IFJlYWN0Tm9kZSB9IGZyb20gJ3JlYWN0JztcblxuZXhwb3J0IHR5cGUgVGV4dFR5cGUgPSBrZXlvZiB0eXBlb2YgdGhlbWUudHlwb2dyYXBoeTtcbmV4cG9ydCB0eXBlIFRleHRDb2xvciA9ICdibGFjaycgfCAncHJpbWFyeScgfCAnd2FybmluZycgfCAnY2FwdGlvbicgfCAnc3ViQ2FwdGlvbicgfCAnaGVscGVyJztcblxuaW50ZXJmYWNlIFRleHRQcm9wcyBleHRlbmRzIFByb3BzV2l0aENoaWxkcmVuIHtcbiAgICB0eXBlPzogVGV4dFR5cGU7XG4gICAgY29sb3I/OiBUZXh0Q29sb3I7XG4gICAgdGV4dEFsaWduPzogQ1NTUHJvcGVydGllc1sndGV4dEFsaWduJ107XG4gICAgbm9XcmFwPzogYm9vbGVhbjtcbiAgICBjcm9wcGVkPzogYm9vbGVhbjtcbiAgICBzeD86IENTU09iamVjdDtcbiAgICBhcz86IEVsZW1lbnRUeXBlO1xufVxuXG5mdW5jdGlvbiBIaWdoTGlnaHQoeyBjaGlsZHJlbiwgc3ggfTogeyBjaGlsZHJlbj86IFJlYWN0Tm9kZTsgc3g/OiBDU1NPYmplY3QgfSkge1xuICAgIHJldHVybiA8c3BhbiBjc3M9e1toaWdobGlnaHRTdHlsZSwgc3hdfT57Y2hpbGRyZW59PC9zcGFuPjtcbn1cbmZ1bmN0aW9uIFRleHQoe1xuICAgIHR5cGUgPSAnYm9keVJlZ3VsYXInLFxuICAgIGNvbG9yID0gJ2JsYWNrJyxcbiAgICB0ZXh0QWxpZ24gPSAnY2VudGVyJyxcbiAgICBub1dyYXAgPSBmYWxzZSxcbiAgICBjcm9wcGVkID0gZmFsc2UsXG4gICAgY2hpbGRyZW4sXG4gICAgc3gsXG4gICAgYXM6IFRhZyA9ICdwJyxcbn06IFRleHRQcm9wcykge1xuICAgIHJldHVybiA8VGFnIGNzcz17W3RleHRTdHlsZSh7IHR5cGUsIGNvbG9yLCB0ZXh0QWxpZ24sIG5vV3JhcCwgY3JvcHBlZCB9KSwgc3hdfT57Y2hpbGRyZW59PC9UYWc+O1xufVxuXG5UZXh0LkhpZ2hMaWdodCA9IEhpZ2hMaWdodDtcbmV4cG9ydCB7IFRleHQgfTtcbiJdfQ== */"]
  }, children);
}
Text.HighLight = HighLight;