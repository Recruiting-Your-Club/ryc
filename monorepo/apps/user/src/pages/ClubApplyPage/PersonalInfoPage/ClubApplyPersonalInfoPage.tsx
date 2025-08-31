import { useSendEmailVerification, useVerifyEmailCode } from '@api/hooks';
import { EmailVerificationDialog } from '@components/EmailVerificationDialog';
import React, { useMemo, useState } from 'react';

import { Button, Checkbox, Input, Radio, Text, useToast } from '@ssoc/ui';
import { FileUpLoader } from '@ssoc/ui';

import { useApplicationStore } from '../../../stores';
import type { ClubApplyPersonalInfoPageProps } from '../types';
import { getAnswer, getPlaceholder } from '../utils';
import {
    clubApplyPersonalQuestionForm,
    helperTextSx,
    inputSx,
    labelContainer,
    labelSx,
    s_emailInputContainer,
    s_emailInputSx,
    s_emailSx,
    s_emailVerifyButton,
    s_fileUploaderSx,
    s_labelMultiline,
    s_labelTextSx,
} from './ClubApplyPersonalInfoPage.style';

function ClubApplyPersonalInfoPage({
    announcementId,
    answers,
    clubPersonalQuestions,
    onAnswerChange,
    onFileUpload,
    containerStyle,
    getValidationError,
    getErrorMessage,
    touched,
    onBlur,
    onFocus,
    questionRefs,
    isFileUploading = false,
    onEmailVerifiedChange,
}: ClubApplyPersonalInfoPageProps & { onEmailVerifiedChange?: (verify: boolean) => void }) {
    //props destruction
    //lib hooks
    const { toast } = useToast();
    // initial values
    // state, ref, querystring hooks
    const { getFiles } = useApplicationStore();
    const filesByQuestion = getFiles(announcementId);

    //query hooks
    const sendMutation = useSendEmailVerification();
    const verifyMutation = useVerifyEmailCode();

    const [verifyOpen, setVerifyOpen] = useState(false);
    const [dialogExpiresAt, setDialogExpiresAt] = useState<string>('');
    const [verifyingEmailLabel, setVerifyingEmailLabel] = useState<string | null>(null);
    const [isEmailLocked, setIsEmailLocked] = useState(false);

    const tokenKey = useMemo(() => 'email_verification_token', []);

    //calculated values
    const lockEmail = (email: string) => {
        setIsEmailLocked(true);
        onEmailVerifiedChange?.(true);
    };

    const unlockEmail = () => {
        setIsEmailLocked(false);
        onEmailVerifiedChange?.(false);
        sessionStorage.removeItem(tokenKey);
    };

    //handlers
    //effects
    return (
        <div css={containerStyle}>
            {clubPersonalQuestions.map((question) => {
                if (question.type === 'EMAIL') {
                    const value = getAnswer(answers, question.id);
                    const hasError = getValidationError(question.label, value);
                    const isThisLocked = isEmailLocked;

                    return (
                        <div
                            key={question.id}
                            css={clubApplyPersonalQuestionForm(hasError && touched[question.label])}
                            tabIndex={-1}
                            ref={(element) => {
                                if (questionRefs.current) {
                                    questionRefs.current[question.label] = element;
                                }
                            }}
                        >
                            <div css={labelContainer}>
                                <Text type="bodyRegular" sx={s_labelMultiline} textAlign="start">
                                    {question.label}
                                </Text>
                                {question.isRequired && (
                                    <Text type="bodyRegular" color="warning" sx={s_labelTextSx}>
                                        *
                                    </Text>
                                )}
                            </div>
                            <div css={s_emailInputContainer}>
                                <Input
                                    sx={s_emailSx}
                                    variant="lined"
                                    labelSx={labelSx}
                                    inputSx={s_emailInputSx}
                                    value={value}
                                    onChange={(e) => {
                                        // 잠금 시 변경 불가
                                        if (isThisLocked) return;
                                        onAnswerChange(question.id, question.label, e.target.value);
                                    }}
                                    error={hasError && touched[question.label]}
                                    onFocus={() => onFocus(question.label)}
                                    onBlur={() => onBlur(question.label)}
                                    helperText={
                                        touched[question.label]
                                            ? getErrorMessage(question.label, value)
                                            : undefined
                                    }
                                    helperSx={helperTextSx}
                                    placeholder={getPlaceholder(question.label)}
                                    disabled={isThisLocked}
                                />

                                {!isThisLocked ? (
                                    <Button
                                        variant="outlined"
                                        sx={s_emailVerifyButton}
                                        onClick={async () => {
                                            if (!value) return toast.error('이메일을 입력해주세요');
                                            if (hasError)
                                                return toast.error(
                                                    '올바른 이메일 형식인지 확인해주세요.',
                                                );

                                            try {
                                                const { expiresAt } =
                                                    await sendMutation.mutateAsync({
                                                        email: value,
                                                    });

                                                setDialogExpiresAt(expiresAt);
                                                setVerifyingEmailLabel(question.label);
                                                setVerifyOpen(true);
                                            } catch {
                                                // 실패 처리(나중에 훅으로 교체)
                                            }
                                        }}
                                    >
                                        이메일 인증
                                    </Button>
                                ) : (
                                    <Button type="button" onClick={unlockEmail}>
                                        이메일 변경
                                    </Button>
                                )}
                                <EmailVerificationDialog
                                    isOpen={verifyOpen}
                                    onClose={() => setVerifyOpen(false)}
                                    email={value}
                                    expiresAt={dialogExpiresAt}
                                    onVerify={async (code) => {
                                        try {
                                            await verifyMutation.mutateAsync({
                                                email: value,
                                                code: Number(code),
                                            });
                                            sessionStorage.setItem(tokenKey, code);
                                            lockEmail(value);
                                            return true;
                                        } catch {
                                            return false;
                                        }
                                    }}
                                    onResendCode={async () => {
                                        try {
                                            const { expiresAt } = await sendMutation.mutateAsync({
                                                email: value,
                                            });
                                            setDialogExpiresAt(expiresAt);
                                        } catch {
                                            toast.error(
                                                '코드 재전송에 실패했어요. 잠시 후 다시 시도해주세요',
                                            );
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    );
                }
                if (question.type === 'PROFILE_IMAGE') {
                    return (
                        <div key={question.id} css={clubApplyPersonalQuestionForm(false)}>
                            <div css={labelContainer}>
                                <Text type="bodyRegular" textAlign="start" sx={s_labelMultiline}>
                                    {question.label}
                                </Text>
                                {question.isRequired && (
                                    <Text type="bodyRegular" color="warning" sx={s_labelTextSx}>
                                        *
                                    </Text>
                                )}
                            </div>
                            <FileUpLoader
                                sx={s_fileUploaderSx}
                                files={filesByQuestion[question.id] ?? []}
                                onFilesChange={(newFiles: File[]) => {
                                    onFileUpload(
                                        question.id,
                                        question.label,
                                        question.type,
                                        newFiles,
                                    );
                                }}
                                maxFileCount={1}
                                imageOnly={true}
                                disabled={isFileUploading}
                            >
                                <FileUpLoader.HelperText>
                                    1개의 이미지 파일만 넣어주세요.
                                </FileUpLoader.HelperText>
                                <FileUpLoader.Button />
                                <FileUpLoader.Box />
                            </FileUpLoader>
                        </div>
                    );
                } else if (question.type === 'FILE') {
                    return (
                        <div key={question.id} css={clubApplyPersonalQuestionForm(false)}>
                            <div css={labelContainer}>
                                <Text type="bodyRegular" sx={s_labelMultiline} textAlign="start">
                                    {question.label}
                                </Text>
                                {question.isRequired && (
                                    <Text type="bodyRegular" color="warning" sx={s_labelTextSx}>
                                        *
                                    </Text>
                                )}
                            </div>
                            <FileUpLoader
                                sx={s_fileUploaderSx}
                                files={filesByQuestion[question.id] ?? []}
                                onFilesChange={(newFiles: File[]) => {
                                    onFileUpload(
                                        question.id,
                                        question.label,
                                        question.type,
                                        newFiles,
                                    );
                                }}
                                maxFileCount={1}
                                disabled={isFileUploading}
                            >
                                <FileUpLoader.HelperText>
                                    1개의 파일을 첨부할 수 있어요.
                                </FileUpLoader.HelperText>
                                <FileUpLoader.Button />
                                <FileUpLoader.Box />
                            </FileUpLoader>
                        </div>
                    );
                } else if (question.type === 'SINGLE_CHOICE') {
                    return (
                        <div
                            key={question.id}
                            css={clubApplyPersonalQuestionForm(false)}
                            ref={(element) => {
                                if (questionRefs.current) {
                                    questionRefs.current[question.label] = element;
                                }
                            }}
                        >
                            <div css={labelContainer}>
                                <Text type="bodyRegular" sx={s_labelMultiline} textAlign="start">
                                    {question.label}
                                </Text>
                                {question.isRequired && (
                                    <Text type="bodyRegular" color="warning" sx={s_labelTextSx}>
                                        *
                                    </Text>
                                )}
                            </div>
                            <Radio
                                name={`question-${question.label}`}
                                orientation="vertical"
                                options={
                                    question.options?.map((option) => ({
                                        label: option.option,
                                        value: option.id,
                                    })) || []
                                }
                                size="sm"
                                value={getAnswer(answers, question.id)}
                                onChange={(value) =>
                                    onAnswerChange(
                                        question.id,
                                        question.label,
                                        value,
                                        question.options?.find((option) => option.id === value)
                                            ?.option || '',
                                    )
                                }
                            />
                        </div>
                    );
                } else if (question.type === 'MULTIPLE_CHOICE') {
                    return (
                        <div
                            key={question.id}
                            css={clubApplyPersonalQuestionForm(false)}
                            ref={(element) => {
                                if (questionRefs.current) {
                                    questionRefs.current[question.label] = element;
                                }
                            }}
                        >
                            <div css={labelContainer}>
                                <Text type="bodyRegular" sx={s_labelMultiline} textAlign="start">
                                    {question.label}
                                </Text>
                                {question.isRequired && (
                                    <Text type="bodyRegular" color="warning" sx={s_labelTextSx}>
                                        *
                                    </Text>
                                )}
                            </div>
                            {question?.options?.map((option) => {
                                const currentAnswers = getAnswer(answers, question.id);
                                const isChecked = currentAnswers.includes(option.id);

                                return (
                                    <Checkbox.Root
                                        key={option.id}
                                        isChecked={isChecked}
                                        onChange={() =>
                                            onAnswerChange(
                                                question.id,
                                                question.label,
                                                option.id,
                                                option.option,
                                            )
                                        }
                                    >
                                        <Checkbox.HiddenInput />
                                        <Checkbox.Control />
                                        <Checkbox.Label>{option.option}</Checkbox.Label>
                                    </Checkbox.Root>
                                );
                            })}
                        </div>
                    );
                } else {
                    const hasError = getValidationError(
                        question.label,
                        getAnswer(answers, question.id),
                    );
                    return (
                        <div
                            key={question.id}
                            css={clubApplyPersonalQuestionForm(hasError && touched[question.label])}
                            tabIndex={-1}
                            ref={(element) => {
                                if (questionRefs.current) {
                                    questionRefs.current[question.label] = element;
                                }
                            }}
                        >
                            <div css={labelContainer}>
                                <Text type="bodyRegular" sx={s_labelMultiline} textAlign="start">
                                    {question.label}
                                </Text>
                                {question.isRequired && (
                                    <Text type="bodyRegular" color="warning" sx={s_labelTextSx}>
                                        *
                                    </Text>
                                )}
                            </div>
                            <Input
                                variant="lined"
                                labelSx={labelSx}
                                inputSx={inputSx}
                                value={getAnswer(answers, question.id)}
                                onChange={(event) =>
                                    onAnswerChange(question.id, question.label, event.target.value)
                                }
                                error={hasError && touched[question.label]}
                                onFocus={() => onFocus(question.label)}
                                onBlur={() => onBlur(question.label)}
                                helperText={
                                    touched[question.label]
                                        ? getErrorMessage(
                                              question.label,
                                              getAnswer(answers, question.id),
                                          )
                                        : undefined
                                }
                                helperSx={helperTextSx}
                                placeholder={getPlaceholder(question.label)}
                            />
                        </div>
                    );
                }
            })}
        </div>
    );
}

export { ClubApplyPersonalInfoPage };
