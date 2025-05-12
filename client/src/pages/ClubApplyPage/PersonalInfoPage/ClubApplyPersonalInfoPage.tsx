import React, { useState, useEffect } from 'react';
import { Text } from '@components/_common/Text';
import { Input } from '@components';
import { clubData, clubPersonalQuestions } from '../ClubApplyPage';
import { Radio } from '@components/_common/Radio';
import { clubApplyFormConatiner } from '../ClubApplyPage.style';
import { clubApplyForm } from './ClubApplyPersonalInfoPage.style';

interface ClubApplyDetailQuestionPageProps {
    idx: number;
    onQuestionComplete: (completed: number) => void;
}

function ClubApplyPersonalInfoPage({ idx, onQuestionComplete }: ClubApplyDetailQuestionPageProps) {
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});

    useEffect(() => {
        const completedCount = Object.values(answers).filter(
            (answer) => answer.trim() !== '',
        ).length;
        onQuestionComplete(completedCount);
    }, [answers, onQuestionComplete]);

    const handleInputChange = (id: number, value: string) => {
        setAnswers((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleRadioChange = (id: number, value: string) => {
        setAnswers((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    return (
        <div css={clubApplyFormConatiner(idx)}>
            {clubPersonalQuestions.map((data) =>
                data.type === 'boolean' ? (
                    <div key={data.id} css={clubApplyForm}>
                        <Text>{data.question}</Text>
                        <Radio
                            name="gender"
                            orientation="vertical"
                            options={[
                                { label: '남', value: 'male' },
                                { label: '여', value: 'female' },
                            ]}
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
