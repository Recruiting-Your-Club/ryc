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
import { VALIDATION_PATTERNS } from './constants';
import { useParams } from 'react-router-dom';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { announcementQueries } from '@api/queryFactory';
import { useClubStore } from '@stores/clubStore';
import { useApplicationStore } from '@stores/applicationStore';
import { getCategory } from '@utils/changeCategory';
import { ClubApplyLoadingPage } from '@pages/LoadingPage';
import { useRouter } from '@hooks/useRouter';
import {
    getErrorMessage,
    getPersonalQuestionLabel,
    getValidationError,
    makeAnsewerDataForSubmit,
} from './utils';
import { postApplicationAnswers } from '@api/domain/announcement/announcement';
import { ApplicationSubmissionRequest } from '@api/domain/announcement/types';

function ClubApplyPage() {
    // prop destruction
    // lib hooks
    const { announcementId } = useParams<{ announcementId: string }>();
    const { clubName, clubLogo, clubCategory, clubField, applicationPeriod } = useClubStore();
    const { getAnswers, setAnswers: setApplicationAnswers } = useApplicationStore();
    const applicationAnswers = getAnswers(announcementId || '');
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
    const { mutate: submitApplication, isPending: isSubmitting } = useMutation({
        mutationFn: (data: ApplicationSubmissionRequest) =>
            postApplicationAnswers(announcementId || '', data),
        onSuccess: () => {
            setIsSubmitDialogOpen(false);
            goTo(`success`);
        },
        onError: (error) => {
            console.error('지원서 제출 실패:', error);
            setIsSubmitDialogOpen(false);
        },
    });

    // calculated values
    // 필수 질문 개수 계산
    const requiredQuestionsCount = useMemo(() => {
        return allQuestions.filter((question) => question.isRequired).length;
    }, [allQuestions]);

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

    const handleAnswerChange = (
        questionId: string,
        questionTitle: string,
        value: string,
        optionText?: string,
    ) => {
        setAnswers((prev) => {
            const existingAnswer = prev.find((answer) => answer.questionTitle === questionTitle);
            const question = clubPersonalInfoQuestions.find(
                (question) => question.label === questionTitle,
            );

            let newAnswers: Answer[];

            // 체크박스인 경우
            if (question?.type === 'MULTIPLE_CHOICE') {
                const currentOptionIds = existingAnswer?.optionIds || [];
                const isCurrentlyChecked = currentOptionIds.includes(value);

                let newOptionIds: string[];

                if (isCurrentlyChecked) {
                    // 체크 해제
                    newOptionIds = currentOptionIds.filter((id) => id !== value);
                } else {
                    // 체크 추가
                    newOptionIds = [...currentOptionIds, value];
                }

                // value는 optionIds를 쉼표로 연결한 문자열로 설정
                const newValues = newOptionIds.join(',');

                const newAnswer: Answer = {
                    id: questionId,
                    value: newValues,
                    questionTitle,
                    type: 'detail',
                    optionIds: newOptionIds,
                };

                if (existingAnswer) {
                    newAnswers = prev.map((answer) =>
                        answer.questionTitle === questionTitle ? newAnswer : answer,
                    );
                } else {
                    newAnswers = [...prev, newAnswer];
                }
            }
            // 라디오 버튼인 경우
            else if (question?.type === 'SINGLE_CHOICE') {
                const newAnswer: Answer = {
                    id: questionId,
                    value: optionText || value,
                    questionTitle,
                    type: 'detail',
                    optionIds: [value],
                };

                if (existingAnswer) {
                    newAnswers = prev.map((answer) =>
                        answer.questionTitle === questionTitle ? newAnswer : answer,
                    );
                } else {
                    newAnswers = [...prev, newAnswer];
                }
            }
            // 일반 텍스트 입력인 경우
            else {
                const newAnswer: Answer = {
                    id: questionId,
                    value,
                    questionTitle,
                    type: clubPersonalInfoQuestions.some(
                        (question) => question.label === questionTitle,
                    )
                        ? 'personal'
                        : 'detail',
                };

                if (existingAnswer) {
                    newAnswers = prev.map((answer) =>
                        answer.questionTitle === questionTitle ? newAnswer : answer,
                    );
                } else {
                    newAnswers = [...prev, newAnswer];
                }
            }

            setApplicationAnswers(announcementId || '', newAnswers);

            return newAnswers;
        });
    };

    const handleSubmit = () => {
        setIsSubmitDialogOpen(true);
    };

    const handleConfirmSubmit = () => {
        const answerData = makeAnsewerDataForSubmit(answers);
        submitApplication(answerData);
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
        if (clubPersonalInfoQuestions.length > 0 && applicationAnswers.length > 0) {
            // applicationStore에 저장된 답변으로 폼 초기화
            setAnswers(applicationAnswers);
        }
    }, [clubPersonalInfoQuestions, applicationAnswers]);

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
                        !(
                            requiredQuestionsCompleted || completedQuestions === allQuestions.length
                        ) || isSubmitting
                    }
                    onClick={handleSubmit}
                    sx={s_submitButtonSx}
                >
                    {isSubmitting ? '제출중...' : '제출하기'}
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
