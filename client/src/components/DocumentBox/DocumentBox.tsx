import { Divider, Text } from '@components/_common';
import React from 'react';
import { answerWrapper, contentContainer, underScore } from './DocumentBox.style';
import type { DocumentBoxProps } from './types';

function DocumentBox({ question, answer }: DocumentBoxProps) {
    return (
        <div css={contentContainer}>
            <Text as="p" textAlign="start" type="captionBold" sx={{ padding: '0 0 0.5rem 1rem' }}>
                {question}
            </Text>
            <Divider sx={underScore} />
            <Text as="div" textAlign="start" type="captionRegular" sx={answerWrapper}>
                {answer}
            </Text>
        </div>
    );
}

export { DocumentBox };
