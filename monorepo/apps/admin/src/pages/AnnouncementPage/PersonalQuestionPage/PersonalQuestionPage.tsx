import React from 'react';

import { Checkbox, FileUpLoader, Input, Radio, Text } from '@ssoc/ui';

import type { PersonalInfoPageProps } from '../types';
import {
    s_fileUploaderSx,
    s_inputSx,
    s_label,
    s_labelContainer,
    s_labelMultiline,
    s_labelSx,
    s_labelTextSx,
    s_personalQuestionForm,
} from './PersonalQuestion.style';

function PersonalQuestionPage({ personalQuestions, containerStyle }: PersonalInfoPageProps) {
    //props destruction
    //lib hooks
    // initial values
    // state, ref, querystring hooks

    //calculated values
    const getPlaceholder = (label: string) => {
        switch (label) {
            case '학번':
                return 'ex) 19011069';
            case '이름':
                return 'ex) 홍길동, John Smith';
            case '생년월일':
                return 'ex) 990101';
            case '전화번호':
                return 'ex) 01012345678';
            case '전공':
                return 'ex) 소프트웨어학과';
            default:
                return '';
        }
    };

    //handlers
    //effects
    return (
        <div css={containerStyle}>
            {personalQuestions.map((question) => {
                if (question.type === 'SINGLE_CHOICE') {
                    return (
                        <div key={question.id} css={s_personalQuestionForm(false)}>
                            <div css={s_labelContainer}>
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
                                disabled
                                name={`question-${question.label}`}
                                orientation="vertical"
                                size="sm"
                                options={
                                    question.options?.map((option) => ({
                                        label: option.option,
                                        value: option.id,
                                    })) || []
                                }
                            />
                        </div>
                    );
                }
                if (question.type === 'MULTIPLE_CHOICE') {
                    return (
                        <div key={question.id} css={s_personalQuestionForm(false)}>
                            <div css={s_labelContainer}>
                                <Text type="bodyRegular" sx={s_labelMultiline} textAlign="start">
                                    {question.label}
                                </Text>
                                {question.isRequired && (
                                    <Text type="bodyRegular" color="warning" sx={s_labelTextSx}>
                                        *
                                    </Text>
                                )}
                            </div>
                            {question.options?.map((option) => (
                                <Checkbox.Root key={option.id} disabled>
                                    <Checkbox.HiddenInput />
                                    <Checkbox.Control />
                                    <Checkbox.Label sx={s_label}>{option.option}</Checkbox.Label>
                                </Checkbox.Root>
                            ))}
                        </div>
                    );
                }
                if (question.type === 'FILE' || question.type === 'PROFILE_IMAGE') {
                    const isImage = question.type === 'PROFILE_IMAGE';
                    return (
                        <div key={question.id} css={s_personalQuestionForm(false)}>
                            <div css={s_labelContainer}>
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
                                files={[]}
                                onFilesChange={() => {}}
                                maxFileCount={isImage ? 1 : 20}
                                disabled
                            >
                                <FileUpLoader.HelperText>
                                    {isImage ? '이미지 업로드(비활성화)' : '파일 업로드(비활성화)'}
                                </FileUpLoader.HelperText>
                                <FileUpLoader.Button />
                                <FileUpLoader.Box />
                            </FileUpLoader>
                        </div>
                    );
                }
                return (
                    <div key={question.id} css={s_personalQuestionForm(false)}>
                        <div css={s_labelContainer}>
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
                            disabled
                            variant="lined"
                            labelSx={s_labelSx}
                            inputSx={s_inputSx}
                            placeholder={getPlaceholder(question.label)}
                        />
                    </div>
                );
            })}
        </div>
    );
}

export { PersonalQuestionPage };
