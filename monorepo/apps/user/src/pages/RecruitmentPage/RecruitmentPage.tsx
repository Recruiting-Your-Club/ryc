import type { Image as ImageType } from '@api/domain/announcement/types';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

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
    const location = useLocation();
    const { applicationPeriod } = useClubStore();
    const { clubBoxData, parsedAnnouncementData } = location.state;
    // initial values
    const { isExpired } = getDeadlineInfo(applicationPeriod?.endDate || '');
    // state, ref, querystring hooks
    const [imageUrl, setImageUrl] = useState<string>();
    // form hooks
    // query hooks
    // calculated values
    // handlers
    const handleImageClick = (url: string) => {
        setImageUrl(url);
    };
    // effects

    return (
        <div css={recruitmentContainer}>
            <div css={contentContainer}>
                <div css={contentHeader}>
                    <Text as="h1" type="h1Semibold" textAlign="start">
                        {parsedAnnouncementData.title}
                    </Text>
                    <div css={headerSubContainer}>
                        <div css={clubNameContainer}>
                            <Text as="h4" type="h4Light" color="caption">
                                {parsedAnnouncementData.clubName}
                            </Text>
                            <Tag
                                variant={parsedAnnouncementData.announcementStatusVariant}
                                text={parsedAnnouncementData.announcementStatus}
                            />
                        </div>
                        <Button
                            variant="primary"
                            size="xl"
                            onClick={() =>
                                goTo(`/announcements/${parsedAnnouncementData.id}/application`)
                            }
                            disabled={isExpired}
                            sx={applyButtonAtDesktop}
                        >
                            지원하기
                        </Button>
                    </div>
                </div>

                <div css={contentBody}>
                    <ClubBox data={clubBoxData} />
                    <Text textAlign="start" sx={textContainer}>
                        {parsedAnnouncementData.detailDescription}
                    </Text>

                    <div css={imageListContainer}>
                        {parsedAnnouncementData.images.map((image: ImageType) => (
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
                    onClick={() => goTo(`/announcements/${parsedAnnouncementData.id}/application`)}
                    disabled={isExpired}
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
