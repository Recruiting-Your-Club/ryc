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
    const stepApplicantGroups = {
        documentPassed: stepApplicantList.filter(
            (applicant) => applicant.state === 'DOCUMENT_PASS',
        ),
        documentFailed: stepApplicantList.filter(
            (applicant) => applicant.state === 'DOCUMENT_FAIL',
        ),
        finalPassed: stepApplicantList.filter((applicant) => applicant.state === 'FINAL_PASS'),
        finalFailed: stepApplicantList.filter((applicant) => applicant.state === 'FINAL_FAIL'),
        ...(totalSteps.process.length === 3 && {
            interviewPassed: stepApplicantList.filter(
                (applicant) => applicant.state === 'INTERVIEW_PASS',
            ),
            interviewFailed: stepApplicantList.filter(
                (applicant) => applicant.state === 'INTERVIEW_FAIL',
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
