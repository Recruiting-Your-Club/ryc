import React, { useEffect, useState, useMemo } from 'react';
import dayjs from 'dayjs';
import {
    clubApplyPageContainer,
    clubApplyPageMainContainer,
    clubApplyTabContainer,
    clubApplyTabName,
    clubLogoAndNameContainer,
    clubNameContainer,
    svgContainer,
    submitButtonContainer,
    clubApplyPage,
    mobileQuestionStatus,
    nextButtonContainer,
    applyFormContainer,
} from './ClubApplyPage.style';
import Ryc from '@assets/images/Ryc.svg';
import { Button } from '@components';
import { Text } from '@components/_common/Text';
import { ClubSubmitCard } from '@components/ClubSubmitCard';
import { ClubApplyPersonalInfoPage } from './PersonalInfoPage';
import { ClubApplyDetailQuestionPage } from './DetailQuestionPage';

import theme from '@styles/theme';
import { SubmitDialog } from '@components/SubmitDialog/SubmitDialog';

// 임시 데이터
export const clubData = {
    announcementId: '213123',
    title: 'EN# (Enjoy C#)',
    description: '',
    target: '1,2학년',
    tag: '학술동아리',
    numberOfPeople: 0,
    announcementPeriod: [
        {
            start: '2025-05-03T03:13:11.173Z',
            end: '2025-05-23T03:13:11.173Z',
        },
    ],
    applicationPeriod: [
        {
            start: '2025-05-03T03:13:11.173Z',
            end: '2025-05-03T03:13:11.173Z',
        },
    ],
    interviewPeriod: [
        {
            start: '2025-05-03T03:13:11.173Z',
            end: '2025-05-03T03:13:11.173Z',
        },
    ],
    resultAnnouncementDate: '2025-06-30T15:00:00.000Z',
    durationDate: '한 학기',
    preQuestions: [
        {
            personalInfoQuestions: ['STUDENT_ID', 'PROFILE_IMAGE'],
            additionalQuestions: [
                {
                    category: 'SHORT_ANSWER',
                    title: '이름',
                },
                {
                    category: 'SHORT_ANSWER',
                    title: '생년월일',
                },
                {
                    category: 'SHORT_ANSWER',
                    title: '전화번호',
                },
                {
                    category: 'MULTIPLE_CHOICE',
                    title: '성별',
                    options: ['남', '여'],
                },
            ],
        },
    ],
    questions: [
        {
            title: 'EN#에 지원한 동기가 무엇인가요?',
            description: 'EN#에 지원하게 된 계기와 동기를 자유롭게 작성해주세요.',
        },
        {
            title: 'EN#에서 기대하는 활동을 작성해주세요.',
            description: 'EN#에서 하고 싶은 활동이나 목표를 자유롭게 작성해주세요.',
        },
        {
            title: '프로젝트 경험이 있다면 자세히 설명해주세요.',
            description: '참여했던 프로젝트의 내용, 역할, 기간 등을 자세히 작성해주세요.',
        },
    ],
};

// 임시로 페이지 분리하기 위해 만든거 리팩토링 할 때 ClubDetailPage에 있는 Navigation 컴포넌트 가져다 써야함.
const applyData = [
    {
        question: '사전질문',
        index: 0,
    },
    {
        question: '자기소개서',
        index: 1,
    },
];

// 유효성 검사를 위한 정규식 패턴
const VALIDATION_PATTERNS = {
    이름: /^[가-힣]{2,}$/,
    생년월일: /^\d{6}$/,
    전화번호: /^01\d{8,9}$/,
} as const;

// 에러 메시지
const ERROR_MESSAGES = {
    이름: '올바른 이름을 입력해주세요 (예: 홍길동)',
    생년월일: '생년월일을 YYMMDD 형식으로 입력해주세요',
    전화번호: '올바른 전화번호를 입력해주세요 (예: 01012345678)',
} as const;

type ValidationKey = keyof typeof VALIDATION_PATTERNS;

function ClubApplyPage() {
    // prop destruction
    // lib hooks
    // initial values

    // 사전질문 데이터 변환
    const clubPersonalQuestions = clubData.preQuestions[0].additionalQuestions.map((question) => ({
        id: question.title,
        questionTitle: question.title,
        type: question.category === 'MULTIPLE_CHOICE' ? 'boolean' : 'string',
        options: question.options ?? [],
    }));

    // 자기소개서 질문 데이터 변환
    const detailQuestions = clubData.questions.map((question) => ({
        id: question.title,
        questionTitle: question.title,
        description: question.description,
    }));

    const allQuestions = [...clubPersonalQuestions, ...detailQuestions];

    // state, ref, querystring hooks

    const [idx, setIdx] = useState<number>(0);
    const [isDesktop, setIsDesktop] = useState<boolean>(
        window.innerWidth > parseInt(theme.breakpoint.mobile),
    );
    const [answers, setAnswers] = useState<{ [key: string]: string }>({});
    const [completedQuestions, setCompletedQuestions] = useState<number>(0);
    const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);

    // form hooks
    // query hooks
    // calculated values

    const getValidationError = (questionTitle: string, value: string): boolean => {
        // 값이 비어있으면 에러를 표시하지 않음
        if (!value.trim()) return false;

        const pattern = VALIDATION_PATTERNS[questionTitle as ValidationKey];
        if (!pattern) return false;
        return !pattern.test(value);
    };

    const getErrorMessage = (questionTitle: string, value: string): string | undefined => {
        // 값이 비어있으면 에러 메시지를 표시하지 않음
        if (!value.trim()) return undefined;

        const pattern = VALIDATION_PATTERNS[questionTitle as ValidationKey];
        if (!pattern) return undefined;
        return !pattern.test(value) ? ERROR_MESSAGES[questionTitle as ValidationKey] : undefined;
    };

    // 마감일 계산 리팩토링할 때 유틸함수 가져다 써야함.
    const today = dayjs().format('YYYY-MM-DD');
    const formattedDeadline = dayjs(clubData.announcementPeriod[0].end);
    const diffDay = formattedDeadline.diff(today, 'day');

    const calculateDeadline = useMemo(() => {
        if (diffDay > 7) {
            return `~${formattedDeadline.format('MM.DD')}`;
        } else if (diffDay > 0) {
            return `D-${diffDay}`;
        } else if (diffDay === 0) {
            return `D-Day`;
        } else {
            return `마감`;
        }
    }, [formattedDeadline, today, diffDay]);

    // handlers
    const handleAnswerChange = (id: string, value: string) => {
        setAnswers((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = () => {
        setIsSubmitDialogOpen(true);
    };

    const handleConfirmSubmit = () => {
        setIsSubmitDialogOpen(false);
    };

    const handleNext = () => {
        if (idx < applyData.length - 1) {
            setIdx(idx + 1);
        }
    };

    // effects
    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth > parseInt(theme.breakpoint.mobile));
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // 답변 완료 상태 업데이트
    useEffect(() => {
        const completedCount = Object.entries(answers).filter(([id, value]) => {
            // 해당 질문의 제목 찾기
            const personalQuestion = clubPersonalQuestions.find((q) => q.id === id);
            const detailQuestion = detailQuestions.find((q) => q.id === id);
            const question = personalQuestion || detailQuestion;

            if (!question) return false;

            // 값이 비어있으면 완료되지 않은 것으로 처리
            if (!value.trim()) return false;

            // 유효성 검사가 필요한 필드인 경우 검사
            if (VALIDATION_PATTERNS[question.questionTitle as ValidationKey]) {
                return !getValidationError(question.questionTitle, value);
            }

            // 유효성 검사가 필요없는 필드(예: 성별)는 값이 있으면 완료로 처리
            return true;
        }).length;

        setCompletedQuestions(completedCount);
    }, [answers, clubPersonalQuestions, detailQuestions]);

    return (
        <div css={clubApplyPageContainer}>
            <div css={clubApplyPage}>
                <div css={clubApplyPageMainContainer}>
                    <div css={clubLogoAndNameContainer}>
                        <Ryc css={svgContainer} />
                        <div css={clubNameContainer}>
                            {clubData.title}
                            <Text type="subCaptionRegular" color="helper" textAlign="left">
                                {clubData.tag}
                            </Text>
                        </div>
                    </div>

                    <div css={clubApplyTabContainer}>
                        {applyData.map((data) => (
                            <Button
                                key={data.question}
                                variant="text"
                                sx={clubApplyTabName}
                                onClick={() => setIdx(data.index)}
                            >
                                {data.question}
                            </Button>
                        ))}
                        {!isDesktop && (
                            <Text
                                type="subCaptionRegular"
                                textAlign="right"
                                color={
                                    completedQuestions === allQuestions.length
                                        ? 'primary'
                                        : 'warning'
                                }
                                sx={mobileQuestionStatus}
                            >
                                작성한 항목 ({completedQuestions} / {allQuestions.length})
                            </Text>
                        )}
                    </div>
                    {/* 페이지 */}
                    {idx === 0 ? (
                        <ClubApplyPersonalInfoPage
                            idx={idx}
                            answers={answers}
                            clubPersonalQuestions={clubPersonalQuestions}
                            onAnswerChange={handleAnswerChange}
                            containerStyle={applyFormContainer(idx)}
                            getValidationError={getValidationError}
                            getErrorMessage={getErrorMessage}
                        />
                    ) : (
                        <ClubApplyDetailQuestionPage
                            idx={idx}
                            answers={answers}
                            clubDetailQuestions={detailQuestions}
                            onAnswerChange={handleAnswerChange}
                            containerStyle={applyFormContainer(idx)}
                        />
                    )}

                    {idx < applyData.length - 1 && (
                        <div css={nextButtonContainer}>
                            <Button variant="primary" onClick={handleNext}>
                                다음
                            </Button>
                        </div>
                    )}
                </div>
                {isDesktop ? (
                    <ClubSubmitCard
                        clubName={clubData.title}
                        tag={clubData.tag}
                        deadline={calculateDeadline}
                        completedQuestions={completedQuestions}
                        totalQuestions={allQuestions.length}
                        deadlineColor={diffDay > 7 ? theme.colors.gray[300] : theme.colors.red[800]}
                        onSubmit={handleSubmit}
                    />
                ) : (
                    <div css={submitButtonContainer}>
                        <Button
                            variant="primary"
                            sx={{ width: '100%' }}
                            disabled={completedQuestions !== allQuestions.length}
                            onClick={handleSubmit}
                        >
                            제출하기
                        </Button>
                    </div>
                )}
            </div>

            <SubmitDialog
                open={isSubmitDialogOpen}
                onConfirm={handleConfirmSubmit}
                onClose={() => setIsSubmitDialogOpen(false)}
            />
        </div>
    );
}

export { ClubApplyPage };
