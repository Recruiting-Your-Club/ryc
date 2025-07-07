import { EvaluationBox, InformationBox, IntervieweeList } from '@components';
import type { Evaluation } from '@components/EvaluationBox/types';
import type { ApplicantDetail, Document } from '@components/InformationBox/types';
import type { IntervieweeInformation } from '@components/IntervieweeList/types';
import type { InterviewSchedule } from '@components/InterviewTimeTable/types';
import React, { useState } from 'react';
import {
    s_evaluationBoxWrapper,
    s_informationAndEvaluationContainer,
    s_informationBoxWrapper,
    s_interviewInformationPageContainer,
    s_selectionContainer,
} from './InterviewEvaluationPage.style';

export const interviewSchedules: InterviewSchedule[] = [
    {
        date: '2025-07-11',
        interviewSets: [
            {
                name: '1차 면접',
                startTime: '13:00',
                endTime: '14:00',
            },
            {
                name: '2차 면접',
                startTime: '14:00',
                endTime: '15:00',
            },
        ],
    },
    {
        date: '2025-07-12',
        interviewSets: [
            {
                name: '1차 면접',
                startTime: '10:00',
                endTime: '11:00',
            },
            {
                name: '최종 면접',
                startTime: '13:00',
                endTime: '14:30',
            },
        ],
    },
    {
        date: '2025-07-13',
        interviewSets: [
            {
                name: '2차 면접',
                startTime: '09:30',
                endTime: '10:30',
            },
        ],
    },
];

export const applicantList2: IntervieweeInformation[] = [
    {
        id: 1,
        name: '팥붕이',
        email: 'nickname@example.com',
        interviewDate: '2025-07-12',
        interviewName: '1차 면접',
    },
    {
        id: 2,
        name: '슈붕이',
        email: 'test@example.com',
        interviewDate: '2025-07-13',
        interviewName: '2차 면접',
    },
    {
        id: 3,
        name: '붕어빵',
        email: 'bbang@example.com',
        interviewDate: '2025-07-11',
        interviewName: '1차 면접',
    },
];

export const applicantDetails2: ApplicantDetail[] = [
    {
        id: 1,
        name: '팥붕이',
        email: 'nickname@example.com',
        studentId: '23000000',
        phone: '010-1234-5678',
    },
    {
        id: 2,
        name: '슈붕이',
        email: 'test@example.com',
        studentId: '20010501',
        phone: '010-2345-6789',
    },
    {
        id: 3,
        name: '붕어빵',
        email: 'bbang@example.com',
        studentId: '24000000',
        phone: '010-3456-7890',
    },
];

export const documents2: Document[] = [
    {
        id: 1,
        detail: [
            {
                question: 'Q1. 자기소개 부탁드립니다.',
                answer: 'ChatGPT는 자연어 처리 기반 인공지능으로, 다양한 주제에 대해 정보를 제공하고 대화를 나눌 수 있습니다. 질문에 답하거나, 글을 작성하고, 번역 및 코드 작성까지 지원합니다. 또한 데이터 분석, 소프트웨어 개발, 학습 보조 등 다양한 분야에서 도움을 줄 수 있습니다. 고객님의 개발 공부와 진로 탐색에도 유용한 조언을 제공하며, 맞춤형 답변으로 더욱 효과적인 학습을 도와드립니다. 😊 ChatGPT는 자연어 처리 기반 인공지능으로, 다양한 주제에 대해 정보를 제공하고 대화를 나눌 수 있습니다. 질문에 답하거나, 글을 작성하고, 번역 및 코드 작성까지 지원합니다. 또한 데이터 분석, 소프트웨어 개발, 학습 보조 등 다양한 분야에서 도움을 줄 수 있습니다. 고객님의 개발 공부와 진로 탐색에도 유용한 조언을 제공하며, 맞춤형 답변으로 더욱 효과적인 학습을 도와드립니다. 😊 ChatGPT는 자연어 처리 기반 인공지능으로, 다양한 주제에 대해 정보를 제공하고 대화를 나눌 수 있습니다. 질문에 답하거나, 글을 작성하고, 번역 및 코드 작성까지 지원합니다. 또한 데이터 분석, 소프트웨어 개발, 학습 보조 등 다양한 분야에서 도움을 줄 수 있습니다. 고객님의 개발 공부와 진로 탐색에도 유용한 조언을 제공하며, 맞춤형 답변으로 더욱 효과적인 학습을 도와드립니다. 😊 ChatGPT는 자연어 처리 기반 인공지능으로, 다양한 주제에 대해 정보를 제공하고 대화를 나눌 수 있습니다. 질문에 답하거나, 글을 작성하고, 번역 및 코드 작성까지 지원합니다. 또한 데이터 분석, 소프트웨어 개발, 학습 보조 등 다양한 분야에서 도움을 줄 수 있습니다. 고객님의 개발 공부와 진로 탐색에도 유용한 조언을 제공하며, 맞춤형 답변으로 더욱 효과적인 학습을 도와드립니다. 😊 ChatGPT는 자연어 처리 기반 인공지능으로, 다양한 주제에 대해 정보를 제공하고 대화를 나눌 수 있습니다. 질문에 답하거나, 글을 작성하고, 번역 및 코드 작성까지 지원합니다. 또한 데이터 분석, 소프트웨어 개발, 학습 보조 등 다양한 분야에서 도움을 줄 수 있습니다. 고객님의 개발 공부와 진로 탐색에도 유용한 조언을 제공하며, 맞춤형 답변으로 더욱 효과적인 학습을 도와드립니다. 😊',
            },
            {
                question: 'Q2. EN#에 지원한 이유는 무엇인가요?',
                answer: 'ChatGPT는 자연어 처리 기반 인공지능으로, 다양한 주제에 대해 정보를 제공하고 대화를 나눌 수 있습니다. 질문에 답하거나, 글을 작성하고, 번역 및 코드 작성까지 지원합니다. 또한 데이터 분석, 소프트웨어 개발, 학습 보조 등 다양한 분야에서 도움을 줄 수 있습니다. 고객님의 개발 공부와 진로 탐색에도 유용한 조언을 제공하며, 맞춤형 답변으로 더욱 효과적인 학습을 도와드립니다. 😊 ChatGPT는 자연어 처리 기반 인공지능으로, 다양한 주제에 대해 정보를 제공하고 대화를 나눌 수 있습니다. 질문에 답하거나, 글을 작성하고, 번역 및 코드 작성까지 지원합니다. 또한 데이터 분석, 소프트웨어 개발, 학습 보조 등 다양한 분야에서 도움을 줄 수 있습니다. 고객님의 개발 공부와 진로 탐색에도 유용한 조언을 제공하며, 맞춤형 답변으로 더욱 효과적인 학습을 도와드립니다. 😊 ChatGPT는 자연어 처리 기반 인공지능으로, 다양한 주제에 대해 정보를 제공하고 대화를 나눌 수 있습니다. 질문에 답하거나, 글을 작성하고, 번역 및 코드 작성까지 지원합니다. 또한 데이터 분석, 소프트웨어 개발, 학습 보조 등 다양한 분야에서 도움을 줄 수 있습니다. 고객님의 개발 공부와 진로 탐색에도 유용한 조언을 제공하며, 맞춤형 답변으로 더욱 효과적인 학습을 도와드립니다. 😊 ChatGPT는 자연어 처리 기반 인공지능으로, 다양한 주제에 대해 정보를 제공하고 대화를 나눌 수 있습니다. 질문에 답하거나, 글을 작성하고, 번역 및 코드 작성까지 지원합니다. 또한 데이터 분석, 소프트웨어 개발, 학습 보조 등 다양한 분야에서 도움을 줄 수 있습니다. 고객님의 개발 공부와 진로 탐색에도 유용한 조언을 제공하며, 맞춤형 답변으로 더욱 효과적인 학습을 도와드립니다. 😊 ChatGPT는 자연어 처리 기반 인공지능으로, 다양한 주제에 대해 정보를 제공하고 대화를 나눌 수 있습니다. 질문에 답하거나, 글을 작성하고, 번역 및 코드 작성까지 지원합니다. 또한 데이터 분석, 소프트웨어 개발, 학습 보조 등 다양한 분야에서 도움을 줄 수 있습니다. 고객님의 개발 공부와 진로 탐색에도 유용한 조언을 제공하며, 맞춤형 답변으로 더욱 효과적인 학습을 도와드립니다. 😊',
            },
            {
                question:
                    'Q3. 이전에 진행했었던 프로젝트에 대해서 설명해주세요. 없다면 앞으로 하고싶은 프로젝트에 대해 설명해주세요.',
                answer: 'ChatGPT는 자연어 처리 기반 인공지능으로, 다양한 주제에 대해 정보를 제공하고 대화를 나눌 수 있습니다. 질문에 답하거나, 글을 작성하고, 번역 및 코드 작성까지 지원합니다. 또한 데이터 분석, 소프트웨어 개발, 학습 보조 등 다양한 분야에서 도움을 줄 수 있습니다. 고객님의 개발 공부와 진로 탐색에도 유용한 조언을 제공하며, 맞춤형 답변으로 더욱 효과적인 학습을 도와드립니다. 😊 ChatGPT는 자연어 처리 기반 인공지능으로, 다양한 주제에 대해 정보를 제공하고 대화를 나눌 수 있습니다. 질문에 답하거나, 글을 작성하고, 번역 및 코드 작성까지 지원합니다. 또한 데이터 분석, 소프트웨어 개발, 학습 보조 등 다양한 분야에서 도움을 줄 수 있습니다. 고객님의 개발 공부와 진로 탐색에도 유용한 조언을 제공하며, 맞춤형 답변으로 더욱 효과적인 학습을 도와드립니다. 😊 ChatGPT는 자연어 처리 기반 인공지능으로, 다양한 주제에 대해 정보를 제공하고 대화를 나눌 수 있습니다. 질문에 답하거나, 글을 작성하고, 번역 및 코드 작성까지 지원합니다. 또한 데이터 분석, 소프트웨어 개발, 학습 보조 등 다양한 분야에서 도움을 줄 수 있습니다. 고객님의 개발 공부와 진로 탐색에도 유용한 조언을 제공하며, 맞춤형 답변으로 더욱 효과적인 학습을 도와드립니다. 😊 ChatGPT는 자연어 처리 기반 인공지능으로, 다양한 주제에 대해 정보를 제공하고 대화를 나눌 수 있습니다. 질문에 답하거나, 글을 작성하고, 번역 및 코드 작성까지 지원합니다. 또한 데이터 분석, 소프트웨어 개발, 학습 보조 등 다양한 분야에서 도움을 줄 수 있습니다. 고객님의 개발 공부와 진로 탐색에도 유용한 조언을 제공하며, 맞춤형 답변으로 더욱 효과적인 학습을 도와드립니다. 😊 ChatGPT는 자연어 처리 기반 인공지능으로, 다양한 주제에 대해 정보를 제공하고 대화를 나눌 수 있습니다. 질문에 답하거나, 글을 작성하고, 번역 및 코드 작성까지 지원합니다. 또한 데이터 분석, 소프트웨어 개발, 학습 보조 등 다양한 분야에서 도움을 줄 수 있습니다. 고객님의 개발 공부와 진로 탐색에도 유용한 조언을 제공하며, 맞춤형 답변으로 더욱 효과적인 학습을 도와드립니다. 😊',
            },
        ],
    },
    {
        id: 2,
        detail: [
            {
                question: 'Q1. 자기소개 부탁드립니다.',
                answer: 'ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ',
            },
            {
                question: 'Q2. 자기소개 부탁드립니다.',
                answer: 'ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ',
            },
            {
                question: 'Q3. 자기소개 부탁드립니다.',
                answer: 'ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ',
            },
        ],
    },
    {
        id: 3,
        detail: [
            {
                question: 'Q1. 자기소개 부탁드립니다.',
                answer: 'ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ',
            },
            {
                question: 'Q2. 자기소개 부탁드립니다.',
                answer: 'ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ',
            },
            {
                question: 'Q3. 자기소개 부탁드립니다.',
                answer: 'ㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ',
            },
        ],
    },
];

export const evaluations2: Evaluation[] = [
    {
        applicantId: 1,
        averageScore: 4.5,
        comments: [
            { evaluator: '조준희', comment: '매우 성실한 태도였습니다.' },
            { evaluator: '조존히', comment: '답변이 구체적이고 논리적이었습니다.' },
        ],
    },
    {
        applicantId: 2,
        averageScore: 3.8,
        comments: [
            { evaluator: '준', comment: '조금 긴장한 듯 보였습니다.' },
            { evaluator: 'aiming희', comment: '기본기는 잘 갖추고 있었음.' },
        ],
    },
    {
        applicantId: 3,
        averageScore: 4.2,
        comments: [
            { evaluator: '몰라희', comment: '차분하고 준비된 모습이 인상적이었어요.' },
            { evaluator: '그냥희', comment: '팀워크 질문에서 좋은 답변을 들었어요.' },
        ],
    },
];

function InterviewEvaluationPage() {
    const [selectedApplicantId, setSelectedApplicantId] = useState<number | null>(1);

    return (
        <div css={s_interviewInformationPageContainer}>
            <div css={s_selectionContainer}>
                <IntervieweeList
                    intervieweeList={applicantList2}
                    interviewSchedules={interviewSchedules}
                    selectedApplicantId={selectedApplicantId}
                    onSelectApplicant={setSelectedApplicantId}
                />
            </div>
            <div css={s_informationAndEvaluationContainer}>
                <div css={s_informationBoxWrapper}>
                    <InformationBox
                        applicant={
                            applicantDetails2.find(
                                (applicant) => applicant.id === selectedApplicantId,
                            ) ?? null
                        }
                        documentList={
                            documents2.find((document) => document.id === selectedApplicantId) ??
                            null
                        }
                    />
                </div>
                <div css={s_evaluationBoxWrapper}>
                    <EvaluationBox
                        evaluation={
                            evaluations2.find(
                                (evaluation) => evaluation.applicantId === selectedApplicantId,
                            ) ?? null
                        }
                    />
                </div>
            </div>
        </div>
    );
}

export { InterviewEvaluationPage };
