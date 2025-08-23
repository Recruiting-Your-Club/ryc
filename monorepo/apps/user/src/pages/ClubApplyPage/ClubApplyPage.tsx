import type {
    ApplicationSubmissionResponse,
    PersonalInfoQuestionType,
    QuestionType,
} from '@api/domain/announcement/types';
import { announcementQueries } from '@api/queryFactory';
import { useSuspenseQuery } from '@tanstack/react-query';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useFileUpload, useRouter } from '@ssoc/hooks';
import { Avatar, Button, Text, useToast } from '@ssoc/ui';

import { HttpError } from '../../api/common/httpError';
import { usePostApplicationAnswers } from '../../api/hooks';
import { ClubNavigation, ClubSubmitCard, QuestionDropdown, SubmitDialog } from '../../components';
import { BASE_URL } from '../../constants/api';
import { useClubStore } from '../../stores';
import { useApplicationStore } from '../../stores';
import { getCategory } from '../../utils/changeCategory';
import {
    applyFormContainer,
    clubApplyPage,
    clubApplyPageMainContainer,
    clubApplyTabContainer,
    clubLogoAndNameContainer,
    clubNameContainer,
    mobileQuestionStatus,
    s_submitButtonSx,
    submitButtonContainer,
    submitCardContainer,
    svgContainer,
} from './ClubApplyPage.style';
import type { ValidationKey } from './constants';
import { VALIDATION_PATTERNS } from './constants';
import { ClubApplyDetailQuestionPage } from './DetailQuestionPage';
import { ClubApplyPersonalInfoPage } from './PersonalInfoPage';
import type { Answer, PageAnswer } from './types';
import {
    getErrorMessage,
    getPersonalQuestionLabel,
    getValidationError,
    makeAnsewerDataForSubmit,
    updateAnswers,
} from './utils';

function ClubApplyPage() {
    // prop destruction
    // lib hooks
    const { announcementId } = useParams<{ announcementId: string }>();
    const { clubName, clubLogo, clubCategory, clubField, applicationPeriod } = useClubStore();
    const { getAnswers, setAnswers: setApplicationAnswers } = useApplicationStore();
    const applicationAnswers = getAnswers(announcementId || '');
    const { goTo } = useRouter();
    const { toast } = useToast();
    const { uploadFiles, isLoading: isFileUploading } = useFileUpload(BASE_URL);
    // query hooks
    const { data: applicationForm } = useSuspenseQuery(
        announcementQueries.getApplicationForm(announcementId || ''),
    );
    const { mutate: submitApplication, isPending: isSubmitting } = usePostApplicationAnswers({
        announcementId: announcementId || '',
        onSuccess: (response: ApplicationSubmissionResponse) => {
            setIsSubmitDialogOpen(false);
            goTo(`success/${response.applicantId}/${response.applicationId}`);
        },
        onError: (error) => {
            // 500 에러인 경우 전역 처리에 위임
            if (error instanceof HttpError && error.statusCode === 500) {
                setIsSubmitDialogOpen(false);
                return;
            }
            toast.error('제출에 실패했어요.');
            setIsSubmitDialogOpen(false);
        },
    });

    // initial values
    // 사전질문 데이터

    const clubPersonalQuestions = useMemo(
        () =>
            applicationForm?.personalInfoQuestionTypes?.map((question) => {
                return {
                    id: question,
                    label: getPersonalQuestionLabel(question),
                    type: question as PersonalInfoQuestionType,
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

    const handleFileUpload = async (
        questionId: string,
        questionTitle: string,
        questionType: string,
        files: File[],
    ) => {
        try {
            if (files.length === 0) {
                handleAnswerChange(questionId, questionTitle, '');
                return;
            }

            const fileMetadataIds = await uploadFiles(files, questionType);
            const value = fileMetadataIds.join(',');
            handleAnswerChange(questionId, questionTitle, value);

            toast.success(`${files.length}개의 파일이 성공적으로 업로드되었습니다.`);
        } catch (error) {
            console.error('File upload failed:', error);
            toast.error('파일 업로드에 실패했습니다.');
        }
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

            switch (question?.type) {
                case 'MULTIPLE_CHOICE': {
                    const currentOptionIds = existingAnswer?.optionIds || [];
                    const isCurrentlyChecked = currentOptionIds.includes(value);

                    const newOptionIds = isCurrentlyChecked
                        ? currentOptionIds.filter((id) => id !== value)
                        : [...currentOptionIds, value];

                    const newAnswer: Answer = {
                        id: questionId,
                        value: newOptionIds.join(','),
                        questionTitle,
                        pageAnswerType: 'detail',
                        questionType: question.type,
                        optionIds: newOptionIds,
                    };

                    newAnswers = updateAnswers(prev, existingAnswer, newAnswer, questionTitle);
                    break;
                }

                case 'SINGLE_CHOICE': {
                    const newAnswer: Answer = {
                        id: questionId,
                        value: optionText || value,
                        questionTitle,
                        pageAnswerType: 'detail',
                        questionType: question.type,
                        optionIds: [value],
                    };

                    newAnswers = updateAnswers(prev, existingAnswer, newAnswer, questionTitle);
                    break;
                }

                case 'PROFILE_IMAGE':
                case 'FILE': {
                    const newAnswer: Answer = {
                        id: questionId,
                        value: value,
                        questionTitle,
                        pageAnswerType: 'personal',
                        questionType: question.type,
                    };

                    newAnswers = updateAnswers(prev, existingAnswer, newAnswer, questionTitle);
                    break;
                }

                default: {
                    // 일반 텍스트 입력인 경우
                    const newAnswer: Answer = {
                        id: questionId,
                        value,
                        questionTitle,
                        pageAnswerType: clubPersonalInfoQuestions.some(
                            (question) => question.label === questionTitle,
                        )
                            ? ('personal' as PageAnswer)
                            : ('detail' as PageAnswer),
                        questionType: question?.type as QuestionType | PersonalInfoQuestionType,
                    };

                    newAnswers = updateAnswers(prev, existingAnswer, newAnswer, questionTitle);
                    break;
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
                    announcementId={announcementId || ''}
                    answers={answers}
                    clubPersonalQuestions={clubPersonalInfoQuestions}
                    onAnswerChange={handleAnswerChange}
                    onFileUpload={handleFileUpload}
                    containerStyle={applyFormContainer}
                    getValidationError={getValidationError}
                    getErrorMessage={getErrorMessage}
                    touched={touched}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    questionRefs={questionRefs}
                    isFileUploading={isFileUploading}
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

    useEffect(() => {
        if (applicationAnswers.length > 0) {
            setAnswers(applicationAnswers);
        }
    }, [applicationAnswers]);

    return (
        <div css={clubApplyPage}>
            <div css={clubApplyPageMainContainer}>
                <div css={clubLogoAndNameContainer}>
                    {clubLogo ? (
                        <img src={clubLogo} alt="로고" css={svgContainer} />
                    ) : (
                        <Avatar
                            shape="square"
                            size="xl"
                            radius="10px"
                            imageURL={clubLogo}
                            imageName="logo"
                        />
                    )}
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
                    field={clubField}
                    deadline={applicationPeriod.endDate}
                    personalQuestions={clubPersonalInfoQuestions}
                    detailQuestions={detailQuestions}
                    completedQuestionsCount={completedQuestions}
                    requiredQuestionsCount={requiredQuestionsCount}
                    onSubmit={handleSubmit}
                    answers={answers}
                    logo={clubLogo}
                    isSubmitting={isSubmitting}
                    onQuestionFocus={handleQuestionFocus}
                    requiredQuestionsCompleted={requiredQuestionsCompleted}
                    allQuestionsCount={allQuestions.length}
                />
            </div>

            <div css={submitButtonContainer}>
                <Button
                    variant="primary"
                    size="full"
                    loading={isSubmitting}
                    disabled={
                        !(
                            requiredQuestionsCompleted || completedQuestions === allQuestions.length
                        ) || isSubmitting
                    }
                    onClick={handleSubmit}
                    sx={s_submitButtonSx}
                >
                    제출하기
                </Button>
            </div>

            <SubmitDialog
                open={isSubmitDialogOpen}
                isSubmitting={isSubmitting}
                onConfirm={handleConfirmSubmit}
                onClose={() => setIsSubmitDialogOpen(false)}
            />
        </div>
    );
}

export default ClubApplyPage;
