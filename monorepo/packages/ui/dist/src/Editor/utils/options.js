import { getEditorRoot } from './alignment';
import { applyAttributeInEmptyRange, getValidSelection, handleRangeToNext } from './range';
const insertSplitedNodes = (parent, ancestor, beforeNode, afterNode, selection) => {
    const hr = document.createElement('hr');
    ancestor.insertBefore(beforeNode, parent);
    ancestor.insertBefore(hr, parent);
    ancestor.insertBefore(afterNode, parent);
    ancestor.removeChild(parent);
    handleRangeToNext(hr, selection);
};
const splitTextInDiv = (currentNode, startOffset, endOffset, parent, selection) => {
    const text = currentNode.nodeType === Node.TEXT_NODE ? currentNode.nodeValue : '';
    const beforeText = text.slice(0, startOffset);
    const afterText = text.slice(endOffset);
    const beforeDiv = parent.cloneNode(false);
    const afterDiv = parent.cloneNode(false);
    beforeDiv.textContent = beforeText;
    afterDiv.textContent = afterText;
    const ancestor = parent.parentElement?.closest('div, li');
    insertSplitedNodes(parent, ancestor, beforeDiv, afterDiv, selection);
};
const splitTextInMixedNodes = (editor, currentNode, startOffset, endOffset, parent, selection) => {
    const text = currentNode.nodeType === Node.TEXT_NODE ? currentNode.nodeValue : '';
    const grandParent = parent.closest('div');
    const beforeText = text.slice(0, startOffset);
    const afterText = text.slice(endOffset);
    const beforeSpan = parent.cloneNode(false);
    const afterSpan = parent.cloneNode(false);
    beforeSpan.textContent = beforeText;
    afterSpan.textContent = afterText;
    if (grandParent === editor) {
        insertSplitedNodes(parent, grandParent, beforeSpan, afterSpan, selection);
        return;
    }
    const children = Array.from(grandParent.childNodes);
    const splitIndex = children.findIndex((node) => node === currentNode || node === parent);
    grandParent.removeChild(parent);
    const beforeNodes = [];
    const afterNodes = [];
    for (let i = 0; i < splitIndex; i++) {
        beforeNodes.push(children[i]);
    }
    if (beforeText)
        beforeNodes.push(beforeSpan);
    if (afterText)
        afterNodes.push(afterSpan);
    for (let i = splitIndex + 1; i < children.length; i++) {
        afterNodes.push(children[i]);
    }
    const beforeDiv = grandParent.cloneNode(false);
    const afterDiv = grandParent.cloneNode(false);
    beforeNodes.forEach((node) => beforeDiv.appendChild(node));
    afterNodes.forEach((node) => afterDiv.appendChild(node));
    const ancestor = grandParent.parentElement?.closest('div, li');
    insertSplitedNodes(grandParent, ancestor, beforeDiv, afterDiv, selection);
};
const insertDividerInSingleNode = (range, editor, selection) => {
    const currentNode = range.startContainer;
    const startOffset = range.startOffset;
    const endOffset = range.endOffset;
    const spanAncestor = currentNode.parentElement?.closest('span');
    const divAncestor = currentNode.parentElement?.closest('div');
    if (spanAncestor) {
        splitTextInMixedNodes(editor, currentNode, startOffset, endOffset, spanAncestor, selection);
    }
    else if (divAncestor && divAncestor !== editor) {
        splitTextInDiv(currentNode, startOffset, endOffset, divAncestor, selection);
    }
    else {
        const hr = document.createElement('hr');
        range.deleteContents();
        range.insertNode(hr);
        handleRangeToNext(hr, selection);
    }
};
const insertDividerAtCursor = (editor, range, selection) => {
    const currentNode = range.startContainer;
    const offset = range.startOffset;
    if (currentNode === editor) {
        const hr = document.createElement('hr');
        editor.insertBefore(hr, null);
        handleRangeToNext(hr, selection);
        return;
    }
    const spanAncestor = currentNode.parentElement?.closest('span');
    const divAncestor = currentNode.parentElement?.closest('div');
    if (spanAncestor) {
        splitTextInMixedNodes(editor, currentNode, offset, offset, spanAncestor, selection);
    }
    else if (divAncestor && divAncestor !== editor) {
        splitTextInDiv(currentNode, offset, offset, divAncestor, selection);
    }
    else {
        const text = range.startContainer;
        const hr = document.createElement('hr');
        if (offset === 0) {
            text.parentNode?.insertBefore(hr, text);
        }
        else {
            const afterText = text.splitText(offset);
            text.parentNode?.insertBefore(hr, afterText);
        }
        handleRangeToNext(hr, selection);
    }
};
export const insertDivider = (editorRef) => {
    const { isValid, selection } = getValidSelection();
    if (!isValid) {
        const hr = document.createElement('hr');
        applyAttributeInEmptyRange(editorRef, hr);
        return;
    }
    const range = selection.getRangeAt(0);
    const editor = getEditorRoot(range);
    if (!editor)
        return;
    if (range.collapsed) {
        return insertDividerAtCursor(editor, range, selection);
    }
    if (range.startContainer.nodeType === Node.TEXT_NODE &&
        range.endContainer.nodeType === Node.TEXT_NODE &&
        range.startContainer === range.endContainer) {
        return insertDividerInSingleNode(range, editor, selection);
    }
};
const insertImage = (editor, url, savedRange) => {
    const img = document.createElement('img');
    img.src = url;
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
    const selection = window.getSelection();
    if (savedRange) {
        selection?.removeAllRanges();
        selection?.addRange(savedRange);
        savedRange.insertNode(img);
    }
    else {
        editor.appendChild(img);
    }
    const newRange = document.createRange();
    newRange.setStartAfter(img);
    newRange.collapse(true);
    selection?.removeAllRanges();
    selection?.addRange(newRange);
};
export const handleImageFile = (e, editorRef, savedRange) => {
    const image = e.target.files?.[0];
    if (!image || !editorRef.current)
        return;
    const reader = new FileReader();
    reader.onload = () => {
        insertImage(editorRef.current, reader.result, savedRange);
    };
    reader.readAsDataURL(image);
};
//# sourceMappingURL=options.js.map