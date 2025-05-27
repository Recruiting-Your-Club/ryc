import type { ChangeEvent} from 'react';
import React, { useState } from 'react';
import type { QuestionFormProps } from './type';
import { Input } from '@components/_common';
import { Checkbox } from '@components/Checkbox';

function QuestionForm({ question, updateQuestion }: QuestionFormProps) {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        updateQuestion(question.id, { title: e.target.value });
    };

    const handleOptionChange = (optionId: string, value: string) => {
        const updateOptions = question.options?.map((opt) =>
            opt.id === optionId ? { ...opt, text: value } : opt,
        );
        updateQuestion(question.id, { options: updateOptions });
    };

    const handleAddOption = () => {
        const newOption = {
            id: `opt${(question.options?.length || 0) + 1}`,
            text: '',
        };
        updateQuestion(question.id, {
            options: [...(question.options || []), newOption],
        });
    };

    const handleRemoveOption = (optionId: string) => {
        const filtered = question.options?.filter((opt) => opt.id !== optionId);
        updateQuestion(question.id, { options: filtered });
    };

    if (question.type === 'short') {
        return (
            <Input placeholder="질문을 입력하세요" value={question.title} onChange={handleChange} />
        );
    }

    // if (question.type === 'long') {
    // }

    return (
        <div>
            <div>
                <Input
                    placeholder="질문을 입력하세요"
                    value={question.title}
                    onChange={handleChange}
                />
                <div>{question.title.length}/50</div>
            </div>
            <div>
                {question.options?.map((option) => (
                    <div key={option.id}>
                        {question.type === 'single' ? <Checkbox disabled /> : <div></div>}
                    </div>
                ))}
            </div>
        </div>
    );
}

export { QuestionForm };
