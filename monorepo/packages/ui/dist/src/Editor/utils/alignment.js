import { applyAttributeInEmptyRange, preserveSelection } from './range';
export const getClosestDiv = (node) => {
    const element = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
    return element?.closest('div') ?? null;
};
export const getEditorRoot = (range) => {
    let node = range.commonAncestorContainer;
    while (node) {
        if (node instanceof HTMLElement && node.getAttribute('contenteditable') === 'true') {
            return node;
        }
        node = node.parentNode;
    }
    return null;
};
const wrapFirstLineInDiv = (editor, align) => {
    const nodesToWrap = [];
    const childNodes = Array.from(editor.childNodes);
    for (const node of childNodes) {
        if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'DIV') {
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
const applyAlignmentToDivsInRange = (editor, range, align) => {
    const walker = document.createTreeWalker(editor, NodeFilter.SHOW_ELEMENT, {
        acceptNode: (node) => {
            if (!(node instanceof HTMLElement))
                return NodeFilter.FILTER_SKIP;
            if (node.tagName !== 'DIV')
                return NodeFilter.FILTER_SKIP;
            const isIntersecting = range.intersectsNode(node);
            return isIntersecting ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
        },
    });
    while (walker.nextNode()) {
        const div = walker.currentNode;
        div.style.textAlign = align;
    }
};
export const applyAlignmentInEmptyRange = (editorRef, align) => {
    const cssStyle = { textAlign: align.toString() };
    const div = document.createElement('div');
    Object.assign(div.style, cssStyle);
    div.innerText = '\u200B';
    applyAttributeInEmptyRange(editorRef, div);
};
export const applyAlignment = (selection, range, align) => {
    const editor = getEditorRoot(range);
    if (!editor)
        return;
    if (range.collapsed) {
        const div = getClosestDiv(range.startContainer);
        if (div === editor) {
            preserveSelection(selection, range, () => {
                wrapFirstLineInDiv(editor, align);
            });
        }
        else {
            div.style.textAlign = align;
        }
        return;
    }
    const allDivs = editor.querySelectorAll('div');
    if (allDivs.length === 0) {
        preserveSelection(selection, range, () => {
            wrapFirstLineInDiv(editor, align);
        });
        return;
    }
    applyAlignmentToDivsInRange(editor, range, align);
    const parentOfFirstLine = getClosestDiv(range.startContainer);
    if (parentOfFirstLine === editor) {
        preserveSelection(selection, range, () => {
            wrapFirstLineInDiv(editor, align);
        });
    }
};
//# sourceMappingURL=alignment.js.map