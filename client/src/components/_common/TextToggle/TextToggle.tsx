import React from 'react';
import {
    hiddenCheckbox,
    toggleContainer,
    leftTextContainer,
    rightTextContainer,
} from './TextToggle.style';
import { Text } from '@components';
import type { ToggleProps, Size, TextType } from './types';

const getTextType: Record<Size, TextType> = {
    sm: 'subCaptionRegular',
    md: 'captionRegular',
    lg: 'bodyRegular',
};
function TextToggle({
    isChecked = false,
    handleToggle,
    leftText = '지원사항',
    rightText = '내 정보',
    size = 'md',
    sx,
    ...props
}: ToggleProps) {
    return (
        <label css={[toggleContainer, sx]}>
            <input
                type="checkbox"
                css={hiddenCheckbox}
                checked={isChecked}
                onChange={handleToggle}
                {...props}
            />
            <Text as="div" type={getTextType[size]} sx={leftTextContainer(isChecked)}>
                {leftText}
            </Text>
            <Text as="div" type={getTextType[size]} sx={rightTextContainer(isChecked)}>
                {rightText}
            </Text>
        </label>
    );
}

export { TextToggle };
