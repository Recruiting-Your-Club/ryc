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
