import type { RefObject } from 'react';
import type { ValidSelection } from '../types';

export const getValidSelection = (): ValidSelection => {
    const selection = window.getSelection(); // 커서/드래그로 선택된 객체
    if (!selection || selection.rangeCount === 0) {
        return { isValid: false, selection: null, range: null };
    }
    return { isValid: true, selection: selection, range: selection.getRangeAt(0) };
};

export const applyAttributeInEmptyRange = (
    editorRef: RefObject<HTMLElement>,
    element: HTMLElement,
) => {
    const editor = editorRef.current;
    if (!editor) return;

    editor.appendChild(element);

    const reSelection = window.getSelection();
    if (!reSelection) return;
    if (element instanceof HTMLHRElement) {
        handleRangeToNext(element, reSelection);
    } else {
        handleNewRange(element, reSelection, 0);
    }
};

export const handleNewRange = (node: Node, selection: Selection, startOffset: number = 1) => {
    const newRange = document.createRange();
    newRange.setStart(node, startOffset);
    newRange.collapse(true);

    selection.removeAllRanges();
    selection.addRange(newRange);
};

export const handleRangeToNext = (node: Node, selection: Selection) => {
    const newRange = document.createRange();
    newRange.setStartAfter(node);

    selection.removeAllRanges();
    selection.addRange(newRange);
};

// 커서, 드래그 보존
export const preserveSelection = (selection: Selection, range: Range, operation: () => void) => {
    const { startContainer, startOffset, endContainer, endOffset } = range;
    const result = operation();

    const newRange = document.createRange();
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

export const getTextNodes = (range: Range): Text[] => {
    // 범위 내 TEXT 노드 탐색
    const walker = document.createTreeWalker(range.commonAncestorContainer, NodeFilter.SHOW_TEXT, {
        acceptNode: (node) =>
            range.intersectsNode(node) && node.textContent?.trim()
                ? NodeFilter.FILTER_ACCEPT
                : NodeFilter.FILTER_REJECT,
    });

    const textNodes: Text[] = [];
    while (walker.nextNode()) {
        // commonAncestor 내부 노드 순회
        textNodes.push(walker.currentNode as Text);
    }

    return textNodes;
};
