"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditorToolbar = EditorToolbar;
var _react = _interopRequireWildcard(require("react"));
var _constants = require("@ssoc/constants");
var _Select = require("../Select");
var _Editor = require("./Editor.style");
var _EditorContext = require("./EditorContext");
var _EditorTextColorPicker = require("./EditorTextColorPicker");
var _alignment = require("./utils/alignment");
var _list = require("./utils/list");
var _options = require("./utils/options");
var _range = require("./utils/range");
var _selection = require("./utils/selection");
var _textStyles = require("./utils/textStyles");
var _react2 = require("@emotion/react");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function EditorToolbar(_ref) {
  var {
    radius,
    sx
  } = _ref;
  var {
    editorRef,
    savedRange
  } = (0, _EditorContext.useEditorContext)();
  var imageFileInputRef = (0, _react.useRef)(null);
  var [size, setSize] = (0, _react.useState)(_constants.DEFAULT_FONT_SIZE);
  var [formats, setFormats] = (0, _react.useState)({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false
  });
  var [align, setAlign] = (0, _react.useState)('inherit');
  var [lists, setLists] = (0, _react.useState)({
    disc: false,
    decimal: false
  });
  var [options, setOptions] = (0, _react.useState)({
    image: false,
    divider: false
  });
  var toggleFormatButton = (0, _react.useCallback)(format => {
    setFormats(prev => _objectSpread(_objectSpread({}, prev), {}, {
      [format]: !prev[format]
    }));
  }, []);
  var toggleAlignButton = (0, _react.useCallback)(alignment => {
    setAlign(alignment);
  }, []);
  var toggleListButton = (0, _react.useCallback)(list => {
    setLists(prev => {
      if (prev[list]) return prev;
      return {
        disc: list === 'disc',
        decimal: list === 'decimal'
      };
    });
  }, []);
  var handleSize = size => {
    var {
      isValid,
      selection,
      range
    } = (0, _range.getValidSelection)();
    if (!isValid) {
      (0, _textStyles.applyStyleInEmptyRange)(editorRef, size);
      return;
    }
    (0, _textStyles.applyStyle)(selection, range, size);
  };
  var handleColor = (textColorType, color) => {
    var {
      isValid,
      selection,
      range
    } = (0, _range.getValidSelection)();
    if (!isValid) {
      (0, _textStyles.applyStyleInEmptyRange)(editorRef, textColorType, color);
      return;
    }
    (0, _textStyles.applyStyle)(selection, range, textColorType, color);
  };
  var handleFormat = (0, _react.useCallback)(format => {
    var {
      isValid,
      selection,
      range
    } = (0, _range.getValidSelection)();
    if (!isValid) {
      (0, _textStyles.applyStyleInEmptyRange)(editorRef, format);
      return;
    }
    toggleFormatButton(format);
    (0, _textStyles.applyStyle)(selection, range, format);
  }, [toggleFormatButton]);
  var handleAlignment = (0, _react.useCallback)(align => {
    var _editorRef$current;
    var {
      isValid,
      selection,
      range
    } = (0, _range.getValidSelection)();
    if (!isValid) {
      (0, _alignment.applyAlignmentInEmptyRange)(editorRef, align);
      return;
    }
    toggleAlignButton(align);
    (0, _alignment.applyAlignment)(selection, range, align);
    (_editorRef$current = editorRef.current) === null || _editorRef$current === void 0 || _editorRef$current.focus();
  }, [toggleAlignButton]);
  var handleList = (0, _react.useCallback)(list => {
    var {
      isValid,
      selection,
      range
    } = (0, _range.getValidSelection)();
    if (!isValid) {
      (0, _list.applyListInEmptyRange)(editorRef, list);
      return;
    }
    toggleListButton(list);
    (0, _list.applyList)(selection, range, list);
  }, [toggleListButton]);
  var handleOption = (0, _react.useCallback)(option => {
    var _imageFileInputRef$cu;
    switch (option) {
      case 'divider':
        (0, _options.insertDivider)(editorRef);
        break;
      case 'image':
        (_imageFileInputRef$cu = imageFileInputRef.current) === null || _imageFileInputRef$cu === void 0 || _imageFileInputRef$cu.click();
        break;
    }
  }, []);
  (0, _react.useEffect)(() => {
    var updateFormats = () => {
      setFormats((0, _selection.getCurrentFormats)());
      setAlign((0, _selection.getCurrentAlignment)());
      setLists((0, _selection.getCurrentLists)());
      setSize((0, _selection.getCurrentSize)());
    };
    document.addEventListener('selectionchange', updateFormats);
    document.addEventListener('mouseup', updateFormats);
    document.addEventListener('keyup', updateFormats);
    return () => {
      document.removeEventListener('selectionchange', updateFormats);
      document.removeEventListener('mouseup', updateFormats);
      document.removeEventListener('keyup', updateFormats);
    };
  }, []);
  return (0, _react2.jsx)("div", {
    css: [(0, _Editor.toolbarContainer)(radius), sx, process.env.NODE_ENV === "production" ? "" : ";label:EditorToolbar;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9FZGl0b3IvRWRpdG9yVG9vbGJhci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBNExhIiwiZmlsZSI6Ii4uLy4uLy4uL3NyYy9FZGl0b3IvRWRpdG9yVG9vbGJhci50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHtcbiAgICBhbGlnbkJ1dHRvbnMsXG4gICAgREVGQVVMVF9GT05UX1NJWkUsXG4gICAgZm9ybWF0QnV0dG9ucyxcbiAgICBsaXN0QnV0dG9ucyxcbiAgICBvcHRpb25CdXR0b25zLFxufSBmcm9tICdAc3NvYy9jb25zdGFudHMnO1xuXG5pbXBvcnQgeyBTZWxlY3QgfSBmcm9tICcuLi9TZWxlY3QnO1xuaW1wb3J0IHtcbiAgICBidXR0b25Hcm91cCxcbiAgICBwZXJCdXR0b25Dc3MsXG4gICAgc2VsZWN0Q3NzLFxuICAgIHNpemVTZWxlY3QsXG4gICAgc3ZnQ3NzLFxuICAgIHRvb2xiYXJDb250YWluZXIsXG59IGZyb20gJy4vRWRpdG9yLnN0eWxlJztcbmltcG9ydCB7IHVzZUVkaXRvckNvbnRleHQgfSBmcm9tICcuL0VkaXRvckNvbnRleHQnO1xuaW1wb3J0IHsgVGV4dENvbG9yUGlja2VyIH0gZnJvbSAnLi9FZGl0b3JUZXh0Q29sb3JQaWNrZXInO1xuaW1wb3J0IHR5cGUgeyBBbGlnbiwgRm9ybWF0LCBMaXN0LCBPcHRpb24sIFNpemUsIFRleHRDb2xvciwgVG9vbGJhclByb3BzIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBhcHBseUFsaWdubWVudCwgYXBwbHlBbGlnbm1lbnRJbkVtcHR5UmFuZ2UgfSBmcm9tICcuL3V0aWxzL2FsaWdubWVudCc7XG5pbXBvcnQgeyBhcHBseUxpc3QsIGFwcGx5TGlzdEluRW1wdHlSYW5nZSB9IGZyb20gJy4vdXRpbHMvbGlzdCc7XG5pbXBvcnQgeyBoYW5kbGVJbWFnZUZpbGUsIGluc2VydERpdmlkZXIgfSBmcm9tICcuL3V0aWxzL29wdGlvbnMnO1xuaW1wb3J0IHsgZ2V0VmFsaWRTZWxlY3Rpb24gfSBmcm9tICcuL3V0aWxzL3JhbmdlJztcbmltcG9ydCB7XG4gICAgZ2V0Q3VycmVudEFsaWdubWVudCxcbiAgICBnZXRDdXJyZW50Rm9ybWF0cyxcbiAgICBnZXRDdXJyZW50TGlzdHMsXG4gICAgZ2V0Q3VycmVudFNpemUsXG59IGZyb20gJy4vdXRpbHMvc2VsZWN0aW9uJztcbmltcG9ydCB7IGFwcGx5U3R5bGUsIGFwcGx5U3R5bGVJbkVtcHR5UmFuZ2UgfSBmcm9tICcuL3V0aWxzL3RleHRTdHlsZXMnO1xuXG5mdW5jdGlvbiBFZGl0b3JUb29sYmFyKHsgcmFkaXVzLCBzeCB9OiBUb29sYmFyUHJvcHMpIHtcbiAgICAvLyBwcm9wIGRlc3RydWN0aW9uXG4gICAgLy8gbGliIGhvb2tzXG4gICAgY29uc3QgeyBlZGl0b3JSZWYsIHNhdmVkUmFuZ2UgfSA9IHVzZUVkaXRvckNvbnRleHQoKTtcblxuICAgIC8vIGluaXRpYWwgdmFsdWVzXG4gICAgLy8gc3RhdGUsIHJlZiwgcXVlcnlzdHJpbmcgaG9va3NcbiAgICBjb25zdCBpbWFnZUZpbGVJbnB1dFJlZiA9IHVzZVJlZjxIVE1MSW5wdXRFbGVtZW50PihudWxsKTtcbiAgICBjb25zdCBbc2l6ZSwgc2V0U2l6ZV0gPSB1c2VTdGF0ZTxTaXplPihERUZBVUxUX0ZPTlRfU0laRSk7XG4gICAgY29uc3QgW2Zvcm1hdHMsIHNldEZvcm1hdHNdID0gdXNlU3RhdGU8UmVjb3JkPEZvcm1hdCwgYm9vbGVhbj4+KHtcbiAgICAgICAgYm9sZDogZmFsc2UsXG4gICAgICAgIGl0YWxpYzogZmFsc2UsXG4gICAgICAgIHVuZGVybGluZTogZmFsc2UsXG4gICAgICAgIHN0cmlrZXRocm91Z2g6IGZhbHNlLFxuICAgIH0pO1xuICAgIGNvbnN0IFthbGlnbiwgc2V0QWxpZ25dID0gdXNlU3RhdGU8QWxpZ24+KCdpbmhlcml0Jyk7XG4gICAgY29uc3QgW2xpc3RzLCBzZXRMaXN0c10gPSB1c2VTdGF0ZTxSZWNvcmQ8TGlzdCwgYm9vbGVhbj4+KHtcbiAgICAgICAgZGlzYzogZmFsc2UsXG4gICAgICAgIGRlY2ltYWw6IGZhbHNlLFxuICAgIH0pO1xuICAgIGNvbnN0IFtvcHRpb25zLCBzZXRPcHRpb25zXSA9IHVzZVN0YXRlPFJlY29yZDxPcHRpb24sIGJvb2xlYW4+Pih7XG4gICAgICAgIGltYWdlOiBmYWxzZSxcbiAgICAgICAgZGl2aWRlcjogZmFsc2UsXG4gICAgfSk7XG5cbiAgICAvLyBmb3JtIGhvb2tzXG4gICAgLy8gcXVlcnkgaG9va3NcbiAgICAvLyBjYWxjdWxhdGVkIHZhbHVlc1xuXG4gICAgLy8gaGFuZGxlcnNcblxuICAgIC8vIOuyhO2KvCDtgbTrpq3tlaAg65WMIO2ZnOyEse2ZlCDsg4Htg5zrpbwg7JWM66Ck7KO864qUIHRvZ2dsZSDtlajsiJhcbiAgICBjb25zdCB0b2dnbGVGb3JtYXRCdXR0b24gPSB1c2VDYWxsYmFjaygoZm9ybWF0OiBGb3JtYXQpID0+IHtcbiAgICAgICAgc2V0Rm9ybWF0cygocHJldikgPT4gKHtcbiAgICAgICAgICAgIC4uLnByZXYsXG4gICAgICAgICAgICBbZm9ybWF0XTogIXByZXZbZm9ybWF0XSxcbiAgICAgICAgfSkpO1xuICAgIH0sIFtdKTtcblxuICAgIGNvbnN0IHRvZ2dsZUFsaWduQnV0dG9uID0gdXNlQ2FsbGJhY2soKGFsaWdubWVudDogQWxpZ24pID0+IHtcbiAgICAgICAgc2V0QWxpZ24oYWxpZ25tZW50KTtcbiAgICB9LCBbXSk7XG5cbiAgICBjb25zdCB0b2dnbGVMaXN0QnV0dG9uID0gdXNlQ2FsbGJhY2soKGxpc3Q6IExpc3QpID0+IHtcbiAgICAgICAgc2V0TGlzdHMoKHByZXYpID0+IHtcbiAgICAgICAgICAgIGlmIChwcmV2W2xpc3RdKSByZXR1cm4gcHJldjtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBkaXNjOiBsaXN0ID09PSAnZGlzYycsXG4gICAgICAgICAgICAgICAgZGVjaW1hbDogbGlzdCA9PT0gJ2RlY2ltYWwnLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfSwgW10pO1xuXG4gICAgY29uc3QgaGFuZGxlU2l6ZSA9IChzaXplOiBTaXplKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgaXNWYWxpZCwgc2VsZWN0aW9uLCByYW5nZSB9ID0gZ2V0VmFsaWRTZWxlY3Rpb24oKTtcbiAgICAgICAgLy8g7Luk7IScIOyXhuuKlCDqsr3smrAgLT4g7Luk7IScIOyDneyEsVxuICAgICAgICBpZiAoIWlzVmFsaWQpIHtcbiAgICAgICAgICAgIGFwcGx5U3R5bGVJbkVtcHR5UmFuZ2UoZWRpdG9yUmVmLCBzaXplKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGx5U3R5bGUoc2VsZWN0aW9uISwgcmFuZ2UhLCBzaXplKTtcbiAgICB9O1xuXG4gICAgY29uc3QgaGFuZGxlQ29sb3IgPSAodGV4dENvbG9yVHlwZTogVGV4dENvbG9yLCBjb2xvcjogc3RyaW5nKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgaXNWYWxpZCwgc2VsZWN0aW9uLCByYW5nZSB9ID0gZ2V0VmFsaWRTZWxlY3Rpb24oKTtcbiAgICAgICAgLy8g7Luk7IScIOyXhuuKlCDqsr3smrAgLT4g7Luk7IScIOyDneyEsVxuICAgICAgICBpZiAoIWlzVmFsaWQpIHtcbiAgICAgICAgICAgIGFwcGx5U3R5bGVJbkVtcHR5UmFuZ2UoZWRpdG9yUmVmLCB0ZXh0Q29sb3JUeXBlLCBjb2xvcik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBhcHBseVN0eWxlKHNlbGVjdGlvbiEsIHJhbmdlISwgdGV4dENvbG9yVHlwZSwgY29sb3IpO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVGb3JtYXQgPSB1c2VDYWxsYmFjayhcbiAgICAgICAgKGZvcm1hdDogRm9ybWF0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IGlzVmFsaWQsIHNlbGVjdGlvbiwgcmFuZ2UgfSA9IGdldFZhbGlkU2VsZWN0aW9uKCk7XG4gICAgICAgICAgICAvLyDsu6TshJwg7JeG64qUIOqyveyasCAtPiDsu6TshJwg7IOd7ISxXG4gICAgICAgICAgICBpZiAoIWlzVmFsaWQpIHtcbiAgICAgICAgICAgICAgICBhcHBseVN0eWxlSW5FbXB0eVJhbmdlKGVkaXRvclJlZiwgZm9ybWF0KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRvZ2dsZUZvcm1hdEJ1dHRvbihmb3JtYXQpO1xuICAgICAgICAgICAgYXBwbHlTdHlsZShzZWxlY3Rpb24hLCByYW5nZSEsIGZvcm1hdCk7XG4gICAgICAgIH0sXG4gICAgICAgIFt0b2dnbGVGb3JtYXRCdXR0b25dLFxuICAgICk7XG5cbiAgICBjb25zdCBoYW5kbGVBbGlnbm1lbnQgPSB1c2VDYWxsYmFjayhcbiAgICAgICAgKGFsaWduOiBBbGlnbikgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBpc1ZhbGlkLCBzZWxlY3Rpb24sIHJhbmdlIH0gPSBnZXRWYWxpZFNlbGVjdGlvbigpO1xuICAgICAgICAgICAgLy8g7Luk7IScIOyXhuuKlCDqsr3smrAgLT4g7Luk7IScIOyDneyEsVxuICAgICAgICAgICAgaWYgKCFpc1ZhbGlkKSB7XG4gICAgICAgICAgICAgICAgYXBwbHlBbGlnbm1lbnRJbkVtcHR5UmFuZ2UoZWRpdG9yUmVmLCBhbGlnbik7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0b2dnbGVBbGlnbkJ1dHRvbihhbGlnbik7XG4gICAgICAgICAgICBhcHBseUFsaWdubWVudChzZWxlY3Rpb24hLCByYW5nZSEsIGFsaWduKTtcbiAgICAgICAgICAgIGVkaXRvclJlZi5jdXJyZW50Py5mb2N1cygpO1xuICAgICAgICB9LFxuICAgICAgICBbdG9nZ2xlQWxpZ25CdXR0b25dLFxuICAgICk7XG5cbiAgICBjb25zdCBoYW5kbGVMaXN0ID0gdXNlQ2FsbGJhY2soXG4gICAgICAgIChsaXN0OiBMaXN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IGlzVmFsaWQsIHNlbGVjdGlvbiwgcmFuZ2UgfSA9IGdldFZhbGlkU2VsZWN0aW9uKCk7XG4gICAgICAgICAgICAvLyDsu6TshJwg7JeG64qUIOqyveyasCAtPiDsu6TshJwg7IOd7ISxXG4gICAgICAgICAgICBpZiAoIWlzVmFsaWQpIHtcbiAgICAgICAgICAgICAgICBhcHBseUxpc3RJbkVtcHR5UmFuZ2UoZWRpdG9yUmVmLCBsaXN0KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRvZ2dsZUxpc3RCdXR0b24obGlzdCk7XG4gICAgICAgICAgICBhcHBseUxpc3Qoc2VsZWN0aW9uISwgcmFuZ2UhLCBsaXN0KTtcbiAgICAgICAgfSxcbiAgICAgICAgW3RvZ2dsZUxpc3RCdXR0b25dLFxuICAgICk7XG5cbiAgICBjb25zdCBoYW5kbGVPcHRpb24gPSB1c2VDYWxsYmFjaygob3B0aW9uOiBPcHRpb24pID0+IHtcbiAgICAgICAgc3dpdGNoIChvcHRpb24pIHtcbiAgICAgICAgICAgIGNhc2UgJ2RpdmlkZXInOlxuICAgICAgICAgICAgICAgIGluc2VydERpdmlkZXIoZWRpdG9yUmVmKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2ltYWdlJzpcbiAgICAgICAgICAgICAgICBpbWFnZUZpbGVJbnB1dFJlZi5jdXJyZW50Py5jbGljaygpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfSwgW10pO1xuXG4gICAgLy8gZWZmZWN0c1xuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IHVwZGF0ZUZvcm1hdHMgPSAoKSA9PiB7XG4gICAgICAgICAgICBzZXRGb3JtYXRzKGdldEN1cnJlbnRGb3JtYXRzKCkpO1xuICAgICAgICAgICAgc2V0QWxpZ24oZ2V0Q3VycmVudEFsaWdubWVudCgpKTtcbiAgICAgICAgICAgIHNldExpc3RzKGdldEN1cnJlbnRMaXN0cygpKTtcbiAgICAgICAgICAgIHNldFNpemUoZ2V0Q3VycmVudFNpemUoKSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc2VsZWN0aW9uY2hhbmdlJywgdXBkYXRlRm9ybWF0cyk7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB1cGRhdGVGb3JtYXRzKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCB1cGRhdGVGb3JtYXRzKTtcblxuICAgICAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2VsZWN0aW9uY2hhbmdlJywgdXBkYXRlRm9ybWF0cyk7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdXBkYXRlRm9ybWF0cyk7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXl1cCcsIHVwZGF0ZUZvcm1hdHMpO1xuICAgICAgICB9O1xuICAgIH0sIFtdKTtcblxuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY3NzPXtbdG9vbGJhckNvbnRhaW5lcihyYWRpdXMpLCBzeF19PlxuICAgICAgICAgICAgPGRpdiBjc3M9e2J1dHRvbkdyb3VwfT5cbiAgICAgICAgICAgICAgICA8U2VsZWN0XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXtzaXplfVxuICAgICAgICAgICAgICAgICAgICBvblZhbHVlQ2hhbmdlPXsodmFsdWUpID0+IGhhbmRsZVNpemUodmFsdWUgYXMgU2l6ZSl9XG4gICAgICAgICAgICAgICAgICAgIHNpemU9XCJzXCJcbiAgICAgICAgICAgICAgICAgICAgc3g9e3NlbGVjdENzc31cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxTZWxlY3QuVHJpZ2dlciBzeD17c2l6ZVNlbGVjdH0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8U2VsZWN0LlZhbHVlIC8+XG4gICAgICAgICAgICAgICAgICAgIDwvU2VsZWN0LlRyaWdnZXI+XG4gICAgICAgICAgICAgICAgICAgIDxTZWxlY3QuQ29udGVudD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxTZWxlY3QuSXRlbSB2YWx1ZT1cIjEwcHhcIj4xMHB4PC9TZWxlY3QuSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxTZWxlY3QuSXRlbSB2YWx1ZT1cIjEycHhcIj4xMnB4PC9TZWxlY3QuSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxTZWxlY3QuSXRlbSB2YWx1ZT1cIjE0cHhcIj4xNHB4PC9TZWxlY3QuSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxTZWxlY3QuSXRlbSB2YWx1ZT1cIjE2cHhcIj4xNnB4PC9TZWxlY3QuSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxTZWxlY3QuSXRlbSB2YWx1ZT1cIjI0cHhcIj4yNHB4PC9TZWxlY3QuSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxTZWxlY3QuSXRlbSB2YWx1ZT1cIjM2cHhcIj4zNnB4PC9TZWxlY3QuSXRlbT5cbiAgICAgICAgICAgICAgICAgICAgPC9TZWxlY3QuQ29udGVudD5cbiAgICAgICAgICAgICAgICA8L1NlbGVjdD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjc3M9e2J1dHRvbkdyb3VwfT5cbiAgICAgICAgICAgICAgICB7Zm9ybWF0QnV0dG9ucy5tYXAoKHsgZm9ybWF0LCBTdmcgfSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2Zvcm1hdH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZUZvcm1hdChmb3JtYXQgYXMgRm9ybWF0KX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNzcz17cGVyQnV0dG9uQ3NzfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8U3ZnIGNzcz17c3ZnQ3NzKGZvcm1hdHNbZm9ybWF0IGFzIEZvcm1hdF0pfSAvPlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjc3M9e2J1dHRvbkdyb3VwfT5cbiAgICAgICAgICAgICAgICA8VGV4dENvbG9yUGlja2VyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXsodGV4dENvbG9yVHlwZSwgY29sb3IpID0+IGhhbmRsZUNvbG9yKHRleHRDb2xvclR5cGUsIGNvbG9yKX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNzcz17YnV0dG9uR3JvdXB9PlxuICAgICAgICAgICAgICAgIHthbGlnbkJ1dHRvbnMubWFwKCh7IGFsaWdubWVudCwgU3ZnIH0pID0+IChcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAga2V5PXthbGlnbm1lbnR9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVBbGlnbm1lbnQoYWxpZ25tZW50IGFzIEFsaWduKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNzcz17cGVyQnV0dG9uQ3NzfVxuICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICA8U3ZnIGNzcz17c3ZnQ3NzKGFsaWduID09PSBhbGlnbm1lbnQpfSAvPlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjc3M9e2J1dHRvbkdyb3VwfT5cbiAgICAgICAgICAgICAgICB7bGlzdEJ1dHRvbnMubWFwKCh7IGxpc3QsIFN2ZyB9KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24ga2V5PXtsaXN0fSBvbkNsaWNrPXsoKSA9PiBoYW5kbGVMaXN0KGxpc3QgYXMgTGlzdCl9IGNzcz17cGVyQnV0dG9uQ3NzfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxTdmcgY3NzPXtzdmdDc3MobGlzdHNbbGlzdCBhcyBMaXN0XSl9IC8+XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNzcz17YnV0dG9uR3JvdXB9PlxuICAgICAgICAgICAgICAgIHtvcHRpb25CdXR0b25zLm1hcCgoeyBvcHRpb24sIFN2ZyB9KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIGtleT17b3B0aW9ufVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlT3B0aW9uKG9wdGlvbiBhcyBPcHRpb24pfVxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzPXtwZXJCdXR0b25Dc3N9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxTdmcgY3NzPXtzdmdDc3Mob3B0aW9uc1tvcHRpb24gYXMgT3B0aW9uXSl9IC8+XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiZmlsZVwiXG4gICAgICAgICAgICAgICAgICAgIGFjY2VwdD1cImltYWdlLypcIlxuICAgICAgICAgICAgICAgICAgICByZWY9e2ltYWdlRmlsZUlucHV0UmVmfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBkaXNwbGF5OiAnbm9uZScgfX1cbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBoYW5kbGVJbWFnZUZpbGUoZSwgZWRpdG9yUmVmLCBzYXZlZFJhbmdlKX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59XG5cbmV4cG9ydCB7IEVkaXRvclRvb2xiYXIgfTtcbiJdfQ== */"]
  }, (0, _react2.jsx)("div", {
    css: _Editor.buttonGroup
  }, (0, _react2.jsx)(_Select.Select, {
    value: size,
    onValueChange: value => handleSize(value),
    size: "s",
    sx: _Editor.selectCss
  }, (0, _react2.jsx)(_Select.Select.Trigger, {
    sx: _Editor.sizeSelect
  }, (0, _react2.jsx)(_Select.Select.Value, null)), (0, _react2.jsx)(_Select.Select.Content, null, (0, _react2.jsx)(_Select.Select.Item, {
    value: "10px"
  }, "10px"), (0, _react2.jsx)(_Select.Select.Item, {
    value: "12px"
  }, "12px"), (0, _react2.jsx)(_Select.Select.Item, {
    value: "14px"
  }, "14px"), (0, _react2.jsx)(_Select.Select.Item, {
    value: "16px"
  }, "16px"), (0, _react2.jsx)(_Select.Select.Item, {
    value: "24px"
  }, "24px"), (0, _react2.jsx)(_Select.Select.Item, {
    value: "36px"
  }, "36px")))), (0, _react2.jsx)("div", {
    css: _Editor.buttonGroup
  }, _constants.formatButtons.map(_ref2 => {
    var {
      format,
      Svg
    } = _ref2;
    return (0, _react2.jsx)("button", {
      key: format,
      onClick: () => handleFormat(format),
      css: _Editor.perButtonCss
    }, (0, _react2.jsx)(Svg, {
      css: (0, _Editor.svgCss)(formats[format])
    }));
  })), (0, _react2.jsx)("div", {
    css: _Editor.buttonGroup
  }, (0, _react2.jsx)(_EditorTextColorPicker.TextColorPicker, {
    onChange: (textColorType, color) => handleColor(textColorType, color)
  })), (0, _react2.jsx)("div", {
    css: _Editor.buttonGroup
  }, _constants.alignButtons.map(_ref3 => {
    var {
      alignment,
      Svg
    } = _ref3;
    return (0, _react2.jsx)("button", {
      key: alignment,
      onClick: () => handleAlignment(alignment),
      css: _Editor.perButtonCss
    }, (0, _react2.jsx)(Svg, {
      css: (0, _Editor.svgCss)(align === alignment)
    }));
  })), (0, _react2.jsx)("div", {
    css: _Editor.buttonGroup
  }, _constants.listButtons.map(_ref4 => {
    var {
      list,
      Svg
    } = _ref4;
    return (0, _react2.jsx)("button", {
      key: list,
      onClick: () => handleList(list),
      css: _Editor.perButtonCss
    }, (0, _react2.jsx)(Svg, {
      css: (0, _Editor.svgCss)(lists[list])
    }));
  })), (0, _react2.jsx)("div", {
    css: _Editor.buttonGroup
  }, _constants.optionButtons.map(_ref5 => {
    var {
      option,
      Svg
    } = _ref5;
    return (0, _react2.jsx)("button", {
      key: option,
      onClick: () => handleOption(option),
      css: _Editor.perButtonCss
    }, (0, _react2.jsx)(Svg, {
      css: (0, _Editor.svgCss)(options[option])
    }));
  }), (0, _react2.jsx)("input", {
    type: "file",
    accept: "image/*",
    ref: imageFileInputRef,
    style: {
      display: 'none'
    },
    onChange: e => (0, _options.handleImageFile)(e, editorRef, savedRange)
  })));
}