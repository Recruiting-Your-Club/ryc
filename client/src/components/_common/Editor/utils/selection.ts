import { DEFAULT_FONT_SIZE, DEFAULT_TEXT_ALIGN, MAX_FONT_SIZE } from '@constants/Editor';
import type { Align, Format, List, Size } from '../types';
import { getEditorRoot } from './alignment';
import { getLinesInRange } from './list';
import { getTextNodes, getValidRange } from './range';

// format 적용 여부를 버튼으로 알려주기 위한 Record 반환 함수
export const getCurrentFormats = (): Record<Format, boolean> => {
    const formatMap: Record<Format, boolean> = {
        bold: false,
        italic: false,
        underline: false,
        strikethrough: false,
    };

    const { isValid, range } = getValidRange();
    if (!isValid) return formatMap;

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

export const getCurrentAlignment = (): Align => {
    const { isValid, range } = getValidRange();
    if (!isValid) return DEFAULT_TEXT_ALIGN;

    const editor = getEditorRoot(range);
    if (!editor) return DEFAULT_TEXT_ALIGN;
    if (range.startContainer === editor) return DEFAULT_TEXT_ALIGN;

    const lines = getLinesInRange(editor, range);
    if (lines.length === 0) return DEFAULT_TEXT_ALIGN;

    const currentDiv = lines[0].closest('div');

    if (currentDiv) {
        return currentDiv.style.textAlign as Align;
    }

    return DEFAULT_TEXT_ALIGN;
};

// list 적용 여부를 버튼으로 알려주기 위한 Record 반환 함수
export const getCurrentLists = (): Record<List, boolean> => {
    const listMap: Record<List, boolean> = {
        disc: false,
        decimal: false,
    };

    const { isValid, range } = getValidRange();
    if (!isValid) return listMap;

    const editor = getEditorRoot(range);
    if (!editor) return listMap;
    if (range.startContainer === editor) return listMap;

    const lines = getLinesInRange(editor, range);
    if (lines.length === 0) return listMap;

    const currentList = lines[0].closest('ul, ol');

    if (currentList) {
        listMap.disc = currentList.tagName === 'UL';
        listMap.decimal = currentList.tagName === 'OL';
    }

    return listMap;
};

// size 적용 여부를 알려주기 위한 Size 반환 함수
// 16px과 24px text를 함께 드래그했을 경우 -> 작은 텍스트 크기인 16px로 반영됩니다.
export const getCurrentSize = (): Size => {
    const { isValid, range } = getValidRange();
    if (!isValid) return DEFAULT_FONT_SIZE;

    const editor = getEditorRoot(range);
    if (!editor) return DEFAULT_FONT_SIZE;

    if (range.collapsed) {
        const node = range.startContainer;
        const parent =
            node.nodeType === Node.TEXT_NODE
                ? (node.parentElement as HTMLElement)
                : (node as HTMLElement);
        if (parent?.tagName === 'SPAN') {
            if (!parent.style.fontSize) return DEFAULT_FONT_SIZE;

            return parent.style.fontSize as Size;
        }
        return DEFAULT_FONT_SIZE;
    }

    // 드래그 영역이 하나의 텍스트 노드 내부일 때
    if (
        range.startContainer === range.endContainer &&
        range.startContainer.nodeType === Node.TEXT_NODE
    ) {
        const node = range.startContainer as Text;
        const selectedText = node.nodeValue?.slice(range.startOffset, range.endOffset) ?? '';
        if (!selectedText.trim()) return DEFAULT_FONT_SIZE;

        const parent = node.parentElement;
        if (parent?.tagName === 'SPAN') {
            if (!parent.style.fontSize) return DEFAULT_FONT_SIZE;
            return parent.style.fontSize as Size;
        }

        return DEFAULT_FONT_SIZE;
    }

    // 드래그 영역이 여러 텍스트 노드에 걸쳐 있을 때
    const textNodes = getTextNodes(range);

    let minSize: Size = MAX_FONT_SIZE;

    for (const textNode of textNodes) {
        const parent = textNode.parentElement;
        if (!parent || parent.tagName !== 'SPAN') {
            minSize = DEFAULT_FONT_SIZE;
            break;
        }

        const fontSizeInt = parseInt(parent.style.fontSize);
        const minSizeInt = parseInt(minSize);

        if (fontSizeInt < minSizeInt) {
            minSize = parent.style.fontSize as Size;
        }
    }

    return minSize;
};
