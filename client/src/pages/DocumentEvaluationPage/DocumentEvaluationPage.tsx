import { ApplicantList, ApplicantMiniCard, EvaluationBox, InformationBox, Text } from '@components';
import type { ApplicantSummary } from '@components/ApplicantMiniCard/types';
import type { Evaluation } from '@components/EvaluationBox/types';
import type { ApplicantDetail, Document } from '@components/InformationBox/types';
import React, { useState } from 'react';
import {
    documentEvaluationPageContainer,
    evaluationContainer,
    informationContainer,
    listContainer,
} from './DocumentEvaluationPage.style';

export const applicantList: ApplicantSummary[] = [
    { id: 1, name: '팥붕이', email: 'nickname@example.com' },
    { id: 2, name: '슈붕이', email: 'test@example.com' },
    { id: 3, name: '붕어빵', email: 'bbang@example.com' },
];

export const applicantDetails: ApplicantDetail[] = [
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

export const documents: Document[] = [
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

export const evaluations: Evaluation[] = [
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

function DocumentEvaluationPage() {
    // prop destruction
    // lib hooks
    // initial values
    // state, ref, querystring hooks
    const [selectedApplicantId, setSelectedApplicantId] = useState<number | null>(1);

    // form hooks
    // query hooks
    // calculated values
    // handlers
    // effects
    return (
        <div css={documentEvaluationPageContainer}>
            <div css={listContainer}>
                <ApplicantList isList={applicantList.length !== 0}>
                    {applicantList.length > 0 ? (
                        applicantList.map((applicant) => (
                            <ApplicantMiniCard
                                key={applicant.id}
                                applicant={applicant}
                                onClick={() => setSelectedApplicantId(applicant.id)}
                                isActivated={selectedApplicantId === applicant.id}
                            />
                        ))
                    ) : (
                        <Text as="span" type="captionSemibold">
                            지원자가 없습니다.
                        </Text>
                    )}
                </ApplicantList>
            </div>
            <div css={informationContainer}>
                <InformationBox
                    applicant={
                        applicantDetails.find(
                            (applicant) => applicant.id === selectedApplicantId,
                        ) ?? null
                    }
                    documentList={
                        documents.find((document) => document.id === selectedApplicantId) ?? null
                    }
                />
            </div>
            <div css={evaluationContainer}>
                <EvaluationBox
                    evaluation={
                        evaluations.find(
                            (evaluation) => evaluation.applicantId === selectedApplicantId,
                        ) ?? null
                    }
                />
            </div>
        </div>
    );
}

export { DocumentEvaluationPage };
