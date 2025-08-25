import type { DetailAnnouncement, PersonalInfoQuestion } from '@api/domain/announcement/types';
import { announcementQueries, myClubQueries } from '@api/queryFactory';
import { ClubNavigation } from '@components';
import { CATEGORY_LABEL } from '@constants/category';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Avatar, Text } from '@ssoc/ui';

import {
    s_announcementPage,
    s_announcementPageMainContainer,
    s_applyFormContainer,
    s_clubApplyTabContainer,
    s_clubLogoAndNameContainer,
    s_clubNameContainer,
} from './AnnouncementPage.style';
import { DetailQuestionPage } from './DetailQuestionPage/DetailQuestionPage';
import { PersonalQuestionPage } from './PersonalQuestionPage/PersonalQuestionPage';
import { RecruitmentPage } from './RecruitmenPage/RecruitmentPage';
import type { QuestionType } from './types';

function AnnouncementPage() {
    const [activeTab, setActiveTab] = useState<string>('모집공고');
    const { clubId, announcementId } = useParams();

    const { data: club } = useSuspenseQuery(myClubQueries.detail(clubId ?? ''));
    const { data: detailClub } = useQuery<DetailAnnouncement>(
        announcementQueries.detail(announcementId ?? ''),
    );

    const imageUrls = useMemo(
        () => (detailClub?.images ?? []).map((image) => image.url),
        [detailClub?.images],
    );

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
            detailClub?.applicationForm?.personalInfoQuestionTypes?.map((question) => {
                return {
                    id: question,
                    label: getPersonalQuestionLabel(question),
                    type: question as PersonalInfoQuestion,
                    isRequired: true,
                };
            }) || [],
        [detailClub?.applicationForm?.personalInfoQuestionTypes],
    );

    // 사전질문 데이터
    const personalQuestions = useMemo(
        () =>
            (detailClub?.applicationForm?.preQuestions ?? []).map((question) => ({
                id: question.id,
                label: question.label,
                type: question.type as QuestionType,
                options: question.options,
                isRequired: question.isRequired,
            })) || [],
        [detailClub?.applicationForm?.preQuestions],
    );

    const clubPersonalInfoQuestions = [...clubPersonalQuestions, ...personalQuestions];

    // 자기소개서 질문 데이터
    const detailQuestions = useMemo(
        () =>
            (detailClub?.applicationForm?.applicationQuestions ?? []).map((q) => ({
                id: q.id,
                type: q.type as QuestionType,
                label: q.label,
                description: q.description,
                isRequired: q.isRequired,
            })),
        [detailClub?.applicationForm?.applicationQuestions],
    );

    const navigateItem = [
        {
            title: '모집공고',
            page: (
                <RecruitmentPage
                    id={detailClub?.id}
                    title={detailClub?.title}
                    summaryDescription={detailClub?.summaryDescription}
                    detailDescription={detailClub?.detailDescription}
                    target={detailClub?.target}
                    field={detailClub?.field}
                    numberOfPeople={detailClub?.numberOfPeople}
                    activityPeriod={detailClub?.activityPeriod}
                    announcementType={detailClub?.announcementType}
                    announcementStatus={detailClub?.announcementStatus}
                    images={imageUrls}
                    applicationPeriod={detailClub?.applicationPeriod}
                    documentResultPeriod={detailClub?.documentResultPeriod}
                    interviewPeriod={detailClub?.interviewPeriod}
                    finalResultPeriod={detailClub?.finalResultPeriod}
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

export { AnnouncementPage };
