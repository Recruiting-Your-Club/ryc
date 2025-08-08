import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
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
    s_submitButtonSx,
} from './ClubApplyPage.style';
import { Text, Button } from '@components/_common/';
import { ClubSubmitCard, SubmitDialog, ClubNavigation, QuestionDropdown } from '@components';
import { ClubApplyPersonalInfoPage } from './PersonalInfoPage';
import { ClubApplyDetailQuestionPage } from './DetailQuestionPage';
import type { Answer, QuestionType } from './types';
import type { ValidationKey } from './constants';
import { ERROR_MESSAGES, VALIDATION_PATTERNS } from './constants';
import { useParams } from 'react-router-dom';
import { useSuspenseQuery } from '@tanstack/react-query';
import { announcementQueries } from '@api/queryFactory';
import { useClubStore } from '@stores/clubStore';
import { useApplicationStore } from '@stores/applicationStore';
import { getCategory } from '@utils/changeCategory';
import { ClubApplyLoadingPage } from '@pages/LoadingPage';
import { useRouter } from '@hooks/useRouter';
import { getPersonalQuestionLabel } from './utils';

function ClubApplyPage() {
    // prop destruction
    // lib hooks
    const { announcementId } = useParams<{ announcementId: string }>();
    const { clubName, clubLogo, clubCategory, clubField, applicationPeriod } = useClubStore();
    const { userName, userEmail, setUserName, setUserEmail } = useApplicationStore();
    const { goTo } = useRouter();
    // query hooks
    const { data: applicationForm, isLoading: formLoading } = useSuspenseQuery(
        announcementQueries.getApplicationForm(announcementId || ''),
    );

    // initial values
    // 사전질문 데이터
    const clubPersonalQuestions = useMemo(
        () =>
            applicationForm?.personalInfoQuestions.map((question) => {
                return {
                    id: question,
                    label: getPersonalQuestionLabel(question),
                    type: 'SHORT_ANSWER' as QuestionType,
                    isRequired: true,
                };
            }),
        [applicationForm],
    );

    const clubPreQuestions = useMemo(
        () =>
            applicationForm?.preQuestions?.map((question) => ({
                id: question.id,
                label: question.label,
                type: question.type as QuestionType,
                options: question.options,
                isRequired: question.isRequired,
            })) || [],
        [applicationForm],
    );

    const clubPersonalInfoQuestions = [...clubPersonalQuestions, ...clubPreQuestions];

    // 자기소개서 질문 데이터
    const detailQuestions = useMemo(
        () =>
            applicationForm?.applicationQuestions?.map((question) => ({
                id: question.id,
                label: question.label,
                description: question.description,
                type: question.type as QuestionType,
                isRequired: question.isRequired,
            })) || [],
        [applicationForm],
    );

    const allQuestions = useMemo(
        () => [...clubPersonalInfoQuestions, ...detailQuestions],
        [clubPersonalInfoQuestions, detailQuestions],
    );

    // state, ref, querystring hooks
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [completedQuestions, setCompletedQuestions] = useState<number>(0);
    const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState<boolean>(false);
    const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
    const questionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const [activeTab, setActiveTab] = useState<string>('사전질문');

    // calculated values

    // 필수 질문 개수 계산
    const requiredQuestionsCount = useMemo(() => {
        return allQuestions.filter((question) => question.isRequired).length;
    }, [allQuestions]);

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

    // 필수 질문 완료 여부 계산
    const requiredQuestionsCompleted = useMemo(() => {
        return allQuestions
            .filter((question) => question.isRequired)
            .every((question) => {
                const answer = answers.find((answer) => answer.questionTitle === question.label);
                if (!answer || !answer.value.trim()) return false;
                if (VALIDATION_PATTERNS[question.label as ValidationKey]) {
                    return !getValidationError(question.label, answer.value);
                }
                return true;
            });
    }, [answers, allQuestions, getValidationError]);

    const allocateFocus = (questionTitle: string) => {
        const element = questionRefs.current[questionTitle];
        if (element) {
            element.focus();
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

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
            const question = clubPersonalInfoQuestions.find(
                (question) => question.label === questionTitle,
            );

            // 체크박스인 경우
            if (question?.type === 'MULTIPLE_CHOICE') {
                const currentValues = existingAnswer?.value?.split(',') || [];
                const isCurrentlyChecked = currentValues.includes(value);
                const newValues = isCurrentlyChecked
                    ? currentValues.filter((currentValue) => currentValue !== value)
                    : [...currentValues, value];
                value = newValues.join(',');
            }

            // 이름과 이메일을 applicationStore에 자동으로 저장
            if (questionTitle === '이름') {
                setUserName(value);
            } else if (questionTitle === '이메일') {
                setUserEmail(value);
            }

            const newAnswer: Answer = {
                id: questionTitle,
                value,
                questionTitle,
                type: clubPersonalInfoQuestions.some((question) => question.label === questionTitle)
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
        // TODO: 실제 제출 로직 구현
        console.log('제출된 답변:', answers);
        setIsSubmitDialogOpen(false);
        goTo(`success`);
    };

    const handleQuestionFocus = (questionTitle: string, tab: string) => {
        if (activeTab !== tab) {
            setActiveTab(tab);
            setTimeout(() => {
                allocateFocus(questionTitle);
            }, 50);
        } else {
            allocateFocus(questionTitle);
        }
    };

    const navigationItem = [
        {
            title: '사전질문',
            page: (
                <ClubApplyPersonalInfoPage
                    answers={answers}
                    clubPersonalQuestions={clubPersonalInfoQuestions}
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
            width: '5.8rem',
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
            width: '7.9rem',
        },
    ];

    // effects
    useEffect(() => {
        const completedCount = answers.filter((answer) => {
            // 값이 비어있는 경우 제외
            if (!answer.value.trim()) return false;

            // 유효성 검사가 필요한 경우
            if (VALIDATION_PATTERNS[answer.questionTitle as ValidationKey]) {
                return !getValidationError(answer.questionTitle, answer.value);
            }

            return true;
        }).length;

        setCompletedQuestions(completedCount);
    }, [answers, getValidationError]);

    // applicationStore의 기존 값으로 폼 초기화
    useEffect(() => {
        if (clubPersonalInfoQuestions.length > 0) {
            const nameQuestion = clubPersonalInfoQuestions.find(
                (question) => question.label === '이름',
            );
            const emailQuestion = clubPersonalInfoQuestions.find(
                (question) => question.label === '이메일',
            );

            // 이름이 있으면 기존 값으로 설정
            if (
                nameQuestion &&
                userName &&
                !answers.find((answer) => answer.questionTitle === '이름')
            ) {
                handleAnswerChange('이름', userName);
            }

            // 이메일이 있으면 기존 값으로 설정
            if (
                emailQuestion &&
                userEmail &&
                !answers.find((answer) => answer.questionTitle === '이메일')
            ) {
                handleAnswerChange('이메일', userEmail);
            }
        }
    }, [clubPersonalInfoQuestions, userName, userEmail]);

    if (formLoading) {
        return <ClubApplyLoadingPage />;
    }

    return (
        <div css={clubApplyPage}>
            <div css={clubApplyPageMainContainer}>
                <div css={clubLogoAndNameContainer}>
                    {clubLogo && <img src={clubLogo} alt="로고" css={svgContainer} />}
                    <div css={clubNameContainer}>
                        <Text type="h3Semibold">{clubName}</Text>
                        <Text type="subCaptionRegular" color="helper" textAlign="left">
                            {getCategory(clubCategory)}
                        </Text>
                    </div>
                </div>

                <div css={mobileQuestionStatus}>
                    <QuestionDropdown
                        personalQuestions={clubPersonalInfoQuestions}
                        detailQuestions={detailQuestions}
                        completedQuestionsCount={completedQuestions}
                        answers={answers}
                        onQuestionFocus={handleQuestionFocus}
                        requiredQuestionsCompleted={requiredQuestionsCompleted}
                        allQuestionsCount={allQuestions.length}
                    />
                </div>
                <div css={clubApplyTabContainer}>
                    <ClubNavigation
                        navigationItem={navigationItem}
                        controlledActive={activeTab}
                        onActiveChange={setActiveTab}
                    />
                </div>
            </div>

            <div css={submitCardContainer}>
                <ClubSubmitCard
                    clubName={clubName}
                    category={clubCategory}
                    description={clubField}
                    deadline={applicationPeriod.endDate}
                    personalQuestions={clubPersonalInfoQuestions}
                    detailQuestions={detailQuestions}
                    completedQuestionsCount={completedQuestions}
                    requiredQuestionsCount={requiredQuestionsCount}
                    onSubmit={handleSubmit}
                    answers={answers}
                    logo={clubLogo}
                    onQuestionFocus={handleQuestionFocus}
                    requiredQuestionsCompleted={requiredQuestionsCompleted}
                    allQuestionsCount={allQuestions.length}
                />
            </div>

            <div css={submitButtonContainer}>
                <Button
                    variant="primary"
                    size="full"
                    disabled={
                        !(requiredQuestionsCompleted || completedQuestions === allQuestions.length)
                    }
                    onClick={handleSubmit}
                    sx={s_submitButtonSx}
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

export default ClubApplyPage;
