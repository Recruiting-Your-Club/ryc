import React from 'react';
import { Text, Button } from '@components/_common';
import { QuestionDropdown } from '@components/QuestionDropdown';
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

function ClubSubmitCard({
    clubName,
    tag,
    deadline,
    personalQuestions,
    detailQuestions,
    allQuestionsCount,
    completedQuestionsCount,
    requiredQuestionsCount,
    requiredQuestionsCompleted,
    answers,
    onQuestionFocus,
    onSubmit,
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
                    동아리 이름
                </Text>
                <div css={clubSubmitCardSubCaption}>
                    <Text textAlign="left" type="subCaptionLight" color="subCaption">
                        동아리 분류
                    </Text>
                    <Text textAlign="left" type="subCaptionLight" color="subCaption">
                        26기 신입기수 모집
                    </Text>
                    <QuestionDropdown
                        completedQuestionsCount={completedQuestionsCount}
                        personalQuestions={personalQuestions}
                        detailQuestions={detailQuestions}
                        answers={answers}
                        onQuestionFocus={onQuestionFocus}
                        requiredQuestionsCompleted={requiredQuestionsCompleted}
                        allQuestionsCount={allQuestionsCount}
                    />
                </div>
                <Button
                    size="full"
                    disabled={
                        !(
                            requiredQuestionsCompleted ||
                            completedQuestionsCount === allQuestionsCount
                        )
                    }
                    onClick={onSubmit}
                >
                    제출하기
                </Button>
            </div>
        </div>
    );
}

export { ClubSubmitCard };
