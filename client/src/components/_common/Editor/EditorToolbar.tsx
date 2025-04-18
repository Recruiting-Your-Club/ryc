import Center from '@assets/images/text-align-center.svg';
import Justify from '@assets/images/text-align-justify.svg';
import Left from '@assets/images/text-align-left.svg';
import Right from '@assets/images/text-align-right.svg';
import Bold from '@assets/images/text-bold.svg';
import Italic from '@assets/images/text-italic.svg';
import Strikethrough from '@assets/images/text-strikethrough.svg';
import Underline from '@assets/images/text-underline.svg';
import type { CSSObject } from '@emotion/react';
import React from 'react';
import { buttonGroup, perButtonCss, svgCss, toolbarContainer } from './Editor.style';
import { useEditorContext } from './EditorContext';
import { handleNewRange } from './utils';

export type Format = 'bold' | 'italic' | 'underline' | 'strikethrough';
export type Align = 'left' | 'center' | 'right' | 'justify';
interface ToolbarProps {
    radius?: string;
    sx?: CSSObject;
}

function EditorToolbar({ radius, sx }: ToolbarProps) {
    const { formats, setFormats, toggleFormats, setAlign } = useEditorContext();

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

                const beforeSpan = parent.cloneNode(false) as HTMLElement;
                beforeSpan.textContent = before;

                const afterSpan = parent.cloneNode(false) as HTMLElement;
                afterSpan.textContent = after;

                const newSpan = parent.cloneNode(false) as HTMLElement;
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
            const commonAncestor = range.commonAncestorContainer; // 공통 조상 노드, 즉 TextArea(div)에 해당

            // 범위 내 TEXT 노드 탐색
            const walker = document.createTreeWalker(commonAncestor, NodeFilter.SHOW_TEXT, {
                acceptNode: (node) => {
                    // range에 속한 노드여야 함
                    if (range.intersectsNode(node)) {
                        const text = node.textContent?.trim();
                        return text ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
                    }
                    return NodeFilter.FILTER_REJECT;
                },
            });
            const textNodesInCommon: Text[] = [];
            let currentNode = walker.nextNode();
            while (currentNode) {
                // commonAncestor 내부 노드 순회
                textNodesInCommon.push(currentNode as Text);
                currentNode = walker.nextNode();
            }

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
                // console.log(text);

                const isFirst = index === 0;
                const isLast = index === textNodesInCommon.length - 1;

                const start = isFirst ? range.startOffset : 0;
                const end = isLast ? range.endOffset : text.length;
                // console.log(start);
                // console.log(end);

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

        // setFormats((prev) => ({
        //     ...prev,
        //     [format]: !prev[format],
        // }));
    };

    const applyStyleInSelectedText = (
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
        // console.log(`before:${before}`);
        // console.log(`selected:${selected}`);
        // console.log(`after:${after}`);

        const frag = document.createDocumentFragment();
        if (before) frag.appendChild(createSpan(format, before, originalStyle));
        frag.appendChild(createSpan(format, selected, originalStyle, true, isOverallStyle));
        if (after) frag.appendChild(createSpan(format, after, originalStyle));

        return frag;
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
    const hasFormat = (elem: HTMLElement, format: Format): boolean => {
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
    const toggleFormat = (elem: HTMLElement, format: Format, isApply: boolean) => {
        switch (format) {
            case 'bold':
                elem.style.fontWeight = isApply ? 'bold' : '';
                break;
            case 'italic':
                elem.style.fontStyle = isApply ? 'italic' : '';
                break;
            case 'underline':
                elem.style.textDecoration = toggleTextDecoration(
                    elem.style.textDecoration,
                    'underline',
                    isApply,
                );
                break;
            case 'strikethrough':
                elem.style.textDecoration = toggleTextDecoration(
                    elem.style.textDecoration,
                    'line-through',
                    isApply,
                );
                break;
        }
    };

    const applyFormat = (span: HTMLElement, format: Format, isOverallStyle: boolean = true) => {
        const has = hasFormat(span, format);
        const toggledHas = !isOverallStyle && has ? !has : has; // 전체 텍스트는 format 적용 안되어있지만 해당 텍스트는 format을 가지고 있다면 toggle

        toggleFormat(span, format, !toggledHas);
    };

    // underline, strikethrough는 textDecoration 내부에서 동시 적용 가능하므로
    const toggleTextDecoration = (current: string, style: string, isApply: boolean): string => {
        const values = current
            .split(' ')
            .map((value) => value.trim())
            .filter((value) => value.length > 0);

        const isExist = values.includes(style);

        if (isApply && !isExist) {
            // 추가
            return [...values, style].join(' ');
        } else if (!isApply && isExist) {
            // 제거
            return values.filter((value) => value !== style).join(' ');
        } else {
            return current;
        }
    };

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
