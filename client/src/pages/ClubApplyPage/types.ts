import type { CSSObject } from '@emotion/react';

export type PageAnswer = 'personal' | 'detail';
export type QuestionType = 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE' | 'SHORT_ANSWER';

export interface PersonalQuestion {
    id: string;
    questionTitle: string;
    type: QuestionType;
    options: string[];
    isRequired: boolean;
}

export interface DetailQuestion {
    id: string;
    questionTitle: string;
    description: string;
    isRequired: boolean;
}

export interface Answer {
    id: string;
    value: string;
    questionTitle: string;
    type: PageAnswer;
}

export interface ClubApplyPersonalInfoPageProps {
    answers: Answer[];
    clubPersonalQuestions: PersonalQuestion[];
    onAnswerChange: (questionTitle: string, value: string) => void;
    containerStyle: CSSObject;
    getValidationError: (questionTitle: string, value: string) => boolean;
    getErrorMessage: (questionTitle: string, value: string) => string | undefined;
}

export interface ClubApplyDetailQuestionPageProps {
    answers: Answer[];
    clubDetailQuestions: DetailQuestion[];
    onAnswerChange: (questionTitle: string, value: string) => void;
    containerStyle: CSSObject;
}
