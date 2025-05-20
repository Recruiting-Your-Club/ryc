import React from 'react';
import { Input } from '@components/_common/Input';
import { Radio } from '@components/_common/Radio';
import { Text } from '@components/_common/Text';
import {
    clubApplyPersonalQuestionForm,
    helperTextSx,
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
}: ClubApplyPersonalInfoPageProps) {
    return (
        <div css={containerStyle}>
            {clubPersonalQuestions.map((question) => {
                if (question.type === 'boolean') {
                    return (
                        <div
                            key={question.questionTitle}
                            css={clubApplyPersonalQuestionForm(false)}
                        >
                            <Text type="bodyLight">{question.questionTitle}</Text>
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
                const hasError = getValidationError(
                    question.questionTitle,
                    getAnswer(answers, question.questionTitle),
                );
                return (
                    <div key={question.id} css={clubApplyPersonalQuestionForm(hasError)}>
                        <Input
                            variant="lined"
                            label={question.questionTitle}
                            labelSx={labelSx}
                            inputSx={{ width: '70%' }}
                            value={getAnswer(answers, question.questionTitle)}
                            onChange={(e) => onAnswerChange(question.questionTitle, e.target.value)}
                            error={hasError}
                            helperText={getErrorMessage(
                                question.questionTitle,
                                getAnswer(answers, question.questionTitle),
                            )}
                            helperSx={helperTextSx}
                        />
                    </div>
                );
            })}
        </div>
    );
}

export { ClubApplyPersonalInfoPage };
