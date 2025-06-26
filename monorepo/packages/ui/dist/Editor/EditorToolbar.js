"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditorToolbar = EditorToolbar;
var _Select = require("../Select");
var _constants = require("@ssoc/constants");
var _react = _interopRequireWildcard(require("react"));
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
    css: [(0, _Editor.toolbarContainer)(radius), sx, process.env.NODE_ENV === "production" ? "" : ";label:EditorToolbar;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9FZGl0b3IvRWRpdG9yVG9vbGJhci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBMExhIiwiZmlsZSI6Ii4uLy4uL3NyYy9FZGl0b3IvRWRpdG9yVG9vbGJhci50c3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZWxlY3QgfSBmcm9tICcuLi9TZWxlY3QnO1xuaW1wb3J0IHtcbiAgICBhbGlnbkJ1dHRvbnMsXG4gICAgREVGQVVMVF9GT05UX1NJWkUsXG4gICAgZm9ybWF0QnV0dG9ucyxcbiAgICBsaXN0QnV0dG9ucyxcbiAgICBvcHRpb25CdXR0b25zLFxufSBmcm9tICdAc3NvYy9jb25zdGFudHMnO1xuaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrLCB1c2VFZmZlY3QsIHVzZVJlZiwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQge1xuICAgIGJ1dHRvbkdyb3VwLFxuICAgIHBlckJ1dHRvbkNzcyxcbiAgICBzZWxlY3RDc3MsXG4gICAgc2l6ZVNlbGVjdCxcbiAgICBzdmdDc3MsXG4gICAgdG9vbGJhckNvbnRhaW5lcixcbn0gZnJvbSAnLi9FZGl0b3Iuc3R5bGUnO1xuaW1wb3J0IHsgdXNlRWRpdG9yQ29udGV4dCB9IGZyb20gJy4vRWRpdG9yQ29udGV4dCc7XG5pbXBvcnQgeyBUZXh0Q29sb3JQaWNrZXIgfSBmcm9tICcuL0VkaXRvclRleHRDb2xvclBpY2tlcic7XG5pbXBvcnQgdHlwZSB7IEFsaWduLCBGb3JtYXQsIExpc3QsIE9wdGlvbiwgU2l6ZSwgVGV4dENvbG9yLCBUb29sYmFyUHJvcHMgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IGFwcGx5QWxpZ25tZW50LCBhcHBseUFsaWdubWVudEluRW1wdHlSYW5nZSB9IGZyb20gJy4vdXRpbHMvYWxpZ25tZW50JztcbmltcG9ydCB7IGFwcGx5TGlzdCwgYXBwbHlMaXN0SW5FbXB0eVJhbmdlIH0gZnJvbSAnLi91dGlscy9saXN0JztcbmltcG9ydCB7IGhhbmRsZUltYWdlRmlsZSwgaW5zZXJ0RGl2aWRlciB9IGZyb20gJy4vdXRpbHMvb3B0aW9ucyc7XG5pbXBvcnQgeyBnZXRWYWxpZFNlbGVjdGlvbiB9IGZyb20gJy4vdXRpbHMvcmFuZ2UnO1xuaW1wb3J0IHtcbiAgICBnZXRDdXJyZW50QWxpZ25tZW50LFxuICAgIGdldEN1cnJlbnRGb3JtYXRzLFxuICAgIGdldEN1cnJlbnRMaXN0cyxcbiAgICBnZXRDdXJyZW50U2l6ZSxcbn0gZnJvbSAnLi91dGlscy9zZWxlY3Rpb24nO1xuaW1wb3J0IHsgYXBwbHlTdHlsZSwgYXBwbHlTdHlsZUluRW1wdHlSYW5nZSB9IGZyb20gJy4vdXRpbHMvdGV4dFN0eWxlcyc7XG5cbmZ1bmN0aW9uIEVkaXRvclRvb2xiYXIoeyByYWRpdXMsIHN4IH06IFRvb2xiYXJQcm9wcykge1xuICAgIC8vIHByb3AgZGVzdHJ1Y3Rpb25cbiAgICAvLyBsaWIgaG9va3NcbiAgICBjb25zdCB7IGVkaXRvclJlZiwgc2F2ZWRSYW5nZSB9ID0gdXNlRWRpdG9yQ29udGV4dCgpO1xuXG4gICAgLy8gaW5pdGlhbCB2YWx1ZXNcbiAgICAvLyBzdGF0ZSwgcmVmLCBxdWVyeXN0cmluZyBob29rc1xuICAgIGNvbnN0IGltYWdlRmlsZUlucHV0UmVmID0gdXNlUmVmPEhUTUxJbnB1dEVsZW1lbnQ+KG51bGwpO1xuICAgIGNvbnN0IFtzaXplLCBzZXRTaXplXSA9IHVzZVN0YXRlPFNpemU+KERFRkFVTFRfRk9OVF9TSVpFKTtcbiAgICBjb25zdCBbZm9ybWF0cywgc2V0Rm9ybWF0c10gPSB1c2VTdGF0ZTxSZWNvcmQ8Rm9ybWF0LCBib29sZWFuPj4oe1xuICAgICAgICBib2xkOiBmYWxzZSxcbiAgICAgICAgaXRhbGljOiBmYWxzZSxcbiAgICAgICAgdW5kZXJsaW5lOiBmYWxzZSxcbiAgICAgICAgc3RyaWtldGhyb3VnaDogZmFsc2UsXG4gICAgfSk7XG4gICAgY29uc3QgW2FsaWduLCBzZXRBbGlnbl0gPSB1c2VTdGF0ZTxBbGlnbj4oJ2luaGVyaXQnKTtcbiAgICBjb25zdCBbbGlzdHMsIHNldExpc3RzXSA9IHVzZVN0YXRlPFJlY29yZDxMaXN0LCBib29sZWFuPj4oe1xuICAgICAgICBkaXNjOiBmYWxzZSxcbiAgICAgICAgZGVjaW1hbDogZmFsc2UsXG4gICAgfSk7XG4gICAgY29uc3QgW29wdGlvbnMsIHNldE9wdGlvbnNdID0gdXNlU3RhdGU8UmVjb3JkPE9wdGlvbiwgYm9vbGVhbj4+KHtcbiAgICAgICAgaW1hZ2U6IGZhbHNlLFxuICAgICAgICBkaXZpZGVyOiBmYWxzZSxcbiAgICB9KTtcblxuICAgIC8vIGZvcm0gaG9va3NcbiAgICAvLyBxdWVyeSBob29rc1xuICAgIC8vIGNhbGN1bGF0ZWQgdmFsdWVzXG5cbiAgICAvLyBoYW5kbGVyc1xuXG4gICAgLy8g67KE7Yq8IO2BtOumre2VoCDrlYwg7Zmc7ISx7ZmUIOyDge2DnOulvCDslYzroKTso7zripQgdG9nZ2xlIO2VqOyImFxuICAgIGNvbnN0IHRvZ2dsZUZvcm1hdEJ1dHRvbiA9IHVzZUNhbGxiYWNrKChmb3JtYXQ6IEZvcm1hdCkgPT4ge1xuICAgICAgICBzZXRGb3JtYXRzKChwcmV2KSA9PiAoe1xuICAgICAgICAgICAgLi4ucHJldixcbiAgICAgICAgICAgIFtmb3JtYXRdOiAhcHJldltmb3JtYXRdLFxuICAgICAgICB9KSk7XG4gICAgfSwgW10pO1xuXG4gICAgY29uc3QgdG9nZ2xlQWxpZ25CdXR0b24gPSB1c2VDYWxsYmFjaygoYWxpZ25tZW50OiBBbGlnbikgPT4ge1xuICAgICAgICBzZXRBbGlnbihhbGlnbm1lbnQpO1xuICAgIH0sIFtdKTtcblxuICAgIGNvbnN0IHRvZ2dsZUxpc3RCdXR0b24gPSB1c2VDYWxsYmFjaygobGlzdDogTGlzdCkgPT4ge1xuICAgICAgICBzZXRMaXN0cygocHJldikgPT4ge1xuICAgICAgICAgICAgaWYgKHByZXZbbGlzdF0pIHJldHVybiBwcmV2O1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGRpc2M6IGxpc3QgPT09ICdkaXNjJyxcbiAgICAgICAgICAgICAgICBkZWNpbWFsOiBsaXN0ID09PSAnZGVjaW1hbCcsXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9LCBbXSk7XG5cbiAgICBjb25zdCBoYW5kbGVTaXplID0gKHNpemU6IFNpemUpID0+IHtcbiAgICAgICAgY29uc3QgeyBpc1ZhbGlkLCBzZWxlY3Rpb24sIHJhbmdlIH0gPSBnZXRWYWxpZFNlbGVjdGlvbigpO1xuICAgICAgICAvLyDsu6TshJwg7JeG64qUIOqyveyasCAtPiDsu6TshJwg7IOd7ISxXG4gICAgICAgIGlmICghaXNWYWxpZCkge1xuICAgICAgICAgICAgYXBwbHlTdHlsZUluRW1wdHlSYW5nZShlZGl0b3JSZWYsIHNpemUpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgYXBwbHlTdHlsZShzZWxlY3Rpb24hLCByYW5nZSEsIHNpemUpO1xuICAgIH07XG5cbiAgICBjb25zdCBoYW5kbGVDb2xvciA9ICh0ZXh0Q29sb3JUeXBlOiBUZXh0Q29sb3IsIGNvbG9yOiBzdHJpbmcpID0+IHtcbiAgICAgICAgY29uc3QgeyBpc1ZhbGlkLCBzZWxlY3Rpb24sIHJhbmdlIH0gPSBnZXRWYWxpZFNlbGVjdGlvbigpO1xuICAgICAgICAvLyDsu6TshJwg7JeG64qUIOqyveyasCAtPiDsu6TshJwg7IOd7ISxXG4gICAgICAgIGlmICghaXNWYWxpZCkge1xuICAgICAgICAgICAgYXBwbHlTdHlsZUluRW1wdHlSYW5nZShlZGl0b3JSZWYsIHRleHRDb2xvclR5cGUsIGNvbG9yKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGx5U3R5bGUoc2VsZWN0aW9uISwgcmFuZ2UhLCB0ZXh0Q29sb3JUeXBlLCBjb2xvcik7XG4gICAgfTtcblxuICAgIGNvbnN0IGhhbmRsZUZvcm1hdCA9IHVzZUNhbGxiYWNrKFxuICAgICAgICAoZm9ybWF0OiBGb3JtYXQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgaXNWYWxpZCwgc2VsZWN0aW9uLCByYW5nZSB9ID0gZ2V0VmFsaWRTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgIC8vIOy7pOyEnCDsl4bripQg6rK97JqwIC0+IOy7pOyEnCDsg53shLFcbiAgICAgICAgICAgIGlmICghaXNWYWxpZCkge1xuICAgICAgICAgICAgICAgIGFwcGx5U3R5bGVJbkVtcHR5UmFuZ2UoZWRpdG9yUmVmLCBmb3JtYXQpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdG9nZ2xlRm9ybWF0QnV0dG9uKGZvcm1hdCk7XG4gICAgICAgICAgICBhcHBseVN0eWxlKHNlbGVjdGlvbiEsIHJhbmdlISwgZm9ybWF0KTtcbiAgICAgICAgfSxcbiAgICAgICAgW3RvZ2dsZUZvcm1hdEJ1dHRvbl0sXG4gICAgKTtcblxuICAgIGNvbnN0IGhhbmRsZUFsaWdubWVudCA9IHVzZUNhbGxiYWNrKFxuICAgICAgICAoYWxpZ246IEFsaWduKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB7IGlzVmFsaWQsIHNlbGVjdGlvbiwgcmFuZ2UgfSA9IGdldFZhbGlkU2VsZWN0aW9uKCk7XG4gICAgICAgICAgICAvLyDsu6TshJwg7JeG64qUIOqyveyasCAtPiDsu6TshJwg7IOd7ISxXG4gICAgICAgICAgICBpZiAoIWlzVmFsaWQpIHtcbiAgICAgICAgICAgICAgICBhcHBseUFsaWdubWVudEluRW1wdHlSYW5nZShlZGl0b3JSZWYsIGFsaWduKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRvZ2dsZUFsaWduQnV0dG9uKGFsaWduKTtcbiAgICAgICAgICAgIGFwcGx5QWxpZ25tZW50KHNlbGVjdGlvbiEsIHJhbmdlISwgYWxpZ24pO1xuICAgICAgICAgICAgZWRpdG9yUmVmLmN1cnJlbnQ/LmZvY3VzKCk7XG4gICAgICAgIH0sXG4gICAgICAgIFt0b2dnbGVBbGlnbkJ1dHRvbl0sXG4gICAgKTtcblxuICAgIGNvbnN0IGhhbmRsZUxpc3QgPSB1c2VDYWxsYmFjayhcbiAgICAgICAgKGxpc3Q6IExpc3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHsgaXNWYWxpZCwgc2VsZWN0aW9uLCByYW5nZSB9ID0gZ2V0VmFsaWRTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgIC8vIOy7pOyEnCDsl4bripQg6rK97JqwIC0+IOy7pOyEnCDsg53shLFcbiAgICAgICAgICAgIGlmICghaXNWYWxpZCkge1xuICAgICAgICAgICAgICAgIGFwcGx5TGlzdEluRW1wdHlSYW5nZShlZGl0b3JSZWYsIGxpc3QpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdG9nZ2xlTGlzdEJ1dHRvbihsaXN0KTtcbiAgICAgICAgICAgIGFwcGx5TGlzdChzZWxlY3Rpb24hLCByYW5nZSEsIGxpc3QpO1xuICAgICAgICB9LFxuICAgICAgICBbdG9nZ2xlTGlzdEJ1dHRvbl0sXG4gICAgKTtcblxuICAgIGNvbnN0IGhhbmRsZU9wdGlvbiA9IHVzZUNhbGxiYWNrKChvcHRpb246IE9wdGlvbikgPT4ge1xuICAgICAgICBzd2l0Y2ggKG9wdGlvbikge1xuICAgICAgICAgICAgY2FzZSAnZGl2aWRlcic6XG4gICAgICAgICAgICAgICAgaW5zZXJ0RGl2aWRlcihlZGl0b3JSZWYpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnaW1hZ2UnOlxuICAgICAgICAgICAgICAgIGltYWdlRmlsZUlucHV0UmVmLmN1cnJlbnQ/LmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9LCBbXSk7XG5cbiAgICAvLyBlZmZlY3RzXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgY29uc3QgdXBkYXRlRm9ybWF0cyA9ICgpID0+IHtcbiAgICAgICAgICAgIHNldEZvcm1hdHMoZ2V0Q3VycmVudEZvcm1hdHMoKSk7XG4gICAgICAgICAgICBzZXRBbGlnbihnZXRDdXJyZW50QWxpZ25tZW50KCkpO1xuICAgICAgICAgICAgc2V0TGlzdHMoZ2V0Q3VycmVudExpc3RzKCkpO1xuICAgICAgICAgICAgc2V0U2l6ZShnZXRDdXJyZW50U2l6ZSgpKTtcbiAgICAgICAgfTtcblxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdzZWxlY3Rpb25jaGFuZ2UnLCB1cGRhdGVGb3JtYXRzKTtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHVwZGF0ZUZvcm1hdHMpO1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIHVwZGF0ZUZvcm1hdHMpO1xuXG4gICAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdzZWxlY3Rpb25jaGFuZ2UnLCB1cGRhdGVGb3JtYXRzKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB1cGRhdGVGb3JtYXRzKTtcbiAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleXVwJywgdXBkYXRlRm9ybWF0cyk7XG4gICAgICAgIH07XG4gICAgfSwgW10pO1xuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjc3M9e1t0b29sYmFyQ29udGFpbmVyKHJhZGl1cyksIHN4XX0+XG4gICAgICAgICAgICA8ZGl2IGNzcz17YnV0dG9uR3JvdXB9PlxuICAgICAgICAgICAgICAgIDxTZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3NpemV9XG4gICAgICAgICAgICAgICAgICAgIG9uVmFsdWVDaGFuZ2U9eyh2YWx1ZSkgPT4gaGFuZGxlU2l6ZSh2YWx1ZSBhcyBTaXplKX1cbiAgICAgICAgICAgICAgICAgICAgc2l6ZT1cInNcIlxuICAgICAgICAgICAgICAgICAgICBzeD17c2VsZWN0Q3NzfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPFNlbGVjdC5UcmlnZ2VyIHN4PXtzaXplU2VsZWN0fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxTZWxlY3QuVmFsdWUgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9TZWxlY3QuVHJpZ2dlcj5cbiAgICAgICAgICAgICAgICAgICAgPFNlbGVjdC5Db250ZW50PlxuICAgICAgICAgICAgICAgICAgICAgICAgPFNlbGVjdC5JdGVtIHZhbHVlPVwiMTBweFwiPjEwcHg8L1NlbGVjdC5JdGVtPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFNlbGVjdC5JdGVtIHZhbHVlPVwiMTJweFwiPjEycHg8L1NlbGVjdC5JdGVtPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFNlbGVjdC5JdGVtIHZhbHVlPVwiMTRweFwiPjE0cHg8L1NlbGVjdC5JdGVtPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFNlbGVjdC5JdGVtIHZhbHVlPVwiMTZweFwiPjE2cHg8L1NlbGVjdC5JdGVtPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFNlbGVjdC5JdGVtIHZhbHVlPVwiMjRweFwiPjI0cHg8L1NlbGVjdC5JdGVtPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFNlbGVjdC5JdGVtIHZhbHVlPVwiMzZweFwiPjM2cHg8L1NlbGVjdC5JdGVtPlxuICAgICAgICAgICAgICAgICAgICA8L1NlbGVjdC5Db250ZW50PlxuICAgICAgICAgICAgICAgIDwvU2VsZWN0PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNzcz17YnV0dG9uR3JvdXB9PlxuICAgICAgICAgICAgICAgIHtmb3JtYXRCdXR0b25zLm1hcCgoeyBmb3JtYXQsIFN2ZyB9KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgIGtleT17Zm9ybWF0fVxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gaGFuZGxlRm9ybWF0KGZvcm1hdCBhcyBGb3JtYXQpfVxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzPXtwZXJCdXR0b25Dc3N9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxTdmcgY3NzPXtzdmdDc3MoZm9ybWF0c1tmb3JtYXQgYXMgRm9ybWF0XSl9IC8+XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNzcz17YnV0dG9uR3JvdXB9PlxuICAgICAgICAgICAgICAgIDxUZXh0Q29sb3JQaWNrZXJcbiAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyh0ZXh0Q29sb3JUeXBlLCBjb2xvcikgPT4gaGFuZGxlQ29sb3IodGV4dENvbG9yVHlwZSwgY29sb3IpfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY3NzPXtidXR0b25Hcm91cH0+XG4gICAgICAgICAgICAgICAge2FsaWduQnV0dG9ucy5tYXAoKHsgYWxpZ25tZW50LCBTdmcgfSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2FsaWdubWVudH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGhhbmRsZUFsaWdubWVudChhbGlnbm1lbnQgYXMgQWxpZ24pfVxuICAgICAgICAgICAgICAgICAgICAgICAgY3NzPXtwZXJCdXR0b25Dc3N9XG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxTdmcgY3NzPXtzdmdDc3MoYWxpZ24gPT09IGFsaWdubWVudCl9IC8+XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNzcz17YnV0dG9uR3JvdXB9PlxuICAgICAgICAgICAgICAgIHtsaXN0QnV0dG9ucy5tYXAoKHsgbGlzdCwgU3ZnIH0pID0+IChcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBrZXk9e2xpc3R9IG9uQ2xpY2s9eygpID0+IGhhbmRsZUxpc3QobGlzdCBhcyBMaXN0KX0gY3NzPXtwZXJCdXR0b25Dc3N9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPFN2ZyBjc3M9e3N2Z0NzcyhsaXN0c1tsaXN0IGFzIExpc3RdKX0gLz5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY3NzPXtidXR0b25Hcm91cH0+XG4gICAgICAgICAgICAgICAge29wdGlvbkJ1dHRvbnMubWFwKCh7IG9wdGlvbiwgU3ZnIH0pID0+IChcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtvcHRpb259XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBoYW5kbGVPcHRpb24ob3B0aW9uIGFzIE9wdGlvbil9XG4gICAgICAgICAgICAgICAgICAgICAgICBjc3M9e3BlckJ1dHRvbkNzc31cbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFN2ZyBjc3M9e3N2Z0NzcyhvcHRpb25zW29wdGlvbiBhcyBPcHRpb25dKX0gLz5cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJmaWxlXCJcbiAgICAgICAgICAgICAgICAgICAgYWNjZXB0PVwiaW1hZ2UvKlwiXG4gICAgICAgICAgICAgICAgICAgIHJlZj17aW1hZ2VGaWxlSW5wdXRSZWZ9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IGRpc3BsYXk6ICdub25lJyB9fVxuICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IGhhbmRsZUltYWdlRmlsZShlLCBlZGl0b3JSZWYsIHNhdmVkUmFuZ2UpfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn1cblxuZXhwb3J0IHsgRWRpdG9yVG9vbGJhciB9O1xuIl19 */"]
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