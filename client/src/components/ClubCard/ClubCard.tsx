import Calendar from '@assets/images/Calendar.svg';
import type { tagVariant } from '@components/Tag';
import { Tag } from '@components/Tag';
import { getStatus } from '@utils/compareTime';
import React from 'react';
import {
    baseClubCard,
    baseDisplay,
    calendarPart,
    calendarSVGDisplay,
    clubImage,
    clubName,
    clubTitle,
    clubTypeText,
    dateText,
    line,
    perTag,
    statusTagDisplay,
    tagDisplay,
} from './ClubCard.style';

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
            <div css={baseDisplay}>
                <img src={imageURL} alt="동아리 대표 이미지" css={clubImage} />
                <div css={clubTitle}>
                    <span css={clubName}>{name}</span>
                    <span css={clubTypeText}>{type}</span>
                </div>
                <div css={statusTagDisplay}>
                    <Tag text={RECRUITMENT_STATUS[status]} variant={status} />
                </div>
            </div>
            <div css={calendarPart}>
                <span css={calendarSVGDisplay}>
                    <Calendar />
                </span>
                <span css={dateText}>
                    {startDate} - {endDate}
                </span>
            </div>
            <hr css={line} />
            <div css={tagDisplay}>
                {tag.map((tag, index) => (
                    <div key={index} css={perTag}>
                        <Tag text={tag} variant="primary" />
                    </div>
                ))}
            </div>
        </div>
    );
}
export { ClubCard };
