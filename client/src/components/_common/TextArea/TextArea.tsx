import React from 'react';
import {
    s_textAreaWrapper,
    s_textArea,
    s_label,
    s_errorText,
    s_charCount,
    s_textAreaLabelWrapper,
} from './TextArea.style';
import type { TextAreaProps } from './type';

function TextArea({
    size = 'md',
    width = '100%',
    error,
    errorText,
    label,
    sx,
    charCount,
    value,
    maxLength,
    ...props
}: TextAreaProps) {
    const currentLength = typeof value === 'string' ? value.length : 0;

    return (
        <div css={[s_textAreaWrapper(width), sx]}>
            {label && (
                <span css={s_textAreaLabelWrapper}>
                    <label css={s_label}>{label}</label>
                    {error && errorText && <p css={s_errorText}>{errorText}</p>}
                </span>
            )}

            <textarea
                css={[s_textArea(size, error, props.disabled), sx]}
                value={value}
                maxLength={maxLength}
                disabled={props.disabled}
                {...props}
            />

            {charCount && typeof maxLength === 'number' && (
                <p css={s_charCount}>
                    {currentLength} / {maxLength}
                </p>
            )}
        </div>
    );
}
export { TextArea };
