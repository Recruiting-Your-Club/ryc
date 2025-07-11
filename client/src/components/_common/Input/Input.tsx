import React from 'react';
import {
    inputContainer,
    helperTextStyle,
    labelStyle,
    inputWrapperContainer,
    baseInputStyle,
} from './Input.style';
import type { InputProps } from './types';

function Input({
    variant = 'primary',
    type = 'text',
    height = '3.6rem',
    error = false,
    helperText,
    label,
    startNode,
    endNode,
    inputSx,
    labelSx,
    helperSx,
    ...props
}: InputProps) {
    return (
        <div css={inputWrapperContainer}>
            {label && <label css={[labelStyle(error), labelSx]}>{label}</label>}

            <div css={[inputContainer(error, variant), inputSx]}>
                {startNode && <div>{startNode}</div>}
                <input css={[baseInputStyle(height)]} type={type} {...props} />
                {endNode && <div>{endNode}</div>}
            </div>

            {helperText && <span css={[helperTextStyle(error), helperSx]}>{helperText}</span>}
        </div>
    );
}
export { Input };
