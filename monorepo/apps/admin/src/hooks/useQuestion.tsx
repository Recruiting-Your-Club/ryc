import type { QuestionProps, QuestionType } from '@components/QuestionForm/types';
import React, { useCallback, useId, useState } from 'react';

const DEFAULT_OPTIONS = [
    { id: crypto.randomUUID(), text: '' },
    { id: crypto.randomUUID(), text: '' },
];

export const useQuestion = () => {
    const [questions, setQuestions] = useState<QuestionProps[]>([]);

    const [applicationQuestions, setApplicationQuestions] = useState<QuestionProps[]>([]);

    const newId = crypto.randomUUID();

    const addQuestion = () => {
        const newQuestion: QuestionProps = {
            id: newId,
            type: 'short',
            title: '',
            required: false,
        };
        setQuestions((prev) => [...prev, newQuestion]);
    };

    const addApplicationQuestion = () => {
        const newQuestion: QuestionProps = {
            id: newId,
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

    const hydratePreQuestions = useCallback((initial: QuestionProps[]) => {
        setQuestions(initial);
    }, []);

    const hydrateApplicationQuestions = useCallback((initial: QuestionProps[]) => {
        setApplicationQuestions(initial);
    }, []);

    const hydrateAll = useCallback(
        (args: { preQuestions?: QuestionProps[]; applicationQuestions?: QuestionProps[] }) => {
            if (args.preQuestions) setQuestions(args.preQuestions);
            if (args.applicationQuestions) setApplicationQuestions(args.applicationQuestions);
        },
        [],
    );

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
        hydratePreQuestions,
        hydrateApplicationQuestions,
        hydrateAll,
    };
};
