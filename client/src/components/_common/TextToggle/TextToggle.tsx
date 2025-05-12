import React from 'react';
import type { InputHTMLAttributes } from 'react';
import { hiddenCheckbox, toggleContainer, toggleBackground } from './TextToggle.style';
import type { Size } from './TextToggle.style';

interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    leftText?: string;
    rightText?: string;
    size?: Size;
    isChecked?: boolean;
    handleToggle?: () => void;
}

function TextToggle({ isChecked = false, size = 'md', handleToggle, ...props }: ToggleProps) {
    return (
        <>
            <label css={toggleContainer(isChecked, size)}>
                <input
                    type="checkbox"
                    css={hiddenCheckbox}
                    checked={isChecked}
                    onChange={handleToggle}
                    {...props}
                />
                <div css={toggleBackground(isChecked, size)} />
            </label>
        </>
    );
}

export { TextToggle };
