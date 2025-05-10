import type { List } from '../types';
import { getClosestDiv, getEditorRoot } from './alignment';

// div로 감싸지지 않은 첫 줄을 div로 감싸기
const wrapFirstLine = (editor: HTMLElement, lines: HTMLElement[]) => {
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
        nodesToWrap.forEach((node) => wrapper.appendChild(node));

        editor.insertBefore(wrapper, editor.childNodes[0]);
        lines.unshift(wrapper);
    }
};

// 드래그 or 커서에 속한 라인 수집
export const getLinesInRange = (editor: HTMLElement, range: Range): HTMLElement[] => {
    const lines: HTMLElement[] = [];

    const walker = document.createTreeWalker(editor, NodeFilter.SHOW_ELEMENT, {
        acceptNode: (node) => {
            if (!(node instanceof HTMLElement)) return NodeFilter.FILTER_REJECT;
            const isDiv = node.tagName === 'DIV';
            const isLine = isDiv && node !== editor;
            const isInRange = range.intersectsNode(node);
            return isInRange && isLine ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
        },
    });

    while (walker.nextNode()) {
        lines.push(walker.currentNode as HTMLElement);
    }

    return lines;
};

const wrapLine = (frag: DocumentFragment, tag: string, divs: HTMLElement[]) => {
    if (divs.length === 0) return;

    const list = document.createElement(tag);

    divs.forEach((div) => {
        const li = document.createElement('li');
        li.appendChild(div);
        list.appendChild(li);
    });

    frag.appendChild(list);
};

// ul 이나 ol 태그 내부 노드 탐색해서 split한 후 선택된 li 태그 노드에만 새로운 부모 태그 적용
// 기존 li 태그 노드는 기존 부모 태그 적용
const applyListInSplitedText = (
    currentList: HTMLElement,
    selectedDivs: Set<HTMLElement>,
    newListTag: string,
): DocumentFragment => {
    const before: HTMLElement[] = [];
    const selected: HTMLElement[] = [];
    const after: HTMLElement[] = [];

    let isSelectedLi = false;
    // currentList.children은 HTMLCollection 타입이므로 Array 변환 필요
    Array.from(currentList.children).forEach((li) => {
        const div = li.firstElementChild;
        if (!(div instanceof HTMLDivElement)) return;

        if (selectedDivs.has(div)) {
            isSelectedLi = true;
            selected.push(div);
        } else if (!isSelectedLi) {
            before.push(div);
        } else {
            after.push(div);
        }
    });

    const frag = document.createDocumentFragment();

    wrapLine(frag, currentList.tagName.toLowerCase(), before);
    wrapLine(frag, newListTag, selected);
    wrapLine(frag, currentList.tagName.toLowerCase(), after);

    return frag;
};

export const applyList = (range: Range, list: List) => {
    if (!range) return;

    const editor = getEditorRoot(range);
    if (!editor) return;
    if (range.startContainer === editor) return;

    const lines = getLinesInRange(editor, range);

    // 첫 줄이 div로 감싸져 있지 않다면 div 생성
    const parentOfFirstLine = getClosestDiv(range.startContainer);
    if (parentOfFirstLine === editor) {
        wrapFirstLine(editor, lines);
    }

    if (lines.length === 0) return;

    const listTag = list === 'disc' ? 'ul' : 'ol';

    const firstLine = lines[0];
    const currentList = firstLine.closest('ul, ol');

    // 범위 내 적용된 리스트가 있을 경우
    if (currentList) {
        // 같은 리스트 버튼을 누르면 종료
        if (currentList.tagName.toLowerCase() === list) return;

        const selectedDivs = new Set(lines);
        const parent = currentList.parentNode!;
        const fragment = applyListInSplitedText(currentList as HTMLElement, selectedDivs, listTag);

        parent.replaceChild(fragment, currentList);
        return;
    }

    // 리스트가 적용되어있지 않은 경우
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
};
