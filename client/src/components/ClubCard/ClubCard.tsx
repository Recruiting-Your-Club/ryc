import Calendar from '@assets/images/calendar.svg';
import type { tagVariant } from '@components/Tag';
import { Tag } from '@components/Tag';
import { getStatus } from '@utils/compareTime';
import React from 'react';
import {
    baseClubCard,
    calendarPart,
    calendarSVG,
    clubImage,
    clubName,
    clubTitle,
    clubTypeText,
    dateText,
    statusTag,
    titlePart,
} from './ClubCard.style';
import { ClubCardFooter } from './ClubCardFooter';

interface ClubCardProps {
    imageURL: string;
    name: string;
    type: string;
    startDate: string;
    endDate: string;
    tag: string[];
}

const RECRUITMENT_STATUS: Record<tagVariant, string> = {
    primary: '모집예정',
    progress: '모집중',
    end: '모집마감',
};

function ClubCard({ imageURL, name, type, startDate, endDate, tag }: ClubCardProps) {
    const status = getStatus({ startDate, endDate });

    return (
        <div css={baseClubCard}>
            <div css={titlePart}>
                <img src={imageURL} alt="동아리 대표 이미지" css={clubImage} />
                <div css={clubTitle}>
                    <span css={clubName}>{name}</span>
                    <span css={clubTypeText}>{type}</span>
                </div>
                <div css={statusTag}>
                    <Tag text={RECRUITMENT_STATUS[status]} variant={status} />
                </div>
            </div>
            <div css={calendarPart}>
                <span css={calendarSVG}>
                    <Calendar />
                </span>
                <span css={dateText}>
                    {startDate} - {endDate}
                </span>
            </div>
            <ClubCardFooter tag={tag} />
        </div>
    );
}
export { ClubCard };
