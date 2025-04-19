import { alignButtons, formatButtons } from '@constants/Editor';
import type { CSSObject } from '@emotion/react';
import React, { useEffect } from 'react';
import { buttonGroup, perButtonCss, svgCss, toolbarContainer } from './Editor.style';
import { useEditorContext } from './EditorContext';
import {
    applyFormat,
    applyStyleInSelectedText,
    applyStyleInSplitedText,
    getCurrentFormats,
    getTextNodes,
    handleNewRange,
    hasFormat,
    toggleFormat,
} from './utils';

export type Format = 'bold' | 'italic' | 'underline' | 'strikethrough';
export type Align = 'left' | 'center' | 'right' | 'justify';
interface ToolbarProps {
    radius?: string;
    sx?: CSSObject;
}

function EditorToolbar({ radius, sx }: ToolbarProps) {
    // prop destruction
    // lib hooks
    const { formats, setFormats, toggleFormatButton, setAlign } = useEditorContext();

    // initial values
    // state, ref, querystring hooks
    // form hooks
    // query hooks
    // calculated values

    // handlers
    const applyStyle = (format: Format) => {
        const selection = window.getSelection(); // 드래그로 선택된 객체
        if (!selection || selection.rangeCount === 0) return;

        const range = selection.getRangeAt(0); // 드래그된 부분
        toggleFormatButton(format);

        // 커서만 있는 경우
        if (range.collapsed) {
            const currentNode = range.startContainer;
            const offset = range.startOffset; // 커서 위치
            const emptyTextNode = document.createTextNode('\u200B'); // &ZeroWidthSpace;

            const spanAncestor =
                currentNode.nodeType === Node.TEXT_NODE
                    ? (currentNode.parentElement?.closest('span') as HTMLSpanElement | null)
                    : (currentNode as HTMLElement)?.closest?.('span');

            if (spanAncestor) {
                const parent = spanAncestor;
                applyStyleInSplitedText(currentNode, offset, parent, format, emptyTextNode);
            } else {
                // span으로 감싸져 있지 않은 경우
                const span = document.createElement('span');
                applyFormat(span, format);
                span.appendChild(emptyTextNode);

                range.insertNode(span);
            }

            handleNewRange(emptyTextNode, selection);

            return;
        }

        const startContainer = range.startContainer;
        const endContainer = range.endContainer;

        // 선택된 영역이 하나의 텍스트 노드 안에서 이루어진 경우
        if (
            startContainer.nodeType === Node.TEXT_NODE &&
            endContainer.nodeType === Node.TEXT_NODE &&
            startContainer === endContainer
        ) {
            const textNode = startContainer as Text;
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
            ); // 원래 위치에 삽입
        } else {
            // 선택 범위 안의 노드들이 여러 태그로 감싸져 나뉘었을 경우
            const textNodesInCommon = getTextNodes(range);

            // span이 이미 해당 스타일을 가지고 있는지 확인
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

                // 노드 하나 안에서 일부 선택
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
        }
    };

    const applyAlignment = () => {};

    // effects
    useEffect(() => {
        const updateFormats = () => {
            setFormats(getCurrentFormats());
        };

        document.addEventListener('selectionchange', updateFormats);
        document.addEventListener('mouseup', updateFormats);
        document.addEventListener('keyup', updateFormats);

        return () => {
            document.removeEventListener('selectionchange', updateFormats);
            document.removeEventListener('mouseup', updateFormats);
            document.removeEventListener('keyup', updateFormats);
        };
    }, []);

    return (
        <div css={[toolbarContainer(radius), sx]}>
            <div css={buttonGroup}>
                {formatButtons.map(({ format, Svg }) => (
                    <button
                        key={format}
                        onClick={() => applyStyle(format as Format)}
                        css={perButtonCss}
                    >
                        <Svg css={svgCss(formats[format as Format])} />
                    </button>
                ))}
            </div>
            <div css={buttonGroup}>
                {alignButtons.map(({ align, Svg }) => (
                    <button key={align} onClick={() => setAlign(align as Align)} css={perButtonCss}>
                        <Svg css={svgCss(false)} />
                    </button>
                ))}
            </div>
        </div>
    );
}

export { EditorToolbar };
