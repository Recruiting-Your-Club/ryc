import React from 'react';

import { Text } from '@ssoc/ui';
import { getDeadlineInfo } from '@ssoc/utils/src/compareTime';

import {
    deadlineText,
    recruitCardBody,
    recruitCardContainer,
    recruitCardFooter,
    recruitCardHeader,
} from './RecruitCard.style';
import type { RecruitCardProps } from './types';

function RecruitCard(props: RecruitCardProps) {
    // prop destruction
    const { title, content, deadline, hashtags, onClick } = props;
    // lib hooks
    // initial values
    // state, ref, querystring hooks
    // form hooks
    // query hooks
    // calculated values
    const hashtagList = hashtags.map((tag) => `#${tag} `);
    const { displayText, diffDay } = getDeadlineInfo(deadline);
    // handlers

    // effects
    return (
        <>
            <button css={recruitCardContainer} onClick={onClick}>
                <div css={recruitCardHeader}>
                    <Text noWrap cropped>
                        {title}
                    </Text>
                    <Text color="caption" sx={deadlineText(diffDay)} noWrap>
                        {displayText}
                    </Text>
                </div>

                <div css={recruitCardBody}>
                    <Text noWrap cropped>
                        {content}
                    </Text>
                </div>
                <div css={recruitCardFooter}>
                    <Text type="subCaptionRegular" color="primary" noWrap cropped>
                        {hashtagList}
                    </Text>
                </div>
            </button>
        </>
    );
}

export { RecruitCard };
