import { ClubInformationBox, DEFAULT_ALWAYS_OPEN_SENTINEL_START, ImageDialog } from '@components';
import { ALWAYS_OPEN_SENTINEL_START } from '@pages/RecruitCreatePage/PreviewStep';
import dayjs from 'dayjs';
import DOMPurify from 'dompurify';
import React, { useMemo, useState } from 'react';

import { Image } from '@ssoc/ui';

import type { AnnouncementInfoPageProps } from '../types';
import {
    s_contentBody,
    s_contentContainer,
    s_imageItem,
    s_imageListContainer,
    s_recruitmentContainer,
    s_textContainer,
} from './RecruitmentPage.style';

function RecruitmentPage({
    detailDescription,
    target,
    field,
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

    // state, ref, querystring hooks
    const [openDialog, setOpenDialog] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();
    // form hooks
    // query hooks
    // calculated values
    const formatDate = (date?: string) => (date ? dayjs(date).format('YY.MM.DD') : '-');

    const formatPeriod = (period?: { startDate: string; endDate: string }) => {
        if (applicationPeriod?.startDate.startsWith('0001')) return '상시모집';
        if (!period?.startDate || !period?.endDate) {
            return '미정';
        }
        const sameDay = dayjs(period?.startDate).isSame(period?.endDate, 'day');
        return sameDay
            ? formatDate(period?.startDate)
            : period?.startDate.startsWith('0001')
              ? '상시모집'
              : `${formatDate(period?.startDate)} ~ ${formatDate(period?.endDate)}`;
    };

    const clubBoxData = useMemo(
        () => [
            { title: '모집 대상', value: target || '미정' },
            { title: '모집 분야', value: field || '미정' },
            { title: '활동 기간', value: activityPeriod || '미정' },
            { title: '모집 인원', value: numberOfPeople || '미정' },
            { title: '서류 접수', value: formatPeriod(applicationPeriod) },
            { title: '서류 발표', value: formatPeriod(documentResultPeriod) },
            { title: '면접 일정', value: formatPeriod(interviewPeriod) },
            { title: '최종 합격', value: formatPeriod(finalResultPeriod) },
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
                    <ClubInformationBox data={clubBoxData} />
                    <div
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(detailDescription ?? ''),
                        }}
                        css={s_textContainer}
                    />

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
                                    <Image
                                        src={url}
                                        alt="동아리 사진"
                                        onLoad={() => URL.revokeObjectURL(url)}
                                    />
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
