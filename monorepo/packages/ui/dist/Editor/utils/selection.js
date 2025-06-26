"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCurrentSize = exports.getCurrentLists = exports.getCurrentFormats = exports.getCurrentAlignment = void 0;
var _constants = require("@ssoc/constants");
var _alignment = require("./alignment");
var _list = require("./list");
var _range = require("./range");
var getCurrentFormats = () => {
  var formatMap = {
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false
  };
  var {
    isValid,
    range
  } = (0, _range.getValidSelection)();
  if (!isValid) return formatMap;
  if (range.collapsed) {
    var node = range.startContainer;
    var parent = node.nodeType === Node.TEXT_NODE ? node.parentElement : node;
    if ((parent === null || parent === void 0 ? void 0 : parent.tagName) === 'SPAN') {
      formatMap.bold = parent.style.fontWeight === 'bold';
      formatMap.italic = parent.style.fontStyle === 'italic';
      formatMap.underline = parent.style.textDecoration.includes('underline');
      formatMap.strikethrough = parent.style.textDecoration.includes('line-through');
      return formatMap;
    }
    return {
      bold: false,
      italic: false,
      underline: false,
      strikethrough: false
    };
  }
  if (range.startContainer === range.endContainer && range.startContainer.nodeType === Node.TEXT_NODE) {
    var _node$nodeValue$slice, _node$nodeValue;
    var _node = range.startContainer;
    var selectedText = (_node$nodeValue$slice = (_node$nodeValue = _node.nodeValue) === null || _node$nodeValue === void 0 ? void 0 : _node$nodeValue.slice(range.startOffset, range.endOffset)) !== null && _node$nodeValue$slice !== void 0 ? _node$nodeValue$slice : '';
    if (!selectedText.trim()) return formatMap;
    var _parent = _node.parentElement;
    if ((_parent === null || _parent === void 0 ? void 0 : _parent.tagName) === 'SPAN') {
      if (_parent.style.fontWeight === 'bold') formatMap.bold = true;
      if (_parent.style.fontStyle === 'italic') formatMap.italic = true;
      if (_parent.style.textDecoration.includes('underline')) formatMap.underline = true;
      if (_parent.style.textDecoration.includes('line-through')) formatMap.strikethrough = true;
    }
    return formatMap;
  }
  var textNodes = (0, _range.getTextNodes)(range);
  var allFormats = {
    bold: true,
    italic: true,
    underline: true,
    strikethrough: true
  };
  for (var textNode of textNodes) {
    var _parent2 = textNode.parentElement;
    if (!_parent2 || _parent2.tagName !== 'SPAN') {
      allFormats.bold = false;
      allFormats.italic = false;
      allFormats.underline = false;
      allFormats.strikethrough = false;
      break;
    }
    if (_parent2.style.fontWeight !== 'bold') allFormats.bold = false;
    if (_parent2.style.fontStyle !== 'italic') allFormats.italic = false;
    if (!_parent2.style.textDecoration.includes('underline')) allFormats.underline = false;
    if (!_parent2.style.textDecoration.includes('line-through')) allFormats.strikethrough = false;
  }
  return allFormats;
};
exports.getCurrentFormats = getCurrentFormats;
var getCurrentAlignment = () => {
  var {
    isValid,
    range
  } = (0, _range.getValidSelection)();
  if (!isValid) return _constants.DEFAULT_TEXT_ALIGN;
  var editor = (0, _alignment.getEditorRoot)(range);
  if (!editor) return _constants.DEFAULT_TEXT_ALIGN;
  if (range.startContainer === editor) return _constants.DEFAULT_TEXT_ALIGN;
  var lines = (0, _list.getLinesInRange)(editor, range);
  if (lines.length === 0) return _constants.DEFAULT_TEXT_ALIGN;
  var currentDiv = lines[0].closest('div');
  if (currentDiv) {
    return currentDiv.style.textAlign;
  }
  return _constants.DEFAULT_TEXT_ALIGN;
};
exports.getCurrentAlignment = getCurrentAlignment;
var getCurrentLists = () => {
  var listMap = {
    disc: false,
    decimal: false
  };
  var {
    isValid,
    range
  } = (0, _range.getValidSelection)();
  if (!isValid) return listMap;
  var editor = (0, _alignment.getEditorRoot)(range);
  if (!editor) return listMap;
  if (range.startContainer === editor) return listMap;
  var lines = (0, _list.getLinesInRange)(editor, range);
  if (lines.length === 0) return listMap;
  var currentList = lines[0].closest('ul, ol');
  if (currentList) {
    listMap.disc = currentList.tagName === 'UL';
    listMap.decimal = currentList.tagName === 'OL';
  }
  return listMap;
};
exports.getCurrentLists = getCurrentLists;
var getCurrentSize = () => {
  var {
    isValid,
    range
  } = (0, _range.getValidSelection)();
  if (!isValid) return _constants.DEFAULT_FONT_SIZE;
  var editor = (0, _alignment.getEditorRoot)(range);
  if (!editor) return _constants.DEFAULT_FONT_SIZE;
  if (range.collapsed) {
    var node = range.startContainer;
    var parent = node.nodeType === Node.TEXT_NODE ? node.parentElement : node;
    if ((parent === null || parent === void 0 ? void 0 : parent.tagName) === 'SPAN') {
      if (!parent.style.fontSize) return _constants.DEFAULT_FONT_SIZE;
      return parent.style.fontSize;
    }
    return _constants.DEFAULT_FONT_SIZE;
  }
  if (range.startContainer === range.endContainer && range.startContainer.nodeType === Node.TEXT_NODE) {
    var _node2$nodeValue$slic, _node2$nodeValue;
    var _node2 = range.startContainer;
    var selectedText = (_node2$nodeValue$slic = (_node2$nodeValue = _node2.nodeValue) === null || _node2$nodeValue === void 0 ? void 0 : _node2$nodeValue.slice(range.startOffset, range.endOffset)) !== null && _node2$nodeValue$slic !== void 0 ? _node2$nodeValue$slic : '';
    if (!selectedText.trim()) return _constants.DEFAULT_FONT_SIZE;
    var _parent3 = _node2.parentElement;
    if ((_parent3 === null || _parent3 === void 0 ? void 0 : _parent3.tagName) === 'SPAN') {
      if (!_parent3.style.fontSize) return _constants.DEFAULT_FONT_SIZE;
      return _parent3.style.fontSize;
    }
    return _constants.DEFAULT_FONT_SIZE;
  }
  var textNodes = (0, _range.getTextNodes)(range);
  var minSize = _constants.MAX_FONT_SIZE;
  for (var textNode of textNodes) {
    var _parent4 = textNode.parentElement;
    if (!_parent4 || _parent4.tagName !== 'SPAN') {
      minSize = _constants.DEFAULT_FONT_SIZE;
      break;
    }
    var fontSizeInt = parseInt(_parent4.style.fontSize);
    var minSizeInt = parseInt(minSize);
    if (fontSizeInt < minSizeInt) {
      minSize = _parent4.style.fontSize;
    }
  }
  return minSize;
};
exports.getCurrentSize = getCurrentSize;