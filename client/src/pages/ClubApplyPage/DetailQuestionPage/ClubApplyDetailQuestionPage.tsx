import React from 'react';
import { Text } from '@components/_common/Text';
import { TextArea } from '@components/_common/TextArea';
import { clubApplyDetailQuestionContainer } from './ClubApplyDetailQuestionPage.style';
import { clubApplyFormContainer } from '../PersonalInfoPage/ClubApplyPersonalInfoPage.style';
import { detailQuestions } from '../ClubApplyPage';

interface ClubApplyDetailQuestionPageProps {
    idx: number;
    answers: { [key: number]: string };
    onAnswerChange: (id: number, value: string) => void;
}

function ClubApplyDetailQuestionPage({
    idx,
    answers,
    onAnswerChange,
}: ClubApplyDetailQuestionPageProps) {
    const handleTextAreaChange = (id: number, value: string) => {
        onAnswerChange(id, value);
    };

    return (
        <div css={clubApplyFormContainer(idx)}>
            {detailQuestions.map((data) => (
                <div key={data.question} css={clubApplyDetailQuestionContainer}>
                    <Text textAlign="start" type="captionRegular">
                        {data.question}
                    </Text>

                    <TextArea
                        size="md"
                        wrapperSx={{ marginTop: '1rem' }}
                        value={answers[data.id] || ''}
                        onChange={(e) => handleTextAreaChange(data.id, e.target.value)}
                    />
                </div>
            ))}
        </div>
    );
}

export { ClubApplyDetailQuestionPage };
