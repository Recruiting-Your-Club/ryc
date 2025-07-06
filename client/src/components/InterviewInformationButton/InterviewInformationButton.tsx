import ChevronRight from '@assets/images/chevronRight.svg';
import React from 'react';
import { Text } from '@components';
import {
    s_chevronRight,
    s_interviewInformationButton,
    s_interviewInformationTextContainer,
    s_text,
} from './InterviewInformationButton.style';
import type { InterviewInformationButtonProps } from './types';

function InterviewInformationButton({
    date,
    title,
    startTime,
    endTime,
}: InterviewInformationButtonProps) {
    return (
        <button css={s_interviewInformationButton}>
            <div css={s_interviewInformationTextContainer}>
                <Text as="span" type="captionSemibold" textAlign="start" sx={s_text}>
                    {date} {title}
                </Text>
                <Text as="span" type="captionRegular" textAlign="start" sx={s_text}>
                    {startTime} - {endTime}
                </Text>
            </div>
            <ChevronRight css={s_chevronRight} />
        </button>
    );
}

export { InterviewInformationButton };
