import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { RecruitCard, RecruitDialog, Text } from '@components';
import { recruitCell, recruitmentContainer } from './RecruitmentPage.style';
import { useDialog } from '@hooks/useDialog';
import { announcementQueries } from '@api/queryFactory';
import { useClubStore } from '@stores/clubStore';
import { useParams } from 'react-router-dom';

function RecruitmentPage() {
    // prop destruction
    const { open, openDialog, closeDialog } = useDialog();

    // lib hooks
    const { id: clubId } = useParams<{ id: string }>();
    const { setApplicationPeriod } = useClubStore();
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
    });

    const { data: selectedAnnouncementDetail } = useQuery({
        ...announcementQueries.getAnnouncementDetail(selectedAnnouncementId),
        enabled: !!selectedAnnouncementId,
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
            setApplicationPeriod(selectedAnnouncementDetail.applicationPeriod);
        }
    }, [selectedAnnouncementDetail, setApplicationPeriod]);

    if (!clubId) {
        return (
            <div css={recruitmentContainer}>
                <Text>유효한 동아리 ID가 없습니다.</Text>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div css={recruitmentContainer}>
                <Text>공고 목록을 불러오는 중...</Text>
            </div>
        );
    }

    if (error) {
        return (
            <div css={recruitmentContainer}>
                <Text>공고 목록을 불러오는 중 오류가 발생했습니다.</Text>
            </div>
        );
    }

    return (
        <>
            <div css={recruitmentContainer}>
                {announcements && announcements.length > 0 ? (
                    announcements.map((announcement) => (
                        <div css={recruitCell} key={announcement.announcementId}>
                            <RecruitCard
                                title={announcement.title}
                                content={announcement.summaryDescription}
                                deadline={announcement.applicationEndDate}
                                hashtags={announcement.tags}
                                onClick={() => handleCardClick(announcement.announcementId)}
                            />
                        </div>
                    ))
                ) : (
                    <Text>등록된 공고가 없습니다.</Text>
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

export { RecruitmentPage };
