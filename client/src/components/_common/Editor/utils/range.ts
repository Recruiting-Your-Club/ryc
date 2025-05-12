import type { ValidRange, ValidSelection } from '../types';

export const getValidSelection = (): ValidSelection => {
    const selection = window.getSelection(); // 커서/드래그로 선택된 객체
    if (!selection || selection.rangeCount === 0) {
        return { isValid: false, selection: null };
    }
    return { isValid: true, selection: selection };
};

export const getValidRange = (): ValidRange => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
        return { isValid: false, range: null };
    }
    return { isValid: true, range: selection.getRangeAt(0) };
};

export const handleNewRange = (node: Node, selection: Selection) => {
    const newRange = document.createRange();
    newRange.setStart(node, 1);
    newRange.collapse(true);

    selection.removeAllRanges();
    selection.addRange(newRange);
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
