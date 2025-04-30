import type { Option } from '../EditorToolbar';
import { getEditorRoot } from './alignment';

const insertSplitedNodes = (
    parent: HTMLElement,
    ancestor: HTMLElement,
    beforeNode: HTMLElement,
    afterNode: HTMLElement,
) => {
    const hr = document.createElement('hr');
    ancestor.insertBefore(beforeNode, parent);
    ancestor.insertBefore(hr, parent);
    ancestor.insertBefore(afterNode, parent);

    ancestor.removeChild(parent);
};

// div 안에 text만 존재할 경우
const splitTextInDiv = (
    currentNode: Node,
    startOffset: number,
    endOffset: number,
    parent: HTMLDivElement,
) => {
    const text = currentNode.nodeType === Node.TEXT_NODE ? currentNode.nodeValue! : '';

    const beforeText = text.slice(0, startOffset);
    const afterText = text.slice(endOffset);

    const beforeDiv = parent.cloneNode(false) as HTMLDivElement;
    const afterDiv = parent.cloneNode(false) as HTMLDivElement;

    beforeDiv.textContent = beforeText;
    afterDiv.textContent = afterText;

    const ancestor = parent.parentElement?.closest('div, li') as HTMLElement;
    insertSplitedNodes(parent, ancestor, beforeDiv, afterDiv);
};

// div 안에 span이 존재할 경우
const splitTextInMixedNodes = (
    editor: HTMLElement,
    currentNode: Node,
    startOffset: number,
    endOffset: number,
    parent: HTMLSpanElement,
) => {
    const text = currentNode.nodeType === Node.TEXT_NODE ? currentNode.nodeValue! : '';

    const grandParent = (parent.closest('div') as HTMLDivElement)!;

    const beforeText = text.slice(0, startOffset);
    const afterText = text.slice(endOffset);

    const beforeSpan = parent.cloneNode(false) as HTMLSpanElement;
    const afterSpan = parent.cloneNode(false) as HTMLSpanElement;

    beforeSpan.textContent = beforeText;
    afterSpan.textContent = afterText;

    // 첫째줄에서 span 노드 있을 경우
    if (grandParent === editor) {
        insertSplitedNodes(parent, grandParent, beforeSpan, afterSpan);
        return;
    }

    // 첫째줄이 아닌 줄에서 span 노드 있을 경우
    const children = Array.from(grandParent.childNodes);
    const splitIndex = children.findIndex((node) => node === currentNode || node === parent);

    grandParent.removeChild(parent);

    const beforeNodes: Node[] = [];
    const afterNodes: Node[] = [];

    for (let i = 0; i < splitIndex; i++) {
        beforeNodes.push(children[i]);
    }
    if (beforeText) beforeNodes.push(beforeSpan);

    if (afterText) afterNodes.push(afterSpan);
    for (let i = splitIndex + 1; i < children.length; i++) {
        afterNodes.push(children[i]);
    }

    const beforeDiv = grandParent.cloneNode(false) as HTMLDivElement;
    const afterDiv = grandParent.cloneNode(false) as HTMLDivElement;

    beforeNodes.forEach((node) => beforeDiv.appendChild(node));
    afterNodes.forEach((node) => afterDiv.appendChild(node));

    const ancestor = grandParent.parentElement?.closest('div, li') as HTMLElement;
    insertSplitedNodes(grandParent, ancestor, beforeDiv, afterDiv);
};

const insertDividerInSingleNode = (range: Range, editor: HTMLElement) => {
    const currentNode = range.startContainer;
    const startOffset = range.startOffset;
    const endOffset = range.endOffset;

    const spanAncestor = currentNode.parentElement?.closest('span') as HTMLSpanElement | null;
    const divAncestor = currentNode.parentElement?.closest('div') as HTMLDivElement | null;

    if (spanAncestor) {
        splitTextInMixedNodes(editor, currentNode, startOffset, endOffset, spanAncestor);
    } else if (divAncestor && divAncestor !== editor) {
        splitTextInDiv(currentNode, startOffset, endOffset, divAncestor);
    } else {
        // 첫째줄 span 없을 경우
        const hr = document.createElement('hr');
        range.deleteContents();
        range.insertNode(hr);
    }
};

const insertDividerAtCursor = (editor: HTMLElement, range: Range) => {
    const currentNode = range.startContainer;
    const offset = range.startOffset;

    const spanAncestor = currentNode.parentElement?.closest('span') as HTMLSpanElement | null;
    const divAncestor = currentNode.parentElement?.closest('div') as HTMLDivElement | null;

    if (spanAncestor) {
        splitTextInMixedNodes(editor, currentNode, offset, offset, spanAncestor);
    } else if (divAncestor && divAncestor !== editor) {
        splitTextInDiv(currentNode, offset, offset, divAncestor);
    } else {
        // 첫째줄 span 없을 경우
        const text = range.startContainer as Text;
        const hr = document.createElement('hr');

        if (offset === 0) {
            text.parentNode?.insertBefore(hr, text);
        } else {
            const afterText = text.splitText(offset);
            text.parentNode?.insertBefore(hr, afterText);
        }
    }
};

export const insertDivider = (range: Range, option: Option) => {
    if (!range || option !== 'divider') return;

    const editor = getEditorRoot(range);
    if (!editor) return;

    if (range.collapsed) {
        return insertDividerAtCursor(editor, range);
    }

    // 선택된 영역이 하나의 텍스트 노드 안에서 이루어진 경우
    if (
        range.startContainer.nodeType === Node.TEXT_NODE &&
        range.endContainer.nodeType === Node.TEXT_NODE &&
        range.startContainer === range.endContainer
    ) {
        return insertDividerInSingleNode(range, editor);
    }

    // 선택 범위 안의 노드들이 여러 태그로 감싸져 나뉘었을 경우
    // 추후 구현 예정
};
