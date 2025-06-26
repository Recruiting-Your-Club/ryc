export const getValidSelection = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
        return { isValid: false, selection: null, range: null };
    }
    return { isValid: true, selection: selection, range: selection.getRangeAt(0) };
};
export const applyAttributeInEmptyRange = (editorRef, element) => {
    const editor = editorRef.current;
    if (!editor)
        return;
    editor.appendChild(element);
    const reSelection = window.getSelection();
    if (!reSelection)
        return;
    if (element instanceof HTMLHRElement) {
        handleRangeToNext(element, reSelection);
    }
    else if (element instanceof HTMLUListElement || HTMLOListElement) {
        return reSelection;
    }
    else {
        handleNewRange(element, reSelection, 0);
    }
};
export const handleNewRange = (node, selection, startOffset = 1) => {
    const newRange = document.createRange();
    newRange.setStart(node, startOffset);
    newRange.collapse(true);
    selection.removeAllRanges();
    selection.addRange(newRange);
};
export const handleRangeToNext = (node, selection) => {
    const newRange = document.createRange();
    newRange.setStartAfter(node);
    selection.removeAllRanges();
    selection.addRange(newRange);
};
export const handleRangeInList = (list, selection) => {
    const contentList = list.querySelector('li');
    if (contentList) {
        const div = contentList?.querySelector('div');
        const targetNode = div?.firstChild;
        if (targetNode) {
            const offset = targetNode.nodeType === Node.TEXT_NODE ? (targetNode.textContent?.length ?? 0) : 0;
            handleNewRange(targetNode, selection, offset);
        }
    }
};
export const preserveSelection = (selection, range, operation) => {
    const { startContainer, startOffset, endContainer, endOffset } = range;
    const result = operation();
    const newRange = document.createRange();
    try {
        newRange.setStart(startContainer, startOffset);
        newRange.setEnd(endContainer, endOffset);
        selection.removeAllRanges();
        selection.addRange(newRange);
    }
    catch (e) {
        console.warn('Selection 복구에 실패하였습니다.', e);
    }
    return result;
};
export const getTextNodes = (range) => {
    const walker = document.createTreeWalker(range.commonAncestorContainer, NodeFilter.SHOW_TEXT, {
        acceptNode: (node) => range.intersectsNode(node) && node.textContent?.trim()
            ? NodeFilter.FILTER_ACCEPT
            : NodeFilter.FILTER_REJECT,
    });
    const textNodes = [];
    while (walker.nextNode()) {
        textNodes.push(walker.currentNode);
    }
    return textNodes;
};
//# sourceMappingURL=range.js.map