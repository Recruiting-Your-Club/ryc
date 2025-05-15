import { Text } from '@components/_common';
import React from 'react';
import { answerWrapper, contentContainer, textWithUnderline } from './DocumentBox.style';
import type { DocumentBoxProps } from './types';

function DocumentBox({ question, answer }: DocumentBoxProps) {
    return (
        <div css={contentContainer}>
            <div css={textWithUnderline}>
                <Text as="span" textAlign="start" type="captionBold">
                    {question}
                </Text>
                {/* <Divider sx={underline} /> */}
            </div>
            <Text as="div" textAlign="start" type="captionRegular" sx={answerWrapper}>
                {answer}
            </Text>
        </div>
    );
}

export { DocumentBox };
