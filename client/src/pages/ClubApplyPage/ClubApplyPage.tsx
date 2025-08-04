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
import Ryc from '@assets/images/Ryc.svg';
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
import { getDeadlineInfo } from '@utils/compareTime';

function ClubApplyPage() {
    // prop destruction
    // lib hooks
    const { announcementId } = useParams<{ announcementId: string }>();
    const { clubName, clubLogo, clubCategory, clubDescription, clubStatus, applicationPeriod } =
        useClubStore();

    // query hooks
    const { data: announcementDetail, isLoading: announcementLoading } = useSuspenseQuery({
        ...announcementQueries.getAnnouncementDetail(announcementId || ''),
    });

    const { data: applicationForm, isLoading: formLoading } = useSuspenseQuery({
        ...announcementQueries.getApplicationForm(announcementId || ''),
    });

    // initial values
    const { displayText } = getDeadlineInfo(applicationPeriod.endDate);

    // state, ref, querystring hooks
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [completedQuestions, setCompletedQuestions] = useState<number>(0);
    const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
    const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
    const questionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const [activeTab, setActiveTab] = useState<string>('사전질문');

    // 사전질문 데이터
    const clubPersonalQuestions = useMemo(
        () =>
            applicationForm?.preQuestions?.map((question: any) => ({
                id: question.id,
                questionTitle: question.label,
                type: question.type as QuestionType,
                options: question.options?.map((opt: any) => opt.option) ?? [],
                isRequired: question.isRequired,
            })) || [],
        [applicationForm],
    );

    // 자기소개서 질문 데이터
    const detailQuestions = useMemo(
        () =>
            applicationForm?.applicationQuestions?.map((question: any) => ({
                id: question.id,
                questionTitle: question.label,
                description: question.description || question.label,
                isRequired: question.isRequired,
            })) || [],
        [applicationForm],
    );

    const allQuestions = useMemo(
        () => [...clubPersonalQuestions, ...detailQuestions],
        [clubPersonalQuestions, detailQuestions],
    );

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
                const answer = answers.find(
                    (answer) => answer.questionTitle === question.questionTitle,
                );
                if (!answer || !answer.value.trim()) return false;
                if (VALIDATION_PATTERNS[question.questionTitle as ValidationKey]) {
                    return !getValidationError(question.questionTitle, answer.value);
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
            const question = clubPersonalQuestions.find(
                (question) => question.questionTitle === questionTitle,
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
        // TODO: 실제 제출 로직 구현
        console.log('제출된 답변:', answers);
        setIsSubmitDialogOpen(false);
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

    if (announcementLoading || formLoading) {
        return (
            <div css={clubApplyPage}>
                <Text>지원서 정보를 불러오는 중...</Text>
            </div>
        );
    }

    if (!announcementDetail || !applicationForm) {
        return (
            <div css={clubApplyPage}>
                <Text>지원서 정보를 찾을 수 없습니다.</Text>
            </div>
        );
    }

    return (
        <div css={clubApplyPage}>
            <div css={clubApplyPageMainContainer}>
                <div css={clubLogoAndNameContainer}>
                    <img src={clubLogo} alt="clubLogo" css={svgContainer} />
                    <div css={clubNameContainer}>
                        <Text type="h3Semibold">{clubName}</Text>
                        <Text type="subCaptionRegular" color="helper" textAlign="left">
                            {clubCategory}동아리
                        </Text>
                    </div>
                </div>

                <div css={mobileQuestionStatus}>
                    <QuestionDropdown
                        personalQuestions={clubPersonalQuestions}
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
                    clubName={announcementDetail.title}
                    tag={announcementDetail.target}
                    deadline={displayText}
                    personalQuestions={clubPersonalQuestions}
                    detailQuestions={detailQuestions}
                    completedQuestionsCount={completedQuestions}
                    requiredQuestionsCount={requiredQuestionsCount}
                    onSubmit={handleSubmit}
                    answers={answers}
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

export { ClubApplyPage };
