import type { AnnouncementList } from '@api/domain/announcement/types';
import { announcementQueries } from '@api/queryFactory';
import { DialogSection } from '@components/DialogSection';
import { useQuery } from '@tanstack/react-query';
import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import File from '@ssoc/assets/images/file-normal.svg';
import { useRouter } from '@ssoc/hooks';
import { Button, Dialog, Divider, Text } from '@ssoc/ui';

import {
    s_captionText,
    s_dialog,
    s_dialogDivider,
    s_dialogScrollArea,
    s_dialogTextContainer,
    s_fileIcon,
    s_fileIconWrapper,
    s_iconContainer,
    s_nonAnnouncementPageContainer,
    s_textBox,
} from './NonAnnouncement.style';

function NonAnnouncementPage() {
    // prop destruction
    // lib hooks
    const { clubId } = useParams();
    const { goTo } = useRouter();
    // initial values
    // state, ref, querystring hooks
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    // form hooks
    // query hooks
    const {
        data: announcementList,
        isLoading,
        error,
    } = useQuery(announcementQueries.getListByClub(clubId || '', isDialogOpen));

    // calculated values
    const announcementsByStatus = useMemo(() => {
        if (!announcementList) return { upcoming: [], recruiting: [], closed: [] };

        return announcementList.reduce(
            (acc, announcementList) => {
                if (announcementList.announcementStatus === 'UPCOMING') {
                    acc.upcoming.push(announcementList);
                }
                if (announcementList.announcementStatus === 'RECRUITING') {
                    acc.recruiting.push(announcementList);
                }
                if (announcementList.announcementStatus === 'CLOSED') {
                    acc.closed.push(announcementList);
                }
                return acc;
            },
            {
                upcoming: [] as AnnouncementList[],
                recruiting: [] as AnnouncementList[],
                closed: [] as AnnouncementList[],
            },
        );
    }, [announcementList]);

    const handleSelectAnnouncement = (announcement: AnnouncementList) => {};

    // handlers
    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };
    // effects
    return (
        <div css={s_nonAnnouncementPageContainer}>
            <div css={s_textBox}>
                <div css={s_iconContainer}>
                    <div css={s_fileIconWrapper}>
                        <File css={s_fileIcon} />
                    </div>
                </div>
                <Text type="h2Semibold" sx={s_captionText}>
                    현재 선택된 공고가 없습니다
                </Text>
                <Text type="h3Semibold" color="caption">
                    공고를 먼저 선택해주세요.
                </Text>
            </div>
            <Button onClick={handleOpenDialog}>공고 선택하기</Button>
            <Dialog open={isDialogOpen} handleClose={() => setIsDialogOpen(false)}>
                <Dialog.Header handleClose={() => setIsDialogOpen(false)} closeIcon>
                    공고 선택
                </Dialog.Header>
                <Dialog.Content sx={s_dialog}>
                    <div css={s_dialogScrollArea}>
                        {isLoading && <Text>불러오는 중...</Text>}
                        {error && <Text>목록을 불러오지 못했습니다. 다시 시도해주세요.</Text>}
                        {!isLoading &&
                            !error &&
                            (!announcementList || announcementList.length === 0) && (
                                <div css={s_dialogTextContainer}>
                                    <Text color="caption">현재 생성된 공고가 없습니다.</Text>
                                    <Text color="subCaption">공고를 먼저 생성해주세요.</Text>
                                    <Button onClick={() => goTo(`/announcements/create/${clubId}`)}>
                                        공고 생성하기
                                    </Button>
                                </div>
                            )}
                        {!isLoading && announcementList && announcementList.length > 0 && (
                            <>
                                <DialogSection
                                    title={`진행중 공고 (${announcementsByStatus.recruiting.length})`}
                                    items={announcementsByStatus.recruiting}
                                    emptyText="현재 진행중인 공고가 없습니다."
                                    onSelect={handleSelectAnnouncement}
                                />
                                <Divider css={s_dialogDivider} />
                                <DialogSection
                                    title={`예정된 공고 (${announcementsByStatus.upcoming.length})`}
                                    items={announcementsByStatus.upcoming}
                                    emptyText="예정된 공고가 없습니다."
                                    onSelect={handleSelectAnnouncement}
                                />
                                <Divider css={s_dialogDivider} />
                                <DialogSection
                                    title={`마감된 공고 (${announcementsByStatus.closed.length})`}
                                    items={announcementsByStatus.closed}
                                    emptyText="마감된 공고가 없습니다."
                                    onSelect={handleSelectAnnouncement}
                                />
                            </>
                        )}
                    </div>
                </Dialog.Content>
            </Dialog>
        </div>
    );
}

export { NonAnnouncementPage };
