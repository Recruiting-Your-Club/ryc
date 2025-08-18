import { ClubBox, ImageDialog } from '@components';
import { toTagProps } from '@constants/status';
import dayjs from 'dayjs';
import React, { useMemo, useState } from 'react';

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
    images,
}: AnnouncementInfoPageProps) {
    // prop destruction
    // lib hooks
    // initial values

    const { text, variant } = toTagProps(announcementStatus);

    // state, ref, querystring hooks
    const [openDialog, setOpenDialog] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();
    // form hooks
    // query hooks
    // calculated values
    const formatDate = (date?: string) => (date ? dayjs(date).format('YY.MM.DD') : '-');

    const formatPeriod = (period: { startDate: string; endDate: string }) => {
        const sameDay = dayjs(period.startDate).isSame(period.endDate, 'day');
        return sameDay
            ? formatDate(period.startDate)
            : `${formatDate(period.startDate)} ~ ${formatDate(period.endDate)} `;
    };

    const clubBoxData = useMemo(
        () => [
            { title: '모집 대상', value: target },
            { title: '모집 분야', value: field },
            { title: '활동 기간', value: activityPeriod },
            { title: '모집 인원', value: numberOfPeople },
            { title: '서류 접수 기간', value: formatPeriod(applicationPeriod) },
            { title: '서류 결과 발표', value: formatPeriod(documentResultPeriod) },
            { title: '면접 일정', value: formatPeriod(interviewPeriod) },
            { title: '최종 결과 발표', value: formatPeriod(finalResultPeriod) },
        ],
        [
            target,
            field,
            activityPeriod,
            numberOfPeople,
            applicationPeriod,
            documentResultPeriod,
            interviewPeriod,
            finalResultPeriod,
        ],
    );
    // handlers
    const handleImageClick = (url: string) => {
        setImageUrl(url);
    };
    // effects

    return (
        <div css={s_recruitmentContainer}>
            <div css={s_contentContainer}>
                <div css={s_contentBody}>
                    <ClubBox data={clubBoxData} />
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
