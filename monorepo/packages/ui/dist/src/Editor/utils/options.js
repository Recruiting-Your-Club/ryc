"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insertDivider = exports.handleImageFile = void 0;
var _alignment = require("./alignment");
var _range = require("./range");
var insertSplitedNodes = (parent, ancestor, beforeNode, afterNode, selection) => {
  var hr = document.createElement('hr');
  ancestor.insertBefore(beforeNode, parent);
  ancestor.insertBefore(hr, parent);
  ancestor.insertBefore(afterNode, parent);
  ancestor.removeChild(parent);
  (0, _range.handleRangeToNext)(hr, selection);
};
var splitTextInDiv = (currentNode, startOffset, endOffset, parent, selection) => {
  var _parent$parentElement;
  var text = currentNode.nodeType === Node.TEXT_NODE ? currentNode.nodeValue : '';
  var beforeText = text.slice(0, startOffset);
  var afterText = text.slice(endOffset);
  var beforeDiv = parent.cloneNode(false);
  var afterDiv = parent.cloneNode(false);
  beforeDiv.textContent = beforeText;
  afterDiv.textContent = afterText;
  var ancestor = (_parent$parentElement = parent.parentElement) === null || _parent$parentElement === void 0 ? void 0 : _parent$parentElement.closest('div, li');
  insertSplitedNodes(parent, ancestor, beforeDiv, afterDiv, selection);
};
var splitTextInMixedNodes = (editor, currentNode, startOffset, endOffset, parent, selection) => {
  var _grandParent$parentEl;
  var text = currentNode.nodeType === Node.TEXT_NODE ? currentNode.nodeValue : '';
  var grandParent = parent.closest('div');
  var beforeText = text.slice(0, startOffset);
  var afterText = text.slice(endOffset);
  var beforeSpan = parent.cloneNode(false);
  var afterSpan = parent.cloneNode(false);
  beforeSpan.textContent = beforeText;
  afterSpan.textContent = afterText;
  if (grandParent === editor) {
    insertSplitedNodes(parent, grandParent, beforeSpan, afterSpan, selection);
    return;
  }
  var children = Array.from(grandParent.childNodes);
  var splitIndex = children.findIndex(node => node === currentNode || node === parent);
  grandParent.removeChild(parent);
  var beforeNodes = [];
  var afterNodes = [];
  for (var i = 0; i < splitIndex; i++) {
    beforeNodes.push(children[i]);
  }
  if (beforeText) beforeNodes.push(beforeSpan);
  if (afterText) afterNodes.push(afterSpan);
  for (var _i = splitIndex + 1; _i < children.length; _i++) {
    afterNodes.push(children[_i]);
  }
  var beforeDiv = grandParent.cloneNode(false);
  var afterDiv = grandParent.cloneNode(false);
  beforeNodes.forEach(node => beforeDiv.appendChild(node));
  afterNodes.forEach(node => afterDiv.appendChild(node));
  var ancestor = (_grandParent$parentEl = grandParent.parentElement) === null || _grandParent$parentEl === void 0 ? void 0 : _grandParent$parentEl.closest('div, li');
  insertSplitedNodes(grandParent, ancestor, beforeDiv, afterDiv, selection);
};
var insertDividerInSingleNode = (range, editor, selection) => {
  var _currentNode$parentEl, _currentNode$parentEl2;
  var currentNode = range.startContainer;
  var startOffset = range.startOffset;
  var endOffset = range.endOffset;
  var spanAncestor = (_currentNode$parentEl = currentNode.parentElement) === null || _currentNode$parentEl === void 0 ? void 0 : _currentNode$parentEl.closest('span');
  var divAncestor = (_currentNode$parentEl2 = currentNode.parentElement) === null || _currentNode$parentEl2 === void 0 ? void 0 : _currentNode$parentEl2.closest('div');
  if (spanAncestor) {
    splitTextInMixedNodes(editor, currentNode, startOffset, endOffset, spanAncestor, selection);
  } else if (divAncestor && divAncestor !== editor) {
    splitTextInDiv(currentNode, startOffset, endOffset, divAncestor, selection);
  } else {
    var hr = document.createElement('hr');
    range.deleteContents();
    range.insertNode(hr);
    (0, _range.handleRangeToNext)(hr, selection);
  }
};
var insertDividerAtCursor = (editor, range, selection) => {
  var _currentNode$parentEl3, _currentNode$parentEl4;
  var currentNode = range.startContainer;
  var offset = range.startOffset;
  if (currentNode === editor) {
    var hr = document.createElement('hr');
    editor.insertBefore(hr, null);
    (0, _range.handleRangeToNext)(hr, selection);
    return;
  }
  var spanAncestor = (_currentNode$parentEl3 = currentNode.parentElement) === null || _currentNode$parentEl3 === void 0 ? void 0 : _currentNode$parentEl3.closest('span');
  var divAncestor = (_currentNode$parentEl4 = currentNode.parentElement) === null || _currentNode$parentEl4 === void 0 ? void 0 : _currentNode$parentEl4.closest('div');
  if (spanAncestor) {
    splitTextInMixedNodes(editor, currentNode, offset, offset, spanAncestor, selection);
  } else if (divAncestor && divAncestor !== editor) {
    splitTextInDiv(currentNode, offset, offset, divAncestor, selection);
  } else {
    var text = range.startContainer;
    var _hr = document.createElement('hr');
    if (offset === 0) {
      var _text$parentNode;
      (_text$parentNode = text.parentNode) === null || _text$parentNode === void 0 || _text$parentNode.insertBefore(_hr, text);
    } else {
      var _text$parentNode2;
      var afterText = text.splitText(offset);
      (_text$parentNode2 = text.parentNode) === null || _text$parentNode2 === void 0 || _text$parentNode2.insertBefore(_hr, afterText);
    }
    (0, _range.handleRangeToNext)(_hr, selection);
  }
};
var insertDivider = editorRef => {
  var {
    isValid,
    selection
  } = (0, _range.getValidSelection)();
  if (!isValid) {
    var hr = document.createElement('hr');
    (0, _range.applyAttributeInEmptyRange)(editorRef, hr);
    return;
  }
  var range = selection.getRangeAt(0);
  var editor = (0, _alignment.getEditorRoot)(range);
  if (!editor) return;
  if (range.collapsed) {
    return insertDividerAtCursor(editor, range, selection);
  }
  if (range.startContainer.nodeType === Node.TEXT_NODE && range.endContainer.nodeType === Node.TEXT_NODE && range.startContainer === range.endContainer) {
    return insertDividerInSingleNode(range, editor, selection);
  }
};
exports.insertDivider = insertDivider;
var insertImage = (editor, url, savedRange) => {
  var img = document.createElement('img');
  img.src = url;
  img.style.maxWidth = '100%';
  img.style.height = 'auto';
  var selection = window.getSelection();
  if (savedRange) {
    selection === null || selection === void 0 || selection.removeAllRanges();
    selection === null || selection === void 0 || selection.addRange(savedRange);
    savedRange.insertNode(img);
  } else {
    editor.appendChild(img);
  }
  var newRange = document.createRange();
  newRange.setStartAfter(img);
  newRange.collapse(true);
  selection === null || selection === void 0 || selection.removeAllRanges();
  selection === null || selection === void 0 || selection.addRange(newRange);
};
var handleImageFile = (e, editorRef, savedRange) => {
  var _e$target$files;
  var image = (_e$target$files = e.target.files) === null || _e$target$files === void 0 ? void 0 : _e$target$files[0];
  if (!image || !editorRef.current) return;
  var reader = new FileReader();
  reader.onload = () => {
    insertImage(editorRef.current, reader.result, savedRange);
  };
  reader.readAsDataURL(image);
};
exports.handleImageFile = handleImageFile;