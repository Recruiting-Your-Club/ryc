import React from 'react';
import { Dialog, ClubBox, Text, Button, Image } from '@components';
import type { RecruitmentDialogProps } from './types';
import {
    actionContainer,
    applyButton,
    contentContainer,
    DialogContainer,
    headerContainer,
    textContainer,
    imageListContainer,
    imageItem,
} from './RecruitDialog.style';
import { useRouter } from '@hooks/useRouter';
import { useNavigate } from 'react-router-dom';

function RecruitDialog(props: RecruitmentDialogProps) {
    // prop destruction
    const { open, handleClose, link = '/apply', announcementDetail } = props;
    const { goTo } = useRouter();
    const navigate = useNavigate();
    // calculated values
    const images = announcementDetail?.images || [];

    // ClubBox용 데이터 변환
    const clubBoxData = [
        { title: '모집 대상', value: announcementDetail?.target || '-' },
        { title: '활동 기간', value: announcementDetail?.activityPeriod || '-' },
        { title: '모집 인원', value: announcementDetail?.numberOfPeople || '-' },
        { title: '면접 여부', value: announcementDetail?.hasInterview ? '있음' : '없음' },
        {
            title: '신청 기간',
            value: `${announcementDetail?.applicationPeriod?.startDate?.split('T')[0] || '-'} ~ ${announcementDetail?.applicationPeriod?.endDate?.split('T')[0] || '-'}`,
        },
    ];

    // handlers
    const handleFullPageView = () => {
        handleClose?.();
        // announcementDetail을 state로 전달
        navigate(`/announcements/${announcementDetail.id}`, {
            state: { announcementDetailData: announcementDetail },
        });
    };

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
                <Text textAlign="start" sx={textContainer}>
                    {announcementDetail?.detailDescription}
                </Text>

                <div css={imageListContainer}>
                    {images.map((image) => (
                        <div css={imageItem} key={image.id}>
                            <Image src={image.originUrl} alt="동아리 사진" />
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
                        goTo(`/announcements/${announcementDetail.id}/application`);
                    }}
                    sx={applyButton}
                    zIndex={10}
                >
                    지원하기
                </Button>
            </Dialog.Action>
        </Dialog>
    );
}

export { RecruitDialog };
