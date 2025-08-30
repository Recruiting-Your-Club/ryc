import type { Image as ImageType } from '@api/domain/announcement/types';
import { announcementQueries } from '@api/queryFactory';
import { useSuspenseQuery } from '@tanstack/react-query';
import { parseAnnouncementClubBoxData } from '@utils/parseAnnouncementData';
import DOMPurify from 'dompurify';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useRouter } from '@ssoc/hooks';
import { Button, Image, ImageDialog, Tag, Text } from '@ssoc/ui';
import { useDialog } from '@ssoc/ui/src/hooks';
import { getDeadlineInfo } from '@ssoc/utils/src/compareTime';

import { ClubBox } from '../../components/ClubBox/ClubBox';
import { useClubStore } from '../../stores';
import {
    applyButtonAtDesktop,
    applyButtonAtMobile,
    clubNameContainer,
    contentBody,
    contentContainer,
    contentHeader,
    headerSubContainer,
    imageItem,
    imageListContainer,
    recruitmentContainer,
    textContainer,
} from './RecruitmentPage.style';

function RecruitmentPage() {
    // prop destruction
    // lib hooks
    const { open, openDialog, closeDialog } = useDialog();
    const { goTo } = useRouter();
    const navigate = useNavigate();
    const { announcementId } = useParams();
    const { setApplicationPeriod, setClubField } = useClubStore();
    // initial values

    // state, ref, querystring hooks
    const [imageUrl, setImageUrl] = useState<string>();
    // form hooks
    // query hooks
    const { data: announcementDetail } = useSuspenseQuery(
        announcementQueries.getAnnouncementDetail(announcementId || ''),
    );
    // calculated values
    const clubBoxData = announcementDetail ? parseAnnouncementClubBoxData(announcementDetail) : [];
    const { isExpired } = getDeadlineInfo(announcementDetail.applicationPeriod?.endDate || '');
    const field = announcementDetail.field === null ? '신입 모집' : announcementDetail.field;
    const applicationPeriod =
        announcementDetail.applicationPeriod === null
            ? { startDate: '미정', endDate: '미정' }
            : announcementDetail.applicationPeriod;
    const currentStatus = announcementDetail.announcementStatus;
    const clubId = announcementDetail.clubId === null ? '' : announcementDetail.clubId;

    const getTagVariant = (status: string) => {
        switch (status) {
            case 'RECRUITING':
                return 'progress';
            case 'CLOSED':
                return 'end';
            case 'UPCOMING':
                return 'primary';
            default:
                return 'primary';
        }
    };
    const getTagText = (status: string) => {
        switch (status) {
            case 'RECRUITING':
                return '모집중';
            case 'CLOSED':
                return '마감';
            case 'UPCOMING':
                return '모집예정';
            default:
                return '지원불가';
        }
    };
    // handlers
    const handleImageClick = (url: string) => {
        setImageUrl(url);
    };
    // effects
    useEffect(() => {
        setApplicationPeriod(applicationPeriod);
        setClubField(field);
    }, [announcementDetail]);

    return (
        <div css={recruitmentContainer}>
            <div css={contentContainer}>
                <div css={contentHeader}>
                    <Text as="h1" type="h1Semibold" textAlign="start">
                        {announcementDetail.title}
                    </Text>
                    <div css={headerSubContainer}>
                        <div css={clubNameContainer}>
                            <Text as="h4" type="h4Light" color="caption">
                                {announcementDetail.clubName}
                            </Text>
                            <Tag
                                variant={getTagVariant(announcementDetail.announcementStatus)}
                                text={getTagText(announcementDetail.announcementStatus)}
                            />
                        </div>
                        <Button
                            variant="primary"
                            size="xl"
                            onClick={() =>
                                navigate(`/announcements/${announcementDetail.id}/agreement`, {
                                    state: {
                                        clubId: clubId,
                                    },
                                })
                            }
                            disabled={isExpired || currentStatus !== 'RECRUITING'}
                            sx={applyButtonAtDesktop}
                        >
                            지원하기
                        </Button>
                    </div>
                </div>

                <div css={contentBody}>
                    <ClubBox data={clubBoxData} />
                    <div
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(announcementDetail.detailDescription),
                        }}
                        css={textContainer}
                    />

                    <div css={imageListContainer}>
                        {announcementDetail.images.map((image: ImageType) => (
                            <button
                                css={imageItem}
                                key={image.id}
                                onClick={() => {
                                    openDialog();
                                    handleImageClick(image.url);
                                }}
                            >
                                <Image src={image.url} alt="동아리 사진" />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div css={applyButtonAtMobile}>
                <Button
                    size="full"
                    onClick={() =>
                        navigate(`/announcements/${announcementDetail.id}/agreement`, {
                            state: {
                                clubId: clubId,
                            },
                        })
                    }
                    disabled={isExpired || currentStatus !== 'RECRUITING'}
                >
                    지원하기
                </Button>
            </div>
            {open && imageUrl && (
                <ImageDialog open={open} handleClose={closeDialog} imageUrl={imageUrl} />
            )}
        </div>
    );
}

export default RecruitmentPage;
