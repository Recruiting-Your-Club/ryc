import type { StepApplicant } from '@api/domain/step/types';
import { applicantQueries, evaluationQueries } from '@api/queryFactory';
import { stepQueries } from '@api/queryFactory/stepQueries';
import { ApplicantList, EvaluationBox, InformationBox } from '@components';
import { INITIAL_EVALUATION_SUMMARY } from '@constants/evaluationPage';
import { useEvaluation } from '@hooks/components';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useToast } from '@ssoc/ui';

import {
    documentEvaluationPageContainer,
    evaluationContainer,
    informationContainer,
    listContainer,
} from './DocumentEvaluationPage.style';

function DocumentEvaluationPage() {
    // prop destruction
    // lib hooks
    const { toast } = useToast();
    const { clubId, announcementId } = useParams();

    // initial values
    // state, ref, querystring hooks
    const [selectedApplicant, setSelectedApplicant] = useState<StepApplicant | null>(null);

    // form hooks
    // query hooks
    const { data: stepApplicantList = [] } = useSuspenseQuery(
        stepQueries.allStepApplicants(announcementId!, clubId!),
    );
    const { data: applicantDocument } = useQuery({
        ...applicantQueries.getApplicantDocument(
            announcementId!,
            selectedApplicant?.applicantId ?? '',
            clubId!,
        ),

        enabled: !!selectedApplicant?.applicantId,
    });
    const { data: documentEvaluationDetail } = useQuery({
        ...evaluationQueries.evaluationDetail({
            clubId: clubId!,
            applicantIdList: selectedApplicant ? [selectedApplicant.applicantId] : [],
            type: 'application',
        }),
        enabled:
            !!selectedApplicant &&
            [
                'DOCUMENT_PENDING',
                'DOCUMENT_FAIL',
                'INTERVIEW_PENDING',
                'INTERVIEW_FAIL',
                'FINAL_PASS',
                'FINAL_FAIL',
            ].includes(selectedApplicant.status),
    });
    const { data: myDocumentEvaluationStatus } = useSuspenseQuery(
        evaluationQueries.myEvaluationStatus({ clubId: clubId!, type: 'application' }),
    );

    const { handlePostComment, handleUpdateComment, handleDeleteComment } = useEvaluation(
        'application',
        selectedApplicant?.applicantId ?? '',
        getEvaluationActionCallbacks,
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

    // effects
    useEffect(() => {
        if (selectedApplicant === null && stepApplicantList.length > 0)
            setSelectedApplicant(stepApplicantList[0]);
    }, [stepApplicantList, selectedApplicant]);

    // etc
    function getEvaluationActionCallbacks(status: string) {
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
    }

    return (
        <div css={documentEvaluationPageContainer}>
            <div css={listContainer}>
                <ApplicantList
                    applicantList={stepApplicantList}
                    selectedApplicantId={selectedApplicant?.applicantId ?? null}
                    onSelectApplicantId={handleSelectApplicantId}
                    myEvaluationStatusList={myDocumentEvaluationStatus} // 몰라
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
                    clubId={clubId!}
                    selectedApplicantId={selectedApplicant?.applicantId ?? null}
                    evaluation={
                        documentEvaluationDetail?.evaluationsOfApplicants?.find(
                            (evaluation) =>
                                evaluation.applicantId === (selectedApplicant?.applicantId ?? ''),
                        ) ?? INITIAL_EVALUATION_SUMMARY
                    }
                    onPostComment={handlePostComment}
                    onDeleteComment={handleDeleteComment}
                    onUpdateComment={handleUpdateComment}
                />
            </div>
        </div>
    );
}

export default DocumentEvaluationPage;
