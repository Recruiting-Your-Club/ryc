import dayjs from 'dayjs';
import React, { useMemo } from 'react';

import { Text } from '@ssoc/ui';

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
    const today = dayjs().format('YYYY-MM-DD');
    const formattedDeadline = dayjs(deadline);
    // state, ref, querystring hooks
    // form hooks
    // query hooks
    // calculated values
    const hashtagList = hashtags.map((tag) => `#${tag} `);
    const diffDay = formattedDeadline.diff(today, 'day');
    const calculateDeadline = useMemo(() => {
        if (diffDay > 7) {
            return `~${formattedDeadline.format('MM.DD')}`;
        } else if (diffDay > 0) {
            return `D-${diffDay}`;
        } else if (diffDay === 0) {
            return `D-Day`;
        } else {
            return `마감`;
        }
    }, [formattedDeadline, today]);
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
                        {calculateDeadline}
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
