"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.splitTextAndApplyStyleAtCursor = exports.applyStyleInSelectedText = exports.applyStyleInEmptyRange = exports.applyStyle = void 0;
var _styles = _interopRequireDefault(require("@ssoc/styles"));
var _alignment = require("./alignment");
var _range = require("./range");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
var applyStyleInSelectedText = exports.applyStyleInSelectedText = function applyStyleInSelectedText(text, parent, style, isSpan, selectedStart, selectedEnd) {
  var isOverallStyle = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : true;
  var color = arguments.length > 7 ? arguments[7] : undefined;
  var originalStyle = isSpan ? (parent === null || parent === void 0 ? void 0 : parent.getAttribute('style')) || '' : '';
  var before = text.slice(0, selectedStart);
  var selected = text.slice(selectedStart, selectedEnd);
  var after = text.slice(selectedEnd);
  var frag = document.createDocumentFragment();
  if (before) frag.appendChild(createSpan(style, before, originalStyle, undefined, undefined, color));
  frag.appendChild(createSpan(style, selected, originalStyle, true, isOverallStyle, color));
  if (after) frag.appendChild(createSpan(style, after, originalStyle, undefined, undefined, color));
  return frag;
};
var splitTextAndApplyStyleAtCursor = (currentNode, offset, parent, style, emptyTextNode, color) => {
  var grandParent = parent.parentElement;
  var text = currentNode.nodeType === Node.TEXT_NODE ? currentNode.nodeValue : '';
  var before = text.slice(0, offset);
  var after = text.slice(offset);
  if (before) {
    var beforeSpan = parent.cloneNode(false);
    beforeSpan.textContent = before;
    grandParent.insertBefore(beforeSpan, parent);
  }
  var newSpan = parent.cloneNode(false);
  applyTextStyle(newSpan, style, undefined, color);
  newSpan.appendChild(emptyTextNode);
  grandParent.insertBefore(newSpan, parent);
  if (after) {
    var afterSpan = parent.cloneNode(false);
    afterSpan.textContent = after;
    grandParent.insertBefore(afterSpan, parent);
  }
  grandParent.removeChild(parent);
};
exports.splitTextAndApplyStyleAtCursor = splitTextAndApplyStyleAtCursor;
var createSpan = function createSpan(style, text, originalStyle) {
  var applyNewStyle = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var isOverallStyle = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
  var color = arguments.length > 5 ? arguments[5] : undefined;
  var span = document.createElement('span');
  span.style.cssText = originalStyle;
  if (applyNewStyle) applyTextStyle(span, style, isOverallStyle, color);
  span.textContent = text;
  return span;
};
var hasColor = (elem, colorType, color) => {
  switch (colorType) {
    case 'color':
      return elem.style.color === color;
    case 'background':
      return elem.style.backgroundColor === color;
    default:
      return false;
  }
};
var toggleColor = (elem, colorType, color, shouldApply) => {
  switch (colorType) {
    case 'color':
      elem.style.color = shouldApply ? color : elem.style.color;
      break;
    case 'background':
      if (color === _styles.default.colors.white) color = 'transparent';
      elem.style.backgroundColor = shouldApply ? color : elem.style.backgroundColor;
      break;
  }
};
var hasTextStyle = (elem, style, color) => {
  if (style && color) return hasColor(elem, style, color);
  if (style.endsWith('px')) return elem.style.fontSize === style;
  switch (style) {
    case 'bold':
      return elem.style.fontWeight === 'bold';
    case 'italic':
      return elem.style.fontStyle === 'italic';
    case 'underline':
      return elem.style.textDecoration.includes('underline');
    case 'strikethrough':
      return elem.style.textDecoration.includes('line-through');
    default:
      return false;
  }
};
var toggleTextStyle = (elem, style, shouldApply, color) => {
  if (style && color) toggleColor(elem, style, color, shouldApply);
  if (style.endsWith('px')) elem.style.fontSize = shouldApply ? style : elem.style.fontSize;
  switch (style) {
    case 'bold':
      elem.style.fontWeight = shouldApply ? 'bold' : '';
      break;
    case 'italic':
      elem.style.fontStyle = shouldApply ? 'italic' : '';
      break;
    case 'underline':
      elem.style.textDecoration = toggleTextDecoration(elem.style.textDecoration, 'underline', shouldApply);
      break;
    case 'strikethrough':
      elem.style.textDecoration = toggleTextDecoration(elem.style.textDecoration, 'line-through', shouldApply);
      break;
  }
};
var toggleTextDecoration = (current, style, shouldApply) => {
  var values = current.split(' ').map(value => value.trim()).filter(value => value.length > 0);
  var isExist = values.includes(style);
  if (shouldApply && !isExist) {
    return [...values, style].join(' ');
  } else if (!shouldApply && isExist) {
    return values.filter(value => value !== style).join(' ');
  } else {
    return current;
  }
};
var applyTextStyle = function applyTextStyle(span, style) {
  var isOverallStyle = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var color = arguments.length > 3 ? arguments[3] : undefined;
  var has = hasTextStyle(span, style, color);
  var toggledHas = !isOverallStyle ? !has : has;
  toggleTextStyle(span, style, !toggledHas, color);
};
var applyTextStyleAtCursor = (selection, range, style, color) => {
  var _currentNode$parentEl;
  var currentNode = range.startContainer;
  var offset = range.startOffset;
  var emptyTextNode = document.createTextNode('\u200B');
  var spanAncestor = (_currentNode$parentEl = currentNode.parentElement) === null || _currentNode$parentEl === void 0 ? void 0 : _currentNode$parentEl.closest('span');
  if (spanAncestor) {
    splitTextAndApplyStyleAtCursor(currentNode, offset, spanAncestor, style, emptyTextNode, color);
  } else {
    var span = document.createElement('span');
    applyTextStyle(span, style, undefined, color);
    span.appendChild(emptyTextNode);
    range.insertNode(span);
  }
  (0, _range.handleNewRange)(emptyTextNode, selection);
};
var applyTextStyleInSingleTextNode = (range, style, color) => {
  var textNode = range.startContainer;
  var text = textNode.textContent || '';
  var startOffset = range.startOffset;
  var endOffset = range.endOffset;
  var parent = textNode.parentNode;
  var grandParent = parent === null || parent === void 0 ? void 0 : parent.parentNode;
  var isSpan = (parent === null || parent === void 0 ? void 0 : parent.nodeName) === 'SPAN';
  if (isSpan) {
    grandParent === null || grandParent === void 0 || grandParent.removeChild(parent);
  } else {
    parent === null || parent === void 0 || parent.removeChild(textNode);
  }
  range.insertNode(applyStyleInSelectedText(text, parent, style, isSpan, startOffset, endOffset, undefined, color));
};
var applyTextStyleInMultipleTextNode = (range, style, color) => {
  var textNodesInCommon = (0, _range.getTextNodes)(range);
  var isOverallStyle = textNodesInCommon.every(textNode => {
    var parent = textNode.parentElement;
    return (parent === null || parent === void 0 ? void 0 : parent.tagName) === 'SPAN' && hasTextStyle(parent, style, color);
  });
  textNodesInCommon.forEach((textNode, index) => {
    var parent = textNode.parentElement;
    var text = textNode.textContent || '';
    var isSpan = (parent === null || parent === void 0 ? void 0 : parent.tagName) === 'SPAN';
    var isFirst = index === 0;
    var isLast = index === textNodesInCommon.length - 1;
    var start = isFirst ? range.startOffset : 0;
    var end = isLast ? range.endOffset : text.length;
    if (start !== 0 || end !== text.length) {
      var frag = applyStyleInSelectedText(text, parent, style, isSpan, start, end, isOverallStyle, color);
      if (isSpan) {
        parent.replaceWith(frag);
      } else {
        textNode.replaceWith(frag);
      }
      return;
    }
    if (isSpan) {
      toggleTextStyle(parent, style, !isOverallStyle, color);
    } else {
      var span = document.createElement('span');
      span.textContent = text;
      applyTextStyle(span, style, undefined, color);
      textNode.replaceWith(span);
    }
  });
};
var getFormatStyle = (style, color) => {
  if (style && color) {
    if (style === 'color') return {
      color: color
    };
    if (style === 'background') return {
      backgroundColor: color
    };
  }
  if (style.endsWith('px')) return {
    fontSize: style.toString()
  };
  switch (style) {
    case 'bold':
      return {
        fontWeight: 'bold'
      };
    case 'italic':
      return {
        fontStyle: 'italic'
      };
    case 'underline':
      return {
        textDecoration: 'underline'
      };
    case 'strikethrough':
      return {
        textDecoration: 'line-through'
      };
    default:
      return {};
  }
};
var applyStyleInEmptyRange = (editorRef, style, color) => {
  if (!editorRef.current) return;
  var cssStyle = getFormatStyle(style, color);
  var existingZWSP = Array.from(editorRef.current.querySelectorAll('span')).find(span => span.textContent === '\u200B');
  if (existingZWSP) {
    Object.assign(existingZWSP.style, cssStyle);
    (0, _range.applyAttributeInEmptyRange)(editorRef, existingZWSP);
  } else {
    var span = document.createElement('span');
    Object.assign(span.style, cssStyle);
    span.innerText = '\u200B';
    (0, _range.applyAttributeInEmptyRange)(editorRef, span);
  }
};
exports.applyStyleInEmptyRange = applyStyleInEmptyRange;
var applyStyle = (selection, range, style, color) => {
  var editor = (0, _alignment.getEditorRoot)(range);
  if (!editor) return;
  if (range.collapsed) {
    return applyTextStyleAtCursor(selection, range, style, color);
  }
  if (range.startContainer.nodeType === Node.TEXT_NODE && range.endContainer.nodeType === Node.TEXT_NODE && range.startContainer === range.endContainer) {
    return applyTextStyleInSingleTextNode(range, style, color);
  }
  return applyTextStyleInMultipleTextNode(range, style, color);
};
exports.applyStyle = applyStyle;