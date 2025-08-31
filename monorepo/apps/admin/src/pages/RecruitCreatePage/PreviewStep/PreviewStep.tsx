import type { PersonalInfoQuestion } from '@api/domain/announcement/types';
import { myClubQueries } from '@api/queryFactory';
import { ClubNavigation } from '@components';
import { CATEGORY_LABEL } from '@constants/category';
import { DetailQuestionPage } from '@pages/AnnouncementPage/DetailQuestionPage';
import { PersonalQuestionPage } from '@pages/AnnouncementPage/PersonalQuestionPage';
import { RecruitmentPage } from '@pages/AnnouncementPage/RecruitmenPage/RecruitmentPage';
import { useSuspenseQuery } from '@tanstack/react-query';
import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useSubmit } from 'react-router-dom';

import { Avatar, Text } from '@ssoc/ui';

import {
    s_announcementPage,
    s_announcementPageMainContainer,
    s_applyFormContainer,
    s_clubApplyTabContainer,
    s_clubLogoAndNameContainer,
    s_clubNameContainer,
} from './PreviewStep.style';
import type { PreviewStepProps } from './types';

export const ALWAYS_OPEN_SENTINEL_START = '0000-01-01T00:00';
const ALWAYS_OPEN_SENTINEL_END = '9999-12-31T00:00';

function calcStatus(period: { startDate: string; endDate: string }) {
    const { startDate, endDate } = period ?? { startDate: '', endDate: '' };
    if (startDate === ALWAYS_OPEN_SENTINEL_START && endDate === ALWAYS_OPEN_SENTINEL_END)
        return 'RECRUITING';
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (now < start) return 'UPCOMING';
    if (now > end) return 'CLOSED';
    return 'RECRUITING';
}

function PreivewStep({ preivewData, recruitFiles }: PreviewStepProps) {
    const [activeTab, setActiveTab] = useState<string>('모집공고');
    const { clubId } = useParams();

    const { data: club } = useSuspenseQuery(myClubQueries.detail(clubId ?? ''));

    const getPersonalQuestionLabel = (questionTitle: string) => {
        switch (questionTitle) {
            case 'NAME':
                return '이름';
            case 'EMAIL':
                return '이메일';
            case 'STUDENT_ID':
                return '학번';
            case 'PHONE_NUMBER':
                return '전화번호';
            case 'PROFILE_IMAGE':
                return '본인사진';
            default:
                return '';
        }
    };

    const clubPersonalQuestions = useMemo(
        () =>
            preivewData.applicationForm?.personalInfoQuestionTypes?.map((question) => {
                return {
                    id: question,
                    label: getPersonalQuestionLabel(question),
                    type: question as PersonalInfoQuestion,
                    isRequired: true,
                };
            }) || [],
        [preivewData.applicationForm?.personalInfoQuestionTypes],
    );

    const personalQuestions = useMemo(
        () =>
            (preivewData.applicationForm?.preQuestions ?? []).map((q, i) => ({
                id: `${i}`,
                label: q.label,
                type: q.questionType,
                options: (q.options ?? []).map((o, idx) => ({
                    id: `${idx}`,
                    option: o.option,
                })),
                isRequired: q.isRequired,
            })),
        [preivewData.applicationForm?.preQuestions],
    );

    const clubPersonalInfoQuestions = [...clubPersonalQuestions, ...personalQuestions];

    const imageUrls = useMemo(() => {
        return recruitFiles
            .filter((f) => f.type.startsWith('image/')) // 이미지 파일만 사용
            .map((f) => URL.createObjectURL(f));
    }, [recruitFiles]);

    // 자기소개서 질문
    const detailQuestions = useMemo(
        () =>
            (preivewData.applicationForm?.applicationQuestions ?? []).map((q, i) => ({
                id: `${i}`,
                type: q.questionType,
                label: q.label,
                description: q.description,
                isRequired: q.isRequired,
            })),
        [preivewData.applicationForm?.applicationQuestions],
    );

    const announcementType = preivewData.announcementType;
    const announcementStatus = calcStatus(preivewData.periodInfo.applicationPeriod);

    const navigateItem = [
        {
            title: '모집공고',
            page: (
                <RecruitmentPage
                    id={'preview'}
                    title={preivewData.title}
                    summaryDescription={preivewData.summaryDescription}
                    detailDescription={preivewData.detailDescription}
                    target={preivewData.target}
                    field={preivewData.field}
                    numberOfPeople={preivewData.numberOfPeople}
                    activityPeriod={preivewData.activityPeriod}
                    announcementType={announcementType}
                    announcementStatus={announcementStatus}
                    images={imageUrls}
                    applicationPeriod={preivewData.periodInfo.applicationPeriod}
                    documentResultPeriod={preivewData.periodInfo.documentResultPeriod}
                    interviewPeriod={preivewData.periodInfo.interviewPeriod}
                    finalResultPeriod={preivewData.periodInfo.finalResultPeriod}
                />
            ),
            width: '5.6rem',
        },
        {
            title: '사전질문',
            page: (
                <PersonalQuestionPage
                    personalQuestions={clubPersonalInfoQuestions}
                    containerStyle={s_applyFormContainer}
                />
            ),
            width: '5.6rem',
        },
        {
            title: '자기소개서',
            page: (
                <DetailQuestionPage
                    detailQuestions={detailQuestions}
                    containerStyle={s_applyFormContainer}
                />
            ),
            width: '7.2rem',
        },
    ];

    return (
        <div css={s_announcementPage}>
            <div css={s_announcementPageMainContainer}>
                <div css={s_clubLogoAndNameContainer}>
                    <Avatar radius="10px" imageURL={club.representativeImage?.url} />
                    <div css={s_clubNameContainer}>
                        <Text type="h3Semibold">{club.name}</Text>
                        <Text type="subCaptionRegular" color="helper" textAlign="left">
                            {CATEGORY_LABEL[club.category]}
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

export { PreivewStep };
