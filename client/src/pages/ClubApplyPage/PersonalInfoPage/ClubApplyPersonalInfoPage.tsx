import React from 'react';
import { Text } from '@components/_common/Text';
import { Input } from '@components';

import { Radio } from '@components/_common/Radio';
import { clubApplyPersonalQuestionForm } from './ClubApplyPersonalInfoPage.style';
import type { ClubApplyPersonalInfoPageProps } from '../types';

function ClubApplyPersonalInfoPage({
    answers,
    clubPersonalQuestions,
    onAnswerChange,
    containerStyle,
}: ClubApplyPersonalInfoPageProps) {
    // prop destruction
    // lib hooks
    // initial values
    // state, ref, querystring hooks
    // form hooks
    // query hooks
    // calculated values
    // handlers
    const handleInputChange = (id: string, value: string) => {
        onAnswerChange(id, value);
    };

    const handleRadioChange = (id: string, value: string) => {
        onAnswerChange(id, value);
    };
    // effects

    return (
        <div css={containerStyle}>
            {clubPersonalQuestions.map((question) =>
                question.type === 'boolean' ? (
                    <div key={question.id} css={clubApplyPersonalQuestionForm}>
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
                            onChange={(value) => handleRadioChange(question.id, value)}
                        />
                    </div>
                ) : (
                    <div key={question.id} css={clubApplyPersonalQuestionForm}>
                        <Input
                            variant="lined"
                            label={question.questionTitle}
                            inputSx={{ width: '50%' }}
                            value={answers[question.id] || ''}
                            onChange={(e) => handleInputChange(question.id, e.target.value)}
                        />
                    </div>
                ),
            )}
        </div>
    );
}

export { ClubApplyPersonalInfoPage };
