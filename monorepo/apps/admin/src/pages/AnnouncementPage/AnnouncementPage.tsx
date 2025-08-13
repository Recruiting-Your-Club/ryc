import { myClubQueries } from '@api/queryFactory';
import { ClubNavigation } from '@components';
import { useSuspenseQuery } from '@tanstack/react-query';
import React, { useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import Ryc from '@ssoc/assets/images/Ryc.svg';
import { Text } from '@ssoc/ui';

import {
    s_announcementPage,
    s_announcementPageMainContainer,
    s_applyFormContainer,
    s_clubApplyTabContainer,
    s_clubLogoAndNameContainer,
    s_clubNameContainer,
    s_svgContainer,
} from './AnnouncementPage.style';
import { DetailQuestionPage } from './DetailQuestionPage/DetailQuestionPage';
import { PersonalQuestionPage } from './PersonalQuestionPage/PersonalQuestionPage';
import { RecruitmentPage } from './RecruitmenPage/RecruitmentPage';
import type { AnnouncementInfoPageProps, QuestionType } from './types';
import { DetailQuestion } from './types';

export const announcementData = {
    id: '213123',
    title: '프론트엔드 모집',
    detailDescription: `EN#은 설립된 지 올해로 23년 된 역사 깊은 세종대학교 프로그래밍 학술
동아리입니다. ‘C#을 즐기자’라는 목적으로 설립된 EN#은 현재 다양한 언어와
기술 스택을 공부하며, WEB과 APP 분야에서 활발히 활동 중입니다.최종적으로
실제 자기만의 WEB, APP서비스를 구현하여 운영하는 경험을 목표로 하고
있습니다. EN#은 설립된 지 올해로 23년 된 역사 깊은 세종대학교 프로그래밍
학술 동아리입니다. ‘C#을 즐기자’라는 목적으로 설립된 EN#은 현재 다양한
언어와 기술 스택을 공부하며, WEB과 APP 분야에서 활발히 활동 중입니다.
최종적으로 실제 자기만의 WEB, APP서비스를 구현하여 운영하는 경험을 목표로
하고 있습니다.EN#은 설립된 지 올해로 23년 된 역사 깊은 세종대학교 프로그래밍 학술
동아리입니다. ‘C#을 즐기자’라는 목적으로 설립된 EN#은 현재 다양한 언어와
기술 스택을 공부하며, WEB과 APP 분야에서 활발히 활동 중입니다.최종적으로
실제 자기만의 WEB, APP서비스를 구현하여 운영하는 경험을 목표로 하고
있습니다. EN#은 설립된 지 올해로 23년 된 역사 깊은 세종대학교 프로그래밍
학술 동아리입니다. ‘C#을 즐기자’라는 목적으로 설립된 EN#은 현재 다양한
언어와 기술 스택을 공부하며, WEB과 APP 분야에서 활발히 활동 중입니다.
최종적으로 실제 자기만의 WEB, APP서비스를 구현하여 운영하는 경험을 목표로
하고 있습니다.EN#은 설립된 지 올해로 23년 된 역사 깊은 세종대학교 프로그래밍 학술
동아리입니다. ‘C#을 즐기자’라는 목적으로 설립된 EN#은 현재 다양한 언어와
기술 스택을 공부하며, WEB과 APP 분야에서 활발히 활동 중입니다.최종적으로
실제 자기만의 WEB, APP서비스를 구현하여 운영하는 경험을 목표로 하고
있습니다. EN#은 설립된 지 올해로 23년 된 역사 깊은 세종대학교 프로그래밍
학술 동아리입니다. ‘C#을 즐기자’라는 목적으로 설립된 EN#은 현재 다양한
언어와 기술 스택을 공부하며, WEB과 APP 분야에서 활발히 활동 중입니다.
최종적으로 실제 자기만의 WEB, APP서비스를 구현하여 운영하는 경험을 목표로
하고 있습니다.`,
    summaryDescription: 'En#에서 프론트엔드 분야 신입 부원을 모집합니다!',
    target: '1,2학년',
    field: '학술동아리',
    numberOfPeople: '0명',
    activityPeriod: '한 학기',
    announcementType: 'ALWAYS_OPEN' as const,
    announcementStatus: 'RECRUITING' as const,
    images: [
        'https://ticketimage.interpark.com/Play/image/large/24/24013437_p.gif',
        'https://images.unsplash.com/photo-1496989981497-27d69cdad83e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fCVFQiU4RiU5OSVFQyU5NSU4NCVFQiVBNiVBQ3xlbnwwfHwwfHx8MA%3D%3D',
        'https://plus.unsplash.com/premium_photo-1673795753320-a9df2df4461e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0Mnx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1745605443047-ea774bf4a77f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzMnx8fGVufDB8fHx8fA%3D%3D',
        'https://d32gkk464bsqbe.cloudfront.net/JTI08fg3oWjuMKWf6pO94MCxv5M=/400x300/company-profiles/o/b23a5925970125281c7ad70138c1bee3d79df7ca.png',
    ],
    applicationPeriod: {
        startDate: '2025-05-03T03:13:11.173Z',
        endDate: '2025-06-29T03:13:11.173Z',
    },
    documentResultPeriod: {
        startDate: '2025-05-03T03:13:11.173Z',
        endDate: '2025-05-03T03:13:11.173Z',
    },

    interviewPeriod: {
        startDate: '2025-05-03T03:13:11.173Z',
        endDate: '2025-05-03T03:13:11.173Z',
    },

    finalResultPeriod: {
        startDate: '2025-06-30T15:00:00.000Z',
        endDate: '2025-06-30T15:00:00.000Z',
    },
    application: {
        applicationQuestions: [
            {
                id: '1',
                type: 'LONG_ANSWER',
                label: 'EN#에 지원한 동기가 무엇인가요?',
                subLabel: 'EN#에 지원하게 된 계기와 동기를 자유롭게 작성해주세요.',
                isRequired: true,
                options: [],
            },
            {
                id: '2',
                type: 'LONG_ANSWER',
                label: 'EN#에서 기대하는 활동을 작성해주세요.',
                subLabel: 'EN#에서 하고 싶은 활동이나 목표를 자유롭게 작성해주세요.',
                isRequired: true,
                options: [],
            },
            {
                id: '3',
                type: 'LONG_ANSWER',
                label: '프로젝트 경험이 있다면 자세히 설명해주세요. (없다면 작성하지 않으셔도 됩니다.)',
                subLabel: '참여했던 프로젝트의 내용, 역할, 기간 등을 자세히 작성해주세요.',
                isRequired: false,
                options: [],
            },
        ],
        preQuestions: [
            {
                id: '1',
                type: 'SHORT_ANSWER',
                label: '이름',
                isRequired: true,
                options: [],
            },
            {
                id: '2',
                type: 'SHORT_ANSWER',
                label: '생년월일',
                isRequired: true,
                options: [],
            },
            {
                id: '3',
                type: 'SHORT_ANSWER',
                label: '전화번호',
                isRequired: true,
                options: [],
            },
            {
                id: '4',
                type: 'SINGLE_CHOICE',
                label: '성별',
                isRequired: true,
                options: ['남', '여'],
            },
            {
                id: '5',
                type: 'MULTIPLE_CHOICE',
                label: '전공',
                isRequired: true,
                options: ['소프트웨어학과', '컴퓨터공학과', '기타'],
            },
        ],
        personalInfoQuestions: ['STUDENT_ID', 'PROFILE_IMAGE'],
    },
};

function AnnouncementPage() {
    const { application, ...recruitment } = announcementData;
    const [activeTab, setActiveTab] = useState<string>('모집공고');
    const { clubId } = useParams<{ clubId: string }>();

    const { data: club } = useSuspenseQuery(myClubQueries.detail(clubId ?? ''));

    // 모집공고 데이터

    // 사전질문 데이터
    const personalQuestions = useMemo(
        () =>
            announcementData.application.preQuestions.map((question) => ({
                id: question.id,
                label: question.label,
                type: question.type as QuestionType,
                options: question.options ?? [],
                isRequired: question.isRequired,
            })),
        [],
    );

    // 자기소개서 질문 데이터
    const detailQuestions = useMemo(
        () =>
            announcementData.application.applicationQuestions.map((question) => ({
                id: question.id,
                type: question.type as QuestionType,
                label: question.label,
                subLabel: question.subLabel,
                isRequired: question.isRequired,
            })),
        [],
    );

    const navigateItem = [
        {
            title: '모집공고',
            page: <RecruitmentPage {...recruitment} />,
            width: '5.8rem',
        },
        {
            title: '사전질문',
            page: (
                <PersonalQuestionPage
                    personalQuestions={personalQuestions}
                    containerStyle={s_applyFormContainer}
                />
            ),
            width: '5.8rem',
        },
        {
            title: '자기소개서',
            page: (
                <DetailQuestionPage
                    detailQuestions={detailQuestions}
                    containerStyle={s_applyFormContainer}
                />
            ),
            width: '7.9rem',
        },
    ];

    return (
        <div css={s_announcementPage}>
            <div css={s_announcementPageMainContainer}>
                <div css={s_clubLogoAndNameContainer}>
                    <Ryc css={s_svgContainer} />
                    <div css={s_clubNameContainer}>
                        <Text type="h3Semibold">{club.name}</Text>
                        <Text type="subCaptionRegular" color="helper" textAlign="left">
                            {club.category}
                        </Text>
                    </div>
                </div>
                <div css={s_clubApplyTabContainer}>
                    <ClubNavigation
                        navigationItem={navigateItem}
                        controlledActive={activeTab}
                        onActiveChange={setActiveTab}
                    />
                </div>
            </div>
        </div>
    );
}

export { AnnouncementPage };
