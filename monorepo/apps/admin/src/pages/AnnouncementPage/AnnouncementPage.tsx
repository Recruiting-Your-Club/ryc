import { ClubNavigation } from '@components';
import React, { useMemo, useRef, useState } from 'react';

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
import type { QuestionType } from './types';
import { DetailQuestion } from './types';

export const clubData = {
    announcementId: '213123',
    title: 'EN# (Enjoy C#)',
    description: '',
    target: '1,2학년',
    tag: '학술동아리',
    numberOfPeople: 0,
    announcementPeriod: [
        {
            start: '2025-05-03T03:13:11.173Z',
            end: '2025-06-29T03:13:11.173Z',
        },
    ],
    applicationPeriod: [
        {
            start: '2025-05-03T03:13:11.173Z',
            end: '2025-05-03T03:13:11.173Z',
        },
    ],
    interviewPeriod: [
        {
            start: '2025-05-03T03:13:11.173Z',
            end: '2025-05-03T03:13:11.173Z',
        },
    ],
    resultAnnouncementDate: '2025-06-30T15:00:00.000Z',
    durationDate: '한 학기',
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
    const [activeTab, setActiveTab] = useState<string>('모집공고');

    // 사전질문 데이터
    const personalQuestions = useMemo(
        () =>
            clubData.application.preQuestions.map((question) => ({
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
            clubData.application.applicationQuestions.map((question) => ({
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
            page: <div></div>,
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
                        <Text type="h3Semibold">{clubData.title}</Text>
                        <Text type="subCaptionRegular" color="helper" textAlign="left">
                            {clubData.tag}
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
