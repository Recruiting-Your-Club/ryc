import type { EvaluationDataWithSummary } from '@api/domain/evaluation/types';
import type { StepApplicant } from '@api/domain/step/types';
import { applicantQueries, evaluationQueries } from '@api/queryFactory';
import { stepQueries } from '@api/queryFactory/stepQueries';
import { ApplicantList, EvaluationBox, InformationBox } from '@components';
import { evaluationMutations } from '@hooks/mutations/evaluationMutations';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';

import { useToast } from '@ssoc/ui';

import {
    documentEvaluationPageContainer,
    evaluationContainer,
    informationContainer,
    listContainer,
} from './DocumentEvaluationPage.style';

export const CLUB_ID = '69cab5c5-c2ff-4bcf-8048-9307c214e566-42';
export const ANNOUNCEMENT_ID = 'd3f1c5e2-8a90-4b6c-9c45-6d2a1c8e5d3f';
export const INITIAL_EVALUATION_SUMMARY: EvaluationDataWithSummary = {
    completedEvaluatorCount: 0,
    totalEvaluatorCount: 0,
    averageScore: 0,
    evaluationDatas: [],
};

function DocumentEvaluationPage() {
    // prop destruction
    // lib hooks
    const { toast } = useToast();
    // initial values
    // state, ref, querystring hooks
    const [selectedApplicant, setSelectedApplicant] = useState<StepApplicant | null>(null);

    // form hooks
    // query hooks
    const { data: stepApplicantList = [] } = useSuspenseQuery(
        stepQueries.allStepApplicants(ANNOUNCEMENT_ID, CLUB_ID),
    );
    const { data: applicantDocument } = useQuery({
        ...applicantQueries.getApplicantDocument(
            ANNOUNCEMENT_ID,
            selectedApplicant?.applicantId ?? '',
            CLUB_ID,
        ),

        enabled: !!selectedApplicant?.applicantId,
    });
    const { data: documentEvaluationDetail } = useQuery({
        ...evaluationQueries.evaluationDetail({
            clubId: CLUB_ID,
            applicantIdList: selectedApplicant ? [selectedApplicant.applicantId] : [],
            type: 'application',
        }),
        enabled:
            !!selectedApplicant &&
            [
                'DOCUMENT_PASS',
                'DOCUMENT_FAIL',
                'INTERVIEW_PASS',
                'INTERVIEW_FAIL',
                'FINAL_PASS',
                'FINAL_FAIL',
            ].includes(selectedApplicant.status),
    });

    const { mutate: postApplicationComment } = evaluationMutations.usePostPersonalEvaluation();
    const { mutate: updateComment } = evaluationMutations.usePutEvaluation(
        selectedApplicant?.applicantId ?? '',
    );
    const { mutate: deleteComment } = evaluationMutations.useDeleteEvaluation(
        selectedApplicant?.applicantId ?? '',
    );

    // calculated values
    // handlers
    const handleSelectApplicantId = (applicantId: string) => {
        const foundApplicant = stepApplicantList.find(
            (applicant) => applicant.applicantId === applicantId,
        );
        if (foundApplicant) {
            setSelectedApplicant(foundApplicant);
        }
    };

    const handlePostComment = (
        applicantId: string,
        score: number,
        comment: string,
        clubId: string,
    ) => {
        postApplicationComment(
            { applicantId, score, comment, clubId, type: 'application' },
            getEvaluationActionCallbacks('등록'),
        );
    };

    const handleUpdateComment = (
        evaluationId: string,
        score: number,
        comment: string,
        clubId: string,
    ) => {
        updateComment(
            { evaluationId, score, comment, clubId, type: 'application' },
            getEvaluationActionCallbacks('수정'),
        );
    };

    const handleDeleteComment = (evaluationId: string, clubId: string) => {
        deleteComment(
            { evaluationId, clubId, type: 'application' },
            getEvaluationActionCallbacks('삭제'),
        );
    };

    // effects
    useEffect(() => {
        if (selectedApplicant === null && stepApplicantList.length > 0)
            setSelectedApplicant(stepApplicantList[0]);
    }, [stepApplicantList, selectedApplicant]);

    // etc
    const getEvaluationActionCallbacks = (status: string) => {
        return {
            onSuccess: () => {
                toast(`작성하신 평가가 ${status}되었어요!`, {
                    type: 'success',
                    toastTheme: 'colored',
                });
            },
            onError: () => {
                toast(`평가 ${status}에 실패했어요. 잠시 후 다시 시도해주세요!`, {
                    type: 'error',
                    toastTheme: 'colored',
                });
            },
        };
    };

    return (
        <div css={documentEvaluationPageContainer}>
            <div css={listContainer}>
                <ApplicantList
                    applicantList={stepApplicantList}
                    selectedApplicantId={selectedApplicant?.applicantId ?? null}
                    onSelectApplicantId={handleSelectApplicantId}
                />
            </div>
            <div css={informationContainer}>
                <InformationBox
                    personalInformation={applicantDocument?.personalInfos ?? []}
                    preQuestionAnswers={applicantDocument?.preQuestionAnswers ?? []}
                    applicationQuestionAnswers={applicantDocument?.applicationQuestionAnswers ?? []}
                />
            </div>
            <div css={evaluationContainer}>
                <EvaluationBox
                    selectedApplicantId={selectedApplicant?.applicantId ?? null}
                    evaluation={
                        documentEvaluationDetail?.evaluationsByApplicant?.[
                            selectedApplicant?.applicantId ?? ''
                        ] ?? INITIAL_EVALUATION_SUMMARY
                    }
                    onPostComment={handlePostComment}
                    onDeleteComment={handleDeleteComment}
                    onUpdateComment={handleUpdateComment}
                />
            </div>
        </div>
    );
}

export { DocumentEvaluationPage };
