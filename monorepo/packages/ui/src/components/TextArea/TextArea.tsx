import type { CSSObject } from '@emotion/react';
import type { TextareaHTMLAttributes } from 'react';
import React from 'react';

import { Text } from '../Text';
import type { TextAreaSize, TextAreaVariant } from './TextArea.style';
import { s_textArea, s_textAreaInfoWrapper, s_textAreaWrapper } from './TextArea.style';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    size?: TextAreaSize;
    variant?: TextAreaVariant;
    width?: string;
    error?: boolean;
    errorText?: string;
    wrapperSx?: CSSObject;
    textAreaSx?: CSSObject;
}

function TextArea({
    size = 'md',
    variant = 'outline',
    width = '100%',
    error,
    errorText,
    wrapperSx,
    textAreaSx,
    value,
    maxLength,
    disabled,
    ...props
}: TextAreaProps) {
    const currentLength = typeof value === 'string' ? value.length : 0;

    return (
        <div css={[s_textAreaWrapper(width), wrapperSx]}>
            <textarea
                css={[s_textArea(size, variant, error, disabled), textAreaSx]}
                value={value}
                maxLength={maxLength}
                disabled={disabled}
                {...props}
            />

            {error && errorText && (
                <div css={s_textAreaInfoWrapper('left')}>
                    <Text type={'subCaptionLight'} color={'warning'}>
                        {errorText}
                    </Text>
                </div>
            )}

            {maxLength && (
                <div css={s_textAreaInfoWrapper('right')}>
                    <Text type={'subCaptionLight'} color={'helper'}>
                        {currentLength} / {maxLength}
                    </Text>
                </div>
            )}
        </div>
    );
}
export { TextArea };
