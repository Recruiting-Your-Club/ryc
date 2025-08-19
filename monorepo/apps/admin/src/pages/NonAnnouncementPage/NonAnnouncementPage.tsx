import React from 'react';

import { Text } from '@ssoc/ui';

import { s_nonAnnouncementPageContainer } from './NonAnnouncement.style';

function NonAnnouncementPage() {
    return (
        <div css={s_nonAnnouncementPageContainer}>
            <div>
                <div></div>
            </div>
            <Text type="h2Semibold">현재 선택된 공고가 없습니다</Text>
            <Text type="h4Light">공고를 먼저 선택해주세요.</Text>
        </div>
    );
}

export { NonAnnouncementPage };
