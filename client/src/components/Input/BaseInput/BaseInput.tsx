import React from 'react';
import {
    inputVariant,
    inputContainer,
    helperTextStyle,
    labelStyle,
    inputWrapperContainer,
    endNodeStyle,
    startNodeStyle,
} from './Input.style';
import type { InputHTMLAttributes } from 'react';

export type InputVariant = 'primary' | 'lined';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    variant?: InputVariant;
    isError?: boolean;
    helperText?: string;
    startNode?: React.ReactNode;
    endNode?: React.ReactNode;
}

function BaseInput({
    variant = 'primary',
    type = 'text',
    isError = false,
    helperText,
    label,
    endNode,
    startNode,
    ...props
}: InputProps) {
    return (
        <div css={inputWrapperContainer}>
            {label && <label css={labelStyle}>{label}</label>}

            <div css={inputContainer(isError)[variant]}>
                {startNode && <div css={startNodeStyle}>{startNode}</div>}
                <input css={inputVariant[variant]} type={type} {...props} />
                {endNode && <div css={endNodeStyle}>{endNode}</div>}
            </div>

            {helperText && <span css={helperTextStyle(isError)}>{helperText}</span>}
        </div>
    );
}
export { BaseInput };
