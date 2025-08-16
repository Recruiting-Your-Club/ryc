import type {
    ApplicantForInterviewSlot,
    ApplicantReservedInterview,
} from '@api/domain/interview/types';
import type { StepApplicant } from '@api/domain/step/types';
import { applicantQueries, evaluationQueries, interviewQueries } from '@api/queryFactory';
import { EvaluationBox, InformationBox, IntervieweeList } from '@components';
import type { EnrichedInterviewee } from '@components/IntervieweeList/types';
import { useEvaluation } from '@hooks/components';
import {
    ANNOUNCEMENT_ID,
    CLUB_ID,
    INITIAL_EVALUATION_SUMMARY,
} from '@pages/DocumentEvaluationPage';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import React, { useEffect, useMemo, useState } from 'react';

import { useToast } from '@ssoc/ui';

import {
    s_evaluationBoxWrapper,
    s_informationAndEvaluationContainer,
    s_informationBoxWrapper,
    s_interviewInformationPageContainer,
    s_selectionContainer,
} from './InterviewEvaluationPage.style';

function InterviewEvaluationPage() {
    // prop destruction
    // lib hooks
    const { toast } = useToast();

    // initial values
    // state, ref, querystring hooks
    const [selectedApplicant, setSelectedApplicant] = useState<StepApplicant | null>(null);
    const [slotId, setSlotId] = useState<string | null>(null);

    // form hooks
    // query hooks
    const { data: interviewSlots = [] } = useSuspenseQuery(
        interviewQueries.interviewSlot(ANNOUNCEMENT_ID, CLUB_ID),
    );
    const { data: slotApplicants } = useQuery({
        ...interviewQueries.interviewInformation(ANNOUNCEMENT_ID, slotId ?? '', CLUB_ID),
        enabled: !!slotId && slotId !== '',
    });
    const { data: applicantDocument } = useQuery({
        ...applicantQueries.getApplicantDocument(
            ANNOUNCEMENT_ID,
            selectedApplicant?.applicantId ?? '',
            CLUB_ID,
        ),
        enabled: !!selectedApplicant?.applicantId,
    });
    const { data: interviewEvaluationDetail } = useQuery({
        ...evaluationQueries.evaluationDetail({
            clubId: CLUB_ID,
            applicantIdList: selectedApplicant ? [selectedApplicant.applicantId] : [],
            type: 'interview',
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

    const { handlePostComment, handleUpdateComment, handleDeleteComment } = useEvaluation(
        'interview',
        selectedApplicant?.applicantId ?? '',
        getEvaluationActionCallbacks,
    );

    // calculated values
    const finalIntervieweeList: EnrichedInterviewee[] = useMemo(() => {
        if (!slotApplicants) return [];

        return slotApplicants.interviewReservations
            .map((applicant) => {
                const matchedSlot = interviewSlots.find(
                    (slot) => slot.id === slotApplicants.interviewSlotId,
                );

                if (!matchedSlot) return null;

                return {
                    applicantId: applicant.applicantId,
                    name: applicant.applicantName,
                    email: applicant.applicantEmail,
                    status: 'INTERVIEW_PASS',
                    submittedAt: '',
                    interviewDate: dayjs(matchedSlot.period.startDate).format('YYYY-MM-DD'),
                    interviewName: matchedSlot.id,
                    startTime: dayjs(matchedSlot.period.startDate).format('HH:mm'),
                    endTime: dayjs(matchedSlot.period.endDate).format('HH:mm'),
                };
            })
            .filter((item): item is EnrichedInterviewee => item !== null);
    }, [slotApplicants, interviewSlots]);

    // handlers
    const handleSelectApplicantId = (applicantId: string) => {
        if (!slotApplicants) return;

        const foundApplicant = toStepApplicants(slotApplicants.interviewReservations).find(
            (applicant) => applicant.applicantId === applicantId,
        );

        if (foundApplicant) {
            setSelectedApplicant(foundApplicant);
        }
    };

    // effects
    useEffect(() => {
        if (slotId === null && interviewSlots.length > 0) {
            setSlotId(interviewSlots[0].id ?? '');
        }
    }, [interviewSlots]);

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

    const toStepApplicants = (
        interviewees: ApplicantReservedInterview[] | ApplicantForInterviewSlot[],
    ): StepApplicant[] => {
        return interviewees.map(({ applicantId, applicantName, applicantEmail }) => ({
            applicantId,
            name: applicantName,
            email: applicantEmail,
            status: 'INTERVIEW_PASS',
            submittedAt: '',
        }));
    };

    return (
        <div css={s_interviewInformationPageContainer}>
            <div css={s_selectionContainer}>
                <IntervieweeList
                    intervieweeList={finalIntervieweeList}
                    interviewSlots={interviewSlots}
                    selectedApplicantId={selectedApplicant?.applicantId ?? null}
                    onSelectApplicantId={handleSelectApplicantId}
                    onInterviewSlotId={setSlotId}
                />
            </div>
            <div css={s_informationAndEvaluationContainer}>
                <div css={s_informationBoxWrapper}>
                    <InformationBox
                        personalInformation={applicantDocument?.personalInfos ?? []}
                        preQuestionAnswers={applicantDocument?.preQuestionAnswers ?? []}
                        applicationQuestionAnswers={
                            applicantDocument?.applicationQuestionAnswers ?? []
                        }
                    />
                </div>
                <div css={s_evaluationBoxWrapper}>
                    <EvaluationBox
                        selectedApplicantId={selectedApplicant?.applicantId ?? null}
                        evaluation={
                            interviewEvaluationDetail?.evaluationsOfApplicants?.find(
                                (evaluation) =>
                                    evaluation.applicantId ===
                                    (selectedApplicant?.applicantId ?? ''),
                            ) ?? INITIAL_EVALUATION_SUMMARY
                        }
                        onPostComment={handlePostComment}
                        onDeleteComment={handleDeleteComment}
                        onUpdateComment={handleUpdateComment}
                    />
                </div>
            </div>
        </div>
    );
}

export { InterviewEvaluationPage };
