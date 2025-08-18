import { Text } from '@components';
import React from 'react';
import {
    hiddenCheckbox,
    leftTextContainer,
    rightTextContainer,
    toggleContainer,
} from './TextToggle.style';
import type { Size, TextType, ToggleProps } from './types';

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
    rightSx = {},
    leftSx = {},
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
            <Text as="div" type={getTextType[size]} sx={[leftTextContainer(isChecked), leftSx]}>
                {leftText}
            </Text>
            <Text as="div" type={getTextType[size]} sx={[rightTextContainer(isChecked), rightSx]}>
                {rightText}
            </Text>
        </label>
    );
}

export { TextToggle };
