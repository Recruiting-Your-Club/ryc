import React from 'react';
import type { InputHTMLAttributes } from 'react';
import {
    hiddenCheckbox,
    toggleContainer,
    leftTextContainer,
    rightTextContainer,
} from './TextToggle.style';
import { Text } from '@components';

interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    leftText?: string;
    rightText?: string;
    isChecked?: boolean;
    size?: 'sm' | 'md' | 'lg';
    handleToggle?: () => void;
}
const getSize = (size: 'sm' | 'md' | 'lg') => {
    switch (size) {
        case 'sm':
            return 'subCaptionRegular';
        case 'md':
            return 'captionRegular';
        case 'lg':
            return 'bodyRegular';
    }
};
function TextToggle({
    isChecked = false,
    handleToggle,
    leftText = '지원사항',
    rightText = '내 정보',
    size = 'md',
    ...props
}: ToggleProps) {
    return (
        <label css={toggleContainer}>
            <input
                type="checkbox"
                css={hiddenCheckbox}
                checked={isChecked}
                onChange={handleToggle}
                {...props}
            />
            <Text as="div" type={getSize(size)} sx={leftTextContainer(isChecked)}>
                {leftText}
            </Text>
            <Text as="div" type={getSize(size)} sx={rightTextContainer(isChecked)}>
                {rightText}
            </Text>
        </label>
    );
}

export { TextToggle };
