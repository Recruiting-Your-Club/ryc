import type { Format } from './EditorToolbar';

export const handleNewRange = (textNode: Text, selection: Selection) => {
    const newRange = document.createRange();
    newRange.setStart(textNode, 1);
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
    let currentNode = walker.nextNode();
    while (currentNode) {
        // commonAncestor 내부 노드 순회
        textNodes.push(currentNode as Text);
        currentNode = walker.nextNode();
    }

    return textNodes;
};

export const getCurrentFormats = (): Record<Format, boolean> => {
    const formatMap: Record<Format, boolean> = {
        bold: false,
        italic: false,
        underline: false,
        strikethrough: false,
    };

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return formatMap;

    const range = selection.getRangeAt(0);

    // 커서만 존재할 때
    if (range.collapsed) {
        const node = range.startContainer;
        const parent =
            node.nodeType === Node.TEXT_NODE
                ? (node.parentElement as HTMLElement)
                : (node as HTMLElement);
        if (parent?.tagName === 'SPAN') {
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
            strikethrough: false,
        };
    }

    // 드래그 영역이 하나의 텍스트 노드 내부일 때
    if (
        range.startContainer === range.endContainer &&
        range.startContainer.nodeType === Node.TEXT_NODE
    ) {
        const node = range.startContainer as Text;
        const selectedText = node.nodeValue?.slice(range.startOffset, range.endOffset) ?? '';
        if (!selectedText.trim()) return formatMap;

        const parent = node.parentElement;
        if (parent?.tagName === 'SPAN') {
            if (parent.style.fontWeight === 'bold') formatMap.bold = true;
            if (parent.style.fontStyle === 'italic') formatMap.italic = true;
            if (parent.style.textDecoration.includes('underline')) formatMap.underline = true;
            if (parent.style.textDecoration.includes('line-through'))
                formatMap.strikethrough = true;
        }

        return formatMap;
    }

    // 드래그 영역이 여러 텍스트 노드에 걸쳐 있을 때
    const textNodes = getTextNodes(range);

    const allFormats: Record<Format, boolean> = {
        bold: true,
        italic: true,
        underline: true,
        strikethrough: true,
    };

    for (const textNode of textNodes) {
        const parent = textNode.parentElement;
        if (!parent || parent.tagName !== 'SPAN') {
            allFormats.bold = false;
            allFormats.italic = false;
            allFormats.underline = false;
            allFormats.strikethrough = false;
            break;
        }

        if (parent.style.fontWeight !== 'bold') allFormats.bold = false;
        if (parent.style.fontStyle !== 'italic') allFormats.italic = false;
        if (!parent.style.textDecoration.includes('underline')) allFormats.underline = false;
        if (!parent.style.textDecoration.includes('line-through')) allFormats.strikethrough = false;
    }

    return allFormats;
};

export const applyStyleInSelectedText = (
    text: string,
    parent: HTMLElement | null,
    format: Format,
    isSpan: boolean,
    selectedStart: number,
    selectedEnd: number,
    isOverallStyle: boolean = true,
): DocumentFragment => {
    const originalStyle = isSpan ? parent?.getAttribute('style') || '' : '';

    const before = text.slice(0, selectedStart);
    const selected = text.slice(selectedStart, selectedEnd);
    const after = text.slice(selectedEnd);

    const frag = document.createDocumentFragment();
    if (before) frag.appendChild(createSpan(format, before, originalStyle));
    frag.appendChild(createSpan(format, selected, originalStyle, true, isOverallStyle));
    if (after) frag.appendChild(createSpan(format, after, originalStyle));

    return frag;
};

export const applyStyleInSplitedText = (
    currentNode: Node,
    offset: number,
    parent: HTMLElement,
    format: Format,
    emptyTextNode: Text,
) => {
    const grandParent = parent.parentElement!;
    const text = currentNode.nodeType === Node.TEXT_NODE ? currentNode.nodeValue! : '';

    const before = text.slice(0, offset);
    const after = text.slice(offset);

    if (before) {
        const beforeSpan = parent.cloneNode(false) as HTMLSpanElement;
        beforeSpan.textContent = before;
        grandParent.insertBefore(beforeSpan, parent);
    }

    const newSpan = parent.cloneNode(false) as HTMLSpanElement;
    applyFormat(newSpan, format);
    newSpan.appendChild(emptyTextNode);
    grandParent.insertBefore(newSpan, parent);

    if (after) {
        const afterSpan = parent.cloneNode(false) as HTMLSpanElement;
        afterSpan.textContent = after;
        grandParent.insertBefore(afterSpan, parent);
    }

    grandParent.removeChild(parent);
};

// 새로운 span 노드 생성
const createSpan = (
    format: Format,
    text: string,
    style: string,
    applyNewStyle = false,
    isOverallStyle = true,
) => {
    const span = document.createElement('span');
    span.style.cssText = style; // style 객체와 연동되는 cssText 사용

    if (applyNewStyle) applyFormat(span, format, isOverallStyle); // format만 추가/제거
    span.textContent = text;

    return span;
};

// 해당 span이 특정 스타일을 가지고 있는지 확인
export const hasFormat = (elem: HTMLElement, format: Format): boolean => {
    switch (format) {
        case 'bold':
            return elem.style.fontWeight === 'bold';
        case 'italic':
            return elem.style.fontStyle === 'italic';
        case 'underline':
            return elem.style.textDecoration.includes('underline');
        case 'strikethrough':
            return elem.style.textDecoration.includes('line-through');
        default:
            return false;
    }
};

// 해당 span에 스타일 적용 or 제거
export const toggleFormat = (elem: HTMLElement, format: Format, isApply: boolean) => {
    switch (format) {
        case 'bold':
            elem.style.fontWeight = isApply ? 'bold' : '';
            break;
        case 'italic':
            elem.style.fontStyle = isApply ? 'italic' : '';
            break;
        case 'underline':
            elem.style.textDecoration = toggleTextDecoration(
                elem.style.textDecoration,
                'underline',
                isApply,
            );
            break;
        case 'strikethrough':
            elem.style.textDecoration = toggleTextDecoration(
                elem.style.textDecoration,
                'line-through',
                isApply,
            );
            break;
    }
};

export const applyFormat = (span: HTMLElement, format: Format, isOverallStyle: boolean = true) => {
    const has = hasFormat(span, format);
    const toggledHas = !isOverallStyle && has ? !has : has; // 전체 텍스트는 format 적용 안되어있지만 해당 텍스트는 format을 가지고 있다면 toggle

    toggleFormat(span, format, !toggledHas);
};

// underline, strikethrough는 textDecoration 내부에서 동시 적용 가능하므로
const toggleTextDecoration = (current: string, style: string, isApply: boolean): string => {
    const values = current
        .split(' ')
        .map((value) => value.trim())
        .filter((value) => value.length > 0);

    const isExist = values.includes(style);

    if (isApply && !isExist) {
        // 추가
        return [...values, style].join(' ');
    } else if (!isApply && isExist) {
        // 제거
        return values.filter((value) => value !== style).join(' ');
    } else {
        return current;
    }
};
