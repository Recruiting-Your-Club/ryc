import type { Format } from '../EditorToolbar';
import { getTextNodes, handleNewRange } from './range';

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

export const applyFormat = (span: HTMLElement, format: Format, isOverallStyle: boolean = true) => {
    const has = hasFormat(span, format);
    const toggledHas = !isOverallStyle && has ? !has : has; // 전체 텍스트는 format 적용 안되어있지만 해당 텍스트는 format을 가지고 있다면 toggle

    toggleFormat(span, format, !toggledHas);
};

const applyStyleFormatAtCursor = (selection: Selection, range: Range, format: Format) => {
    const currentNode = range.startContainer;
    const offset = range.startOffset; // 커서 위치
    const emptyTextNode = document.createTextNode('\u200B'); // &ZeroWidthSpace;

    const spanAncestor =
        currentNode.nodeType === Node.TEXT_NODE
            ? (currentNode.parentElement?.closest('span') as HTMLSpanElement | null)
            : (currentNode as HTMLElement)?.closest?.('span');

    if (spanAncestor) {
        const parent = spanAncestor;
        applyStyleAtCursor(currentNode, offset, parent, format, emptyTextNode);
    } else {
        // span으로 감싸져 있지 않은 경우
        const span = document.createElement('span');
        applyFormat(span, format);
        span.appendChild(emptyTextNode);

        range.insertNode(span);
    }

    handleNewRange(emptyTextNode, selection);
};

const applyStyleFormatInSingleTextNode = (range: Range, format: Format) => {
    const textNode = range.startContainer as Text;
    const text = textNode.textContent || '';
    const startOffset = range.startOffset;
    const endOffset = range.endOffset;

    const parent = textNode.parentNode as HTMLElement;
    const grandParent = parent?.parentNode;

    // span으로 감싸졌는지 확인 -> 기존 스타일이 없는 경우 기본값
    const isSpan = parent?.nodeName === 'SPAN';

    // 기존 텍스트 제거
    if (isSpan) {
        grandParent?.removeChild(parent);
    } else {
        parent?.removeChild(textNode);
    }

    range.insertNode(
        applyStyleInSelectedText(text, parent, format, isSpan, startOffset, endOffset),
    );
};

const applyStyleFormatInMultipleTextNode = (range: Range, format: Format) => {
    const textNodesInCommon = getTextNodes(range);

    // 모든 span이 이미 해당 스타일을 가지고 있는지 확인
    const isOverallStyle = textNodesInCommon.every((textNode) => {
        const parent = textNode.parentElement;
        return parent?.tagName === 'SPAN' && hasFormat(parent, format);
    });

    // 스타일 적용 or 제거
    textNodesInCommon.forEach((textNode, index) => {
        const parent = textNode.parentElement;
        const text = textNode.textContent || '';
        const isSpan = parent?.tagName === 'SPAN';

        const isFirst = index === 0;
        const isLast = index === textNodesInCommon.length - 1;

        const start = isFirst ? range.startOffset : 0;
        const end = isLast ? range.endOffset : text.length;

        // 여러 노드들을 걸쳐 일부만 선택했을 경우
        if (start !== 0 || end !== text.length) {
            const frag = applyStyleInSelectedText(
                text,
                parent,
                format,
                isSpan,
                start,
                end,
                isOverallStyle,
            );
            if (isSpan) {
                parent.replaceWith(frag);
            } else {
                textNode.replaceWith(frag);
            }
            return;
        }

        // 노드 범위 전체 선택
        if (isSpan) {
            toggleFormat(parent, format, !isOverallStyle);
        } else {
            const span = document.createElement('span');
            span.textContent = text;
            applyFormat(span, format);
            textNode.replaceWith(span);
        }
    });
};

export const applyStyleFormat = (selection: Selection, range: Range, format: Format) => {
    // 커서만 있는 경우
    if (range.collapsed) {
        return applyStyleFormatAtCursor(selection, range, format);
    }

    // 선택된 영역이 하나의 텍스트 노드 안에서 이루어진 경우
    if (
        range.startContainer.nodeType === Node.TEXT_NODE &&
        range.endContainer.nodeType === Node.TEXT_NODE &&
        range.startContainer === range.endContainer
    ) {
        return applyStyleFormatInSingleTextNode(range, format);
    }

    // 선택 범위 안의 노드들이 여러 태그로 감싸져 나뉘었을 경우
    return applyStyleFormatInMultipleTextNode(range, format);
};
