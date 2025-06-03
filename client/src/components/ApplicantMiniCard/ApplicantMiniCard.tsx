import { Avatar, Text } from '@components/_common';
import type { CSSObject } from '@emotion/react';
import React from 'react';
import { informationSection, miniCardContainer } from './ApplicantMiniCard.style';

interface ApplicationMiniCardProps {
    isCompleted?: boolean;
    sx?: CSSObject;
}

function ApplicantMiniCard({ isCompleted = false, sx }: ApplicationMiniCardProps) {
    return (
        <div css={[miniCardContainer, sx]}>
            <div css={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Avatar shape="round" size="s" />
                <span css={informationSection}>
                    <Text as="span" type="captionSemibold" textAlign="start">
                        김영림
                    </Text>
                    <Text as="span" type="subCaptionLight" textAlign="start">
                        nickname@example.com
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
