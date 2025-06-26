"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.preserveSelection = exports.handleRangeToNext = exports.handleRangeInList = exports.handleNewRange = exports.getValidSelection = exports.getTextNodes = exports.applyAttributeInEmptyRange = void 0;
var getValidSelection = () => {
  var selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) {
    return {
      isValid: false,
      selection: null,
      range: null
    };
  }
  return {
    isValid: true,
    selection: selection,
    range: selection.getRangeAt(0)
  };
};
exports.getValidSelection = getValidSelection;
var applyAttributeInEmptyRange = (editorRef, element) => {
  var editor = editorRef.current;
  if (!editor) return;
  editor.appendChild(element);
  var reSelection = window.getSelection();
  if (!reSelection) return;
  if (element instanceof HTMLHRElement) {
    handleRangeToNext(element, reSelection);
  } else if (element instanceof HTMLUListElement || HTMLOListElement) {
    return reSelection;
  } else {
    handleNewRange(element, reSelection, 0);
  }
};
exports.applyAttributeInEmptyRange = applyAttributeInEmptyRange;
var handleNewRange = exports.handleNewRange = function handleNewRange(node, selection) {
  var startOffset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var newRange = document.createRange();
  newRange.setStart(node, startOffset);
  newRange.collapse(true);
  selection.removeAllRanges();
  selection.addRange(newRange);
};
var handleRangeToNext = (node, selection) => {
  var newRange = document.createRange();
  newRange.setStartAfter(node);
  selection.removeAllRanges();
  selection.addRange(newRange);
};
exports.handleRangeToNext = handleRangeToNext;
var handleRangeInList = (list, selection) => {
  var contentList = list.querySelector('li');
  if (contentList) {
    var div = contentList === null || contentList === void 0 ? void 0 : contentList.querySelector('div');
    var targetNode = div === null || div === void 0 ? void 0 : div.firstChild;
    if (targetNode) {
      var _targetNode$textConte, _targetNode$textConte2;
      var offset = targetNode.nodeType === Node.TEXT_NODE ? (_targetNode$textConte = (_targetNode$textConte2 = targetNode.textContent) === null || _targetNode$textConte2 === void 0 ? void 0 : _targetNode$textConte2.length) !== null && _targetNode$textConte !== void 0 ? _targetNode$textConte : 0 : 0;
      handleNewRange(targetNode, selection, offset);
    }
  }
};
exports.handleRangeInList = handleRangeInList;
var preserveSelection = (selection, range, operation) => {
  var {
    startContainer,
    startOffset,
    endContainer,
    endOffset
  } = range;
  var result = operation();
  var newRange = document.createRange();
  try {
    newRange.setStart(startContainer, startOffset);
    newRange.setEnd(endContainer, endOffset);
    selection.removeAllRanges();
    selection.addRange(newRange);
  } catch (e) {
    console.warn('Selection 복구에 실패하였습니다.', e);
  }
  return result;
};
exports.preserveSelection = preserveSelection;
var getTextNodes = range => {
  var walker = document.createTreeWalker(range.commonAncestorContainer, NodeFilter.SHOW_TEXT, {
    acceptNode: node => {
      var _node$textContent;
      return range.intersectsNode(node) && (_node$textContent = node.textContent) !== null && _node$textContent !== void 0 && _node$textContent.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  });
  var textNodes = [];
  while (walker.nextNode()) {
    textNodes.push(walker.currentNode);
  }
  return textNodes;
};
exports.getTextNodes = getTextNodes;