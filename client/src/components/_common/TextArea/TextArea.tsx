import React from 'react';
import {
    s_textAreaWrapper,
    s_textArea,
    s_label,
    s_errorText,
    s_charCount,
    s_textAreaLabelWrapper,
} from './TextArea.style';
import type { CSSObject } from '@emotion/react';

type SizeVariant = 'sm' | 'md' | 'lg';

const SIZE_MAP: Record<SizeVariant, number> = {
    sm: 18.0625,
    md: 22.625,
    lg: 40.0625,
};

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    size?: SizeVariant;
    height?: number;
    width?: string;
    error?: boolean;
    errorText?: string;
    label?: string;
    sx?: CSSObject;
    charCount?: boolean;
}

function TextArea({
    size = 'md',
    height,
    width = '100%',
    disabled,
    error,
    errorText,
    label,
    sx,
    charCount,
    value,
    maxLength,
    ...props
}: TextAreaProps) {
    const computedHeight = height ?? SIZE_MAP[size];
    const currentLength = typeof value === 'string' ? value.length : 0;

    return (
        <div css={s_textAreaWrapper}>
            <div css={s_textAreaLabelWrapper(width)}>
                {label && <label css={s_label}>{label}</label>}
                {error && errorText && <p css={s_errorText}>{errorText}</p>}
            </div>

            <textarea
                css={[s_textArea(computedHeight, width, error, disabled), sx]}
                value={value}
                maxLength={maxLength}
                disabled={disabled}
                {...props}
            />

            {charCount && typeof maxLength === 'number' && (
                <span css={s_charCount(width)}>
                    {currentLength} / {maxLength}
                </span>
            )}
        </div>
    );
}

export { TextArea };
