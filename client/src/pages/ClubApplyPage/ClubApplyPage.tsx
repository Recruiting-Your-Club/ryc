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
import type { Answer } from './types';
import type { ValidationKey } from './constants';
import { ERROR_MESSAGES, VALIDATION_PATTERNS } from './constants';

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

function ClubApplyPage() {
    // prop destruction
    // lib hooks
    // initial values

    // state, ref, querystring hooks
    const [pageIndex, setPageIndex] = useState<number>(0);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [completedQuestions, setCompletedQuestions] = useState<number>(0);
    const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);

    // 사전질문 데이터
    const clubPersonalQuestions = useMemo(
        () =>
            clubData.preQuestions[0].additionalQuestions.map((question) => ({
                id: question.title,
                questionTitle: question.title,
                type: question.category === 'MULTIPLE_CHOICE' ? 'boolean' : 'string',
                options: question.options ?? [],
            })),
        [],
    );

    // 자기소개서 질문 데이터
    const detailQuestions = useMemo(
        () =>
            clubData.questions.map((question) => ({
                id: question.title,
                questionTitle: question.title,
                description: question.description,
            })),
        [],
    );

    const allQuestions = useMemo(
        () => [...clubPersonalQuestions, ...detailQuestions],
        [clubPersonalQuestions, detailQuestions],
    );

    // form hooks
    // query hooks
    // calculated values

    const getValidationError = (questionTitle: string, value: string): boolean => {
        if (!value.trim()) return false;
        const pattern = VALIDATION_PATTERNS[questionTitle as ValidationKey];
        if (!pattern) return false;
        return !pattern.test(value);
    };

    const getErrorMessage = (questionTitle: string, value: string): string | undefined => {
        return getValidationError(questionTitle, value)
            ? ERROR_MESSAGES[questionTitle as ValidationKey]
            : undefined;
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
    const handleAnswerChange = (questionTitle: string, value: string) => {
        setAnswers((prev) => {
            const existingAnswer = prev.find((answer) => answer.questionTitle === questionTitle);

            const newAnswer: Answer = {
                id: questionTitle,
                value,
                questionTitle,
                type: clubPersonalQuestions.some(
                    (question) => question.questionTitle === questionTitle,
                )
                    ? 'personal'
                    : 'detail',
            };

            if (existingAnswer) {
                return prev.map((answer) =>
                    answer.questionTitle === questionTitle ? newAnswer : answer,
                );
            }

            return [...prev, newAnswer];
        });
    };
    const handleSubmit = () => {
        setIsSubmitDialogOpen(true);
    };

    const handleConfirmSubmit = () => {
        setIsSubmitDialogOpen(false);
    };

    const handleNext = () => {
        if (pageIndex < applyData.length - 1) {
            setPageIndex(pageIndex + 1);
        }
    };

    // effects
    useEffect(() => {
        const completedCount = answers.filter((answer) => {
            if (!answer.value.trim()) return false;

            if (VALIDATION_PATTERNS[answer.questionTitle as ValidationKey]) {
                return !getValidationError(answer.questionTitle, answer.value);
            }

            return true;
        }).length;

        setCompletedQuestions(completedCount);
    }, [answers]);

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
                                onClick={() => setPageIndex(data.index)}
                            >
                                {data.question}
                            </Button>
                        ))}
                        <Text
                            type="subCaptionRegular"
                            textAlign="right"
                            color={
                                completedQuestions === allQuestions.length ? 'primary' : 'warning'
                            }
                            sx={mobileQuestionStatus}
                        >
                            작성한 항목 ({completedQuestions} / {allQuestions.length})
                        </Text>
                    </div>
                    {/* 페이지 */}
                    {pageIndex === 0 ? (
                        <ClubApplyPersonalInfoPage
                            answers={answers}
                            clubPersonalQuestions={clubPersonalQuestions}
                            onAnswerChange={handleAnswerChange}
                            containerStyle={applyFormContainer(pageIndex)}
                            getValidationError={getValidationError}
                            getErrorMessage={getErrorMessage}
                        />
                    ) : (
                        <ClubApplyDetailQuestionPage
                            answers={answers}
                            clubDetailQuestions={detailQuestions}
                            onAnswerChange={handleAnswerChange}
                            containerStyle={applyFormContainer(pageIndex)}
                        />
                    )}

                    {pageIndex < applyData.length - 1 && (
                        <div css={nextButtonContainer}>
                            <Button variant="primary" onClick={handleNext}>
                                다음
                            </Button>
                        </div>
                    )}
                </div>
                <ClubSubmitCard
                    clubName={clubData.title}
                    tag={clubData.tag}
                    deadline={calculateDeadline}
                    completedQuestions={completedQuestions}
                    totalQuestions={allQuestions.length}
                    deadlineColor={diffDay > 7 ? theme.colors.gray[300] : theme.colors.red[800]}
                    onSubmit={handleSubmit}
                />
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
