import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@emotion/react/jsx-runtime";
import { PICKER_COLORS, textButtons } from '@constants/Editor';
import { useEffect, useRef, useState } from 'react';
import { perButtonCss, perColorCss, pickerContainer, textButtonContainer, textColorSvgCss, } from './Editor.style';
function TextColorPicker({ onChange }) {
    const textColorRef = useRef(null);
    const backColorRef = useRef(null);
    const [isColorOpen, setIsColorOpen] = useState(false);
    const [isBackOpen, setIsBackOpen] = useState(false);
    const [selectedColor, setSelectedColor] = useState(undefined);
    const [selectedBackColor, setSelectedBackColor] = useState(undefined);
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (textColorRef.current && !textColorRef.current.contains(e.target)) {
                setIsColorOpen(false);
            }
            if (backColorRef.current && !backColorRef.current.contains(e.target)) {
                setIsBackOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    return (_jsx(_Fragment, { children: textButtons.map(({ text, Svg }) => {
            const isColor = text === 'color';
            const ref = isColor ? textColorRef : backColorRef;
            const isOpen = isColor ? isColorOpen : isBackOpen;
            const setIsOpen = isColor ? setIsColorOpen : setIsBackOpen;
            const textColor = isColor ? selectedColor : selectedBackColor;
            const setTextColor = isColor ? setSelectedColor : setSelectedBackColor;
            return (_jsxs("div", { css: textButtonContainer, ref: ref, children: [_jsx("button", { onClick: () => setIsOpen((prev) => !prev), css: perButtonCss, children: _jsx(Svg, { css: textColorSvgCss(isOpen, textColor) }) }), isOpen && (_jsx("div", { css: pickerContainer, children: PICKER_COLORS.map((color) => (_jsx("button", { css: perColorCss(color, text), onClick: () => {
                                onChange(text, color);
                                setTextColor(color);
                                setIsOpen(false);
                            } }, color))) }))] }, text));
        }) }));
}
export { TextColorPicker };
//# sourceMappingURL=EditorTextColorPicker.js.map