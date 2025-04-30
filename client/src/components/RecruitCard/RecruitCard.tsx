import React from 'react';
import {
    recruitCardBody,
    recruitCardContainer,
    recruitCardFooter,
    recruitCardHeader,
} from './Recruit.style';
import { Text } from '@components';
import { Link } from 'react-router-dom';
import type { RecruitCardProps } from './types';

function RecruitCard(props: RecruitCardProps) {
    const { title, content, dDay, link, hashtags } = props;

    return (
        <Link css={recruitCardContainer} to={link}>
            <div css={recruitCardHeader}>
                <Text>{title}</Text>
                <Text type="bodySemibold" color="primary">
                    {dDay}
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
