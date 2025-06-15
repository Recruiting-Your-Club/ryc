import { Avatar, Text } from '@components/_common';
import type { CSSObject } from '@emotion/react';
import type { HTMLAttributes } from 'react';
import React from 'react';
import { informationSection, miniCardContainer } from './ApplicantMiniCard.style';
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
        <div css={[miniCardContainer(isActivated), sx]} {...props}>
            <div css={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Avatar shape="round" size="s" />
                <span css={informationSection}>
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
        </div>
    );
}

export { ApplicantMiniCard };
