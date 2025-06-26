"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEditorRoot = exports.getClosestDiv = exports.applyAlignmentInEmptyRange = exports.applyAlignment = void 0;
var _range = require("./range");
var getClosestDiv = node => {
  var _element$closest;
  var element = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
  return (_element$closest = element === null || element === void 0 ? void 0 : element.closest('div')) !== null && _element$closest !== void 0 ? _element$closest : null;
};
exports.getClosestDiv = getClosestDiv;
var getEditorRoot = range => {
  var node = range.commonAncestorContainer;
  while (node) {
    if (node instanceof HTMLElement && node.getAttribute('contenteditable') === 'true') {
      return node;
    }
    node = node.parentNode;
  }
  return null;
};
exports.getEditorRoot = getEditorRoot;
var wrapFirstLineInDiv = (editor, align) => {
  var nodesToWrap = [];
  var childNodes = Array.from(editor.childNodes);
  for (var node of childNodes) {
    if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'DIV') {
      break;
    }
    nodesToWrap.push(node);
  }
  if (nodesToWrap.length > 0) {
    var wrapper = document.createElement('div');
    wrapper.style.textAlign = align;
    nodesToWrap.forEach(node => wrapper.appendChild(node));
    editor.insertBefore(wrapper, editor.childNodes[0]);
  }
};
var applyAlignmentToDivsInRange = (editor, range, align) => {
  var walker = document.createTreeWalker(editor, NodeFilter.SHOW_ELEMENT, {
    acceptNode: node => {
      if (!(node instanceof HTMLElement)) return NodeFilter.FILTER_SKIP;
      if (node.tagName !== 'DIV') return NodeFilter.FILTER_SKIP;
      var isIntersecting = range.intersectsNode(node);
      return isIntersecting ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  while (walker.nextNode()) {
    var div = walker.currentNode;
    div.style.textAlign = align;
  }
};
var applyAlignmentInEmptyRange = (editorRef, align) => {
  var cssStyle = {
    textAlign: align.toString()
  };
  var div = document.createElement('div');
  Object.assign(div.style, cssStyle);
  div.innerText = '\u200B';
  (0, _range.applyAttributeInEmptyRange)(editorRef, div);
};
exports.applyAlignmentInEmptyRange = applyAlignmentInEmptyRange;
var applyAlignment = (selection, range, align) => {
  var editor = getEditorRoot(range);
  if (!editor) return;
  if (range.collapsed) {
    var div = getClosestDiv(range.startContainer);
    if (div === editor) {
      (0, _range.preserveSelection)(selection, range, () => {
        wrapFirstLineInDiv(editor, align);
      });
    } else {
      div.style.textAlign = align;
    }
    return;
  }
  var allDivs = editor.querySelectorAll('div');
  if (allDivs.length === 0) {
    (0, _range.preserveSelection)(selection, range, () => {
      wrapFirstLineInDiv(editor, align);
    });
    return;
  }
  applyAlignmentToDivsInRange(editor, range, align);
  var parentOfFirstLine = getClosestDiv(range.startContainer);
  if (parentOfFirstLine === editor) {
    (0, _range.preserveSelection)(selection, range, () => {
      wrapFirstLineInDiv(editor, align);
    });
  }
};
exports.applyAlignment = applyAlignment;