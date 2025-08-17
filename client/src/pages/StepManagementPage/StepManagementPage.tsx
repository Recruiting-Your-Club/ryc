import Search from '@assets/images/search.svg';
import {
    ApplicantDialog,
    Button,
    CardBox,
    Input,
    InterviewSettingDialog,
    PlainEmailDialog,
} from '@components';
import React, { useMemo, useState } from 'react';
import {
    s_input,
    s_searchBarContainer,
    s_searchSvgButton,
    s_stepBoxContainer,
    s_stepManagementPageContainer,
    s_topContainer,
} from './StepManagementPage.style';
import { useQuery, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { stepQueries, evaluationQueries, applicantQueries } from '@api/queryFactory';
import type { StepApplicant } from '@api/domain/step/types';
import { stepMutations } from '@api/mutationFactory';
import { evaluationKeys, stepKeys } from '@api/querykeyFactory';
import {
    DOCUMENT_STEP,
    FINAL_STEP_IN_THREE,
    FINAL_STEP_IN_TWO,
    INTERVIEW_STEP,
} from '@constants/stepManagementPage';
import type { EvaluationDataWithSummary } from '@api/domain/evaluation/types';
import {
    getEvaluations,
    groupStepApplicants,
    mergeApplicantWithSummary,
} from './utils/stepApplicant';
import { useToast } from '@hooks/useToast';
import { emailMutations } from '@api/mutationFactory/emailMutations';
import type { InterviewDetailInformation } from '@api/domain/email/types';

const CLUB_ID = '69cab5c5-c2ff-4bcf-8048-9307c214e566-42';
const ANNOUNCEMENT_ID = 'd3f1c5e2-8a90-4b6c-9c45-6d2a1c8e5d3f';

function StepManagementPage() {
    // prop destruction
    // lib hooks
    const { toast } = useToast();
    // initial values
    // state, ref, querystring hooks
    const [selectedApplicant, setSelectedApplicant] = useState<StepApplicant | null>(null);
    const [searchText, setSearchText] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isEmailOpen, setIsEmailOpen] = useState(false);
    const [isInterviewOpen, setIsInterviewOpen] = useState(false);
    const [emailTargetList, setEmailTargetList] = useState<string[]>([]);

    // form hooks
    // query hooks
    const queryClient = useQueryClient();
    const { data: totalSteps = { process: [] } } = useSuspenseQuery(stepQueries.getTotalSteps());
    const { data: stepApplicantList = [] } = useSuspenseQuery(
        stepQueries.allStepApplicants(ANNOUNCEMENT_ID, CLUB_ID),
    );
    const { mutate: updateStatus } = stepMutations.useUpdateStepApplicantStatus();
    const { data: applicantDocument } = useQuery({
        ...applicantQueries.getApplicantDocument(
            ANNOUNCEMENT_ID,
            selectedApplicant?.applicantId ?? '',
            CLUB_ID,
        ),

        enabled: !!selectedApplicant?.applicantId,
    });

    const { mutate: sendPlainEmail } = emailMutations.usePostPlainEmail(() => setIsOpen(false));
    const { mutate: sendInterviewEmail } = emailMutations.usePostInterviewEmail(() =>
        setIsInterviewOpen(false),
    );

    // calculated values
    const isThreeStepProcess = totalSteps.process.length === 3;

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

    const documentApplicantIds = documentStepApplicants.map((applicant) => applicant.applicantId);
    const interviewApplicantIds = interviewStepApplicants.map((applicant) => applicant.applicantId);

    const { data: documentEvaluationSummaryList = [] } = useSuspenseQuery(
        evaluationQueries.evaluationSummary({
            clubId: CLUB_ID,
            applicantIdList: documentApplicantIds,
            type: 'document',
        }),
    );
    const { data: interviewEvaluationSummaryList = [] } = useSuspenseQuery(
        evaluationQueries.evaluationSummary({
            clubId: CLUB_ID,
            applicantIdList: interviewApplicantIds,
            type: 'interview',
        }),
    );
    const { data: documentEvaluationDetail } = useQuery({
        ...evaluationQueries.evaluationDetail({
            clubId: CLUB_ID,
            applicantIdList: selectedApplicant ? [selectedApplicant.applicantId] : [],
            type: 'document',
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
    const { data: interviewEvaluationDetail } = useQuery({
        ...evaluationQueries.evaluationDetail({
            clubId: CLUB_ID,
            applicantIdList: selectedApplicant ? [selectedApplicant.applicantId] : [],
            type: 'interview',
        }),
        enabled:
            !!selectedApplicant &&
            ['INTERVIEW_PENDING', 'INTERVIEW_FAIL', 'FINAL_PASS', 'FINAL_FAIL'].includes(
                selectedApplicant.status,
            ),
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
                documentEvaluationSummaryList,
                interviewEvaluationSummaryList,
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

    const evaluationsInDialog: EvaluationDataWithSummary[] = isInterviewIncluded
        ? [documentEvaluations, interviewEvaluations]
        : [documentEvaluations];

    const dialogEvaluationLabels: string[] = isInterviewIncluded
        ? ['서류평가', '면접평가']
        : ['서류평가'];

    // handlers
    const handleOpen = (applicant: StepApplicant) => {
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
                { applicantId: id, status: newStatus },
                {
                    onSuccess: () => {
                        queryClient.invalidateQueries({
                            queryKey: stepKeys.allStepApplicants(ANNOUNCEMENT_ID, CLUB_ID),
                        });
                        queryClient.invalidateQueries({
                            queryKey: evaluationKeys.evaluationSummary(
                                CLUB_ID,
                                documentApplicantIds,
                                'document',
                            ),
                        });
                        queryClient.invalidateQueries({
                            queryKey: evaluationKeys.evaluationSummary(
                                CLUB_ID,
                                interviewApplicantIds,
                                'interview',
                            ),
                        });
                    },
                },
            );
        });
    };

    const handlePlainEmail = (subject: string, content: string) => {
        if (!validateEmailInputs(subject, content)) return;

        sendPlainEmail({
            announcementId: ANNOUNCEMENT_ID,
            clubId: CLUB_ID,
            email: { recipients: emailTargetList, subject, content },
        });
    };

    const handleInterviewEmail = (
        numberOfPeopleByInterviewDates: InterviewDetailInformation[],
        subject: string,
        content: string,
    ) => {
        if (numberOfPeopleByInterviewDates.length === 0) {
            toast('인터뷰 일정을 선택해주세요!', { toastTheme: 'colored', type: 'error' });
            return;
        }
        if (!validateEmailInputs(subject, content)) return;

        sendInterviewEmail({
            announcementId: ANNOUNCEMENT_ID,
            clubId: CLUB_ID,
            email: {
                numberOfPeopleByInterviewDates,
                emailSendRequest: { recipients: emailTargetList, subject, content },
            },
        });
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

        const groupMap: Record<string, StepApplicant[]> = {
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
            setIsInterviewOpen(true);
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
                <InterviewSettingDialog
                    open={isInterviewOpen}
                    handleClose={handleInterviewSettingClose}
                    handleInterviewEmail={handleInterviewEmail}
                />
                <PlainEmailDialog
                    open={isEmailOpen}
                    handleClose={handleEmailClose}
                    handlePlainEmail={handlePlainEmail}
                />
            </div>
        </div>
    );
}

export { StepManagementPage };
