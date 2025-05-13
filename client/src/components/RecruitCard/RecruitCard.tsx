import React, { useMemo } from 'react';
import {
    recruitCardBody,
    recruitCardContainer,
    recruitCardFooter,
    recruitCardHeader,
    deadlineText,
} from './RecruitCard.style';
import { Text } from '@components';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import type { RecruitCardProps } from './types';

function RecruitCard(props: RecruitCardProps) {
    const { title, content, deadline, link, hashtags } = props;
    // prop destruction
    // lib hooks
    // initial values
    const today = dayjs().format('YYYY-MM-DD');
    const formattedDeadline = dayjs(deadline);
    // state, ref, querystring hooks
    // form hooks
    // query hooks
    // calculated values
    const diffDay = formattedDeadline.diff(today, 'day');
    const calculateDeadline = useMemo(() => {
        if (diffDay > 7) {
            return `~${formattedDeadline.format('MM.DD')}`;
        } else if (diffDay > 0) {
            return `D-${diffDay}`;
        } else if (diffDay === 0) {
            return `D-Day`;
        }
    }, [formattedDeadline, today]);
    // handlers

    // effects
    return (
        <Link css={recruitCardContainer} to={link}>
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
                {hashtags.map((tag) => (
                    <Text key={tag} type="subCaptionRegular" color="primary" noWrap cropped>
                        #{tag}
                    </Text>
                ))}
            </div>
        </Link>
    );
}

export { RecruitCard };
