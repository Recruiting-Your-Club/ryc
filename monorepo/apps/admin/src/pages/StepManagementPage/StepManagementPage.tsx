import type { InterviewDetailInformation } from '@api/domain/email/types';
import type { EvaluationDetailWithSummary } from '@api/domain/evaluation/types';
import type { StepApplicantWithoutImage } from '@api/domain/step/types';
import { useStepMutations } from '@api/hooks';
import { useEmailMutations } from '@api/hooks/useEmailMutations';
import {
    applicantQueries,
    evaluationQueries,
    interviewQueries,
    stepQueries,
} from '@api/queryFactory';
import { stepKeys } from '@api/querykeyFactory';
import Search from '@assets/images/search.svg';
import {
    ApplicantDialog,
    CardBox,
    ErrorDialog,
    InterviewEmailDialog,
    InterviewSettingDialog,
    PlainEmailDialog,
} from '@components';
import {
    DOCUMENT_STEP,
    FINAL_STEP_IN_THREE,
    FINAL_STEP_IN_TWO,
    INTERVIEW_STEP,
} from '@constants/stepManagementPage';
import type { ErrorWithStatusCode } from '@pages/ErrorFallbackPage/types';
import { useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { getErrorMessage } from '@utils/getErrorMessage';
import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ConfirmDialog, useToast } from '@ssoc/ui';
import { Button, Input } from '@ssoc/ui';

import {
    s_input,
    s_searchBarContainer,
    s_searchSvgButton,
    s_stepBoxContainer,
    s_stepManagementPageContainer,
    s_topContainer,
} from './StepManagementPage.style';
import {
    getEvaluations,
    groupStepApplicants,
    mergeApplicantWithSummary,
} from './utils/stepApplicant';

function StepManagementPage() {
    // prop destruction
    // lib hooks
    const { toast } = useToast();
    const { announcementId, clubId } = useParams();
    // initial values
    let hasError: boolean = false;

    // state, ref, querystring hooks
    const [selectedApplicant, setSelectedApplicant] = useState<StepApplicantWithoutImage | null>(
        null,
    );
    const [searchText, setSearchText] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isEmailOpen, setIsEmailOpen] = useState<boolean>(false);
    const [isInterviewOpen, setIsInterviewOpen] = useState<boolean>(true);
    const [emailTargetList, setEmailTargetList] = useState<string[]>([]);
    const [errorDialogOpen, setErrorDialogOpen] = useState<boolean>(false);
    const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);

    // form hooks
    // query hooks
    const queryClient = useQueryClient();
    const { data: totalSteps = { processes: [] } } = useSuspenseQuery(
        stepQueries.getTotalSteps(announcementId!),
    );
    const { data: stepApplicantList = [] } = useSuspenseQuery(
        stepQueries.allStepApplicants(announcementId!, clubId!),
    );

    const { mutate: updateStatus } = useStepMutations.useUpdateStepApplicantStatus();
    const { data: applicantDocument } = useQuery({
        ...applicantQueries.getApplicantDocument(
            announcementId!,
            selectedApplicant?.applicantId ?? '',
            clubId!,
        ),

        enabled: !!selectedApplicant?.applicantId,
        throwOnError: true,
    });

    const { mutateAsync: sendPlainEmail } = useEmailMutations.usePostPlainEmail(() => setIsOpen);
    const { mutateAsync: sendInterviewEmail } = useEmailMutations.usePostInterviewEmail(
        () => setIsInterviewOpen,
    );

    const { data: interviewSlots = [] } = useSuspenseQuery(
        interviewQueries.interviewSlot(announcementId!, clubId!),
    );

    // calculated values
    const isThreeStepProcess = totalSteps?.processes?.length === 3;

    const documentStepApplicants = stepApplicantList.filter(
        (applicant) =>
            ['DOCUMENT_PENDING', 'DOCUMENT_FAIL'].includes(applicant.status) ||
            (!isThreeStepProcess && ['FINAL_PASS', 'FINAL_FAIL'].includes(applicant.status)),
    );
    const interviewStepApplicants = stepApplicantList.filter((applicant) =>
        ['INTERVIEW_PENDING', 'INTERVIEW_FAIL', 'FINAL_PASS', 'FINAL_FAIL'].includes(
            applicant.status,
        ),
    );

    const documentApplicantIds =
        documentStepApplicants.map((applicant) => applicant.applicantId) ?? [];
    const interviewApplicantIds =
        interviewStepApplicants.map((applicant) => applicant.applicantId) ?? [];

    const { data: documentEvaluationSummaryList } = useQuery({
        ...evaluationQueries.evaluationSummary({
            clubId: clubId!,
            applicantIdList: documentApplicantIds,
            type: 'application',
        }),
        enabled: documentApplicantIds.length > 0,
        throwOnError: true,
    });
    const { data: interviewEvaluationSummaryList } = useQuery({
        ...evaluationQueries.evaluationSummary({
            clubId: clubId!,
            applicantIdList: interviewApplicantIds,
            type: 'interview',
        }),
        enabled: interviewApplicantIds.length > 0,
        throwOnError: true,
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
            ['INTERVIEW_PENDING', 'INTERVIEW_FAIL', 'FINAL_PASS', 'FINAL_FAIL'].includes(
                selectedApplicant.status,
            ),
        throwOnError: true,
    });

    const statusLabel = isThreeStepProcess
        ? [
              { label: '서류', status: 'DOCUMENT_PENDING' },
              { label: '면접 평가', status: 'INTERVIEW_PENDING' },
              { label: '최종', status: 'FINAL_PASS' },
          ]
        : [
              { label: '지원서 접수', status: 'DOCUMENT_PENDING' },
              { label: '최종', status: 'FINAL_PASS' },
          ];

    const statusInOwnStep = isThreeStepProcess
        ? [
              { pass: 'DOCUMENT_PENDING', fail: 'DOCUMENT_FAIL' },
              { pass: 'INTERVIEW_PENDING', fail: 'INTERVIEW_FAIL' },
              { pass: 'FINAL_PASS', fail: 'FINAL_FAIL' },
          ]
        : [
              { pass: 'DOCUMENT_PENDING', fail: 'DOCUMENT_FAIL' },
              { pass: 'FINAL_PASS', fail: 'FINAL_FAIL' },
          ];

    const mergedStepApplicantList = useMemo(
        () =>
            mergeApplicantWithSummary(
                stepApplicantList,
                documentEvaluationSummaryList?.overviewDataList ?? [],
                interviewEvaluationSummaryList?.overviewDataList ?? [],
                isThreeStepProcess,
            ),
        [stepApplicantList, documentEvaluationSummaryList, interviewEvaluationSummaryList],
    );

    const stepApplicantGroups = useMemo(
        () => groupStepApplicants(mergedStepApplicantList, isThreeStepProcess),
        [mergedStepApplicantList],
    );

    const documentEvaluations = getEvaluations(
        documentEvaluationDetail,
        selectedApplicant?.applicantId,
    );

    const interviewEvaluations = getEvaluations(
        interviewEvaluationDetail,
        selectedApplicant?.applicantId,
    );

    const isOnlyDocumentStatus = ['DOCUMENT_PENDING', 'DOCUMENT_FAIL'].includes(
        selectedApplicant?.status ?? '',
    );
    const isInterviewIncluded = !isOnlyDocumentStatus && isThreeStepProcess;

    const evaluationsInDialog: EvaluationDetailWithSummary[] = isInterviewIncluded
        ? [documentEvaluations, interviewEvaluations]
        : [documentEvaluations];

    const dialogEvaluationLabels: string[] = isInterviewIncluded
        ? ['서류평가', '면접평가']
        : ['서류평가'];

    // handlers
    const handleOpen = (applicant: StepApplicantWithoutImage) => {
        setSelectedApplicant(applicant);
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
        setSelectedApplicant(null);
    };

    const handleEmailClose = () => {
        setIsEmailOpen(false);
    };

    const handleInterviewSettingClose = () => {
        setIsInterviewOpen(false);
    };

    const handleStatusUpdate = (applicantIds: string[], newStatus: string) => {
        if (applicantIds.length === 0) {
            toast('지원자를 선택해주세요!', { toastTheme: 'black', type: 'error' });
            return;
        }

        applicantIds.forEach((id) => {
            updateStatus(
                { applicantId: id, status: newStatus, clubId: clubId! },
                {
                    onSuccess: () => {
                        queryClient.invalidateQueries({
                            queryKey: stepKeys.allStepApplicants(announcementId!, clubId!),
                        });
                    },
                    onError: (err) => {
                        if (hasError) return;
                        hasError = true;

                        const error = err as ErrorWithStatusCode;
                        if (error.statusCode === 500) {
                            setErrorDialogOpen(true);
                        } else if (error.response?.errors[0].message || error.message) {
                            toast(getErrorMessage(error), { type: 'error', toastTheme: 'colored' });
                        } else {
                            toast('오류로 인해 상태 변경을 못했어요.', {
                                toastTheme: 'colored',
                                type: 'error',
                            });
                        }
                    },
                },
            );
        });
    };

    const handlePlainEmail = async (subject: string, content: string): Promise<boolean> => {
        if (!validateEmailInputs(subject, content)) return false;

        try {
            await sendPlainEmail({
                announcementId: announcementId!,
                clubId: clubId!,
                email: { recipients: emailTargetList, subject, content },
            });
            return true;
        } catch {
            return false;
        }
    };
    const handleInterviewEmailReal = async (subject: string, content: string) => {
        ////// 추후 채울 내용
        return true;
    };

    const handleEmailDialogOpen = (
        target: string,
        ids: string[],
        isInterviewDialog: boolean = false,
    ) => {
        if (ids.length === 0) {
            toast('지원자를 선택해주세요!', { toastTheme: 'black', type: 'error' });
            return;
        }

        const groupMap: Record<string, StepApplicantWithoutImage[]> = {
            documentPending: stepApplicantGroups.documentPending,
            documentFailed: stepApplicantGroups.documentFailed,
            interviewPending: stepApplicantGroups.interviewPending ?? [],
            interviewFailed: stepApplicantGroups.interviewFailed ?? [],
            finalPassed: stepApplicantGroups.finalPassed,
            finalFailed: stepApplicantGroups.finalFailed,
        };

        const applicantsById = new Map(
            groupMap[target].map((applicant) => [applicant.applicantId, applicant.email] as const),
        );

        const emails = ids
            .map((id) => applicantsById.get(id))
            .filter((email): email is string => Boolean(email));

        setEmailTargetList(emails);

        if (isInterviewDialog) {
            setOpenConfirmDialog(true);
        } else {
            setIsEmailOpen(true);
        }
    };

    // effects
    // etc
    const validateEmailInputs = (subject: string, content: string): boolean => {
        if (!subject.trim()) {
            toast('이메일 제목을 입력해주세요!', { toastTheme: 'colored', type: 'error' });
            return false;
        }
        if (!content.trim()) {
            toast('이메일 내용을 입력해주세요!', { toastTheme: 'colored', type: 'error' });
            return false;
        }
        return true;
    };

    return (
        <div css={s_stepManagementPageContainer}>
            <div css={s_topContainer}>
                <nav css={s_searchBarContainer}>
                    <Input
                        variant="transparent"
                        endNode={
                            <Button variant="text" size="s" sx={s_searchSvgButton}>
                                <Search width="1.5rem" height="1.5rem" />
                            </Button>
                        }
                        inputSx={s_input}
                        placeholder="지원자 이름 검색"
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </nav>
            </div>
            <div css={s_stepBoxContainer}>
                <CardBox
                    stepTitle={statusLabel[DOCUMENT_STEP].label}
                    step="document"
                    searchText={searchText}
                    passedApplicantList={stepApplicantGroups.documentPending}
                    failedApplicantList={stepApplicantGroups.documentFailed}
                    handleOpen={handleOpen}
                    handleApplicantStatus={handleStatusUpdate}
                    statusLabel={
                        isThreeStepProcess
                            ? [statusLabel[INTERVIEW_STEP], statusLabel[FINAL_STEP_IN_THREE]]
                            : [statusLabel[FINAL_STEP_IN_TWO]]
                    }
                    statusInOwnStep={statusInOwnStep[DOCUMENT_STEP]}
                    onEmailDialogOpen={handleEmailDialogOpen}
                />
                {isThreeStepProcess && (
                    <CardBox
                        stepTitle={statusLabel[INTERVIEW_STEP].label}
                        step="interview"
                        searchText={searchText}
                        passedApplicantList={stepApplicantGroups.interviewPending!}
                        failedApplicantList={stepApplicantGroups.interviewFailed!}
                        handleOpen={handleOpen}
                        handleApplicantStatus={handleStatusUpdate}
                        statusLabel={[statusLabel[DOCUMENT_STEP], statusLabel[FINAL_STEP_IN_THREE]]}
                        statusInOwnStep={statusInOwnStep[INTERVIEW_STEP]}
                        onEmailDialogOpen={handleEmailDialogOpen}
                    />
                )}
                <CardBox
                    stepTitle={statusLabel.at(-1)!.label}
                    step="final"
                    searchText={searchText}
                    passedApplicantList={stepApplicantGroups.finalPassed}
                    failedApplicantList={stepApplicantGroups.finalFailed}
                    handleOpen={handleOpen}
                    handleApplicantStatus={handleStatusUpdate}
                    statusLabel={
                        isThreeStepProcess
                            ? [statusLabel[DOCUMENT_STEP], statusLabel[INTERVIEW_STEP]]
                            : [statusLabel[DOCUMENT_STEP]]
                    }
                    statusInOwnStep={statusInOwnStep.at(-1)!}
                    onEmailDialogOpen={handleEmailDialogOpen}
                />
                {selectedApplicant && (
                    <ApplicantDialog
                        applicant={selectedApplicant}
                        personalInformation={applicantDocument?.personalInfos ?? []}
                        preQuestionAnswers={applicantDocument?.preQuestionAnswers ?? []}
                        applicationQuestionAnswers={
                            applicantDocument?.applicationQuestionAnswers ?? []
                        }
                        evaluations={evaluationsInDialog}
                        evaluationLabels={dialogEvaluationLabels}
                        isThreeStepProcess={isThreeStepProcess}
                        open={isOpen}
                        handleClose={handleClose}
                    />
                )}
                <InterviewEmailDialog
                    open={isInterviewOpen}
                    handleClose={handleInterviewSettingClose}
                    handleInterviewEmail={handleInterviewEmailReal}
                    interviewSlots={interviewSlots}
                />
                <PlainEmailDialog
                    open={isEmailOpen}
                    handleClose={handleEmailClose}
                    handlePlainEmail={handlePlainEmail}
                />
                <ErrorDialog
                    open={errorDialogOpen}
                    handleClose={() => setErrorDialogOpen(false)}
                    errorStatusCode={500}
                />
                {openConfirmDialog && (
                    <ConfirmDialog
                        type="confirm"
                        title="면접 일정 생성 알림"
                        content={`기존에 생성하신 면접 일정이 이미 있는 경우,\n다시 한번 면접 일정을 생성하시면\n기존 예약 일정 및 예약자들의 예약 상태는 모두 초기화돼요!`}
                        open={true}
                        cancelButton={true}
                        handleClose={() => setOpenConfirmDialog(false)}
                        actionHandler={() => setIsInterviewOpen(true)}
                        actionPosition="center"
                        dialogSize="md"
                    />
                )}
            </div>
        </div>
    );
}

export default StepManagementPage;
