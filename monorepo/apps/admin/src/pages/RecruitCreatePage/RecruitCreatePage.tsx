import { useCreateAnnouncement } from '@api/hooks/useCreateAnnouncement';
import { ErrorDialog } from '@components';
import { BASE_URL } from '@constants/api';
import { INITIALRECRUITSTEP, TOTALRECRUITSTEPS } from '@constants/step';
import { useEditorImageUpload } from '@hooks/useEditorImageUpload';
import { useQuestion } from '@hooks/useQuestion';
import type { ErrorWithStatusCode } from '@pages/ErrorFallbackPage/types';
import { getErrorMessage } from '@utils/getErrorMessage';
import React, { act, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { generatePath, useLocation, useParams } from 'react-router-dom';

import { useFileUpload, useRouter } from '@ssoc/hooks';
import { Button, Dialog, Stepper, useFileUpLoader, useToast } from '@ssoc/ui';
import { useStepper } from '@ssoc/ui';

import { BasicInfoStep } from './BasicInfoStep/BasicInfoStep';
import { buildAnnouncementSubmitRequest } from './buildAnnouncementSubmitRequest';
import { DescriptionStepPage } from './DescriptionStep/DescriptionStep';
import { PersonalStatementStep } from './PersonalStatementStep/PersonalStatementStep';
import { PreivewStep } from './PreviewStep';
import {
    s_dialogContent,
    s_dialogHeader,
    s_prohibitDragArea,
    s_recruitCreatePageContainer,
    s_stepButtonContainer,
    s_stepComponent,
    s_stepWrapper,
} from './RecruitCreatePage.style';
import type { BasicInfoFields, Period, RecruitDetailInfo } from './types';

function RecruitCreatePage() {
    // prop destruction
    // lib hooks
    const { activeStep, next, prev, isFirst, isLast } = useStepper(
        TOTALRECRUITSTEPS,
        INITIALRECRUITSTEP,
    );

    const { removeHistoryAndGo } = useRouter();
    const { toast } = useToast();
    const { clubId } = useParams();

    const {
        questions,
        addQuestion,
        removeQuestion,
        updateQuestion,
        handleQuestionTypeChange,
        applicationQuestions,
        addApplicationQuestion,
        removeApplicationQuestion,
        updateApplicationQuestion,
    } = useQuestion();

    const location = useLocation();

    const { uploadFiles, isLoading: isFileUploading } = useFileUpload(BASE_URL);
    const { isUploading, handleContentChange } = useEditorImageUpload({
        location: 'ANNOUNCEMENT_EDITOR',
    });

    // initial values

    // state, ref, querystring hooks
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [errorDialogOpen, setErrorDialogOpen] = useState<boolean>(false);

    //공고 정보 상태 관리
    const [recruitDetailInfo, setRecruitDetailInfo] = useState<RecruitDetailInfo>({
        recruitmentSubject: '',
        recruitmentSummaryDescription: '',
        recruitmentNumber: '',
        activityPeriod: '',
        recruitmentField: '',
        recruitmentTarget: '',
        documentPeriod: { startDate: '', endDate: '' },
        documentResult: { startDate: '', endDate: '' },
        interviewSchedule: { startDate: '', endDate: '' },
        finalResult: { startDate: '', endDate: '' },
        tags: ['중앙동아리'],
    });

    //공고 상세 설명 글 상태 관리
    const [detailDescription, setDetailDescription] = useState<string>('');

    //공고 모집 관련 이미지 상태 관리
    const [recruitFiles, setRecruitFiles] = useState<File[]>([]);
    const [imageFileIds, setImageFileIds] = useState<string[]>([]);

    //체크박스를 통한 신원 정보 상태관리
    const [basicInfoFields, setBasicInfoFields] = useState<BasicInfoFields>({
        studentId: false,
        phone: false,
        photo: false,
    });

    //json 파싱 데이터
    const submitJson = useMemo(
        () =>
            buildAnnouncementSubmitRequest({
                recruitDetailInfo,
                basicInfoFields,
                preQuestions: questions,
                applicationQuestions,
                detailDescription,
                imageFileIds,
            }),
        [
            recruitDetailInfo,
            basicInfoFields,
            questions,
            applicationQuestions,
            detailDescription,
            imageFileIds,
        ],
    );

    // form hooks
    // query hooks
    const { mutate: postAnnouncement, isPending: isSubmitting } = useCreateAnnouncement({
        clubId: clubId!,
        onSuccess: ({ announcementId }) => {
            setIsDialogOpen(false);
            const successPath = generatePath(
                '/announcements/create/:clubId/success/:announcementId',
                { clubId: clubId ?? '', announcementId },
            );
            removeHistoryAndGo(successPath);
        },
        onError: (err) => {
            setIsDialogOpen(false);
            const error = err as ErrorWithStatusCode;
            if (error.statusCode === 500) {
                setErrorDialogOpen(true);
            } else if (error.response?.errors[0].message || error.message) {
                toast(getErrorMessage(error), { type: 'error', toastTheme: 'colored' });
            } else {
                toast('공고 등록에 실패했어요.', {
                    toastTheme: 'colored',
                    type: 'error',
                });
            }
        },
    });

    // calculated values
    const hasPeriod = (p: { startDate: string; endDate: string }) => !!p?.startDate && !!p?.endDate;

    //--------Step별 유효성 검사--------//
    //step1 검사
    const isDescriptionStepValid = useMemo(() => {
        return (
            recruitDetailInfo.recruitmentSubject.trim().length >= 2 &&
            recruitDetailInfo.recruitmentSubject.trim().length <= 200 &&
            recruitDetailInfo.recruitmentSummaryDescription.trim() !== '' &&
            hasPeriod(recruitDetailInfo.documentPeriod)
        );
    }, [
        recruitDetailInfo.recruitmentSubject,
        recruitDetailInfo.documentPeriod,
        recruitDetailInfo.recruitmentSummaryDescription,
    ]);

    //step2 감시
    const isBasicInfoStepValid = useMemo(() => {
        return questions.every((question) => {
            if (question.title.trim() === '') return false;

            if (question.type === 'multiple' || question.type === 'single') {
                if (!question.options || question.options.length === 0) return false;
                return question.options.every((option) => option.text.trim() !== '');
            }

            return true;
        });
    }, [questions]);

    //step3 검사
    const isPersonalStatementStepValid = useMemo(() => {
        return applicationQuestions.every((question) => {
            return question.title.trim() !== '';
        });
    }, [applicationQuestions]);

    //종합
    const isCurrentStepValid = () => {
        switch (activeStep) {
            case 0:
                return isDescriptionStepValid;
            case 1:
                return isBasicInfoStepValid;
            case 2:
                return isPersonalStatementStepValid;
            default:
                return true;
        }
    };
    //-----------------------------//

    // handlers
    const handleInputChange = (updateFields: Partial<RecruitDetailInfo>) => {
        setRecruitDetailInfo((prev) => ({
            ...prev,
            ...updateFields,
        }));
    };

    const handleDetailDescriptionChange = useCallback((html: string) => {
        handleContentChange(html, setDetailDescription);
    }, []);

    const handleFilesChage = useCallback(
        async (files: File[]) => {
            setRecruitFiles(files);

            try {
                if (!files.length) {
                    setImageFileIds([]);
                    return;
                }

                const ids = await uploadFiles(files, 'ANNOUNCEMENT_CREATE_IMAGE');
                setImageFileIds(ids.map((id) => id.fileMetadataId));
                toast.success(`${files.length}개의 파일이 성공적으로 업로드되었습니다.`);
            } catch (error) {
                setImageFileIds([]);
                console.error(error);
                toast.error('파일 업로드에 실패했습니다. 잠시 후 다시 시도해주세요.');
            }
        },
        [uploadFiles],
    );

    const handleNextClick = () => {
        if (isLast) {
            setIsDialogOpen(true);
        } else {
            next();
        }
    };

    const handleConfirmSubmit = () => {
        postAnnouncement(submitJson);
    };

    // effects
    useEffect(() => {
        containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }, [activeStep]);

    //FIX: 따로 컴포넌트로 빼기
    const stepComponent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <DescriptionStepPage
                        recruitDetailInfo={recruitDetailInfo}
                        recruitFiles={recruitFiles}
                        onChange={handleInputChange}
                        onFilesChange={handleFilesChage}
                        isFileUploading={isFileUploading}
                        detailDescription={detailDescription}
                        onDetailDescriptionChange={handleDetailDescriptionChange}
                    />
                );
            case 1:
                return (
                    <BasicInfoStep
                        infoFields={basicInfoFields}
                        setInfoFields={setBasicInfoFields}
                        questions={questions}
                        addQuestion={addQuestion}
                        removeQuestion={removeQuestion}
                        updateQuestion={updateQuestion}
                        handleQuestionTypeChange={handleQuestionTypeChange}
                    />
                );
            case 2:
                return (
                    <PersonalStatementStep
                        applicationQuestions={applicationQuestions}
                        addApplicationQuestion={addApplicationQuestion}
                        removeApplicationQuestion={removeApplicationQuestion}
                        updateApplicationQuestion={updateApplicationQuestion}
                    />
                );
            case 3:
                return <PreivewStep preivewData={submitJson} recruitFiles={recruitFiles} />;
            default:
                <div>error</div>;
        }
    };

    return (
        <div css={s_recruitCreatePageContainer} ref={containerRef}>
            <div css={s_stepWrapper}>
                <Stepper activeStep={activeStep} sx={s_prohibitDragArea}>
                    <Stepper.Step>
                        <Stepper.Label>공고 상세 정보 작성</Stepper.Label>
                    </Stepper.Step>
                    <Stepper.Step>
                        <Stepper.Label>사전 질문 설정</Stepper.Label>
                    </Stepper.Step>
                    <Stepper.Step>
                        <Stepper.Label>자기소개서 설정</Stepper.Label>
                    </Stepper.Step>
                    <Stepper.Step>
                        <Stepper.Label>미리보기</Stepper.Label>
                    </Stepper.Step>
                </Stepper>

                <div css={s_stepComponent}>{stepComponent(activeStep)}</div>
                <div css={s_stepButtonContainer}>
                    <Button onClick={prev} disabled={isFirst}>
                        이전
                    </Button>
                    <Button
                        onClick={handleNextClick}
                        disabled={!isCurrentStepValid()}
                        loading={isFileUploading}
                    >
                        {isLast ? '완료' : '다음'}
                    </Button>
                    <Dialog
                        open={isDialogOpen}
                        handleClose={() => {
                            setIsDialogOpen(false);
                        }}
                    >
                        <Dialog.Header sx={s_dialogHeader}>제출 확인</Dialog.Header>
                        <Dialog.Content sx={s_dialogContent}>
                            <p>정말 모집 공고를 제출하시겠습니까?</p>
                            <p>모집이 시작된 후 수정이 불가능합니다.</p>
                        </Dialog.Content>
                        <Dialog.Action position="end">
                            <Button onClick={handleConfirmSubmit}>확인</Button>
                            <Button onClick={() => setIsDialogOpen(false)} variant="outlined">
                                취소
                            </Button>
                        </Dialog.Action>
                    </Dialog>
                    <ErrorDialog
                        open={errorDialogOpen}
                        handleClose={() => setErrorDialogOpen(false)}
                        errorStatusCode={500}
                    />
                </div>
            </div>
        </div>
    );
}

export { RecruitCreatePage };
