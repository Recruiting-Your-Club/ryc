import Search from '@assets/images/search.svg';
import {
    ApplicantDialog,
    Button,
    CardBox,
    Input,
    InterviewSettingDialog,
    PlainEmailDialog,
} from '@components';
import { documentList, interviewEmptyEvaluations } from '@constants/ApplicantDialog';
import React, { useMemo, useState } from 'react';
import {
    s_input,
    s_searchBarContainer,
    s_stepBoxContainer,
    s_stepManagementPageContainer,
    s_topContainer,
} from './StepManagementPage.style';
import { useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { stepQueries, evaluationQueries } from '@api/queryFactory';
import type { StepApplicant } from '@api/domain/step/types';
import { stepMutations } from '@api/mutationFactory';
import { evaluationKeys, stepKeys } from '@api/querykeyFactory';
import {
    DOCUMENT_STEP,
    FINAL_STEP_IN_THREE,
    FINAL_STEP_IN_TWO,
    INTERVIEW_STEP,
} from '@constants/stepManagementPage';

const CLUB_ID = 'example-42';

function StepManagementPage() {
    // prop destruction
    // lib hooks
    // initial values
    // state, ref, querystring hooks
    const [selectedApplicant, setSelectedApplicant] = useState<StepApplicant | null>(null);
    const [searchText, setSearchText] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isEmailOpen, setIsEmailOpen] = useState(false);
    const [isInterviewOpen, setIsInterviewOpen] = useState(false);

    // form hooks
    // query hooks
    const queryClient = useQueryClient();
    const { data: totalSteps = { process: [] } } = useSuspenseQuery(stepQueries.getTotalSteps());
    const { data: stepApplicantList = [] } = useSuspenseQuery(stepQueries.allStepApplicants());
    const { mutate: updateStatus } = stepMutations.useUpdateStepApplicantStatus();

    // calculated values
    const isThreeStepProcess = totalSteps.process.length === 3;

    const documentStepApplicants = stepApplicantList.filter((applicant) =>
        ['DOCUMENT_PASS', 'DOCUMENT_FAIL'].includes(applicant.status),
    );
    const interviewStepApplicants = stepApplicantList.filter((applicant) =>
        ['INTERVIEW_PASS', 'INTERVIEW_FAIL', 'FINAL_PASS', 'FINAL_FAIL'].includes(applicant.status),
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

    const statusLabel = isThreeStepProcess
        ? [
              { label: '서류', status: 'DOCUMENT_PASS' },
              { label: '면접 평가', status: 'INTERVIEW_PASS' },
              { label: '최종 합격', status: 'FINAL_PASS' },
          ]
        : [
              { label: '지원서 접수', status: 'DOCUMENT_PASS' },
              { label: '최종 합격', status: 'FINAL_PASS' },
          ];

    const statusInOwnStep = isThreeStepProcess
        ? [
              { pass: 'DOCUMENT_PASS', fail: 'DOCUMENT_FAIL' },
              { pass: 'INTERVIEW_PASS', fail: 'INTERVIEW_FAIL' },
              { pass: 'FINAL_PASS', fail: 'FINAL_FAIL' },
          ]
        : [
              { pass: 'DOCUMENT_PASS', fail: 'DOCUMENT_FAIL' },
              { pass: 'FINAL_PASS', fail: 'FINAL_FAIL' },
          ];

    const mergedStepApplicantList = useMemo(
        () =>
            stepApplicantList.map((applicant) => {
                const isDocumentStep =
                    applicant.status === 'DOCUMENT_PASS' ||
                    applicant.status === 'DOCUMENT_FAIL' ||
                    (!isThreeStepProcess &&
                        (applicant.status === 'FINAL_PASS' || applicant.status === 'FINAL_FAIL'));

                const summaryList = isDocumentStep
                    ? documentEvaluationSummaryList
                    : interviewEvaluationSummaryList;

                const summary = summaryList.find(
                    (summary) => summary.applicantId === applicant.applicantId,
                );

                return {
                    ...applicant,
                    completedEvaluatorCount: summary?.completedEvaluatorCount ?? 0,
                    totalEvaluatorCount: summary?.totalEvaluatorCount ?? 0,
                    averageScore: summary?.averageScore ?? 0,
                };
            }),
        [stepApplicantList, documentEvaluationSummaryList, interviewEvaluationSummaryList],
    );

    const stepApplicantGroups = {
        documentPassed: mergedStepApplicantList.filter(
            (applicant) => applicant.status === 'DOCUMENT_PASS',
        ),
        documentFailed: mergedStepApplicantList.filter(
            (applicant) => applicant.status === 'DOCUMENT_FAIL',
        ),
        finalPassed: mergedStepApplicantList.filter(
            (applicant) => applicant.status === 'FINAL_PASS',
        ),
        finalFailed: mergedStepApplicantList.filter(
            (applicant) => applicant.status === 'FINAL_FAIL',
        ),
        ...(isThreeStepProcess && {
            interviewPassed: mergedStepApplicantList.filter(
                (applicant) => applicant.status === 'INTERVIEW_PASS',
            ),
            interviewFailed: mergedStepApplicantList.filter(
                (applicant) => applicant.status === 'INTERVIEW_FAIL',
            ),
        }),
    };

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
        applicantIds.forEach((id) => {
            updateStatus(
                { applicantId: id, status: newStatus },
                {
                    onSuccess: () => {
                        queryClient.invalidateQueries({ queryKey: stepKeys.allStepApplicants });
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

    // effects

    return (
        <div css={s_stepManagementPageContainer}>
            <div css={s_topContainer}>
                <nav css={s_searchBarContainer}>
                    <Input
                        variant="transparent"
                        endNode={
                            <Button variant="text" size="s">
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
                    step="normal"
                    searchText={searchText}
                    passedApplicantList={stepApplicantGroups.documentPassed}
                    failedApplicantList={stepApplicantGroups.documentFailed}
                    handleOpen={handleOpen}
                    handleApplicantStatus={handleStatusUpdate}
                    statusLabel={
                        isThreeStepProcess
                            ? [statusLabel[INTERVIEW_STEP], statusLabel[FINAL_STEP_IN_THREE]]
                            : [statusLabel[FINAL_STEP_IN_TWO]]
                    }
                    statusInOwnStep={statusInOwnStep[DOCUMENT_STEP]}
                />
                {isThreeStepProcess && (
                    <CardBox
                        stepTitle={statusLabel[INTERVIEW_STEP].label}
                        step="normal"
                        searchText={searchText}
                        passedApplicantList={stepApplicantGroups.interviewPassed!}
                        failedApplicantList={stepApplicantGroups.interviewFailed!}
                        handleOpen={handleOpen}
                        handleApplicantStatus={handleStatusUpdate}
                        statusLabel={[statusLabel[DOCUMENT_STEP], statusLabel[FINAL_STEP_IN_THREE]]}
                        statusInOwnStep={statusInOwnStep[INTERVIEW_STEP]}
                    />
                )}
                <CardBox
                    stepTitle={statusLabel.at(-1)!.label}
                    step="final"
                    searchText={searchText}
                    passedApplicantList={stepApplicantGroups.finalPassed}
                    failedApplicantList={stepApplicantGroups.finalFailed}
                    handleOpen={handleOpen}
                    handleApplicantStatus={() => handleStatusUpdate}
                    statusLabel={
                        isThreeStepProcess
                            ? [statusLabel[DOCUMENT_STEP], statusLabel[INTERVIEW_STEP]]
                            : [statusLabel[DOCUMENT_STEP]]
                    }
                    statusInOwnStep={statusInOwnStep.at(-1)!}
                />
                {selectedApplicant && (
                    <ApplicantDialog
                        name={selectedApplicant.name}
                        email={selectedApplicant.email}
                        documentList={documentList}
                        evaluations={interviewEmptyEvaluations}
                        open={isOpen}
                        handleClose={handleClose}
                    />
                )}
                <Button onClick={() => setIsInterviewOpen(true)}>면접일정설정</Button>
                <InterviewSettingDialog
                    open={isInterviewOpen}
                    handleClose={handleInterviewSettingClose}
                />

                <Button onClick={() => setIsEmailOpen(true)}>이메일</Button>
                <PlainEmailDialog open={isEmailOpen} handleClose={handleEmailClose} />
            </div>
        </div>
    );
}

export { StepManagementPage };
