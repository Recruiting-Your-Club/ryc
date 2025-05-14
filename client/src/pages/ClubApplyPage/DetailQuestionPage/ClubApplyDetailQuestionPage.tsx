import React from 'react';
import { Text } from '@components/_common/Text';
import { TextArea } from '@components/_common/TextArea';
import { clubApplyDetailQuestionContainer } from './ClubApplyDetailQuestionPage.style';
import type { ClubApplyDetailQuestionPageProps } from '../types';

function ClubApplyDetailQuestionPage({
    answers,
    clubDetailQuestions,
    onAnswerChange,
    containerStyle,
}: ClubApplyDetailQuestionPageProps) {
    // prop destruction
    // lib hooks
    // initial values
    // state, ref, querystring hooks
    // form hooks
    // query hooks
    // calculated values
    // handlers
    const handleTextAreaChange = (id: string, value: string) => {
        onAnswerChange(id, value);
    };
    // effects

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
                        value={answers[question.id] || ''}
                        onChange={(e) => handleTextAreaChange(question.id, e.target.value)}
                    />
                </div>
            ))}
        </div>
    );
}

export { ClubApplyDetailQuestionPage };
