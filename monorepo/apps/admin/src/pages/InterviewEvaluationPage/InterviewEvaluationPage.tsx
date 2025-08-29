import type { InterviewApplicant, UnreservedApplicant } from '@api/domain/interview/types';
import type { StepApplicant } from '@api/domain/step/types';
import { applicantQueries, evaluationQueries, interviewQueries } from '@api/queryFactory';
import { ErrorDialog, EvaluationBox, InformationBox, IntervieweeList } from '@components';
import type { EnrichedInterviewee } from '@components/IntervieweeList/types';
import { INITIAL_EVALUATION_SUMMARY } from '@constants/evaluationPage';
import { useEvaluation } from '@hooks/components';
import type { ErrorWithStatusCode } from '@pages/ErrorFallbackPage/types';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { getErrorMessage } from '@utils/getErrorMessage';
import dayjs from 'dayjs';
import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

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
    const { clubId, announcementId } = useParams();

    // initial values
    // state, ref, querystring hooks
    const [selectedApplicant, setSelectedApplicant] = useState<StepApplicant | null>(null);
    const [slotId, setSlotId] = useState<string | null>(null);
    const [errorDialogOpen, setErrorDialogOpen] = useState<boolean>(false);

    // form hooks
    // query hooks
    const { data: interviewSlots = [] } = useSuspenseQuery(
        interviewQueries.interviewSlot(announcementId!, clubId!),
    );
    const { data: slotApplicants } = useQuery({
        ...interviewQueries.interviewInformation(announcementId!, slotId ?? '', clubId!),
        enabled: !!slotId && slotId !== '',
        throwOnError: true,
    });
    const { data: applicantDocument } = useQuery({
        ...applicantQueries.getApplicantDocument(
            announcementId!,
            selectedApplicant?.applicantId ?? '',
            clubId!,
        ),
        enabled: !!selectedApplicant?.applicantId,
        throwOnError: true,
    });
    const { data: interviewEvaluationDetail } = useQuery({
        ...evaluationQueries.evaluationDetail({
            clubId: clubId!,
            applicantIdList: selectedApplicant ? [selectedApplicant.applicantId] : [],
            type: 'interview',
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
        throwOnError: true,
    });

    const { handlePostComment, handleUpdateComment, handleDeleteComment } = useEvaluation(
        'interview',
        selectedApplicant?.applicantId ?? '',
        getEvaluationActionCallbacks,
    );

    // calculated values
    const finalIntervieweeList: EnrichedInterviewee[] = useMemo(() => {
        if (!slotApplicants) return [];

        return slotApplicants
            .map((applicant) => {
                const matchedSlot = interviewSlots.find((slot) => slot.id === slotId);

                if (!matchedSlot) return null;

                return {
                    applicantId: applicant.applicantSummary.applicantId,
                    name: applicant.applicantSummary.applicantName,
                    email: applicant.applicantSummary.applicantEmail,
                    imageAllowed: Boolean(applicant.applicantSummary.imageResponse),
                    imagePresent: Boolean(applicant.applicantSummary.imageResponse),
                    status: 'INTERVIEW_PENDING',
                    submittedAt: '',
                    representativeImage: applicant.applicantSummary.imageResponse,
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

        const foundApplicant = toStepApplicants(slotApplicants).find(
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
            onError: (error: ErrorWithStatusCode) => {
                if (error.statusCode === 500) {
                    setErrorDialogOpen(true);
                } else if (error.response?.errors[0].message || error.message) {
                    toast(getErrorMessage(error), { type: 'error', toastTheme: 'colored' });
                } else {
                    toast(`평가 ${status}에 실패했어요. 잠시 후 다시 시도해주세요!`, {
                        type: 'error',
                        toastTheme: 'colored',
                    });
                }
            },
        };
    }

    const getApplicantInformation = (applicant: InterviewApplicant | UnreservedApplicant) => {
        if ('applicantSummary' in applicant) {
            return {
                applicantId: applicant.applicantSummary.applicantId,
                applicantName: applicant.applicantSummary.applicantName,
                applicantEmail: applicant.applicantSummary.applicantEmail,
                imageResponse: applicant.applicantSummary.imageResponse,
            };
        }
        return {
            applicantId: applicant.applicantId,
            applicantName: applicant.applicantName,
            applicantEmail: applicant.applicantEmail,
            imageResponse: applicant.imageResponse,
        };
    };

    const toStepApplicants = (
        interviewees: InterviewApplicant[] | UnreservedApplicant[],
    ): StepApplicant[] => {
        if (!Array.isArray(interviewees)) return [];

        return interviewees.map((applicant) => {
            const { applicantId, applicantName, applicantEmail, imageResponse } =
                getApplicantInformation(applicant);

            return {
                applicantId,
                name: applicantName,
                email: applicantEmail,
                status: 'INTERVIEW_PENDING',
                submittedAt: '',
                imageAllowed: Boolean(imageResponse),
                imagePresent: Boolean(imageResponse),
                representativeImage: imageResponse ?? null,
            };
        });
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
                        profileImage={
                            applicantDocument?.profileImage ?? {
                                id: '',
                                originalFileName: '',
                                url: '',
                                contentType: '',
                            }
                        }
                        personalInformation={applicantDocument?.personalInfos ?? []}
                        preQuestionAnswers={applicantDocument?.preQuestionAnswers ?? []}
                        applicationQuestionAnswers={
                            applicantDocument?.applicationQuestionAnswers ?? []
                        }
                    />
                </div>
                <div css={s_evaluationBoxWrapper}>
                    <EvaluationBox
                        clubId={clubId!}
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
            <ErrorDialog
                open={errorDialogOpen}
                handleClose={() => setErrorDialogOpen(false)}
                errorStatusCode={500}
            />
        </div>
    );
}

export default InterviewEvaluationPage;
