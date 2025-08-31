import { TermOfUseRegister, TermsOfUseRecruit } from '@components';
import React from 'react';
import { useMatch } from 'react-router-dom';

import { useRouter } from '@ssoc/hooks';

function RecruitAgreementPage() {
    const { removeHistoryAndGo } = useRouter();

    // 현재 경로가 어떤 패턴에 매치되는지 확인
    const editMatch = useMatch('/announcements/edit/agreement/:clubId/:announcementId?');
    const createMatch = useMatch('/announcements/create/agreement/:clubId/:announcementId?');

    // 매치된 쪽의 파라미터 사용
    const clubId = editMatch?.params.clubId ?? createMatch?.params.clubId;
    const announcementId = editMatch?.params.announcementId ?? createMatch?.params.announcementId;

    // 이동할 목적지 계산
    const mode = editMatch ? 'edit' : 'create'; // edit 우선, 아니면 create
    const nextPath = `/announcements/${mode}/${clubId}${announcementId ? `/${announcementId}` : ''}`;

    return (
        <TermsOfUseRecruit
            title="관리자 공고 생성·수정 약관 동의"
            description="공고 생성 혹은 수정을 위해 필수 약관에 동의해 주세요."
            ctaLabel="동의 후 계속하기"
            onAgree={() => {
                removeHistoryAndGo(nextPath);
            }}
        />
    );
}

export { RecruitAgreementPage };
