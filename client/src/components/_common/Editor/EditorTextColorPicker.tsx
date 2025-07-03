import { PICKER_COLORS, textButtons } from '@constants/Editor';
import React, { useEffect, useRef, useState } from 'react';
import {
    perButtonCss,
    perColorCss,
    pickerContainer,
    textButtonContainer,
    textColorSvgCss,
} from './Editor.style';
import type { ColorPickerProps, TextColor } from './types';

function TextColorPicker({ onChange }: ColorPickerProps) {
    // prop destruction
    // lib hooks
    // initial values
    // state, ref, querystring hooks
    const textColorRef = useRef<HTMLDivElement>(null);
    const backColorRef = useRef<HTMLDivElement>(null);
    const [isColorOpen, setIsColorOpen] = useState(false);
    const [isBackOpen, setIsBackOpen] = useState(false);
    const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
    const [selectedBackColor, setSelectedBackColor] = useState<string | undefined>(undefined);

    // form hooks
    // query hooks
    // calculated values
    // handlers

    // effects
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (textColorRef.current && !textColorRef.current.contains(e.target as Node)) {
                setIsColorOpen(false);
            }

            if (backColorRef.current && !backColorRef.current.contains(e.target as Node)) {
                setIsBackOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <>
            {textButtons.map(({ text, Svg }) => {
                const isColor = text === 'color';
                const ref = isColor ? textColorRef : backColorRef;
                const isOpen = isColor ? isColorOpen : isBackOpen;
                const setIsOpen = isColor ? setIsColorOpen : setIsBackOpen;
                const textColor = isColor ? selectedColor : selectedBackColor;
                const setTextColor = isColor ? setSelectedColor : setSelectedBackColor;

                return (
                    <div css={textButtonContainer} ref={ref} key={text}>
                        <button onClick={() => setIsOpen((prev) => !prev)} css={perButtonCss}>
                            <Svg css={textColorSvgCss(isOpen, textColor)} />
                        </button>
                        {isOpen && (
                            <div css={pickerContainer}>
                                {PICKER_COLORS.map((color) => (
                                    <button
                                        key={color}
                                        css={perColorCss(color, text as TextColor)}
                                        onClick={() => {
                                            onChange(text as TextColor, color);
                                            setTextColor(color);
                                            setIsOpen(false);
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}
        </>
    );
}

export { TextColorPicker };
