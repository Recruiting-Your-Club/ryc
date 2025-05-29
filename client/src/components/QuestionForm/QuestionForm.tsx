import type { ChangeEvent } from 'react';
import React from 'react';
import type { QuestionFormProps } from './type';
import { Button, Input } from '@components/_common';
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
            <div>
                <Input
                    placeholder="질문을 입력하세요"
                    value={question.title}
                    onChange={handleChange}
                />
                <div>{question.title.length}/20</div>
            </div>
        );
    }

    if (question.type === 'long') {
        return (
            <div>
                <Input
                    placeholder="질문을 입력하세요"
                    value={question.title}
                    onChange={handleChange}
                />
                <div>{question.title.length}/20</div>
                <Input
                    placeholder="질문에 대한 추가 설명이 있다면 입력해주세요"
                    value={question.title}
                    onChange={handleChange}
                />
                <div>{question.title.length}/50</div>
            </div>
        );
    }

    return (
        <div>
            <div>
                <Input
                    placeholder="질문을 입력하세요"
                    value={question.title}
                    onChange={handleChange}
                />
                <div>{question.title.length}/20</div>
            </div>
            <div>
                {question.options?.map((option) => (
                    <div key={option.id}>
                        {question.type === 'multiple' ? <Checkbox disabled /> : <div />}
                        <Input
                            placeholder="객관식 문항을 입력해주세요"
                            value={option.text}
                            onChange={(e) => handleOptionChange(option.id, e.target.value)}
                        />
                        {question.options && question.options.length > 2 && (
                            <button onClick={() => handleRemoveOption(option.id)}>x</button>
                        )}
                    </div>
                ))}
                <Button onClick={handleAddOption}>객관식 문항 추가하기</Button>
            </div>
        </div>
    );
}

export { QuestionForm };
