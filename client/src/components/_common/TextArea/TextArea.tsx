import React from 'react';
import {
    s_textAreaWrapper,
    s_textArea,
    s_errorTextWrapper,
    s_charCountWrapper,
} from './TextArea.style';
import type { TextAreaProps } from './type';
import { Text } from '@components/_common/Text';

function TextArea({
    size = 'md',
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
                css={[s_textArea(size, error, props.disabled), sx]}
                value={value}
                maxLength={maxLength}
                disabled={props.disabled}
                {...props}
            />
            <div css={s_errorTextWrapper}>
                {error && errorText && (
                    <Text type={'subCaptionLight'} color={'warning'}>
                        {errorText}
                    </Text>
                )}
            </div>
            {maxLength && typeof maxLength === 'number' && (
                <div css={s_charCountWrapper}>
                    <Text type={'subCaptionLight'} color={'helper'}>
                        {currentLength} / {maxLength}
                    </Text>
                </div>
            )}
        </div>
    );
}
export { TextArea };
