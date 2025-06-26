"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLinesInRange = exports.applyListInEmptyRange = exports.applyList = void 0;
var _alignment = require("./alignment");
var _range = require("./range");
var wrapFirstLine = (editor, lines) => {
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
    nodesToWrap.forEach(node => wrapper.appendChild(node));
    editor.insertBefore(wrapper, editor.childNodes[0]);
    lines.unshift(wrapper);
  }
};
var getLinesInRange = (editor, range) => {
  var lines = [];
  var walker = document.createTreeWalker(editor, NodeFilter.SHOW_ELEMENT, {
    acceptNode: node => {
      if (!(node instanceof HTMLElement)) return NodeFilter.FILTER_REJECT;
      var isDiv = node.tagName === 'DIV';
      var isLine = isDiv && node !== editor;
      var isInRange = range.intersectsNode(node);
      return isInRange && isLine ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  while (walker.nextNode()) {
    lines.push(walker.currentNode);
  }
  return lines;
};
exports.getLinesInRange = getLinesInRange;
var wrapLine = (frag, tag, divs) => {
  if (divs.length === 0) return;
  var list = document.createElement(tag);
  divs.forEach(div => {
    var li = document.createElement('li');
    li.appendChild(div);
    list.appendChild(li);
  });
  frag.appendChild(list);
};
var applyListInSplitedText = (currentList, selectedDivs, newListTag) => {
  var before = [];
  var selected = [];
  var after = [];
  var isSelectedLi = false;
  Array.from(currentList.children).forEach(li => {
    var div = li.firstElementChild;
    if (!(div instanceof HTMLDivElement)) return;
    if (selectedDivs.has(div)) {
      isSelectedLi = true;
      selected.push(div);
    } else if (!isSelectedLi) {
      before.push(div);
    } else {
      after.push(div);
    }
  });
  var frag = document.createDocumentFragment();
  wrapLine(frag, currentList.tagName.toLowerCase(), before);
  wrapLine(frag, newListTag, selected);
  wrapLine(frag, currentList.tagName.toLowerCase(), after);
  return frag;
};
var applyListInEmptyRange = (editorRef, list) => {
  var listTag = list === 'disc' ? 'ul' : 'ol';
  var tag = document.createElement(listTag);
  var li = document.createElement('li');
  var div = document.createElement('div');
  li.appendChild(div);
  tag.appendChild(li);
  div.innerText = '\u200B';
  var reSelection = (0, _range.applyAttributeInEmptyRange)(editorRef, tag);
  (0, _range.handleNewRange)(div, reSelection, 0);
};
exports.applyListInEmptyRange = applyListInEmptyRange;
var applyList = (selection, range, list) => {
  var editor = (0, _alignment.getEditorRoot)(range);
  if (!editor) return;
  var lines = getLinesInRange(editor, range);
  var parentOfFirstLine = (0, _alignment.getClosestDiv)(range.startContainer);
  if (parentOfFirstLine === editor) {
    wrapFirstLine(editor, lines);
  }
  var listTag = list === 'disc' ? 'ul' : 'ol';
  if (range.collapsed && lines.length === 0) {
    var liParent = document.createElement(listTag);
    var li = document.createElement('li');
    var div = document.createElement('div');
    li.appendChild(div);
    liParent.appendChild(li);
    div.innerText = '\u200B';
    range.insertNode(liParent);
    (0, _range.handleNewRange)(div, selection, 0);
    return;
  }
  var firstLine = lines[0];
  var currentList = firstLine === null || firstLine === void 0 ? void 0 : firstLine.closest('ul, ol');
  if (currentList) {
    if (currentList.tagName.toLowerCase() === listTag) return;
    var selectedDivs = new Set(lines);
    var _parent = currentList.parentNode;
    var fragment = applyListInSplitedText(currentList, selectedDivs, listTag);
    _parent.replaceChild(fragment, currentList);
    var foundListTag = _parent.querySelector(listTag);
    if (!foundListTag) return;
    (0, _range.handleRangeInList)(foundListTag, selection);
    return;
  }
  var parent = firstLine.parentNode;
  var newList = document.createElement(listTag);
  lines.forEach(line => {
    var li = document.createElement('li');
    li.appendChild(line.cloneNode(true));
    newList.appendChild(li);
  });
  parent === null || parent === void 0 || parent.insertBefore(newList, firstLine);
  lines.forEach(line => {
    if (line.parentNode === parent) {
      parent === null || parent === void 0 || parent.removeChild(line);
    }
  });
  (0, _range.handleRangeInList)(newList, selection);
};
exports.applyList = applyList;