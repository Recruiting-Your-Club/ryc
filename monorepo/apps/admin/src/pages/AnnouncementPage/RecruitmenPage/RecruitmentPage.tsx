import { ClubBox, ImageDialog } from '@components';
import { toTagProps } from '@constants/status';
import dayjs from 'dayjs';
import React, { useState } from 'react';

import { Button, Image, Tag, Text } from '@ssoc/ui';

import { s_clubNameContainer } from '../AnnouncementPage.style';
import type { AnnouncementInfoPageProps } from '../types';
import {
    s_applyButtonAtDesktop,
    s_contentBody,
    s_contentContainer,
    s_contentHeader,
    s_headerSubContainer,
    s_imageItem,
    s_imageListContainer,
    s_recruitmentContainer,
    s_textContainer,
} from './RecruitmentPage.style';

function RecruitmentPage({
    id,
    title,
    summaryDescription,
    detailDescription,
    target,
    field,
    announcementStatus,
    announcementType,
    activityPeriod,
    numberOfPeople,
    applicationPeriod,
    interviewPeriod,
    documentResultPeriod,
    finalResultPeriod,
}: AnnouncementInfoPageProps) {
    // prop destruction
    // lib hooks
    // initial values
    const images = [
        'https://ticketimage.interpark.com/Play/image/large/24/24013437_p.gif',
        'https://images.unsplash.com/photo-1496989981497-27d69cdad83e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fCVFQiU4RiU5OSVFQyU5NSU4NCVFQiVBNiVBQ3xlbnwwfHwwfHx8MA%3D%3D',
        'https://plus.unsplash.com/premium_photo-1673795753320-a9df2df4461e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0Mnx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1745605443047-ea774bf4a77f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzMnx8fGVufDB8fHx8fA%3D%3D',
        'https://d32gkk464bsqbe.cloudfront.net/JTI08fg3oWjuMKWf6pO94MCxv5M=/400x300/company-profiles/o/b23a5925970125281c7ad70138c1bee3d79df7ca.png',
    ];

    const { text, variant } = toTagProps(announcementStatus);

    // state, ref, querystring hooks
    const [openDialog, setOpenDialog] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();
    // form hooks
    // query hooks
    // calculated values
    const formatDate = (date?: string) => (date ? dayjs(date).format('YY.MM.DD') : '-');

    const formatPeriod = (period: { startDate: string; endDate: string }) => {
        const samdDay = dayjs(period.startDate).isSame(period.endDate, 'day');
        return samdDay
            ? formatDate(period.startDate)
            : `${formatDate(period.startDate)} ~ ${formatDate(period.endDate)} `;
    };
    // handlers
    const handleImageClick = (url: string) => {
        setImageUrl(url);
    };
    // effects

    return (
        <div css={s_recruitmentContainer}>
            <div css={s_contentContainer}>
                <div css={s_contentHeader}>
                    <Text as="h1" type="h1Semibold" textAlign="start">
                        {title}
                    </Text>
                    <div css={s_headerSubContainer}>
                        <div css={s_clubNameContainer}>
                            <Text as="h4" type="h4Light" color="caption">
                                {summaryDescription}
                            </Text>
                            <Tag variant={variant} text={text} />
                        </div>
                    </div>
                </div>

                <div css={s_contentBody}>
                    <ClubBox />
                    <Text textAlign="start" sx={s_textContainer}>
                        {detailDescription}
                    </Text>

                    <div css={s_imageListContainer}>
                        {images &&
                            images.map((url) => (
                                <button
                                    css={s_imageItem}
                                    key={url}
                                    onClick={() => {
                                        setOpenDialog(true);
                                        handleImageClick(url);
                                    }}
                                >
                                    <Image src={url} alt="동아리 사진" />
                                </button>
                            ))}
                    </div>
                </div>
            </div>
            {openDialog && imageUrl && (
                <ImageDialog
                    open={openDialog}
                    handleClose={() => setOpenDialog(false)}
                    imageUrl={imageUrl}
                />
            )}
        </div>
    );
}

export { RecruitmentPage };
