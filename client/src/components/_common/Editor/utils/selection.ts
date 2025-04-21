import type { Format } from '../EditorToolbar';
import { getTextNodes } from './range';
import React, { useEffect } from 'react';

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
