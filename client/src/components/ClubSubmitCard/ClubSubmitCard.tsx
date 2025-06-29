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
    questionStatusContainer,
    arrowIcon,
    questionStatusTextSx,
    deadlineText,
} from './ClubSubmitCard.style';
import ArrowDown from '@assets/images/downArrow.svg';
import type { ClubSubmitCardProps } from './types';
import { getDeadlineInfo } from '@utils/compareTime';

function ClubSubmitCard({
    clubName,
    tag,
    deadline,
    completedQuestions,
    totalQuestions,
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
                    {clubName}
                </Text>
                <div css={clubSubmitCardSubCaption}>
                    <Text textAlign="left" type="subCaptionLight" color="subCaption">
                        {tag}
                    </Text>
                    <Text textAlign="left" type="subCaptionLight" color="subCaption">
                        26기 신입기수 모집
                    </Text>

                    <div css={questionStatusContainer}>
                        <Text
                            type="subCaptionRegular"
                            sx={questionStatusTextSx(completedQuestions === totalQuestions)}
                        >
                            필수 항목 ({completedQuestions} / {totalQuestions})
                            <ArrowDown css={arrowIcon} />
                        </Text>
                    </div>
                </div>
                <Button
                    size="full"
                    disabled={!(completedQuestions === totalQuestions)}
                    onClick={onSubmit}
                >
                    제출하기
                </Button>
            </div>
        </div>
    );
}

export { ClubSubmitCard };
