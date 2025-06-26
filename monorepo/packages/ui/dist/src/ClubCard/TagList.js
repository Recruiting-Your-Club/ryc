"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TagList = TagList;
var _react = _interopRequireWildcard(require("react"));
var _Tag = require("../Tag");
var _ClubCard = require("./ClubCard.style");
var _react2 = require("@emotion/react");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function TagList(_ref) {
  var {
    tag
  } = _ref;
  var visibleRef = (0, _react.useRef)(null);
  var invisibleRef = (0, _react.useRef)(null);
  var [visibleTag, setVisibleTag] = (0, _react.useState)([]);
  var [isMeasuring, setIsMeasuring] = (0, _react.useState)(true);
  (0, _react.useEffect)(() => {
    if (!visibleRef.current || !invisibleRef.current) return;
    var cardWidth = visibleRef.current.clientWidth;
    var currentTagsWidth = 0;
    var newVisibleTag = [];
    var tagElements = Array.from(invisibleRef.current.children);
    tagElements.forEach((tagElement, index) => {
      var tagWidth = tagElement.offsetWidth;
      if (currentTagsWidth + tagWidth <= cardWidth) {
        newVisibleTag.push(tag[index]);
        currentTagsWidth += tagWidth;
      }
    });
    setVisibleTag(newVisibleTag);
    setIsMeasuring(false);
  }, [tag]);
  return (0, _react2.jsx)(_react.default.Fragment, null, (0, _react2.jsx)("div", {
    ref: visibleRef,
    css: _ClubCard.tagDisplay
  }, visibleTag.map((tag, _) => (0, _react2.jsx)("span", {
    key: tag,
    css: _ClubCard.perTag
  }, (0, _react2.jsx)(_Tag.Tag, {
    text: tag,
    variant: "primary"
  })))), isMeasuring && (0, _react2.jsx)("div", {
    ref: invisibleRef,
    css: _ClubCard.invisibleTag,
    "aria-hidden": "true"
  }, tag.map((tag, _) => (0, _react2.jsx)(_Tag.Tag, {
    key: tag,
    text: tag,
    variant: "primary"
  }))));
}