import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { RecruitCard, RecruitDialog, Text } from '@components';
import { recruitCell, recruitmentContainer } from './RecruitmentPage.style';
import { useDialog } from '@hooks/useDialog';
import { announcementQueries } from '@api/queryFactory';
import { RecruitmentPageProps } from '../\btypes';

function RecruitmentPage({ clubId }: RecruitmentPageProps) {
    const { open, openDialog, closeDialog } = useDialog();
    const [selectedAnnouncementId, setSelectedAnnouncementId] = useState<string | null>(null);

    const {
        data: announcements,
        isLoading,
        error,
    } = useQuery(announcementQueries.getAnnouncementList(clubId));

    const { data: selectedAnnouncementDetail, isLoading: isDetailLoading } = useQuery({
        ...announcementQueries.getAnnouncementDetail(selectedAnnouncementId || ''),
    });

    const handleCardClick = (announcementId: string) => {
        setSelectedAnnouncementId(announcementId);
        openDialog();
    };

    const handleDialogClose = () => {
        closeDialog();
        setSelectedAnnouncementId(null);
    };

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
                {announcements ? (
                    announcements?.map((announcement) => (
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
