import theme from '@styles/theme';
import { getEditorRoot } from './alignment';
import { applyAttributeInEmptyRange, getTextNodes, handleNewRange } from './range';
export const applyStyleInSelectedText = (text, parent, style, isSpan, selectedStart, selectedEnd, isOverallStyle = true, color) => {
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
export const splitTextAndApplyStyleAtCursor = (currentNode, offset, parent, style, emptyTextNode, color) => {
    const grandParent = parent.parentElement;
    const text = currentNode.nodeType === Node.TEXT_NODE ? currentNode.nodeValue : '';
    const before = text.slice(0, offset);
    const after = text.slice(offset);
    if (before) {
        const beforeSpan = parent.cloneNode(false);
        beforeSpan.textContent = before;
        grandParent.insertBefore(beforeSpan, parent);
    }
    const newSpan = parent.cloneNode(false);
    applyTextStyle(newSpan, style, undefined, color);
    newSpan.appendChild(emptyTextNode);
    grandParent.insertBefore(newSpan, parent);
    if (after) {
        const afterSpan = parent.cloneNode(false);
        afterSpan.textContent = after;
        grandParent.insertBefore(afterSpan, parent);
    }
    grandParent.removeChild(parent);
};
const createSpan = (style, text, originalStyle, applyNewStyle = false, isOverallStyle = true, color) => {
    const span = document.createElement('span');
    span.style.cssText = originalStyle;
    if (applyNewStyle)
        applyTextStyle(span, style, isOverallStyle, color);
    span.textContent = text;
    return span;
};
const hasColor = (elem, colorType, color) => {
    switch (colorType) {
        case 'color':
            return elem.style.color === color;
        case 'background':
            return elem.style.backgroundColor === color;
        default:
            return false;
    }
};
const toggleColor = (elem, colorType, color, shouldApply) => {
    switch (colorType) {
        case 'color':
            elem.style.color = shouldApply ? color : elem.style.color;
            break;
        case 'background':
            if (color === theme.colors.white)
                color = 'transparent';
            elem.style.backgroundColor = shouldApply ? color : elem.style.backgroundColor;
            break;
    }
};
const hasTextStyle = (elem, style, color) => {
    if (style && color)
        return hasColor(elem, style, color);
    if (style.endsWith('px'))
        return elem.style.fontSize === style;
    switch (style) {
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
const toggleTextStyle = (elem, style, shouldApply, color) => {
    if (style && color)
        toggleColor(elem, style, color, shouldApply);
    if (style.endsWith('px'))
        elem.style.fontSize = shouldApply ? style : elem.style.fontSize;
    switch (style) {
        case 'bold':
            elem.style.fontWeight = shouldApply ? 'bold' : '';
            break;
        case 'italic':
            elem.style.fontStyle = shouldApply ? 'italic' : '';
            break;
        case 'underline':
            elem.style.textDecoration = toggleTextDecoration(elem.style.textDecoration, 'underline', shouldApply);
            break;
        case 'strikethrough':
            elem.style.textDecoration = toggleTextDecoration(elem.style.textDecoration, 'line-through', shouldApply);
            break;
    }
};
const toggleTextDecoration = (current, style, shouldApply) => {
    const values = current
        .split(' ')
        .map((value) => value.trim())
        .filter((value) => value.length > 0);
    const isExist = values.includes(style);
    if (shouldApply && !isExist) {
        return [...values, style].join(' ');
    }
    else if (!shouldApply && isExist) {
        return values.filter((value) => value !== style).join(' ');
    }
    else {
        return current;
    }
};
const applyTextStyle = (span, style, isOverallStyle = true, color) => {
    const has = hasTextStyle(span, style, color);
    const toggledHas = !isOverallStyle ? !has : has;
    toggleTextStyle(span, style, !toggledHas, color);
};
const applyTextStyleAtCursor = (selection, range, style, color) => {
    const currentNode = range.startContainer;
    const offset = range.startOffset;
    const emptyTextNode = document.createTextNode('\u200B');
    const spanAncestor = currentNode.parentElement?.closest('span');
    if (spanAncestor) {
        splitTextAndApplyStyleAtCursor(currentNode, offset, spanAncestor, style, emptyTextNode, color);
    }
    else {
        const span = document.createElement('span');
        applyTextStyle(span, style, undefined, color);
        span.appendChild(emptyTextNode);
        range.insertNode(span);
    }
    handleNewRange(emptyTextNode, selection);
};
const applyTextStyleInSingleTextNode = (range, style, color) => {
    const textNode = range.startContainer;
    const text = textNode.textContent || '';
    const startOffset = range.startOffset;
    const endOffset = range.endOffset;
    const parent = textNode.parentNode;
    const grandParent = parent?.parentNode;
    const isSpan = parent?.nodeName === 'SPAN';
    if (isSpan) {
        grandParent?.removeChild(parent);
    }
    else {
        parent?.removeChild(textNode);
    }
    range.insertNode(applyStyleInSelectedText(text, parent, style, isSpan, startOffset, endOffset, undefined, color));
};
const applyTextStyleInMultipleTextNode = (range, style, color) => {
    const textNodesInCommon = getTextNodes(range);
    const isOverallStyle = textNodesInCommon.every((textNode) => {
        const parent = textNode.parentElement;
        return parent?.tagName === 'SPAN' && hasTextStyle(parent, style, color);
    });
    textNodesInCommon.forEach((textNode, index) => {
        const parent = textNode.parentElement;
        const text = textNode.textContent || '';
        const isSpan = parent?.tagName === 'SPAN';
        const isFirst = index === 0;
        const isLast = index === textNodesInCommon.length - 1;
        const start = isFirst ? range.startOffset : 0;
        const end = isLast ? range.endOffset : text.length;
        if (start !== 0 || end !== text.length) {
            const frag = applyStyleInSelectedText(text, parent, style, isSpan, start, end, isOverallStyle, color);
            if (isSpan) {
                parent.replaceWith(frag);
            }
            else {
                textNode.replaceWith(frag);
            }
            return;
        }
        if (isSpan) {
            toggleTextStyle(parent, style, !isOverallStyle, color);
        }
        else {
            const span = document.createElement('span');
            span.textContent = text;
            applyTextStyle(span, style, undefined, color);
            textNode.replaceWith(span);
        }
    });
};
const getFormatStyle = (style, color) => {
    if (style && color) {
        if (style === 'color')
            return { color: color };
        if (style === 'background')
            return { backgroundColor: color };
    }
    if (style.endsWith('px'))
        return { fontSize: style.toString() };
    switch (style) {
        case 'bold':
            return { fontWeight: 'bold' };
        case 'italic':
            return { fontStyle: 'italic' };
        case 'underline':
            return { textDecoration: 'underline' };
        case 'strikethrough':
            return { textDecoration: 'line-through' };
        default:
            return {};
    }
};
export const applyStyleInEmptyRange = (editorRef, style, color) => {
    if (!editorRef.current)
        return;
    const cssStyle = getFormatStyle(style, color);
    const existingZWSP = Array.from(editorRef.current.querySelectorAll('span')).find((span) => span.textContent === '\u200B');
    if (existingZWSP) {
        Object.assign(existingZWSP.style, cssStyle);
        applyAttributeInEmptyRange(editorRef, existingZWSP);
    }
    else {
        const span = document.createElement('span');
        Object.assign(span.style, cssStyle);
        span.innerText = '\u200B';
        applyAttributeInEmptyRange(editorRef, span);
    }
};
export const applyStyle = (selection, range, style, color) => {
    const editor = getEditorRoot(range);
    if (!editor)
        return;
    if (range.collapsed) {
        return applyTextStyleAtCursor(selection, range, style, color);
    }
    if (range.startContainer.nodeType === Node.TEXT_NODE &&
        range.endContainer.nodeType === Node.TEXT_NODE &&
        range.startContainer === range.endContainer) {
        return applyTextStyleInSingleTextNode(range, style, color);
    }
    return applyTextStyleInMultipleTextNode(range, style, color);
};
//# sourceMappingURL=textStyles.js.map