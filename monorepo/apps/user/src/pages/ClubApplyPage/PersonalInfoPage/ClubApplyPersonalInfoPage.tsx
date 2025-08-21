import React from 'react';

import { Checkbox, Input, Radio, Text } from '@ssoc/ui';
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
    s_fileUploaderSx,
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
}: ClubApplyPersonalInfoPageProps) {
    //props destruction
    //lib hooks
    // initial values
    // state, ref, querystring hooks
    const { getFiles, updateFiles } = useApplicationStore();
    const filesByQuestion = getFiles(announcementId);
    //calculated values

    //handlers
    //effects
    return (
        <div css={containerStyle}>
            {clubPersonalQuestions.map((question) => {
                if (question.type === 'PROFILE_IMAGE') {
                    return (
                        <div key={question.id} css={clubApplyPersonalQuestionForm(false)}>
                            <div css={labelContainer}>
                                <Text type="bodyRegular">{question.label}</Text>
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
                                    updateFiles(announcementId, question.id, newFiles);
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
                                <Text type="bodyRegular">{question.label}</Text>
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
                                    updateFiles(announcementId, question.id, newFiles);
                                    onFileUpload(
                                        question.id,
                                        question.label,
                                        question.type,
                                        newFiles,
                                    );
                                }}
                                maxFileCount={20}
                                disabled={isFileUploading}
                            >
                                <FileUpLoader.HelperText>
                                    1개의 파일을 첨부할 수 있습니다.
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
                                <Text type="bodyRegular">{question.label}</Text>
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
                                value={getAnswer(answers, question.label)}
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
                                <Text type="bodyRegular">{question.label}</Text>
                                {question.isRequired && (
                                    <Text type="bodyRegular" color="warning" sx={s_labelTextSx}>
                                        *
                                    </Text>
                                )}
                            </div>
                            {question?.options?.map((option) => {
                                const currentAnswers = getAnswer(answers, question.label);
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
                        getAnswer(answers, question.label),
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
                                <Text type="bodyRegular">{question.label}</Text>
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
                                value={getAnswer(answers, question.label)}
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
                                              getAnswer(answers, question.label),
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
