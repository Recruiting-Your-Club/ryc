import type { CSSObject } from '@emotion/react';
import type { RefObject } from 'react';

export type PageAnswer = 'personal' | 'detail';
export type QuestionType = 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'SHORT_ANSWER';
export type QuestionOption = {
    id: string;
    option: string;
};

export interface QuestionResponse {
    id: string;
    label: string;
    type: QuestionType;
    options?: QuestionOption[];
    isRequired: boolean;
    description?: string;
}

export interface Answer {
    id: string;
    value: string;
    questionTitle: string;
    type: PageAnswer;
}

export interface ClubApplyPersonalInfoPageProps {
    answers: Answer[];
    clubPersonalQuestions: QuestionResponse[];
    onAnswerChange: (questionTitle: string, value: string) => void;
    containerStyle: CSSObject;
    getValidationError: (questionTitle: string, value: string) => boolean;
    getErrorMessage: (questionTitle: string, value: string) => string | undefined;
    touched: { [key: string]: boolean };
    onBlur: (questionTitle: string) => void;
    onFocus: (questionTitle: string) => void;
    questionRefs: RefObject<{ [key: string]: HTMLDivElement | null }>;
}

export interface ClubApplyDetailQuestionPageProps {
    answers: Answer[];
    clubDetailQuestions: QuestionResponse[];
    onAnswerChange: (questionTitle: string, value: string) => void;
    containerStyle: CSSObject;
    touched: { [key: string]: boolean };
    onBlur: (questionTitle: string) => void;
    onFocus: (questionTitle: string) => void;
    questionRefs: RefObject<{ [key: string]: HTMLDivElement | null }>;
}
