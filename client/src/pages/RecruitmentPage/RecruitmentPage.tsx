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
import { useLocation } from 'react-router-dom';
import { getDeadlineInfo } from '@utils/compareTime';
import { useClubStore } from '@stores/clubStore';

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
                        {parsedAnnouncementData.images.map((image: any) => (
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
                    onClick={() => goTo(`/announcements/${parsedAnnouncementData.id}/application`)}
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
