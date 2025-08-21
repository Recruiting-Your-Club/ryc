import React from 'react';

import { Checkbox, Input, Radio, Text } from '@ssoc/ui';

import type { PersonalInfoPageProps } from '../types';
import {
    s_inputSx,
    s_labelContainer,
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
                                <Text type="bodyRegular">{question.label}</Text>
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
                                <Text type="bodyRegular">{question.label}</Text>
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
                                    <Checkbox.Label>{option.option}</Checkbox.Label>
                                </Checkbox.Root>
                            ))}
                        </div>
                    );
                }
                return (
                    <div key={question.id} css={s_personalQuestionForm(false)}>
                        <div css={s_labelContainer}>
                            <Text type="bodyRegular">{question.label}</Text>
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
