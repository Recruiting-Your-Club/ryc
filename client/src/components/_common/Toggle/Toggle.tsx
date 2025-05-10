import React from 'react';
import type { InputHTMLAttributes } from 'react';
import {
    hiddenCheckbox,
    toggleContainer,
    leftTextContainer,
    rightTextContainer,
} from './Toggle.style';

export type ToggleVariant = 'primary' | 'text' | 'secondText';

interface ToggleProps extends InputHTMLAttributes<HTMLInputElement> {
    variant?: ToggleVariant;
    leftText?: string;
    rightText?: string;
    width?: string;
    isChecked: boolean;
    handleToggle?: () => void;
}

function Toggle({
    variant = 'primary',
    width = '11rem',
    leftText = '',
    rightText = '',
    isChecked,
    handleToggle,
    ...props
}: ToggleProps) {
    return (
        <>
            <label css={toggleContainer(variant, width, isChecked)}>
                <input
                    type="checkbox"
                    css={hiddenCheckbox}
                    checked={isChecked}
                    onChange={handleToggle}
                    {...props}
                />
                <span css={leftTextContainer(variant, isChecked)}>{leftText}</span>
                <span css={rightTextContainer(variant, isChecked)}>{rightText}</span>
            </label>
        </>
    );
}

export { Toggle };
