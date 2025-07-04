import type { ChangeEvent } from 'react';
import React from 'react';
import type { QuestionFormProps } from './types';
import { Button, Input } from '@components/_common';
import {
    s_addOptionButton,
    s_applicationQuestion,
    s_inputLength,
    s_questionContainer,
    s_questionOptionContainer,
    s_questionOptionRow,
    s_removeOptionButton,
} from './QuestionForm.style';
import { CheckboxRoot } from '@components/Checkbox/CheckboxRoot';
import { CheckboxHiddenInput } from '@components/Checkbox/CheckboxHiddenInput';
import { CheckboxControl } from '@components/Checkbox/CheckboxControl';
import { useToast } from '@hooks/useToast';

function QuestionForm({ question, updateQuestion }: QuestionFormProps) {
    // prop destruction
    // lib hooks
    const { toast } = useToast();

    //handler
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        updateQuestion(question.id, { title: e.target.value });
    };

    const handleSubContentChange = (e: ChangeEvent<HTMLInputElement>) => {
        updateQuestion(question.id, { subContent: e.target.value });
    };

    const handleOptionChange = (optionId: string, value: string) => {
        const updateOptions = question.options?.map((opt) =>
            opt.id === optionId ? { ...opt, text: value } : opt,
        );
        updateQuestion(question.id, { options: updateOptions });
    };

    const handleAddOption = () => {
        if ((question.options?.length || 0) >= 10) {
            toast.error('객관식 문항 보기는 최대 10개까지 생성할 수 있습니다.', {
                toastTheme: 'black',
                position: 'topCenter',
            });
            return;
        }
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
            <div css={s_questionContainer}>
                <Input
                    placeholder="질문을 입력하세요"
                    value={question.title}
                    onChange={handleChange}
                    maxLength={50}
                />
                <div css={s_inputLength}>{question.title.length}/50</div>
            </div>
        );
    }

    if (question.type === 'long') {
        return (
            <div css={s_applicationQuestion}>
                <div css={s_questionContainer}>
                    <Input
                        placeholder="질문을 입력하세요"
                        value={question.title}
                        onChange={handleChange}
                        maxLength={50}
                    />
                    <div css={s_inputLength}>{question.title.length}/50</div>
                </div>
                <div css={s_questionContainer}>
                    <Input
                        placeholder="질문에 대한 추가 설명이 있다면 입력해주세요"
                        value={question.subContent}
                        onChange={handleSubContentChange}
                        maxLength={50}
                    />
                    <div css={s_inputLength}>{question.subContent?.length}/50</div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <div css={s_questionContainer}>
                <Input
                    placeholder="질문을 입력하세요"
                    value={question.title}
                    onChange={handleChange}
                    maxLength={50}
                />
                <div css={s_inputLength}>{question.title.length}/50</div>
            </div>
            <div css={s_questionOptionContainer}>
                {question.options?.map((option) => (
                    <div key={option.id} css={s_questionOptionRow}>
                        {question.type === 'multiple' ? (
                            <CheckboxRoot disabled size="md">
                                <CheckboxHiddenInput />
                                <CheckboxControl />
                            </CheckboxRoot>
                        ) : (
                            <div />
                        )}
                        <Input
                            placeholder="객관식 문항을 입력해주세요"
                            variant="lined"
                            value={option.text}
                            onChange={(e) => handleOptionChange(option.id, e.target.value)}
                        />
                        {question.options && question.options.length > 2 && (
                            <button
                                onClick={() => handleRemoveOption(option.id)}
                                css={s_removeOptionButton}
                            >
                                x
                            </button>
                        )}
                    </div>
                ))}
                <Button onClick={handleAddOption} sx={s_addOptionButton} variant="outlined">
                    객관식 문항 추가하기
                </Button>
            </div>
        </div>
    );
}

export { QuestionForm };
