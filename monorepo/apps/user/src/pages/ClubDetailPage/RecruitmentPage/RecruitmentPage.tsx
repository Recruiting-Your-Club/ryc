import { announcementQueries } from '@api/queryFactory';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useRouter } from '@ssoc/hooks';
import { Button, Text } from '@ssoc/ui';
import { useDialog } from '@ssoc/ui/src/hooks';

import { RecruitCard } from '../../../components/RecruitCard/RecruitCard';
import { RecruitDialog } from '../../../components/RecruitDialog/RecruitDialog';
import { ClubDetailRecruitmentLoadingPage } from '../../../pages/LoadingPage/ClubDetailRecruitmentLoadingPage/ClubDetailRecruitmentLoadingPage';
import { useClubStore } from '../../../stores';
import {
    recruitCell,
    recruitmentContainer,
    s_noRecruitmentContainer,
} from './RecruitmentPage.style';

function RecruitmentPage() {
    // prop destruction
    const { open, openDialog, closeDialog } = useDialog();

    // lib hooks
    const { goTo } = useRouter();
    const { id: clubId } = useParams<{ id: string }>();
    const { setApplicationPeriod, setClubField } = useClubStore();
    // initial values
    // state, ref, querystring hooks
    const [selectedAnnouncementId, setSelectedAnnouncementId] = useState<string>('');
    // form hooks
    // query hooks
    const {
        data: announcements,
        isLoading,
        error,
    } = useQuery({
        ...announcementQueries.getAnnouncementList(clubId || ''),
        enabled: !!clubId,
        throwOnError: true,
    });

    const { data: selectedAnnouncementDetail } = useQuery({
        ...announcementQueries.getAnnouncementDetail(selectedAnnouncementId),
        enabled: !!selectedAnnouncementId,
        throwOnError: true,
    });

    // calculated values
    // handlers
    const handleCardClick = (announcementId: string) => {
        setSelectedAnnouncementId(announcementId);
        openDialog();
    };

    const handleDialogClose = () => {
        closeDialog();
        setSelectedAnnouncementId('');
    };
    //effects
    useEffect(() => {
        if (selectedAnnouncementDetail) {
            setApplicationPeriod({
                startDate:
                    selectedAnnouncementDetail.applicationPeriod === null
                        ? '미정'
                        : selectedAnnouncementDetail.applicationPeriod.startDate,
                endDate:
                    selectedAnnouncementDetail.applicationPeriod === null
                        ? '미정'
                        : selectedAnnouncementDetail.applicationPeriod.endDate,
            });
            setClubField(
                selectedAnnouncementDetail.field === null
                    ? '미정'
                    : selectedAnnouncementDetail.field,
            );
        }
    }, [selectedAnnouncementDetail, setApplicationPeriod, setClubField]);

    if (isLoading) {
        return <ClubDetailRecruitmentLoadingPage />;
    }

    if (error) {
        return (
            <div css={recruitmentContainer(false)}>
                <Text>공고 목록을 불러오는 중 오류가 발생했습니다.</Text>
            </div>
        );
    }

    return (
        <>
            <div css={recruitmentContainer(announcements && announcements.length > 0)}>
                {announcements && announcements.length > 0 ? (
                    announcements.map((announcement) => (
                        <div css={recruitCell} key={announcement.announcementId}>
                            <RecruitCard
                                title={announcement.title}
                                content={announcement.summaryDescription}
                                deadline={announcement.applicationEndDate}
                                hashtags={announcement.tags}
                                status={announcement.announcementStatus}
                                onClick={() => handleCardClick(announcement.announcementId)}
                            />
                        </div>
                    ))
                ) : (
                    <div css={s_noRecruitmentContainer}>
                        <Text>현재 이 동아리에서 등록한 공고가 없습니다.</Text>
                        <Button variant="primary" onClick={() => goTo('/')}>
                            다른 동아리 둘러보기
                        </Button>
                    </div>
                )}
            </div>
            {open && selectedAnnouncementDetail && (
                <RecruitDialog
                    open={open}
                    handleClose={handleDialogClose}
                    announcementDetaildata={selectedAnnouncementDetail}
                />
            )}
        </>
    );
}

export default RecruitmentPage;
