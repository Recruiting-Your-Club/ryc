import { Select } from '@components/Select';
import { alignButtons, formatButtons, listButtons, optionButtons } from '@constants/Editor';
import React, { useEffect } from 'react';
import {
    buttonGroup,
    perButtonCss,
    selectCss,
    sizeSelect,
    svgCss,
    toolbarContainer,
} from './Editor.style';
import { useEditorContext } from './EditorContext';
import { useEditorHandlerContext } from './EditorHandlerContext';
import type { ToolbarProps } from './types';
import { applyAlignment } from './utils/alignment';
import { applyStyle } from './utils/format';
import { applyList } from './utils/list';
import { insertDivider } from './utils/options';
import { getCurrentFormats, getCurrentLists, getCurrentSize } from './utils/selection';

export type Size = '10px' | '12px' | '14px' | '16px' | '24px' | '36px';
export type Format = 'bold' | 'italic' | 'underline' | 'strikethrough';
export type Align = 'left' | 'center' | 'right' | 'justify';
export type List = 'disc' | 'decimal';
export type Option = 'link' | 'image' | 'divider';

function EditorToolbar({ radius, sx }: ToolbarProps) {
    // prop destruction
    // lib hooks
    const { size, setSize, formats, setFormats, lists, setLists, options, setOptions } =
        useEditorContext();
    const { toggleFormatButton, toggleListButton } = useEditorHandlerContext();

    // initial values
    // state, ref, querystring hooks
    // form hooks
    // query hooks
    // calculated values

    // handlers
    const handleSize = (size: Size) => {
        const selection = window.getSelection(); // 드래그로 선택된 객체
        if (!selection || selection.rangeCount === 0) return;

        const range = selection.getRangeAt(0); // 드래그된 부분
        applyStyle(selection, range, size);
        // setSize(size);
    };

    const handleFormat = (format: Format) => {
        const selection = window.getSelection(); // 드래그로 선택된 객체
        if (!selection || selection.rangeCount === 0) return;

        const range = selection.getRangeAt(0); // 드래그된 부분
        toggleFormatButton(format);

        applyStyle(selection, range, format);
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
        toggleListButton(list);
        applyList(range, list);
    };

    const handleOption = (option: Option) => {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) return;

        const range = selection.getRangeAt(0);
        insertDivider(range, option);
    };

    // effects
    useEffect(() => {
        const updateFormats = () => {
            setFormats(getCurrentFormats());
            setLists(getCurrentLists());
            setSize(getCurrentSize());
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
                <Select
                    value={size}
                    onValueChange={(value) => handleSize(value as Size)}
                    size="s"
                    sx={selectCss}
                >
                    <Select.Trigger sx={sizeSelect}>
                        <Select.Value />
                    </Select.Trigger>
                    <Select.Content>
                        <Select.Item value="10px">10px</Select.Item>
                        <Select.Item value="12px">12px</Select.Item>
                        <Select.Item value="14px">14px</Select.Item>
                        <Select.Item value="16px">16px</Select.Item>
                        <Select.Item value="24px">24px</Select.Item>
                        <Select.Item value="36px">36px</Select.Item>
                    </Select.Content>
                </Select>
            </div>
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
            <div css={buttonGroup}>
                {optionButtons.map(({ option, Svg }) => (
                    <button
                        key={option}
                        onClick={() => handleOption(option as Option)}
                        css={perButtonCss}
                    >
                        <Svg css={svgCss(options[option as Option])} />
                    </button>
                ))}
            </div>
        </div>
    );
}

export { EditorToolbar };
