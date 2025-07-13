import { Applicant, ApplicantDetail, Document } from '@api/domain/applicant/types';
import { applicantMutations } from '@api/mutationFactory/applicantMutations';
import { applicantQueries } from '@api/queryFactory';
import { ApplicantList, EvaluationBox, InformationBox } from '@components';
import { useSuspenseQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import {
    documentEvaluationPageContainer,
    evaluationContainer,
    informationContainer,
    listContainer,
} from './DocumentEvaluationPage.style';

export const applicantList: Applicant[] = [
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
        applicantId: 1,
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
        applicantId: 2,
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
        applicantId: 3,
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

function DocumentEvaluationPage() {
    // prop destruction
    // lib hooks
    // initial values

    // state, ref, querystring hooks
    const [selectedApplicantId, setSelectedApplicantId] = useState<number>(1);

    // form hooks
    // query hooks
    const { data: applicantList = [] } = useSuspenseQuery(applicantQueries.allApplicants());
    const { data: applicantDetail } = useSuspenseQuery(
        applicantQueries.getApplicantDetail(selectedApplicantId),
    );
    const { data: document } = useSuspenseQuery(applicantQueries.getDocument(selectedApplicantId));
    const { data: evaluation } = useSuspenseQuery(
        applicantQueries.getDocumentEvaluation(selectedApplicantId),
    );
    const { mutate: postComment } = applicantMutations.usePostDocumentEvaluation();
    const { mutate: deleteComment } = applicantMutations.useDeleteDocumentEvaluation();
    const { mutate: updateComment } = applicantMutations.useUpdateDocumentEvaluation();

    // calculated values
    // handlers
    // effects
    return (
        <div css={documentEvaluationPageContainer}>
            <div css={listContainer}>
                <ApplicantList
                    applicantList={applicantList}
                    selectedApplicantId={selectedApplicantId}
                    onSelectApplicantId={setSelectedApplicantId}
                />
            </div>
            <div css={informationContainer}>
                <InformationBox applicant={applicantDetail} document={document} />
            </div>
            <div css={evaluationContainer}>
                <EvaluationBox
                    evaluation={evaluation}
                    onPostComment={postComment}
                    onDeleteComment={deleteComment}
                    onUpdateComment={updateComment}
                />
            </div>
        </div>
    );
}

export { DocumentEvaluationPage };
