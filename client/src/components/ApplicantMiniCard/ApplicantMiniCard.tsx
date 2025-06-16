import { Avatar, Text } from '@components/_common';
import React from 'react';
import {
    s_informationContainer,
    s_miniCardContainer,
    s_textInformationContainer,
} from './ApplicantMiniCard.style';
import type { ApplicationMiniCardProps } from './types';

function ApplicantMiniCard({
    applicant,
    isCompleted = false,
    isActivated = false,
    sx,
    ...props
}: ApplicationMiniCardProps) {
    // prop destruction
    // lib hooks
    // initial values
    // state, ref, querystring hooks
    // form hooks
    // query hooks
    // calculated values
    // handlers
    // effects
    return (
        <button css={[s_miniCardContainer(isActivated), sx]} {...props}>
            <div css={s_informationContainer}>
                <Avatar shape="round" size="s" />
                <span css={s_textInformationContainer}>
                    <Text as="span" type="captionSemibold" textAlign="start">
                        {applicant.name}
                    </Text>
                    <Text as="span" type="subCaptionLight" textAlign="start">
                        {applicant.email}
                    </Text>
                </span>
            </div>
            {isCompleted && (
                <Text as="span" type="captionBold" color="primary" noWrap cropped>
                    평가 완료
                </Text>
            )}
        </button>
    );
}

export { ApplicantMiniCard };
