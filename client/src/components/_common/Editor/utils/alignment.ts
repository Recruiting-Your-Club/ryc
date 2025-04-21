import type { Align } from '../EditorToolbar';

const getClosestDiv = (node: Node): HTMLDivElement | null => {
    const element =
        node.nodeType === Node.ELEMENT_NODE ? (node as HTMLElement) : node.parentElement;
    return element?.closest('div') ?? null;
};

const getEditorRoot = (range: Range): HTMLElement => {
    let node: Node | null = range.commonAncestorContainer;

    // node와 그 조상을 계속 추적하여 최상단 element인지 판단함 (contentEditable 속성 -> 최상단에 속함)
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
