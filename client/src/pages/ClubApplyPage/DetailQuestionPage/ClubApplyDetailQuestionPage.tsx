import React from 'react';
import { Text } from '@components/_common/Text';
import { TextArea } from '@components/_common/TextArea';
import { clubApplyDetailQuestionContainer } from './ClubApplyDetailQuestionPage.style';
import { clubApplyFormContainer } from '../PersonalInfoPage/ClubApplyPersonalInfoPage.style';

interface ClubApplyDetailQuestionPageProps {
    idx: number;
}

const detailQuestions = [
    {
        id: 1,
        question: 'EN#에 지원한 동기가 무엇인가요?',
    },
    {
        id: 3,
        question: 'EN#에서 가장 기대되는 활동을 작성해주세요.',
    },
];

function ClubApplyDetailQuestionPage({ idx }: ClubApplyDetailQuestionPageProps) {
    return (
        <div css={clubApplyFormContainer(idx)}>
            {detailQuestions.map((data) => (
                <div key={data.question} css={clubApplyDetailQuestionContainer}>
                    <Text textAlign="start" type="captionRegular">
                        {data.question}
                    </Text>
                    <TextArea size="md" wrapperSx={{ marginTop: '1rem' }} />
                </div>
            ))}
        </div>
    );
}

export { ClubApplyDetailQuestionPage };
