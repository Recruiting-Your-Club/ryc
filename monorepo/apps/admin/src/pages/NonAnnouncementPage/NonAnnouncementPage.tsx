import type { AnnouncementList } from '@api/domain/announcement/types';
import { announcementQueries } from '@api/queryFactory';
import { useQuery } from '@tanstack/react-query';
import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import File from '@ssoc/assets/images/file-normal.svg';
import { Button, Dialog, Text } from '@ssoc/ui';

import {
    s_captionText,
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
                <Dialog.Content>
                    {isLoading && <Text>불러오는 중...</Text>}
                    {error && <Text>목록을 불러오지 못했습니다. 다시 시도해주세요.</Text>}
                    {!isLoading &&
                        !error &&
                        (!announcementList || announcementList.length === 0) && (
                            <div css={s_dialogTextContainer}>
                                <Text color="caption">현재 생성된 공고가 없습니다.</Text>
                                <Text color="subCaption">공고를 먼저 생성해주세요.</Text>
                                <Button>공고 생성하기</Button>
                            </div>
                        )}
                </Dialog.Content>
            </Dialog>
        </div>
    );
}

export { NonAnnouncementPage };
