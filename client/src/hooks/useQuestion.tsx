import type { QuestionProps, QuestionType } from '@components/QuestionForm/types';
import React, { useState } from 'react';

const DEFAULT_OPTIONS = [
    { id: 'opt1', text: '' },
    { id: 'opt2', text: '' },
];

export const useQuestion = () => {
    const [questions, setQuestions] = useState<QuestionProps[]>([
        { id: '1', type: 'short', title: '', required: false },
        {
            id: '2',
            type: 'single',
            title: '',
            options: [...DEFAULT_OPTIONS],
            required: false,
        },
    ]);

    const [applicationQuestions, setApplicationQuestions] = useState<QuestionProps[]>([]);

    const addQuestion = () => {
        const newQuestion: QuestionProps = {
            id: `q${Date.now()}`,
            type: 'short',
            title: '',
            required: false,
        };
        setQuestions((prev) => [...prev, newQuestion]);
    };

    const addApplicationQuestion = () => {
        const newQuestion: QuestionProps = {
            id: `q${Date.now()}`,
            type: 'long',
            title: '',
            subContent: '',
            required: false,
        };
        setApplicationQuestions((prev) => [...prev, newQuestion]);
    };

    const removeQuestion = (id: string) => {
        setQuestions((prev) => prev.filter((q) => q.id !== id));
    };

    const removeApplicationQuestion = (id: string) => {
        setApplicationQuestions((prev) => prev.filter((q) => q.id !== id));
    };

    const updateQuestion = (id: string, updates: Partial<QuestionProps>) => {
        setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, ...updates } : q)));
    };

    const updateApplicationQuestion = (id: string, updates: Partial<QuestionProps>) => {
        setApplicationQuestions((prev) =>
            prev.map((q) => (q.id === id ? { ...q, ...updates } : q)),
        );
    };

    const handleQuestionTypeChange = (id: string, newQuestionType: QuestionType) => {
        setQuestions((prev) =>
            prev.map((q) => {
                if (q.id !== id) return q;

                const updated: QuestionProps = {
                    ...q,
                    type: newQuestionType,
                };

                if (newQuestionType === 'multiple' || newQuestionType === 'single') {
                    updated.options = updated.options || [...DEFAULT_OPTIONS];
                } else {
                    delete updated.options;
                }
                return updated;
            }),
        );
    };

    return {
        questions,
        applicationQuestions,
        addQuestion,
        addApplicationQuestion,
        updateQuestion,
        updateApplicationQuestion,
        removeQuestion,
        removeApplicationQuestion,
        handleQuestionTypeChange,
    };
};
