import { alignButtons, formatButtons, listButtons } from '@constants/Editor';
import type { CSSObject } from '@emotion/react';
import React, { useEffect } from 'react';
import { buttonGroup, perButtonCss, svgCss, toolbarContainer } from './Editor.style';
import { useEditorContext } from './EditorContext';
import { applyAlignment } from './utils/alignment';
import { applyStyleFormat } from './utils/format';
import { applyList } from './utils/list';
import { getCurrentFormats } from './utils/selection';

export type Format = 'bold' | 'italic' | 'underline' | 'strikethrough';
export type Align = 'left' | 'center' | 'right' | 'justify';
export type List = 'disc' | 'decimal';
interface ToolbarProps {
    radius?: string;
    sx?: CSSObject;
}

function EditorToolbar({ radius, sx }: ToolbarProps) {
    // prop destruction
    // lib hooks
    const { formats, setFormats, toggleFormatButton, lists, setLists } = useEditorContext();

    // initial values
    // state, ref, querystring hooks
    // form hooks
    // query hooks
    // calculated values

    // handlers
    const handleFormat = (format: Format) => {
        const selection = window.getSelection(); // 드래그로 선택된 객체
        if (!selection || selection.rangeCount === 0) return;

        const range = selection.getRangeAt(0); // 드래그된 부분
        toggleFormatButton(format);

        applyStyleFormat(selection, range, format);
    };

    const handleAlignment = (align: Align) => {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return;

        const range = selection.getRangeAt(0);
        applyAlignment(range, align);
    };

    const handleList = (list: List) => {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return;

        const range = selection.getRangeAt(0);
        applyList(range, list);
    };

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
                        onClick={() => handleFormat(format as Format)}
                        css={perButtonCss}
                    >
                        <Svg css={svgCss(formats[format as Format])} />
                    </button>
                ))}
            </div>
            <div css={buttonGroup}>
                {alignButtons.map(({ align, Svg }) => (
                    <button
                        key={align}
                        onClick={() => handleAlignment(align as Align)}
                        css={perButtonCss}
                    >
                        <Svg css={svgCss(false)} />
                    </button>
                ))}
            </div>
            <div css={buttonGroup}>
                {listButtons.map(({ list, Svg }) => (
                    <button key={list} onClick={() => handleList(list as List)} css={perButtonCss}>
                        <Svg css={svgCss(lists[list as List])} />
                    </button>
                ))}
            </div>
        </div>
    );
}

export { EditorToolbar };
