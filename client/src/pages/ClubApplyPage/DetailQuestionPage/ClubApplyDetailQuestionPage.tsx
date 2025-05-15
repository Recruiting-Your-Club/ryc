import React from 'react';
import { Text } from '@components/_common/Text';
import { TextArea } from '@components/_common/TextArea';
import { clubApplyDetailQuestionContainer } from './ClubApplyDetailQuestionPage.style';
import type { ClubApplyDetailQuestionPageProps } from '../types';
import { getAnswer } from '../utils';

function ClubApplyDetailQuestionPage({
    answers,
    clubDetailQuestions,
    onAnswerChange,
    containerStyle,
}: ClubApplyDetailQuestionPageProps) {
    return (
        <div css={containerStyle}>
            {clubDetailQuestions.map((question) => (
                <div key={question.questionTitle} css={clubApplyDetailQuestionContainer}>
                    <Text textAlign="start" type="captionRegular">
                        {question.questionTitle}
                    </Text>
                    <TextArea
                        size="md"
                        wrapperSx={{ marginTop: '1rem' }}
                        value={getAnswer(answers, question.questionTitle)}
                        onChange={(e) => onAnswerChange(question.questionTitle, e.target.value)}
                    />
                </div>
            ))}
        </div>
    );
}

export { ClubApplyDetailQuestionPage };
