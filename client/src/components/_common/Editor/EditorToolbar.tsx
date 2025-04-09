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

export type Format = 'bold' | 'italic' | 'underline' | 'strikethrough';
export type Align = 'left' | 'center' | 'right' | 'justify';
interface ToolbarProps {
    radius?: string;
    sx?: CSSObject;
}

function EditorToolbar({ radius, sx }: ToolbarProps) {
    const { formats, setFormats, setAlign } = useEditorContext();

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
        if (range.collapsed) return; // 커서만 있는 상태

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

            // 텍스트 세 부분 나누기
            const before = text.slice(0, startOffset);
            const selected = text.slice(startOffset, endOffset);
            const after = text.slice(endOffset);

            const parent = textNode.parentNode as HTMLElement;
            const grandParent = parent?.parentNode;

            // span으로 감싸졌는지 확인 -> 기존 스타일이 없는 경우 기본값
            const isSpan = parent?.nodeName === 'SPAN';
            const originalStyle = isSpan ? parent.getAttribute('style') || '' : '';

            // 기존 텍스트 제거
            if (isSpan) {
                grandParent?.removeChild(parent);
            } else {
                parent?.removeChild(textNode);
            }

            const frag = document.createDocumentFragment();
            if (before) frag.appendChild(createSpan(format, before, originalStyle));
            frag.appendChild(createSpan(format, selected, originalStyle, true));
            if (after) frag.appendChild(createSpan(format, after, originalStyle));

            range.insertNode(frag); // 원래 위치에 삽입
        } else {
            // 선택 범위 안에 여러 span이 존재할 경우
            const commonAncestor = range.commonAncestorContainer;

            // 범위 내 span 탐색
            const walker = document.createTreeWalker(commonAncestor, NodeFilter.SHOW_ELEMENT, {
                acceptNode: (node) => {
                    // range에 속한 span이어야함
                    if (node.nodeName === 'SPAN' && range.intersectsNode(node)) {
                        return NodeFilter.FILTER_ACCEPT;
                    }
                    return NodeFilter.FILTER_REJECT;
                },
            });

            const spansInCommon: HTMLElement[] = [];
            let currentNode = walker.nextNode();
            while (currentNode) {
                // commonAncestor 내부 노드 순회
                spansInCommon.push(currentNode as HTMLElement);
                currentNode = walker.nextNode();
            }

            // 모든 span이 해당 스타일을 가지고 있는지 확인
            const isOverallStyle = spansInCommon.every((el) => hasFormat(el, format));

            // 스타일 적용 or 제거
            spansInCommon.forEach((span) => {
                toggleFormat(span, format, !isOverallStyle);
            });
        }

        // setFormats((prev) => ({
        //     ...prev,
        //     [format]: !prev[format],
        // }));
    };

    // 새로운 span 노드 생성
    const createSpan = (format: Format, text: string, style: string, applyNewStyle = false) => {
        const span = document.createElement('span');
        span.style.cssText = style; // style 객체와 연동되는 cssText 사용

        if (applyNewStyle) applyFormat(span, format); // format만 추가/제거
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

    const applyFormat = (span: HTMLElement, format: Format) => {
        const has = hasFormat(span, format);
        toggleFormat(span, format, !has);
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
