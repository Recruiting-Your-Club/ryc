import React from 'react';
import { Text } from '@components/_common/Text';
import { Input } from '@components';
import { Radio } from '@components/_common/Radio';
import { clubApplyPersonalQuestionForm, helperTextSx } from './ClubApplyPersonalInfoPage.style';
import type { ClubApplyPersonalInfoPageProps } from '../types';

function ClubApplyPersonalInfoPage({
    answers,
    clubPersonalQuestions,
    onAnswerChange,
    containerStyle,
    getValidationError,
    getErrorMessage,
}: ClubApplyPersonalInfoPageProps) {
    // prop destruction
    // lib hooks
    // initial values
    // state, ref, querystring hooks
    // form hooks
    // query hooks
    // calculated values
    // handlers
    const handleInputChange = (questionTitle: string, value: string) => {
        onAnswerChange(questionTitle, value);
    };

    const handleRadioChange = (questionTitle: string, value: string) => {
        onAnswerChange(questionTitle, value);
    };

    // effects

    return (
        <div css={containerStyle}>
            {clubPersonalQuestions.map((question) => {
                if (question.type === 'boolean') {
                    return (
                        <div key={question.id} css={clubApplyPersonalQuestionForm(false)}>
                            <Text>{question.questionTitle}</Text>
                            <Radio
                                name={`question-${question.id}`}
                                orientation="vertical"
                                options={
                                    question.options?.map((option) => ({
                                        label: option,
                                        value: option,
                                    })) || []
                                }
                                value={answers[question.id] || ''}
                                onChange={(value) =>
                                    handleRadioChange(question.questionTitle, value)
                                }
                            />
                        </div>
                    );
                } else {
                    const hasError = getValidationError(
                        question.questionTitle,
                        answers[question.id] || '',
                    );
                    return (
                        <div key={question.id} css={clubApplyPersonalQuestionForm(hasError)}>
                            <Input
                                variant="lined"
                                label={question.questionTitle}
                                labelSx={{ color: 'black' }}
                                inputSx={{ width: '70%' }}
                                value={answers[question.id] || ''}
                                onChange={(e) =>
                                    handleInputChange(question.questionTitle, e.target.value)
                                }
                                error={hasError}
                                helperText={getErrorMessage(
                                    question.questionTitle,
                                    answers[question.id] || '',
                                )}
                                helperSx={helperTextSx}
                            />
                        </div>
                    );
                }
            })}
        </div>
    );
}

export { ClubApplyPersonalInfoPage };
