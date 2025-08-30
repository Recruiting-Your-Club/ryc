import type {
    ApplicationSubmissionResponse,
    PersonalInfoQuestionType,
    QuestionType,
} from '@api/domain/announcement/types';
import { announcementQueries, clubQueries } from '@api/queryFactory';
import type { ErrorWithStatusCode } from '@pages/ErrorFallbackPage/types';
import { useSuspenseQuery } from '@tanstack/react-query';
import { returnErrorMessage } from '@utils/getErrorMessage';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { useFileUpload, useRouter } from '@ssoc/hooks';
import { Avatar, Button, Text, useToast } from '@ssoc/ui';

import { HttpError } from '../../api/common/httpError';
import { usePostApplicationAnswers } from '../../api/hooks';
import {
    ClubNavigation,
    ClubSubmitCard,
    ErrorDialog,
    QuestionDropdown,
    SubmitDialog,
} from '../../components';
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
    const { clubCategory, clubField, applicationPeriod, setClubName } = useClubStore();
    const { getAnswers, setAnswers: setApplicationAnswers, updateFiles } = useApplicationStore();
    const applicationAnswers = getAnswers(announcementId || '');
    const { goTo } = useRouter();
    const { clubId } = useLocation().state as { clubId: string };
    const { toast } = useToast();
    const { uploadFiles, isLoading: isFileUploading } = useFileUpload(BASE_URL);
    // query hooks
    const { data: applicationForm } = useSuspenseQuery(
        announcementQueries.getApplicationForm(announcementId || ''),
    );
    const { data: clubData } = useSuspenseQuery(clubQueries.getClub(clubId));
    const { mutate: submitApplication, isPending: isSubmitting } = usePostApplicationAnswers({
        announcementId: announcementId || '',
        onSuccess: (response: ApplicationSubmissionResponse) => {
            setIsSubmitDialogOpen(false);
            goTo(`success/${response.applicantId}/${response.applicationId}`);
        },
        onError: (error) => {
            setIsSubmitDialogOpen(false);

            if (error instanceof HttpError && error.statusCode === 500) {
                setErrorDialogOpen(true);
                return;
            } else if (error instanceof HttpError && error.statusCode === 409) {
                const errorResponse = error.errorResponse as { code?: string; message?: string };

                if (errorResponse?.code === 'DUPLICATE_APPLICATION') {
                    toast.error('이미 해당 공고에 지원한 이메일입니다.');
                    return;
                }
            }

            const err = error as ErrorWithStatusCode;
            if (err.response?.errors[0].message || err.message) {
                toast(returnErrorMessage(error as ErrorWithStatusCode), {
                    type: 'error',
                    toastTheme: 'colored',
                });
                return;
            }

            toast.error('제출에 실패했어요.');
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
    const [errorDialogOpen, setErrorDialogOpen] = useState<boolean>(false);

    //이메일 인증 검증 여부
    const [isEmailVerified, setIsEmailVerified] = useState(false);

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
                if (question.type === 'EMAIL') {
                    if (VALIDATION_PATTERNS[question.label as ValidationKey]) {
                        if (getValidationError(question.label, answer.value)) return false;
                    }
                    // 인증 여부 반영
                    return isEmailVerified;
                }
                if (VALIDATION_PATTERNS[question.label as ValidationKey]) {
                    return !getValidationError(question.label, answer.value);
                }
                return true;
            });
    }, [answers, allQuestions, getValidationError, isEmailVerified]);

    // 제출 버튼 disabled 계산에 반영
    const isSubmitDisabled = useMemo(() => {
        const baseReady = requiredQuestionsCompleted || completedQuestions === allQuestions.length;
        return isSubmitting || !baseReady;
    }, [isSubmitting, requiredQuestionsCompleted, completedQuestions, allQuestions.length]);

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
            updateFiles(announcementId || '', questionId, files);

            if (files.length === 0) {
                handleAnswerChange(questionId, questionTitle, '');
                return;
            }

            const fileMetadataIds = await uploadFiles(files, questionType);
            const value = fileMetadataIds.map((result) => result.fileMetadataId).join(',');
            handleAnswerChange(questionId, questionTitle, value);

            toast.success(`${files.length}개의 파일이 성공적으로 업로드되었습니다.`);
        } catch (error) {
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
                        questionTitle: questionTitle,
                        pageAnswerType: 'detail',
                        questionType: question.type,
                        optionIds: newOptionIds,
                    };

                    newAnswers = updateAnswers(prev, existingAnswer, newAnswer, questionId);
                    break;
                }

                case 'SINGLE_CHOICE': {
                    const newAnswer: Answer = {
                        id: questionId,
                        value: optionText || value,
                        questionTitle: questionTitle,
                        pageAnswerType: 'detail',
                        questionType: question.type,
                        optionIds: [value],
                    };

                    newAnswers = updateAnswers(prev, existingAnswer, newAnswer, questionId);
                    break;
                }

                case 'PROFILE_IMAGE':
                case 'FILE': {
                    const newAnswer: Answer = {
                        id: questionId,
                        value: value,
                        questionTitle: questionTitle,
                        pageAnswerType: 'personal',
                        questionType: question.type,
                    };

                    newAnswers = updateAnswers(prev, existingAnswer, newAnswer, questionId);
                    break;
                }

                default: {
                    // 일반 텍스트 입력인 경우
                    const newAnswer: Answer = {
                        id: questionId,
                        value,
                        questionTitle: questionTitle,
                        pageAnswerType: clubPersonalInfoQuestions.some(
                            (question) => question.label === questionTitle,
                        )
                            ? ('personal' as PageAnswer)
                            : ('detail' as PageAnswer),
                        questionType: question?.type as QuestionType | PersonalInfoQuestionType,
                    };

                    newAnswers = updateAnswers(prev, existingAnswer, newAnswer, questionId);
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
        const verifyCode = sessionStorage.getItem('email_verification_token') ?? '';
        submitApplication({ data: answerData, verifyCode: verifyCode });
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
                    onEmailVerifiedChange={setIsEmailVerified}
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
        const count = allQuestions.reduce((acc, q) => {
            const answer = answers.find((a) => a.questionTitle === q.label);

            // 값이 없으면 미완료
            if (!answer || !answer.value.trim()) return acc;

            // EMAIL: 형식 에러면 미완료, 형식 OK여도 인증 안 됐으면 미완료
            if (q.type === 'EMAIL') {
                if (VALIDATION_PATTERNS[q.label as ValidationKey]) {
                    if (getValidationError(q.label, answer.value)) return acc;
                }
                return acc + (isEmailVerified ? 1 : 0);
            }

            // 그 외: 패턴 있으면 패턴 검증 통과해야 완료
            if (VALIDATION_PATTERNS[q.label as ValidationKey]) {
                return acc + (!getValidationError(q.label, answer.value) ? 1 : 0);
            }

            // 패턴 없으면 값만 있어도 완료
            return acc + 1;
        }, 0);
        setCompletedQuestions(count);
    }, [answers, allQuestions, isEmailVerified, getValidationError]);

    useEffect(() => {
        if (applicationAnswers.length > 0) {
            setAnswers(applicationAnswers);
        }
    }, [applicationAnswers]);

    useEffect(() => {
        setClubName(clubData?.name ?? '');
    }, [clubData]);

    return (
        <div css={clubApplyPage}>
            <div css={clubApplyPageMainContainer}>
                <div css={clubLogoAndNameContainer}>
                    {clubData?.representativeImage?.url ? (
                        <img
                            src={clubData?.representativeImage?.url}
                            alt="로고"
                            css={svgContainer}
                        />
                    ) : (
                        <Avatar
                            shape="square"
                            size="xl"
                            radius="10px"
                            imageURL={clubData?.representativeImage?.url ?? ''}
                            imageName="logo"
                        />
                    )}
                    <div css={clubNameContainer}>
                        <Text type="h3Semibold">{clubData?.name}</Text>
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
                    clubName={clubData?.name ?? ''}
                    category={clubData?.category ?? ''}
                    field={clubField}
                    deadline={applicationPeriod.endDate}
                    personalQuestions={clubPersonalInfoQuestions}
                    detailQuestions={detailQuestions}
                    completedQuestionsCount={completedQuestions}
                    requiredQuestionsCount={requiredQuestionsCount}
                    onSubmit={handleSubmit}
                    answers={answers}
                    logo={clubData?.representativeImage?.url ?? ''}
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
                    disabled={isSubmitDisabled}
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
            <ErrorDialog
                open={errorDialogOpen}
                handleClose={() => setErrorDialogOpen(false)}
                errorStatusCode={500}
            />
        </div>
    );
}

export default ClubApplyPage;
