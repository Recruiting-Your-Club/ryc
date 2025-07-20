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
import type { Applicant, ClubNotice } from './types';
const applicantList = [
    {
        name: '박민지',
        email: 'test123@naver.com',
        date: '2025. 02. 04',
        score: '4.0',
        status: '평가 중 (2/6)',
    },
    {
        name: '김영림',
        email: 'test1234@naver.com',
        date: '2025. 02. 04',
        score: '3.5',
        status: '평가 완료 (6/6)',
    },
    {
        name: '김일림',
        email: 'test1235@naver.com',
        date: '2025. 05. 20',
        score: '0',
        status: '평가 중 (0/6)',
    },
    {
        name: '김이림',
        email: 'test1236@naver.com',
        date: '2025. 05. 20',
        score: '1.5',
        status: '평가 중 (3/6)',
    },
    {
        name: '김세림',
        email: 'test1237@naver.com',
        date: '2025. 05. 20',
        score: '2.4',
        status: '평가 중 (2/6)',
    },
    {
        name: '김네림',
        email: 'test1238@naver.com',
        date: '2025. 05. 20',
        score: '5',
        status: '평가 완료 (6/6)',
    },
];

const applicantList2 = [
    {
        name: '박민지',
        email: 'tes123@naver.com',
        date: '2025. 02. 04',
        score: '4.0',
        status: '평가 중 (2/6)',
    },
    {
        name: '김영림',
        email: 'tes1234@naver.com',
        date: '2025. 02. 04',
        score: '3.5',
        status: '평가 완료 (6/6)',
    },
    {
        name: '김일림',
        email: 'tes1235@naver.com',
        date: '2025. 05. 20',
        score: '0',
        status: '평가 중 (0/6)',
    },
    {
        name: '김이림',
        email: 'tes1236@naver.com',
        date: '2025. 05. 20',
        score: '1.5',
        status: '평가 중 (3/6)',
    },
    {
        name: '김세림',
        email: 'tes1237@naver.com',
        date: '2025. 05. 20',
        score: '2.4',
        status: '평가 중 (2/6)',
    },
];

const finalApplicantList = [
    {
        name: '박민지',
        email: 't123@naver.com',
        date: '2025. 02. 04',
        score: '4.0',
        status: '평가 완료 (6/6)',
    },
    {
        name: 'Robert Lee',
        email: 't12355@naver.com',
        date: '2025. 02. 04',
        score: '4.0',
        status: '평가 완료 (6/6)',
    },
    {
        name: '김영림',
        email: 't1234@naver.com',
        date: '2025. 02. 04',
        score: '3.5',
        status: '평가 완료 (6/6)',
    },
    {
        name: '김일림',
        email: 't1235@naver.com',
        date: '2025. 05. 20',
        score: '0',
        status: '평가 완료 (6/6)',
    },
    {
        name: '김이림',
        email: 't1236@naver.com',
        date: '2025. 05. 20',
        score: '1.5',
        status: '평가 완료 (6/6)',
    },
    {
        name: '김세림',
        email: 't1237@naver.com',
        date: '2025. 05. 20',
        score: '2.4',
        status: '평가 완료 (6/6)',
    },
];

const data: ClubNotice = {
    document: true,
    interview: true,
};

function StepManagementPage() {
    // prop destruction
    // lib hooks
    // initial values
    // state, ref, querystring hooks
    const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
    const [searchText, setSearchText] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isEmailOpen, setIsEmailOpen] = useState(false);
    const [isInterviewOpen, setIsInterviewOpen] = useState(false);

    // form hooks
    // query hooks
    // calculated values
    // handlers
    const handleOpen = (applicant: Applicant) => {
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
                    stepTitle={data.document ? '서류 평가' : '지원서 접수'}
                    step="normal"
                    searchText={searchText}
                    applicantList={applicantList}
                    handleOpen={handleOpen}
                />
                {data.interview && (
                    <CardBox
                        stepTitle="면접"
                        step="normal"
                        searchText={searchText}
                        applicantList={applicantList2}
                        handleOpen={handleOpen}
                    />
                )}
                <CardBox
                    stepTitle="최종 합격"
                    step="final"
                    searchText={searchText}
                    applicantList={finalApplicantList}
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
