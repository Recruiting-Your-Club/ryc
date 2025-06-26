import { DEFAULT_FONT_SIZE, DEFAULT_TEXT_ALIGN, MAX_FONT_SIZE } from '@constants/Editor';
import { getEditorRoot } from './alignment';
import { getLinesInRange } from './list';
import { getTextNodes, getValidSelection } from './range';
export const getCurrentFormats = () => {
    const formatMap = {
        bold: false,
        italic: false,
        underline: false,
        strikethrough: false,
    };
    const { isValid, range } = getValidSelection();
    if (!isValid)
        return formatMap;
    if (range.collapsed) {
        const node = range.startContainer;
        const parent = node.nodeType === Node.TEXT_NODE
            ? node.parentElement
            : node;
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
    if (range.startContainer === range.endContainer &&
        range.startContainer.nodeType === Node.TEXT_NODE) {
        const node = range.startContainer;
        const selectedText = node.nodeValue?.slice(range.startOffset, range.endOffset) ?? '';
        if (!selectedText.trim())
            return formatMap;
        const parent = node.parentElement;
        if (parent?.tagName === 'SPAN') {
            if (parent.style.fontWeight === 'bold')
                formatMap.bold = true;
            if (parent.style.fontStyle === 'italic')
                formatMap.italic = true;
            if (parent.style.textDecoration.includes('underline'))
                formatMap.underline = true;
            if (parent.style.textDecoration.includes('line-through'))
                formatMap.strikethrough = true;
        }
        return formatMap;
    }
    const textNodes = getTextNodes(range);
    const allFormats = {
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
        if (parent.style.fontWeight !== 'bold')
            allFormats.bold = false;
        if (parent.style.fontStyle !== 'italic')
            allFormats.italic = false;
        if (!parent.style.textDecoration.includes('underline'))
            allFormats.underline = false;
        if (!parent.style.textDecoration.includes('line-through'))
            allFormats.strikethrough = false;
    }
    return allFormats;
};
export const getCurrentAlignment = () => {
    const { isValid, range } = getValidSelection();
    if (!isValid)
        return DEFAULT_TEXT_ALIGN;
    const editor = getEditorRoot(range);
    if (!editor)
        return DEFAULT_TEXT_ALIGN;
    if (range.startContainer === editor)
        return DEFAULT_TEXT_ALIGN;
    const lines = getLinesInRange(editor, range);
    if (lines.length === 0)
        return DEFAULT_TEXT_ALIGN;
    const currentDiv = lines[0].closest('div');
    if (currentDiv) {
        return currentDiv.style.textAlign;
    }
    return DEFAULT_TEXT_ALIGN;
};
export const getCurrentLists = () => {
    const listMap = {
        disc: false,
        decimal: false,
    };
    const { isValid, range } = getValidSelection();
    if (!isValid)
        return listMap;
    const editor = getEditorRoot(range);
    if (!editor)
        return listMap;
    if (range.startContainer === editor)
        return listMap;
    const lines = getLinesInRange(editor, range);
    if (lines.length === 0)
        return listMap;
    const currentList = lines[0].closest('ul, ol');
    if (currentList) {
        listMap.disc = currentList.tagName === 'UL';
        listMap.decimal = currentList.tagName === 'OL';
    }
    return listMap;
};
export const getCurrentSize = () => {
    const { isValid, range } = getValidSelection();
    if (!isValid)
        return DEFAULT_FONT_SIZE;
    const editor = getEditorRoot(range);
    if (!editor)
        return DEFAULT_FONT_SIZE;
    if (range.collapsed) {
        const node = range.startContainer;
        const parent = node.nodeType === Node.TEXT_NODE
            ? node.parentElement
            : node;
        if (parent?.tagName === 'SPAN') {
            if (!parent.style.fontSize)
                return DEFAULT_FONT_SIZE;
            return parent.style.fontSize;
        }
        return DEFAULT_FONT_SIZE;
    }
    if (range.startContainer === range.endContainer &&
        range.startContainer.nodeType === Node.TEXT_NODE) {
        const node = range.startContainer;
        const selectedText = node.nodeValue?.slice(range.startOffset, range.endOffset) ?? '';
        if (!selectedText.trim())
            return DEFAULT_FONT_SIZE;
        const parent = node.parentElement;
        if (parent?.tagName === 'SPAN') {
            if (!parent.style.fontSize)
                return DEFAULT_FONT_SIZE;
            return parent.style.fontSize;
        }
        return DEFAULT_FONT_SIZE;
    }
    const textNodes = getTextNodes(range);
    let minSize = MAX_FONT_SIZE;
    for (const textNode of textNodes) {
        const parent = textNode.parentElement;
        if (!parent || parent.tagName !== 'SPAN') {
            minSize = DEFAULT_FONT_SIZE;
            break;
        }
        const fontSizeInt = parseInt(parent.style.fontSize);
        const minSizeInt = parseInt(minSize);
        if (fontSizeInt < minSizeInt) {
            minSize = parent.style.fontSize;
        }
    }
    return minSize;
};
//# sourceMappingURL=selection.js.map