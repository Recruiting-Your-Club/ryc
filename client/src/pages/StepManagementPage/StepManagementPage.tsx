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
import React, { useState } from 'react';
import {
    s_input,
    s_searchBarContainer,
    s_stepBoxContainer,
    s_stepManagementPageContainer,
    s_topContainer,
} from './StepManagementPage.style';
import { useSuspenseQuery } from '@tanstack/react-query';
import { stepQueries } from '@api/queryFactory/stepQueries';
import type { StepApplicant } from '@api/domain/step/types';
import { evaluationQueries } from '@api/queryFactory/evaluationQueries';

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
    const { data: totalSteps = { process: [] } } = useSuspenseQuery(stepQueries.getTotalSteps());
    const { data: stepApplicantList = [] } = useSuspenseQuery(stepQueries.allStepApplicants());

    // calculated values
    const documentStepApplicants = stepApplicantList.filter((applicant) =>
        ['DOCUMENT_PASS', 'DOCUMENT_FAIL'].includes(applicant.status),
    );
    const interviewStepApplicants = stepApplicantList.filter((applicant) =>
        ['INTERVIEW_PASS', 'INTERVIEW_FAIL', 'FINAL_PASS', 'FINAL_FAIL'].includes(applicant.status),
    );

    const documentApplicantIds = documentStepApplicants.map((applicant) => applicant.applicantId);
    const interviewApplicantIds = interviewStepApplicants.map((applicant) => applicant.applicantId);

    //// query
    const { data: documentEvaluationSummaryList = [] } = useSuspenseQuery(
        evaluationQueries.evaluationSummary({
            clubId: 'example-42',
            applicantIdList: documentApplicantIds,
            type: 'document',
        }),
    );
    const { data: interviewEvaluationSummaryList = [] } = useSuspenseQuery(
        evaluationQueries.evaluationSummary({
            clubId: 'example-42',
            applicantIdList: interviewApplicantIds,
            type: 'interview',
        }),
    );

    // stepApplicantList + EvaluationSummary
    const mergedStepApplicantList = stepApplicantList.map((applicant) => {
        const summaryList =
            applicant.status === 'DOCUMENT_PASS' || applicant.status === 'DOCUMENT_FAIL'
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
    });

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
        ...(totalSteps.process.length === 3 && {
            // [서류 - 면접 - 최종] 일 때만
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
                    stepTitle={totalSteps.process.length === 3 ? '서류 평가' : '지원서 접수'}
                    step="normal"
                    searchText={searchText}
                    passedApplicantList={stepApplicantGroups.documentPassed}
                    failedApplicantList={stepApplicantGroups.documentFailed}
                    handleOpen={handleOpen}
                />
                {totalSteps.process.length === 3 && (
                    <CardBox
                        stepTitle="면접"
                        step="normal"
                        searchText={searchText}
                        passedApplicantList={stepApplicantGroups.interviewPassed!}
                        failedApplicantList={stepApplicantGroups.interviewFailed!}
                        handleOpen={handleOpen}
                    />
                )}
                <CardBox
                    stepTitle="최종 합격"
                    step="final"
                    searchText={searchText}
                    passedApplicantList={stepApplicantGroups.finalPassed}
                    failedApplicantList={stepApplicantGroups.finalFailed}
                    handleOpen={handleOpen}
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
