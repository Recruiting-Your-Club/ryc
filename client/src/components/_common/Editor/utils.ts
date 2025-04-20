import type { Align, Format } from './EditorToolbar';

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

// format 적용 여부를 버튼으로 알려주기 위한 Record 반환 함수
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

// 커서 위치 기준으로 텍스트 나눠서 스타일 적용
export const applyStyleAtCursor = (
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
export const toggleFormat = (elem: HTMLElement, format: Format, shouldApply: boolean) => {
    switch (format) {
        case 'bold':
            elem.style.fontWeight = shouldApply ? 'bold' : '';
            break;
        case 'italic':
            elem.style.fontStyle = shouldApply ? 'italic' : '';
            break;
        case 'underline':
            elem.style.textDecoration = toggleTextDecoration(
                elem.style.textDecoration,
                'underline',
                shouldApply,
            );
            break;
        case 'strikethrough':
            elem.style.textDecoration = toggleTextDecoration(
                elem.style.textDecoration,
                'line-through',
                shouldApply,
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
const toggleTextDecoration = (current: string, style: string, shouldApply: boolean): string => {
    const values = current
        .split(' ')
        .map((value) => value.trim())
        .filter((value) => value.length > 0);

    const isExist = values.includes(style);

    if (shouldApply && !isExist) {
        // 추가
        return [...values, style].join(' ');
    } else if (!shouldApply && isExist) {
        // 제거
        return values.filter((value) => value !== style).join(' ');
    } else {
        return current;
    }
};

const getClosestDiv = (node: Node): HTMLDivElement | null => {
    const element =
        node.nodeType === Node.ELEMENT_NODE ? (node as HTMLElement) : node.parentElement;
    return element?.closest('div') ?? null;
};

const getEditorRoot = (range: Range): HTMLElement => {
    let node: Node | null = range.commonAncestorContainer;

    while (node && node.parentNode) {
        if (node instanceof HTMLElement && node.getAttribute('contenteditable') === 'true') {
            return node;
        }
        node = node.parentNode;
    }

    throw new Error('Editor root not found.');
};

const wrapFirstLineInDiv = (editor: HTMLElement, align: Align) => {
    const nodesToWrap: Node[] = [];
    const childNodes = Array.from(editor.childNodes);

    for (const node of childNodes) {
        if (node.nodeType === Node.ELEMENT_NODE && (node as HTMLElement).tagName === 'DIV') {
            break;
        }
        nodesToWrap.push(node);
    }

    if (nodesToWrap.length > 0) {
        const wrapper = document.createElement('div');
        wrapper.style.textAlign = align;

        nodesToWrap.forEach((node) => wrapper.appendChild(node));

        editor.insertBefore(wrapper, editor.childNodes[0]);
    }
};

const applyAlignmentToDivsInRange = (editor: HTMLElement, range: Range, align: Align) => {
    const walker = document.createTreeWalker(editor, NodeFilter.SHOW_ELEMENT, {
        acceptNode: (node: Node) => {
            if (!(node instanceof HTMLElement)) return NodeFilter.FILTER_SKIP;
            if (node.tagName !== 'DIV') return NodeFilter.FILTER_SKIP;

            const nodeRange = document.createRange();
            nodeRange.selectNodeContents(node);

            const isIntersecting =
                range.compareBoundaryPoints(Range.END_TO_START, nodeRange) < 0 &&
                range.compareBoundaryPoints(Range.START_TO_END, nodeRange) > 0;
            return isIntersecting ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
        },
    });

    while (walker.nextNode()) {
        const div = walker.currentNode as HTMLDivElement;
        div.style.textAlign = align;
    }
};

export const applyAlignment = (range: Range, align: Align) => {
    if (!range) return;

    const editor = getEditorRoot(range);

    // 커서만 존재할 때
    if (range.collapsed) {
        const div = getClosestDiv(range.startContainer)!;
        if (div === editor) {
            wrapFirstLineInDiv(editor, align);
        } else {
            div.style.textAlign = align;
        }
        return;
    }

    // 첫 줄만 존재할 경우
    const allDivs = editor.querySelectorAll('div');
    if (allDivs.length === 0) {
        wrapFirstLineInDiv(editor, align);
        return;
    }

    // 드래그된 영역 내 div들에 정렬 적용
    applyAlignmentToDivsInRange(editor, range, align);

    // div 없는 첫 줄 처리
    const parentOfFirstLine = getClosestDiv(range.startContainer)!;
    if (parentOfFirstLine === editor) {
        wrapFirstLineInDiv(editor, align);
    }
};
