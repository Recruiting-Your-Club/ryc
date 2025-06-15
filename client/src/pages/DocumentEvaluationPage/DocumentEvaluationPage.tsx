import { ApplicantList, ApplicantMiniCard, EvaluationBox, InformationBox } from '@components';
import type { ApplicantSummary } from '@components/ApplicantMiniCard/types';
import type { Evaluation } from '@components/EvaluationBox/types';
import type { ApplicantDetail } from '@components/InformationBox/types';
import React, { useState } from 'react';
import {
    documentEvaluationPageContainer,
    evaluationContainer,
    informationContainer,
    listContainer,
    miniCardGroup,
} from './DocumentEvaluation.style';

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
                <ApplicantList>
                    <div css={miniCardGroup}>
                        {applicantList.map((applicant) => (
                            <ApplicantMiniCard
                                key={applicant.id}
                                applicant={applicant}
                                onClick={() => setSelectedApplicantId(applicant.id)}
                                isActivated={selectedApplicantId === applicant.id}
                            />
                        ))}
                    </div>
                </ApplicantList>
            </div>
            <div css={informationContainer}>
                <InformationBox
                    applicant={
                        applicantDetails.find(
                            (applicant) => applicant.id === selectedApplicantId,
                        ) ?? null
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
