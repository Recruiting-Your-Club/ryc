import React, { useState } from 'react';
import { Text, Button, Tag, ClubBox, Image, ImageDialog } from '@components';
import {
    clubNameContainer,
    contentContainer,
    recruitmentContainer,
    imageListContainer,
    imageItem,
    contentHeader,
    contentBody,
    headerSubContainer,
    applyButtonAtDesktop,
    textContainer,
    applyButtonAtMobile,
} from './RecruitmentPage.style';
import { useDialog } from '@hooks/useDialog';
import { useRouter } from '@hooks/useRouter';
import { useParams, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { announcementQueries } from '@api/queryFactory';

function RecruitmentPage() {
    const { open, openDialog, closeDialog } = useDialog();
    const { goTo } = useRouter();
    const { announcementId } = useParams<{ announcementId: string }>();
    const location = useLocation();
    const [imageUrl, setImageUrl] = useState<string>();

    // URL params에서 announcementId를 우선 사용, 없으면 location.state 사용
    const { announcementDetailData } = location.state || {};

    // announcementId로 상세 정보 조회
    const {
        data: announcementDetail,
        isLoading,
        error,
    } = useQuery({
        ...announcementQueries.getAnnouncementDetail(announcementId || ''),
    });

    // location.state의 데이터를 우선 사용, 없으면 API 데이터 사용
    const finalAnnouncementData = announcementDetailData || announcementDetail;
    const images = finalAnnouncementData?.images || [];

    // ClubBox용 데이터 변환
    const clubBoxData = [
        { title: '모집 대상', value: finalAnnouncementData?.target || '-' },
        { title: '활동 기간', value: finalAnnouncementData?.activityPeriod || '-' },
        { title: '모집 인원', value: finalAnnouncementData?.numberOfPeople || '-' },
        { title: '면접 여부', value: finalAnnouncementData?.hasInterview ? '있음' : '없음' },
        {
            title: '신청 기간',
            value: `${finalAnnouncementData?.applicationPeriod?.startDate?.split('T')[0] || '-'} ~ ${finalAnnouncementData?.applicationPeriod?.endDate?.split('T')[0] || '-'}`,
        },
    ];

    const handleImageClick = (url: string) => {
        setImageUrl(url);
    };

    if (isLoading) {
        return (
            <div css={recruitmentContainer}>
                <Text>공고 정보를 불러오는 중...</Text>
            </div>
        );
    }

    if (error) {
        return (
            <div css={recruitmentContainer}>
                <Text>공고 정보를 불러오는 중 오류가 발생했습니다.</Text>
            </div>
        );
    }

    if (!finalAnnouncementData) {
        return (
            <div css={recruitmentContainer}>
                <Text>공고 정보를 찾을 수 없습니다.</Text>
            </div>
        );
    }

    return (
        <div css={recruitmentContainer}>
            <div css={contentContainer}>
                <div css={contentHeader}>
                    <Text as="h1" type="h1Semibold" textAlign="start">
                        {finalAnnouncementData.title}
                    </Text>
                    <div css={headerSubContainer}>
                        <div css={clubNameContainer}>
                            <Text as="h4" type="h4Light" color="caption">
                                EN#
                            </Text>
                            <Tag variant="progress" text="모집중" />
                        </div>
                        <Button
                            variant="primary"
                            size="xl"
                            onClick={() => goTo(`/announcements/${announcementId}/application`)}
                            sx={applyButtonAtDesktop}
                        >
                            지원하기
                        </Button>
                    </div>
                </div>

                <div css={contentBody}>
                    <ClubBox data={clubBoxData} />
                    <Text textAlign="start" sx={textContainer}>
                        {finalAnnouncementData.detailDescription}
                    </Text>

                    <div css={imageListContainer}>
                        {images.map((image: any) => (
                            <button
                                css={imageItem}
                                key={image.id}
                                onClick={() => {
                                    openDialog();
                                    handleImageClick(image.originUrl);
                                }}
                            >
                                <Image src={image.originUrl} alt="동아리 사진" />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div css={applyButtonAtMobile}>
                <Button
                    size="full"
                    onClick={() => goTo(`/announcements/${announcementId}/application`)}
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

export { RecruitmentPage };
