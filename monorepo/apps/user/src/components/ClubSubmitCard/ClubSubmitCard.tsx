import { QuestionDropdown } from '@components/QuestionDropdown';
import React from 'react';

import { Avatar, Button, Text } from '@ssoc/ui';
import { getDeadlineInfo } from '@ssoc/utils';

import { getCategory } from '../../utils/changeCategory';
import {
    clubApplySubmitCardContainer,
    clubSubmitCard,
    clubSubmitCardLogo,
    clubSubmitCardSubCaption,
    deadlineText,
    svgContainer,
} from './ClubSubmitCard.style';
import type { ClubSubmitCardProps } from './types';

function ClubSubmitCard({
    clubName,
    category,
    deadline,
    field,
    personalQuestions,
    detailQuestions,
    allQuestionsCount,
    completedQuestionsCount,
    requiredQuestionsCompleted,
    answers,
    logo,
    isSubmitting,
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
    const { diffDay, displayText } = getDeadlineInfo(deadline);

    // handlers
    // effects
    return (
        <div css={clubApplySubmitCardContainer}>
            <div css={clubSubmitCard}>
                <div css={clubSubmitCardLogo}>
                    {logo ? (
                        <img src={logo} alt="로고" css={svgContainer} />
                    ) : (
                        <Avatar
                            shape="square"
                            size="lg"
                            radius="10px"
                            imageURL={logo}
                            imageName="logo"
                        />
                    )}
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
                        {getCategory(category)}
                    </Text>
                    <Text textAlign="left" type="subCaptionLight" color="subCaption">
                        {field}
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
                    loading={isSubmitting}
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
