import DOMPurify from 'dompurify';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useRouter } from '@ssoc/hooks';
import { Button, Dialog, Image, Text } from '@ssoc/ui';
import { getDeadlineInfo } from '@ssoc/utils/src/compareTime';

import {
    parseAnnouncementClubBoxData,
    parseAnnouncementData,
} from '../../utils/parseAnnouncementData';
import { ClubBox } from '../ClubBox/ClubBox';
import {
    actionContainer,
    applyButton,
    contentContainer,
    DialogContainer,
    headerContainer,
    imageItem,
    imageListContainer,
    textContainer,
} from './RecruitDialog.style';
import type { RecruitmentDialogProps } from './types';

function RecruitDialog(props: RecruitmentDialogProps) {
    // prop destruction
    const { open, handleClose, announcementDetaildata } = props;
    // lib hooks
    const { goTo } = useRouter();
    const navigate = useNavigate();
    // initial values
    const applicationEndDate = announcementDetaildata?.applicationPeriod?.endDate;
    const images = announcementDetaildata?.images || [];
    const { isExpired } = getDeadlineInfo(applicationEndDate || '');
    const clubBoxData = announcementDetaildata
        ? parseAnnouncementClubBoxData(announcementDetaildata)
        : [];

    const parsedAnnouncementData = announcementDetaildata
        ? parseAnnouncementData(announcementDetaildata)
        : [];

    // state, ref, querystring hooks
    // form hooks
    // query hooks
    // calculated values
    // handlers
    const handleFullPageView = () => {
        handleClose?.();
        navigate(`/announcements/${announcementDetaildata?.id}`, {
            state: { clubBoxData, parsedAnnouncementData },
        });
    };
    //effects

    return (
        <Dialog
            open={open}
            size="full"
            sx={DialogContainer}
            backdrop={true}
            handleClose={handleClose}
        >
            <Dialog.Header handleClose={handleClose} sx={headerContainer}>
                <Text as="h1" type="h1Semibold">
                    모집공고
                </Text>
                <Button
                    variant="text"
                    size="s"
                    onClick={handleFullPageView}
                    sx={{ paddingLeft: '0.2rem' }}
                >
                    전체 페이지로 보기
                </Button>
            </Dialog.Header>
            <Dialog.Content sx={contentContainer}>
                <ClubBox data={clubBoxData} />
                <div
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(announcementDetaildata?.detailDescription ?? ''),
                    }}
                    css={textContainer}
                />

                <div css={imageListContainer}>
                    {images.map((image) => (
                        <div css={imageItem} key={image.id}>
                            <Image src={image.url} alt="동아리 사진" />
                        </div>
                    ))}
                </div>
            </Dialog.Content>
            <Dialog.Action sx={actionContainer}>
                <Button
                    variant="primary"
                    size="xl"
                    onClick={() => {
                        handleClose?.();
                        goTo(`/announcements/${announcementDetaildata?.id}/agreement`);
                    }}
                    sx={applyButton}
                    zIndex={10}
                    disabled={isExpired}
                >
                    지원하기
                </Button>
            </Dialog.Action>
        </Dialog>
    );
}

export { RecruitDialog };
