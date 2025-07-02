import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import dayjs from 'dayjs';
import {
    clubApplyPage,
    clubApplyPageMainContainer,
    clubLogoAndNameContainer,
    clubNameContainer,
    svgContainer,
    submitButtonContainer,
    mobileQuestionStatus,
    applyFormContainer,
    submitCardContainer,
    clubApplyTabContainer,
} from './ClubApplyPage.style';
import Ryc from '@assets/images/Ryc.svg';
import { Text, Button } from '@components/_common/';
import { ClubSubmitCard, SubmitDialog, ClubNavigation, QuestionDropdown } from '@components';
import { ClubApplyPersonalInfoPage } from './PersonalInfoPage';
import { ClubApplyDetailQuestionPage } from './DetailQuestionPage';
import type { Answer, QuestionType } from './types';
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
            end: '2025-06-29T03:13:11.173Z',
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
    application: {
        applicationQuestions: [
            {
                type: 'LONG_ANSWER',
                label: 'EN#에 지원한 동기가 무엇인가요?',
                description: 'EN#에 지원하게 된 계기와 동기를 자유롭게 작성해주세요.',
                isRequired: true,
                options: [],
            },
            {
                type: 'LONG_ANSWER',
                label: 'EN#에서 기대하는 활동을 작성해주세요.',
                description: 'EN#에서 하고 싶은 활동이나 목표를 자유롭게 작성해주세요.',
                isRequired: true,
                options: [],
            },
            {
                type: 'LONG_ANSWER',
                label: '프로젝트 경험이 있다면 자세히 설명해주세요.',
                description: '참여했던 프로젝트의 내용, 역할, 기간 등을 자세히 작성해주세요.',
                isRequired: false,
                options: [],
            },
        ],
        preQuestions: [
            {
                type: 'SHORT_ANSWER',
                label: '이름',
                isRequired: true,
                options: [],
            },
            {
                type: 'SHORT_ANSWER',
                label: '생년월일',
                isRequired: true,
                options: [],
            },
            {
                type: 'SHORT_ANSWER',
                label: '전화번호',
                isRequired: true,
                options: [],
            },
            {
                type: 'SINGLE_CHOICE',
                label: '성별',
                isRequired: true,
                options: ['남', '여'],
            },
            {
                type: 'MULTIPLE_CHOICE',
                label: '전공',
                isRequired: true,
                options: ['소프트웨어학과', '컴퓨터공학과', '기타'],
            },
        ],
        personalInfoQuestions: ['STUDENT_ID', 'PROFILE_IMAGE'],
    },
};

function ClubApplyPage() {
    // prop destruction
    // lib hooks
    // initial values
    const deadline = dayjs(clubData.announcementPeriod[0].end).format('YYYY-MM-DD');
    // state, ref, querystring hooks
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [completedQuestions, setCompletedQuestions] = useState<number>(0);
    const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
    const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
    const questionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

    // 사전질문 데이터
    const clubPersonalQuestions = useMemo(
        () =>
            clubData.application.preQuestions.map((question) => ({
                id: question.label,
                questionTitle: question.label,
                type: question.type as QuestionType,
                options: question.options ?? [],
                isRequired: question.isRequired,
            })),
        [],
    );

    // 자기소개서 질문 데이터
    const detailQuestions = useMemo(
        () =>
            clubData.application.applicationQuestions.map((question) => ({
                id: question.label,
                questionTitle: question.label,
                description: question.description,
                isRequired: question.isRequired,
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

    // 필수 질문 개수 계산
    const requiredQuestionsCount = useMemo(() => {
        const allQuestions = [
            ...clubData.application.preQuestions,
            ...clubData.application.applicationQuestions,
        ];
        return allQuestions.filter((question) => question.isRequired).length;
    }, []);

    const getValidationError = useCallback((questionTitle: string, value: string): boolean => {
        if (!value.trim()) return false;
        const pattern = VALIDATION_PATTERNS[questionTitle as ValidationKey];
        return !pattern.test(value);
    }, []);

    const getErrorMessage = useCallback(
        (questionTitle: string, value: string): string | undefined => {
            return getValidationError(questionTitle, value)
                ? ERROR_MESSAGES[questionTitle as ValidationKey]
                : undefined;
        },
        [getValidationError],
    );
    // handlers
    const handleBlur = (questionTitle: string) => {
        setTouched((prev) => ({ ...prev, [questionTitle]: true }));
    };

    const handleFocus = (questionTitle: string) => {
        setTouched((prev) => ({ ...prev, [questionTitle]: false }));
    };

    const handleAnswerChange = (questionTitle: string, value: string) => {
        setAnswers((prev) => {
            const existingAnswer = prev.find((answer) => answer.questionTitle === questionTitle);
            const question = clubPersonalQuestions.find((q) => q.questionTitle === questionTitle);

            // 체크박스인 경우
            if (question?.type === 'MULTIPLE_CHOICE') {
                const currentValues = existingAnswer?.value?.split(',') || [];
                const isCurrentlyChecked = currentValues.includes(value);
                const newValues = isCurrentlyChecked
                    ? currentValues.filter((v) => v !== value)
                    : [...currentValues, value];
                value = newValues.join(',');
            }

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

    const handleQuestionFocus = (questionTitle: string) => {
        const element = questionRefs.current[questionTitle];
        if (element) {
            element.focus();
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    const navigationItem = [
        {
            title: '사전질문',
            page: (
                <ClubApplyPersonalInfoPage
                    answers={answers}
                    clubPersonalQuestions={clubPersonalQuestions}
                    onAnswerChange={handleAnswerChange}
                    containerStyle={applyFormContainer}
                    getValidationError={getValidationError}
                    getErrorMessage={getErrorMessage}
                    touched={touched}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    questionRefs={questionRefs}
                />
            ),
            width: '6rem',
        },
        {
            title: '자기소개서',
            page: (
                <ClubApplyDetailQuestionPage
                    answers={answers}
                    clubDetailQuestions={detailQuestions}
                    onAnswerChange={handleAnswerChange}
                    containerStyle={applyFormContainer}
                    touched={touched}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    questionRefs={questionRefs}
                />
            ),
            width: '6.5rem',
        },
    ];

    // effects
    useEffect(() => {
        const completedCount = answers.filter((answer) => {
            const question = allQuestions.find(
                (question) => question.questionTitle === answer.questionTitle,
            );
            // 필수 항목이 아닌 경우 제외
            if (!question?.isRequired) return false;

            // 값이 비어있는 경우 제외
            if (!answer.value.trim()) return false;

            // 유효성 검사가 필요한 경우
            if (VALIDATION_PATTERNS[answer.questionTitle as ValidationKey]) {
                return !getValidationError(answer.questionTitle, answer.value);
            }

            return true;
        }).length;

        setCompletedQuestions(completedCount);
    }, [answers, allQuestions, getValidationError]);

    return (
        <div css={clubApplyPage}>
            <div css={clubApplyPageMainContainer}>
                <div css={clubLogoAndNameContainer}>
                    <Ryc css={svgContainer} />
                    <div css={clubNameContainer}>
                        <Text type="h3Semibold">{clubData.title}</Text>
                        <Text type="subCaptionRegular" color="helper" textAlign="left">
                            {clubData.tag}
                        </Text>
                    </div>
                </div>

                <div css={mobileQuestionStatus}>
                    <QuestionDropdown
                        personalQuestions={clubPersonalQuestions}
                        detailQuestions={detailQuestions}
                        completedQuestionsCount={completedQuestions}
                        requiredQuestionsCount={requiredQuestionsCount}
                        answers={answers}
                        onQuestionFocus={handleQuestionFocus}
                    />
                </div>
                <div css={clubApplyTabContainer}>
                    <ClubNavigation navigationItem={navigationItem} />
                </div>
            </div>

            <div css={submitCardContainer}>
                <ClubSubmitCard
                    clubName={clubData.title}
                    tag={clubData.tag}
                    deadline={deadline}
                    personalQuestions={clubPersonalQuestions}
                    detailQuestions={detailQuestions}
                    completedQuestionsCount={completedQuestions}
                    requiredQuestionsCount={requiredQuestionsCount}
                    onSubmit={handleSubmit}
                    answers={answers}
                    onQuestionFocus={handleQuestionFocus}
                />
            </div>

            <div css={submitButtonContainer}>
                <Button
                    variant="primary"
                    size="full"
                    disabled={completedQuestions !== requiredQuestionsCount}
                    onClick={handleSubmit}
                    sx={{ height: '4rem' }}
                >
                    제출하기
                </Button>
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
