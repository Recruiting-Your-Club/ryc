import { RecruitCard, RecruitDialog } from '@components';
import React, { useState } from 'react';

import { recruitCell, recruitmentContainer } from './RecruitmentPage.style';

function RecruitmentPage() {
    // prop destruction
    // lib hooks
    // initial values
    // state, ref, querystring hooks
    const [openDialog, setOpenDialog] = useState(false);
    // form hooks
    // query hooks
    // calculated values
    // handlers
    // effects
    const recruitListData = [
        {
            title: '🌱 프론트엔드 스터디원 모집',
            content:
                'React, Vue, Angular 등 프론트엔드 기술 스택 학습 및 프로젝트 진행하실 분 모십니다. 주 2회 스터디 진행.',
            deadline: '2025-05-25', // 마감일은 YYYY-MM-DD 형식 문자열
            hashtags: ['프론트엔드', 'React', '스터디', '온라인'],
            link: '/recruitment/1', // 해당 공고 상세 페이지로 이동할 링크
        },
        {
            title: '🖥️ 백엔드 개발자 구인',
            content:
                'Node.js 기반 서비스 개발 경험자 우대, REST API 설계 및 구현, DB 모델링 등 함께 성장할 개발자 찾습니다.',
            deadline: '2025-06-10',
            hashtags: ['백엔드', 'Node.js', '취업', '서울'],
            link: '/recruitment/2',
        },
        {
            title: '📱 모바일 앱 개발 (iOS/Android) 프로젝트 팀원 모집',
            content:
                'Flutter 또는 React Native를 이용한 크로스 플랫폼 앱 개발 프로젝트를 함께 할 팀원 모집합니다.',
            deadline: '2025-05-30',
            hashtags: ['모바일', 'Flutter', 'React Native', '프로젝트', 'React Native', '프로젝트'],
            link: '/recruitment/3',
        },
        {
            title: '🎨 UX/UI 디자이너 모집',
            content:
                '사용자 중심의 인터페이스 디자인 및 개선에 참여하실 디자이너 분들을 찾습니다. 포트폴리오 제출 필수.',
            deadline: '2025-06-01',
            hashtags: ['디자인', 'UX/UI', '웹디자인', '모바일디자인'],
            link: '/recruitment/4',
        },
        {
            title: '📸 사진/영상 촬영 및 편집 스터디',
            content:
                '사진 또는 영상 촬영에 관심 있는 분들이 모여 서로 배우고 함께 작업하며 실력을 향상시킬 스터디입니다.',
            deadline: '2025-05-20',
            hashtags: ['사진', '영상', '스터디', '오프라인'],
            link: '/recruitment/5',
        },
    ];

    return (
        <>
            <div css={recruitmentContainer}>
                {recruitListData &&
                    recruitListData.map((cardData) => (
                        <div css={recruitCell} key={cardData.title}>
                            <RecruitCard
                                title={cardData.title}
                                content={cardData.content}
                                deadline={cardData.deadline}
                                hashtags={cardData.hashtags}
                                onClick={() => setOpenDialog(true)}
                            />
                        </div>
                    ))}
            </div>
            {openDialog && (
                <RecruitDialog open={openDialog} handleClose={() => setOpenDialog(false)} />
            )}
        </>
    );
}

export { RecruitmentPage };
