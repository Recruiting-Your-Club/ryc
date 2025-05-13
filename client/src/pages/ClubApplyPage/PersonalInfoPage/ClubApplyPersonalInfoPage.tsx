import React from 'react';
import { Text } from '@components/_common/Text';
import { Input } from '@components';
import { clubPersonalQuestions } from '../ClubApplyPage';
import { Radio } from '@components/_common/Radio';
import { clubApplyFormConatiner } from '../ClubApplyPage.style';
import { clubApplyForm } from './ClubApplyPersonalInfoPage.style';

interface ClubApplyPersonalInfoPageProps {
    idx: number;
    answers: { [key: number]: string };
    onAnswerChange: (id: number, value: string) => void;
}

function ClubApplyPersonalInfoPage({
    idx,
    answers,
    onAnswerChange,
}: ClubApplyPersonalInfoPageProps) {
    const handleInputChange = (id: number, value: string) => {
        onAnswerChange(id, value);
    };

    const handleRadioChange = (id: number, value: string) => {
        onAnswerChange(id, value);
    };

    return (
        <div css={clubApplyFormConatiner(idx)}>
            {clubPersonalQuestions.map((data) =>
                data.type === 'boolean' ? (
                    <div key={data.id} css={clubApplyForm}>
                        <Text>{data.question}</Text>
                        <Radio
                            name={`question-${data.id}`}
                            orientation="vertical"
                            options={
                                data.options?.map((option) => ({
                                    label: option,
                                    value: option,
                                })) || []
                            }
                            value={answers[data.id] || ''}
                            onChange={(value) => handleRadioChange(data.id, value)}
                        />
                    </div>
                ) : (
                    <div key={data.id} css={clubApplyForm}>
                        <Input
                            variant="lined"
                            label={data.question}
                            inputSx={{ width: '50%' }}
                            value={answers[data.id] || ''}
                            onChange={(e) => handleInputChange(data.id, e.target.value)}
                        />
                    </div>
                ),
            )}
        </div>
    );
}

export { ClubApplyPersonalInfoPage };
