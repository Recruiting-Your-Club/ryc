import React from 'react';
import { inputVariant, baseContainer, helperTextStyle, labelStyle } from './Input.style';
import type { InputHTMLAttributes } from 'react';

export type InputVariant = 'primary' | 'lined';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    variant?: InputVariant;
    isError?: boolean;
    helperText?: string;
}

function BaseInput({ variant = 'primary', type = 'text', isError = false, helperText, label, ...props }: InputProps) {
    return (
        <div css={baseContainer}>
            {label && <label css={labelStyle}>{label}</label>}
            <input css={inputVariant[variant]} type={type} {...props} />
            {helperText && <span css={helperTextStyle(isError)}>{helperText}</span>}
        </div>
    );
}
export { BaseInput };
