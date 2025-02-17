import React from 'react';
import { s_input, helperTextStyle } from './Input.style';
import type { InputHTMLAttributes } from 'react';

export type InputVariant = 'primary' | 'lined';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    variant?: InputVariant;
    isError?: boolean;
    helperText?: string;
}

function BaseInput({ variant = 'primary', type = 'text', isError = false, helperText, ...props }: InputProps) {
    return (
        <div css={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <input css={s_input[variant]} type={type} {...props} />
            {helperText && <span css={helperTextStyle(isError)}>{helperText}</span>}
        </div>
    );
}
export { BaseInput };
