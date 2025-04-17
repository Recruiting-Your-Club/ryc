import type { TextareaHTMLAttributes } from 'react';
import React from 'react';
import type {
    TextAreaSize,
    TextAreaVariant} from './TextArea.style';
import {
    s_textAreaWrapper,
    s_textArea,
    s_subTextWrapper
} from './TextArea.style';
import { Text } from '@components/_common/Text';
import type { CSSObject } from '@emotion/react';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    size?: TextAreaSize;
    variant?: TextAreaVariant;
    width?: string;
    error?: boolean;
    errorText?: string;
    sx?: CSSObject;
}

function TextArea({
    size = 'md',
    variant = 'outline',
    width = '100%',
    error,
    errorText,
    sx,
    value,
    maxLength,
    ...props
}: TextAreaProps) {
    const currentLength = typeof value === 'string' ? value.length : 0;

    return (
        <div css={[s_textAreaWrapper(width), sx]}>
            <textarea
                css={[s_textArea(size, variant, error, props.disabled), sx]}
                value={value}
                maxLength={maxLength}
                disabled={props.disabled}
                {...props}
            />
            <div css={s_subTextWrapper}>
                {error && errorText && (
                    <Text type={'subCaptionLight'} color={'warning'}>
                        {errorText}
                    </Text>
                )}

                {maxLength && typeof maxLength === 'number' && (
                    <Text type={'subCaptionLight'} color={'helper'}>
                        {currentLength} / {maxLength}
                    </Text>
                )}
            </div>
        </div>
    );
}
export { TextArea };
