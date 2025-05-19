import React from 'react';
import type { InputHTMLAttributes } from 'react';
import { hiddenCheckbox, toggleContainer, toggleCircle } from './Toggle.style';
import type { Size } from './Toggle.style';

interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    leftText?: string;
    rightText?: string;
    size?: Size;
    isChecked?: boolean;
    handleToggle?: () => void;
}

function Toggle({ isChecked = false, size = 'md', handleToggle, ...props }: ToggleProps) {
    return (
        <label css={toggleContainer(isChecked, size)}>
            <input
                type="checkbox"
                css={hiddenCheckbox}
                checked={isChecked}
                onChange={handleToggle}
                {...props}
            />
            <div css={toggleCircle(isChecked, size)} />
        </label>
    );
}

export { Toggle };
