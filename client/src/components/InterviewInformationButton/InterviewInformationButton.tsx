import ChevronRight from '@assets/images/chevronRight.svg';
import { Text } from '@components';
import React from 'react';
import {
    s_chevronRight,
    s_interviewInformationButton,
    s_interviewInformationTextContainer,
    s_text,
} from './InterviewInformationButton.style';
import type { InterviewInformationButtonProps } from './types';

function InterviewInformationButton({
    // date,
    // title,
    label,
    onClick,
    startTime,
    endTime,
    isSelected = false,
}: InterviewInformationButtonProps) {
    return (
        <button onClick={onClick} css={s_interviewInformationButton(isSelected)}>
            <div css={s_interviewInformationTextContainer}>
                <Text as="span" type="captionSemibold" textAlign="start" sx={s_text}>
                    {/* {date} {title} */}
                    {label}
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
