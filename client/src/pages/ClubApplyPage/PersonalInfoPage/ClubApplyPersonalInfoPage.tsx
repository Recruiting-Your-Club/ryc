import React from 'react';
import { Input, Text, Checkbox, Radio } from '@components/_common';
import type { ClubApplyPersonalInfoPageProps } from '../types';
import { getAnswer, getPlaceholder } from '../utils';
import {
    clubApplyPersonalQuestionForm,
    helperTextSx,
    inputSx,
    labelContainer,
    labelSx,
    s_labelTextSx,
} from './ClubApplyPersonalInfoPage.style';

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
    questionRefs,
}: ClubApplyPersonalInfoPageProps) {
    //props destruction
    //lib hooks
    // initial values
    // state, ref, querystring hooks
    //calculated values

    //handlers
    //effects
    return (
        <div css={containerStyle}>
            {clubPersonalQuestions.map((question) => {
                if (question.type === 'SINGLE_CHOICE') {
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
                                        value: option.option,
                                    })) || []
                                }
                                size="sm"
                                value={getAnswer(answers, question.label)}
                                onChange={(value) =>
                                    onAnswerChange(question.id, question.label, value)
                                }
                            />
                        </div>
                    );
                }
                if (question.type === 'MULTIPLE_CHOICE') {
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
                            {question?.options?.map((option) => (
                                <Checkbox.Root
                                    key={option.id}
                                    isChecked={getAnswer(answers, question.label)?.includes(
                                        option.option,
                                    )}
                                    onChange={() =>
                                        onAnswerChange(question.id, question.label, option.option)
                                    }
                                >
                                    <Checkbox.HiddenInput />
                                    <Checkbox.Control />
                                    <Checkbox.Label>{option.option}</Checkbox.Label>
                                </Checkbox.Root>
                            ))}
                        </div>
                    );
                }
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
            })}
        </div>
    );
}

export { ClubApplyPersonalInfoPage };
