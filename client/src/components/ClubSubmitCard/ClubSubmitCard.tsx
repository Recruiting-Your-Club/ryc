import React from 'react';
import { Text } from '@components/_common/Text';
import { Button } from '@components';
import Ryc from '@assets/images/Ryc.svg';
import {
    clubApplySubmitCardContainer,
    clubSubmitCard,
    clubSubmitCardLogo,
    clubSubmitCardSubCaption,
    svgContainer,
    deadlineText,
} from './ClubSubmitCard.style';
import type { ClubSubmitCardProps } from './types';
import { getDeadlineInfo } from '@utils/compareTime';
import { QuestionDropdown } from '@components/QuestionDropdown';

function ClubSubmitCard({
    clubName,
    tag,
    deadline,
    personalQuestions,
    detailQuestions,
    completedQuestionsCount,
    requiredQuestionsCount,
    onSubmit,
    answers,
}: ClubSubmitCardProps) {
    // prop destruction
    // lib hooks
    // initial values
    // state, ref, querystring hooks
    // form hooks
    // query hooks
    // calculated values
    const { displayText, diffDay } = getDeadlineInfo(deadline);
    // handlers
    // effects
    return (
        <div css={clubApplySubmitCardContainer}>
            <div css={clubSubmitCard}>
                <div css={clubSubmitCardLogo}>
                    <Ryc css={svgContainer} />
                    {deadline && (
                        <Text
                            color="caption"
                            type="captionRegular"
                            sx={deadlineText(diffDay)}
                            noWrap
                        >
                            {displayText}
                        </Text>
                    )}
                </div>
                <Text textAlign="left" type="bodyRegular">
                    {clubName}
                </Text>
                <div css={clubSubmitCardSubCaption}>
                    <Text textAlign="left" type="subCaptionLight" color="subCaption">
                        {tag}
                    </Text>
                    <Text textAlign="left" type="subCaptionLight" color="subCaption">
                        26기 신입기수 모집
                    </Text>
                    <QuestionDropdown
                        completedQuestionsCount={completedQuestionsCount}
                        requiredQuestionsCount={requiredQuestionsCount}
                        personalQuestions={personalQuestions}
                        detailQuestions={detailQuestions}
                        answers={answers}
                    />
                </div>
                <Button
                    size="full"
                    disabled={!(completedQuestionsCount === requiredQuestionsCount)}
                    onClick={onSubmit}
                >
                    제출하기
                </Button>
            </div>
        </div>
    );
}

export { ClubSubmitCard };
