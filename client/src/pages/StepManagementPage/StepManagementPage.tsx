import Search from '@assets/images/search.svg';
import {
    ApplicantDialog,
    Button,
    Input,
    InterviewSettingDialog,
    PlainEmailDialog,
} from '@components';
import { ApplicantCard } from '@components/ApplicantCard';
import { CardBox } from '@components/CardBox';
import React, { useState } from 'react';
import {
    cardGroup,
    inputCss,
    searchBarContainer,
    stepBoxContainer,
    stepManagementPageContainer,
    topContainer,
} from './StepManagement.style';
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
    const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
    const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isEmailOpen, setIsEmailOpen] = useState(false);
    const [isInterviewOpen, setIsInterviewOpen] = useState(false);

    const handleToggle = (email: string, checked: boolean) => {
        setSelectedEmails((prev) => (checked ? [...prev, email] : prev.filter((e) => e !== email)));
    };

    const handleSelectAll = () => {
        if (selectedEmails.length === applicantList.length) {
            setSelectedEmails([]);
        } else {
            setSelectedEmails(applicantList.map((applicant) => applicant.email));
        }
    };

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

    return (
        <div css={stepManagementPageContainer}>
            <div css={topContainer}>
                <nav css={searchBarContainer}>
                    <Input
                        variant="transparent"
                        endNode={
                            <Button variant="text" size="s">
                                <Search width="1.5rem" height="1.5rem" />
                            </Button>
                        }
                        inputSx={inputCss}
                        placeholder="지원자 이름 검색"
                    />
                </nav>
            </div>
            <div css={stepBoxContainer}>
                <CardBox stepTitle={data.document ? '서류 평가' : '지원서 접수'} step="normal">
                    <div css={cardGroup}>
                        {applicantList.map((applicant) => (
                            <ApplicantCard
                                key={applicant.email}
                                name={applicant.name}
                                email={applicant.email}
                                date={applicant.date}
                                score={applicant.score}
                                status={applicant.status}
                                checked={selectedEmails.includes(applicant.email)} // 임의 (추후 기능 연장)
                                onChange={handleToggle}
                                onClick={() => handleOpen(applicant as Applicant)}
                            />
                        ))}
                    </div>
                </CardBox>
                {data.interview && (
                    <CardBox stepTitle="면접" step="normal">
                        <div css={cardGroup}>
                            {applicantList2.map((applicant) => (
                                <ApplicantCard
                                    key={applicant.email}
                                    name={applicant.name}
                                    email={applicant.email}
                                    date={applicant.date}
                                    score={applicant.score}
                                    status={applicant.status}
                                    checked={selectedEmails.includes(applicant.email)} // 임의
                                    onChange={handleToggle}
                                    onClick={() => handleOpen(applicant as Applicant)}
                                />
                            ))}
                        </div>
                    </CardBox>
                )}
                <CardBox stepTitle="최종 합격" step="final">
                    <div css={cardGroup}>
                        {finalApplicantList.map((applicant) => (
                            <ApplicantCard
                                key={applicant.email}
                                name={applicant.name}
                                email={applicant.email}
                                date={applicant.date}
                                score={applicant.score}
                                status={applicant.status}
                                checked={selectedEmails.includes(applicant.email)} // 임의
                                onChange={handleToggle}
                                onClick={() => handleOpen(applicant as Applicant)}
                            />
                        ))}
                    </div>
                </CardBox>
                {selectedApplicant && (
                    <ApplicantDialog
                        name={selectedApplicant.name}
                        email={selectedApplicant.email}
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
