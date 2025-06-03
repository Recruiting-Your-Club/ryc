import { Text } from '@components/_common';
import React from 'react';
import { answerWrapper, contentContainer, textWithUnderline } from './DocumentBox.style';
import type { DocumentBoxProps } from './types';

function DocumentBox({ index, question, answer, sx, questionSx }: DocumentBoxProps) {
    // prop destruction
    // lib hooks
    // initial values
    // state, ref, querystring hooks
    // form hooks
    // query hooks
    // calculated values
    // handlers
    // effects
    return (
        <div css={[contentContainer(index), sx]}>
            <div css={[textWithUnderline, questionSx]}>
                <Text as="span" textAlign="start" type="captionBold">
                    {question}
                </Text>
            </div>
            <Text as="div" textAlign="start" type="captionRegular" sx={answerWrapper}>
                {answer}
            </Text>
        </div>
    );
}

export { DocumentBox };
