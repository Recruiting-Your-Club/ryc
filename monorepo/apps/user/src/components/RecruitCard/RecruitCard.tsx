import React from 'react';

import { Text } from '@ssoc/ui';
import { getDeadlineInfo } from '@ssoc/utils/src/compareTime';

import {
    deadlineText,
    recruitCardBody,
    recruitCardContainer,
    recruitCardFooter,
    recruitCardHeader,
    recruitCardHeaderDeadline,
    recruitCardHeaderTitle,
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
                    <div css={recruitCardHeaderTitle}>
                        <Text type="bodyRegular" noWrap cropped textAlign="left">
                            {title}
                        </Text>
                    </div>
                    <div css={recruitCardHeaderDeadline}>
                        <Text
                            type="captionRegular"
                            textAlign="right"
                            color="caption"
                            sx={deadlineText(diffDay)}
                            cropped
                        >
                            {displayText}
                        </Text>
                    </div>
                </div>

                <div css={recruitCardBody}>
                    <Text type="captionRegular" cropped textAlign="left">
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
