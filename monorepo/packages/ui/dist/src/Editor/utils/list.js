import { getClosestDiv, getEditorRoot } from './alignment';
import { applyAttributeInEmptyRange, handleNewRange, handleRangeInList } from './range';
const wrapFirstLine = (editor, lines) => {
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
        nodesToWrap.forEach((node) => wrapper.appendChild(node));
        editor.insertBefore(wrapper, editor.childNodes[0]);
        lines.unshift(wrapper);
    }
};
export const getLinesInRange = (editor, range) => {
    const lines = [];
    const walker = document.createTreeWalker(editor, NodeFilter.SHOW_ELEMENT, {
        acceptNode: (node) => {
            if (!(node instanceof HTMLElement))
                return NodeFilter.FILTER_REJECT;
            const isDiv = node.tagName === 'DIV';
            const isLine = isDiv && node !== editor;
            const isInRange = range.intersectsNode(node);
            return isInRange && isLine ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
        },
    });
    while (walker.nextNode()) {
        lines.push(walker.currentNode);
    }
    return lines;
};
const wrapLine = (frag, tag, divs) => {
    if (divs.length === 0)
        return;
    const list = document.createElement(tag);
    divs.forEach((div) => {
        const li = document.createElement('li');
        li.appendChild(div);
        list.appendChild(li);
    });
    frag.appendChild(list);
};
const applyListInSplitedText = (currentList, selectedDivs, newListTag) => {
    const before = [];
    const selected = [];
    const after = [];
    let isSelectedLi = false;
    Array.from(currentList.children).forEach((li) => {
        const div = li.firstElementChild;
        if (!(div instanceof HTMLDivElement))
            return;
        if (selectedDivs.has(div)) {
            isSelectedLi = true;
            selected.push(div);
        }
        else if (!isSelectedLi) {
            before.push(div);
        }
        else {
            after.push(div);
        }
    });
    const frag = document.createDocumentFragment();
    wrapLine(frag, currentList.tagName.toLowerCase(), before);
    wrapLine(frag, newListTag, selected);
    wrapLine(frag, currentList.tagName.toLowerCase(), after);
    return frag;
};
export const applyListInEmptyRange = (editorRef, list) => {
    const listTag = list === 'disc' ? 'ul' : 'ol';
    const tag = document.createElement(listTag);
    const li = document.createElement('li');
    const div = document.createElement('div');
    li.appendChild(div);
    tag.appendChild(li);
    div.innerText = '\u200B';
    const reSelection = applyAttributeInEmptyRange(editorRef, tag);
    handleNewRange(div, reSelection, 0);
};
export const applyList = (selection, range, list) => {
    const editor = getEditorRoot(range);
    if (!editor)
        return;
    const lines = getLinesInRange(editor, range);
    const parentOfFirstLine = getClosestDiv(range.startContainer);
    if (parentOfFirstLine === editor) {
        wrapFirstLine(editor, lines);
    }
    const listTag = list === 'disc' ? 'ul' : 'ol';
    if (range.collapsed && lines.length === 0) {
        const liParent = document.createElement(listTag);
        const li = document.createElement('li');
        const div = document.createElement('div');
        li.appendChild(div);
        liParent.appendChild(li);
        div.innerText = '\u200B';
        range.insertNode(liParent);
        handleNewRange(div, selection, 0);
        return;
    }
    const firstLine = lines[0];
    const currentList = firstLine?.closest('ul, ol');
    if (currentList) {
        if (currentList.tagName.toLowerCase() === listTag)
            return;
        const selectedDivs = new Set(lines);
        const parent = currentList.parentNode;
        const fragment = applyListInSplitedText(currentList, selectedDivs, listTag);
        parent.replaceChild(fragment, currentList);
        const foundListTag = parent.querySelector(listTag);
        if (!foundListTag)
            return;
        handleRangeInList(foundListTag, selection);
        return;
    }
    const parent = firstLine.parentNode;
    const newList = document.createElement(listTag);
    lines.forEach((line) => {
        const li = document.createElement('li');
        li.appendChild(line.cloneNode(true));
        newList.appendChild(li);
    });
    parent?.insertBefore(newList, firstLine);
    lines.forEach((line) => {
        if (line.parentNode === parent) {
            parent?.removeChild(line);
        }
    });
    handleRangeInList(newList, selection);
};
//# sourceMappingURL=list.js.map