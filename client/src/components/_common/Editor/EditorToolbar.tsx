import { Select } from '@components/Select';
import {
    alignButtons,
    DEFAULT_FONT_SIZE,
    formatButtons,
    listButtons,
    optionButtons,
} from '@constants/Editor';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    buttonGroup,
    perButtonCss,
    selectCss,
    sizeSelect,
    svgCss,
    toolbarContainer,
} from './Editor.style';
import { useEditorContext } from './EditorContext';
import { TextColorPicker } from './EditorTextColorPicker';
import type { Align, Format, List, Option, Size, TextColor, ToolbarProps } from './types';
import { applyAlignment, applyAlignmentInEmptyRange } from './utils/alignment';
import { applyList, applyListInEmptyRange } from './utils/list';
import { handleImageFile, insertDivider } from './utils/options';
import { getValidSelection } from './utils/range';
import {
    getCurrentAlignment,
    getCurrentFormats,
    getCurrentLists,
    getCurrentSize,
} from './utils/selection';
import { applyStyle, applyStyleInEmptyRange } from './utils/textStyles';

function EditorToolbar({ radius, sx }: ToolbarProps) {
    // prop destruction
    // lib hooks
    const { editorRef, savedRange } = useEditorContext();

    // initial values
    // state, ref, querystring hooks
    const imageFileInputRef = useRef<HTMLInputElement>(null);
    const [size, setSize] = useState<Size>(DEFAULT_FONT_SIZE);
    const [formats, setFormats] = useState<Record<Format, boolean>>({
        bold: false,
        italic: false,
        underline: false,
        strikethrough: false,
    });
    const [align, setAlign] = useState<Align>('inherit');
    const [lists, setLists] = useState<Record<List, boolean>>({
        disc: false,
        decimal: false,
    });
    const [options, setOptions] = useState<Record<Option, boolean>>({
        image: false,
        divider: false,
    });

    // form hooks
    // query hooks
    // calculated values

    // handlers

    // 버튼 클릭할 때 활성화 상태를 알려주는 toggle 함수
    const toggleFormatButton = useCallback((format: Format) => {
        setFormats((prev) => ({
            ...prev,
            [format]: !prev[format],
        }));
    }, []);

    const toggleAlignButton = useCallback((alignment: Align) => {
        setAlign(alignment);
    }, []);

    const toggleListButton = useCallback((list: List) => {
        setLists((prev) => {
            if (prev[list]) return prev;

            return {
                disc: list === 'disc',
                decimal: list === 'decimal',
            };
        });
    }, []);

    const handleSize = (size: Size) => {
        let { isValid, selection, range } = getValidSelection();
        // 커서 없는 경우 -> 커서 생성
        if (!isValid) {
            applyStyleInEmptyRange(editorRef, size);
            ({ isValid, selection, range } = getValidSelection());
            if (!isValid) return;
        }

        applyStyle(selection!, range!, size);
    };

    const handleColor = (textColorType: TextColor, color: string) => {
        let { isValid, selection, range } = getValidSelection();
        // 커서 없는 경우 -> 커서 생성
        if (!isValid) {
            applyStyleInEmptyRange(editorRef, textColorType, color);
            ({ isValid, selection, range } = getValidSelection());
            if (!isValid) return;
        }

        applyStyle(selection!, range!, textColorType, color);
    };

    const handleFormat = useCallback(
        (format: Format) => {
            let { isValid, selection, range } = getValidSelection();
            // 커서 없는 경우 -> 커서 생성
            if (!isValid) {
                applyStyleInEmptyRange(editorRef, format);
                ({ isValid, selection, range } = getValidSelection());
                if (!isValid) return;
            }

            toggleFormatButton(format);
            applyStyle(selection!, range!, format);
        },
        [toggleFormatButton],
    );

    const handleAlignment = useCallback(
        (align: Align) => {
            let { isValid, selection, range } = getValidSelection();
            // 커서 없는 경우 -> 커서 생성
            if (!isValid) {
                applyAlignmentInEmptyRange(editorRef, align);
                ({ isValid, selection, range } = getValidSelection());
                if (!isValid) return;
            }

            toggleAlignButton(align);
            applyAlignment(selection!, range!, align);
            editorRef.current?.focus();
        },
        [toggleAlignButton],
    );

    const handleList = useCallback(
        (list: List) => {
            let { isValid, selection, range } = getValidSelection();
            // 커서 없는 경우 -> 커서 생성
            if (!isValid) {
                applyListInEmptyRange(editorRef, list);
                ({ isValid, selection, range } = getValidSelection());
                if (!isValid) return;
            }

            toggleListButton(list);
            applyList(selection!, range!, list);
        },
        [toggleListButton],
    );

    const handleOption = useCallback((option: Option) => {
        switch (option) {
            case 'divider':
                insertDivider(editorRef);
                break;
            case 'image':
                imageFileInputRef.current?.click();
                break;
        }
    }, []);

    // effects
    useEffect(() => {
        const updateFormats = () => {
            setFormats(getCurrentFormats());
            setAlign(getCurrentAlignment());
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
                <TextColorPicker
                    onChange={(textColorType, color) => handleColor(textColorType, color)}
                />
            </div>
            <div css={buttonGroup}>
                {alignButtons.map(({ alignment, Svg }) => (
                    <button
                        key={alignment}
                        onClick={() => handleAlignment(alignment as Align)}
                        css={perButtonCss}
                    >
                        <Svg css={svgCss(align === alignment)} />
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
                <input
                    type="file"
                    accept="image/*"
                    ref={imageFileInputRef}
                    style={{ display: 'none' }}
                    onChange={(e) => handleImageFile(e, editorRef, savedRange)}
                />
            </div>
        </div>
    );
}

export { EditorToolbar };
