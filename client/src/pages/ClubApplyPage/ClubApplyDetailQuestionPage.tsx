import React from 'react';
import { clubApplyDetailQuestionContainer, clubApplyFormConatiner } from './ClubApplyPage.style';
import { Text } from '@components/_common/Text';
import { TextArea } from '@components/_common/TextArea';
interface ClubApplyDetailQuestionPageProps {
    idx: number;
}

function ClubApplyDetailQuestionPage({ idx }: ClubApplyDetailQuestionPageProps) {
    return (
        <div css={clubApplyFormConatiner(idx)}>
            <div css={clubApplyDetailQuestionContainer}>
                <Text textAlign="start" type="captionRegular">
                    En#에 지원한 동기가 무엇인가요?
                </Text>
                <TextArea size="md" wrapperSx={{ marginTop: '1rem' }} />
            </div>
            <div css={clubApplyDetailQuestionContainer}>
                <Text textAlign="start" type="captionRegular">
                    En#에서 기대하는게 무엇인가요?
                </Text>
                <TextArea size="md" wrapperSx={{ marginTop: '1rem' }} />
            </div>
        </div>
    );
}

export { ClubApplyDetailQuestionPage };
