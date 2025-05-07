import theme from '@styles/theme';
import type { Format, Size, TextColor } from '../types';
import { getEditorRoot } from './alignment';
import { getTextNodes, handleNewRange } from './range';

export const applyStyleInSelectedText = (
    text: string,
    parent: HTMLElement | null,
    style: Format | Size | TextColor,
    isSpan: boolean,
    selectedStart: number,
    selectedEnd: number,
    isOverallStyle: boolean = true,
    color?: string,
): DocumentFragment => {
    const originalStyle = isSpan ? parent?.getAttribute('style') || '' : '';

    const before = text.slice(0, selectedStart);
    const selected = text.slice(selectedStart, selectedEnd);
    const after = text.slice(selectedEnd);

    const frag = document.createDocumentFragment();
    if (before)
        frag.appendChild(createSpan(style, before, originalStyle, undefined, undefined, color));
    frag.appendChild(createSpan(style, selected, originalStyle, true, isOverallStyle, color));
    if (after)
        frag.appendChild(createSpan(style, after, originalStyle, undefined, undefined, color));

    return frag;
};

// 커서 위치 기준으로 텍스트 나눠서 스타일 적용
export const splitTextAndApplyStyleAtCursor = (
    currentNode: Node,
    offset: number,
    parent: HTMLElement,
    style: Format | Size | TextColor,
    emptyTextNode: Text,
    color?: string,
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
    applyTextStyle(newSpan, style, undefined, color);
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
    style: Format | Size | TextColor,
    text: string,
    originalStyle: string,
    applyNewStyle = false,
    isOverallStyle = true,
    color?: string,
) => {
    const span = document.createElement('span');
    span.style.cssText = originalStyle; // style 객체와 연동되는 cssText 사용

    if (applyNewStyle) applyTextStyle(span, style, isOverallStyle, color); // style만 추가/제거
    span.textContent = text;

    return span;
};

const hasColor = (elem: HTMLElement, colorType: TextColor, color: string): boolean => {
    switch (colorType) {
        case 'color':
            return elem.style.color === color;
        case 'background':
            return elem.style.backgroundColor === color;
        default:
            return false;
    }
};

const toggleColor = (
    elem: HTMLElement,
    colorType: TextColor,
    color: string,
    shouldApply: boolean,
) => {
    switch (colorType) {
        case 'color':
            elem.style.color = shouldApply ? color : elem.style.color;
            break;
        case 'background':
            if (color === theme.colors.white) color = 'transparent';
            elem.style.backgroundColor = shouldApply ? color : elem.style.backgroundColor;
            break;
    }
};

// 해당 span이 특정 스타일을 가지고 있는지 확인
const hasTextStyle = (
    elem: HTMLElement,
    style: Format | Size | TextColor,
    color?: string,
): boolean => {
    if ((style as TextColor) && color) return hasColor(elem, style as TextColor, color);
    if ((style as Size).endsWith('px')) return elem.style.fontSize === style;

    switch (style as Format) {
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
const toggleTextStyle = (
    elem: HTMLElement,
    style: Format | Size | TextColor,
    shouldApply: boolean,
    color?: string,
) => {
    if ((style as TextColor) && color) toggleColor(elem, style as TextColor, color, shouldApply);

    if ((style as Size).endsWith('px'))
        elem.style.fontSize = shouldApply ? style : elem.style.fontSize;

    switch (style as Format) {
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

const applyTextStyle = (
    span: HTMLElement,
    style: Format | Size | TextColor,
    isOverallStyle: boolean = true,
    color?: string,
) => {
    const has = hasTextStyle(span, style, color);
    const toggledHas = !isOverallStyle && has ? !has : has; // 전체 텍스트는 format 적용 안되어있지만 해당 텍스트는 format을 가지고 있다면 toggle

    toggleTextStyle(span, style, !toggledHas, color);
};

const applyTextStyleAtCursor = (
    selection: Selection,
    range: Range,
    style: Format | Size | TextColor,
    color?: string,
) => {
    const currentNode = range.startContainer;
    const offset = range.startOffset; // 커서 위치
    const emptyTextNode = document.createTextNode('\u200B'); // &ZeroWidthSpace;

    const spanAncestor = currentNode.parentElement?.closest('span') as HTMLSpanElement | null;
    if (spanAncestor) {
        splitTextAndApplyStyleAtCursor(
            currentNode,
            offset,
            spanAncestor,
            style,
            emptyTextNode,
            color,
        );
    } else {
        // span으로 감싸져 있지 않은 경우
        const span = document.createElement('span');
        applyTextStyle(span, style, undefined, color);
        span.appendChild(emptyTextNode);

        range.insertNode(span);
    }
    handleNewRange(emptyTextNode, selection);
};

const applyTextStyleInSingleTextNode = (
    range: Range,
    style: Format | Size | TextColor,
    color?: string,
) => {
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
        applyStyleInSelectedText(
            text,
            parent,
            style,
            isSpan,
            startOffset,
            endOffset,
            undefined,
            color,
        ),
    );
};

const applyTextStyleInMultipleTextNode = (
    range: Range,
    style: Format | Size | TextColor,
    color?: string,
) => {
    const textNodesInCommon = getTextNodes(range);

    // 모든 span이 이미 해당 스타일을 가지고 있는지 확인
    const isOverallStyle = textNodesInCommon.every((textNode) => {
        const parent = textNode.parentElement;
        return parent?.tagName === 'SPAN' && hasTextStyle(parent, style, color);
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
                style,
                isSpan,
                start,
                end,
                isOverallStyle,
                color,
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
            toggleTextStyle(parent, style, !isOverallStyle, color);
        } else {
            const span = document.createElement('span');
            span.textContent = text;
            applyTextStyle(span, style, undefined, color);
            textNode.replaceWith(span);
        }
    });
};

export const applyStyle = (
    selection: Selection,
    range: Range,
    style: Format | Size | TextColor,
    color?: string,
) => {
    const editor = getEditorRoot(range);
    if (!editor) return;

    // 커서만 있는 경우
    if (range.collapsed) {
        return applyTextStyleAtCursor(selection, range, style, color);
    }

    // 선택된 영역이 하나의 텍스트 노드 안에서 이루어진 경우
    if (
        range.startContainer.nodeType === Node.TEXT_NODE &&
        range.endContainer.nodeType === Node.TEXT_NODE &&
        range.startContainer === range.endContainer
    ) {
        return applyTextStyleInSingleTextNode(range, style, color);
    }

    // 선택 범위 안의 노드들이 여러 태그로 감싸져 나뉘었을 경우
    return applyTextStyleInMultipleTextNode(range, style, color);
};
