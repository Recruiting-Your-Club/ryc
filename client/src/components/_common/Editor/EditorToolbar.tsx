import Center from '@assets/images/text-align-center.svg';
import Justify from '@assets/images/text-align-justify.svg';
import Left from '@assets/images/text-align-left.svg';
import Right from '@assets/images/text-align-right.svg';
import Bold from '@assets/images/text-bold.svg';
import Italic from '@assets/images/text-italic.svg';
import Strikethrough from '@assets/images/text-strikethrough.svg';
import Underline from '@assets/images/text-underline.svg';
import type { CSSObject } from '@emotion/react';
import React, { useEffect } from 'react';
import { buttonGroup, perButtonCss, svgCss, toolbarContainer } from './Editor.style';
import { useEditorContext } from './EditorContext';
import {
    applyFormat,
    applyStyleInSelectedText,
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
    const { formats, setFormats, toggleFormatButton, setAlign } = useEditorContext();

    const formatButtons = [
        { format: 'bold', Svg: Bold },
        { format: 'italic', Svg: Italic },
        { format: 'underline', Svg: Underline },
        { format: 'strikethrough', Svg: Strikethrough },
    ];

    const alignButtons = [
        { align: 'left', Svg: Left },
        { align: 'center', Svg: Center },
        { align: 'right', Svg: Right },
        { align: 'justify', Svg: Justify },
    ];

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

            // 스타일 적용된 텍스트 안에 커서가 있는 경우
            if (
                currentNode.nodeType === Node.TEXT_NODE &&
                currentNode.parentElement?.tagName === 'SPAN'
            ) {
                const text = currentNode.nodeValue!;
                const before = text.slice(0, offset);
                const after = text.slice(offset);

                const parent = currentNode.parentElement!;
                const grandParent = parent.parentElement!;

                const beforeSpan = parent.cloneNode(false) as HTMLSpanElement;
                beforeSpan.textContent = before;

                const afterSpan = parent.cloneNode(false) as HTMLSpanElement;
                afterSpan.textContent = after;

                const newSpan = parent.cloneNode(false) as HTMLSpanElement;
                applyFormat(newSpan, format);
                newSpan.appendChild(emptyTextNode);

                // DOM 삽입
                grandParent.insertBefore(beforeSpan, parent);
                grandParent.insertBefore(newSpan, parent);
                grandParent.insertBefore(afterSpan, parent);
                grandParent.removeChild(parent);
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
