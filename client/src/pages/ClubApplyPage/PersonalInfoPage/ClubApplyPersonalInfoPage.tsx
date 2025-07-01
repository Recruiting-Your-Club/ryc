import React from 'react';
import { Input, Text, Checkbox, Radio } from '@components/_common';
import {
    clubApplyPersonalQuestionForm,
    helperTextSx,
    inputSx,
    labelContainer,
    labelSx,
} from './ClubApplyPersonalInfoPage.style';
import type { ClubApplyPersonalInfoPageProps } from '../types';
import { getAnswer } from '../utils';

function ClubApplyPersonalInfoPage({
    answers,
    clubPersonalQuestions,
    onAnswerChange,
    containerStyle,
    getValidationError,
    getErrorMessage,
    touched,
    onBlur,
    onFocus,
}: ClubApplyPersonalInfoPageProps) {
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
            {clubPersonalQuestions.map((question) => {
                if (question.type === 'SINGLE_CHOICE') {
                    return (
                        <div
                            key={question.questionTitle}
                            css={clubApplyPersonalQuestionForm(false)}
                        >
                            <div css={labelContainer}>
                                <Text type="bodyRegular">{question.questionTitle}</Text>
                                {question.isRequired && (
                                    <Text
                                        type="bodyRegular"
                                        color="warning"
                                        sx={{ marginTop: '0.3rem' }}
                                    >
                                        *
                                    </Text>
                                )}
                            </div>
                            <Radio
                                name={`question-${question.questionTitle}`}
                                orientation="vertical"
                                options={
                                    question.options?.map((option) => ({
                                        label: option,
                                        value: option,
                                    })) || []
                                }
                                value={getAnswer(answers, question.questionTitle)}
                                onChange={(value) => onAnswerChange(question.questionTitle, value)}
                            />
                        </div>
                    );
                }
                if (question.type === 'MULTIPLE_CHOICE') {
                    return (
                        <div
                            key={question.questionTitle}
                            css={clubApplyPersonalQuestionForm(false)}
                        >
                            <div css={labelContainer}>
                                <Text type="bodyRegular">{question.questionTitle}</Text>
                                {question.isRequired && (
                                    <Text
                                        type="bodyRegular"
                                        color="warning"
                                        sx={{ marginTop: '0.3rem' }}
                                    >
                                        *
                                    </Text>
                                )}
                            </div>
                            {question.options.map((option) => (
                                <Checkbox.Root
                                    key={option}
                                    isChecked={getAnswer(answers, question.questionTitle)?.includes(
                                        option,
                                    )}
                                    onChange={() => onAnswerChange(question.questionTitle, option)}
                                >
                                    <Checkbox.HiddenInput />
                                    <Checkbox.Control />
                                    <Checkbox.Label>{option}</Checkbox.Label>
                                </Checkbox.Root>
                            ))}
                        </div>
                    );
                }
                const hasError = getValidationError(
                    question.questionTitle,
                    getAnswer(answers, question.questionTitle),
                );
                return (
                    <div
                        key={question.questionTitle}
                        css={clubApplyPersonalQuestionForm(
                            hasError && touched[question.questionTitle],
                        )}
                        tabIndex={-1}
                        onFocus={() => onFocus(question.questionTitle)}
                        onBlur={() => onBlur(question.questionTitle)}
                    >
                        <div css={labelContainer}>
                            <Text type="bodyRegular">{question.questionTitle}</Text>
                            {question.isRequired && (
                                <Text
                                    type="bodyRegular"
                                    color="warning"
                                    sx={{ marginTop: '0.3rem' }}
                                >
                                    *
                                </Text>
                            )}
                        </div>
                        <Input
                            variant="lined"
                            labelSx={labelSx}
                            inputSx={inputSx}
                            value={getAnswer(answers, question.questionTitle)}
                            onChange={(e) => onAnswerChange(question.questionTitle, e.target.value)}
                            error={hasError && touched[question.questionTitle]}
                            onFocus={() => onFocus(question.questionTitle)}
                            onBlur={() => onBlur(question.questionTitle)}
                            helperText={
                                touched[question.questionTitle]
                                    ? getErrorMessage(
                                          question.questionTitle,
                                          getAnswer(answers, question.questionTitle),
                                      )
                                    : undefined
                            }
                            helperSx={helperTextSx}
                            placeholder={getPlaceholder(question.questionTitle)}
                        />
                    </div>
                );
            })}
        </div>
    );
}

export { ClubApplyPersonalInfoPage };
