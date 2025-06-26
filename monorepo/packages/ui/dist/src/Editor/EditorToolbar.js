import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import { Select } from '@components/Select';
import { alignButtons, DEFAULT_FONT_SIZE, formatButtons, listButtons, optionButtons, } from '@constants/Editor';
import { useCallback, useEffect, useRef, useState } from 'react';
import { buttonGroup, perButtonCss, selectCss, sizeSelect, svgCss, toolbarContainer, } from './Editor.style';
import { useEditorContext } from './EditorContext';
import { TextColorPicker } from './EditorTextColorPicker';
import { applyAlignment, applyAlignmentInEmptyRange } from './utils/alignment';
import { applyList, applyListInEmptyRange } from './utils/list';
import { handleImageFile, insertDivider } from './utils/options';
import { getValidSelection } from './utils/range';
import { getCurrentAlignment, getCurrentFormats, getCurrentLists, getCurrentSize, } from './utils/selection';
import { applyStyle, applyStyleInEmptyRange } from './utils/textStyles';
function EditorToolbar({ radius, sx }) {
    const { editorRef, savedRange } = useEditorContext();
    const imageFileInputRef = useRef(null);
    const [size, setSize] = useState(DEFAULT_FONT_SIZE);
    const [formats, setFormats] = useState({
        bold: false,
        italic: false,
        underline: false,
        strikethrough: false,
    });
    const [align, setAlign] = useState('inherit');
    const [lists, setLists] = useState({
        disc: false,
        decimal: false,
    });
    const [options, setOptions] = useState({
        image: false,
        divider: false,
    });
    const toggleFormatButton = useCallback((format) => {
        setFormats((prev) => ({
            ...prev,
            [format]: !prev[format],
        }));
    }, []);
    const toggleAlignButton = useCallback((alignment) => {
        setAlign(alignment);
    }, []);
    const toggleListButton = useCallback((list) => {
        setLists((prev) => {
            if (prev[list])
                return prev;
            return {
                disc: list === 'disc',
                decimal: list === 'decimal',
            };
        });
    }, []);
    const handleSize = (size) => {
        const { isValid, selection, range } = getValidSelection();
        if (!isValid) {
            applyStyleInEmptyRange(editorRef, size);
            return;
        }
        applyStyle(selection, range, size);
    };
    const handleColor = (textColorType, color) => {
        const { isValid, selection, range } = getValidSelection();
        if (!isValid) {
            applyStyleInEmptyRange(editorRef, textColorType, color);
            return;
        }
        applyStyle(selection, range, textColorType, color);
    };
    const handleFormat = useCallback((format) => {
        const { isValid, selection, range } = getValidSelection();
        if (!isValid) {
            applyStyleInEmptyRange(editorRef, format);
            return;
        }
        toggleFormatButton(format);
        applyStyle(selection, range, format);
    }, [toggleFormatButton]);
    const handleAlignment = useCallback((align) => {
        const { isValid, selection, range } = getValidSelection();
        if (!isValid) {
            applyAlignmentInEmptyRange(editorRef, align);
            return;
        }
        toggleAlignButton(align);
        applyAlignment(selection, range, align);
        editorRef.current?.focus();
    }, [toggleAlignButton]);
    const handleList = useCallback((list) => {
        const { isValid, selection, range } = getValidSelection();
        if (!isValid) {
            applyListInEmptyRange(editorRef, list);
            return;
        }
        toggleListButton(list);
        applyList(selection, range, list);
    }, [toggleListButton]);
    const handleOption = useCallback((option) => {
        switch (option) {
            case 'divider':
                insertDivider(editorRef);
                break;
            case 'image':
                imageFileInputRef.current?.click();
                break;
        }
    }, []);
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
    return (_jsxs("div", { css: [toolbarContainer(radius), sx], children: [_jsx("div", { css: buttonGroup, children: _jsxs(Select, { value: size, onValueChange: (value) => handleSize(value), size: "s", sx: selectCss, children: [_jsx(Select.Trigger, { sx: sizeSelect, children: _jsx(Select.Value, {}) }), _jsxs(Select.Content, { children: [_jsx(Select.Item, { value: "10px", children: "10px" }), _jsx(Select.Item, { value: "12px", children: "12px" }), _jsx(Select.Item, { value: "14px", children: "14px" }), _jsx(Select.Item, { value: "16px", children: "16px" }), _jsx(Select.Item, { value: "24px", children: "24px" }), _jsx(Select.Item, { value: "36px", children: "36px" })] })] }) }), _jsx("div", { css: buttonGroup, children: formatButtons.map(({ format, Svg }) => (_jsx("button", { onClick: () => handleFormat(format), css: perButtonCss, children: _jsx(Svg, { css: svgCss(formats[format]) }) }, format))) }), _jsx("div", { css: buttonGroup, children: _jsx(TextColorPicker, { onChange: (textColorType, color) => handleColor(textColorType, color) }) }), _jsx("div", { css: buttonGroup, children: alignButtons.map(({ alignment, Svg }) => (_jsx("button", { onClick: () => handleAlignment(alignment), css: perButtonCss, children: _jsx(Svg, { css: svgCss(align === alignment) }) }, alignment))) }), _jsx("div", { css: buttonGroup, children: listButtons.map(({ list, Svg }) => (_jsx("button", { onClick: () => handleList(list), css: perButtonCss, children: _jsx(Svg, { css: svgCss(lists[list]) }) }, list))) }), _jsxs("div", { css: buttonGroup, children: [optionButtons.map(({ option, Svg }) => (_jsx("button", { onClick: () => handleOption(option), css: perButtonCss, children: _jsx(Svg, { css: svgCss(options[option]) }) }, option))), _jsx("input", { type: "file", accept: "image/*", ref: imageFileInputRef, style: { display: 'none' }, onChange: (e) => handleImageFile(e, editorRef, savedRange) })] })] }));
}
export { EditorToolbar };
//# sourceMappingURL=EditorToolbar.js.map