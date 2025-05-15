import type { CSSObject } from '@emotion/react';

export type PageAnswer = 'personal' | 'detail';

export interface PersonalQuestion {
    id: string;
    questionTitle: string;
    type: boolean | string;
    options: string[];
}

export interface DetailQuestion {
    id: string;
    questionTitle: string;
    description: string;
}

export interface Answer {
    id: string;
    value: string;
    questionTitle: string;
    type: PageAnswer;
}

export interface ClubApplyPersonalInfoPageProps {
    answers: { [key: string]: string };
    clubPersonalQuestions: PersonalQuestion[];
    onAnswerChange: (questionTitle: string, value: string) => void;
    containerStyle: CSSObject;
    getValidationError: (questionTitle: string, value: string) => boolean;
    getErrorMessage: (questionTitle: string, value: string) => string | undefined;
}

export interface ClubApplyDetailQuestionPageProps {
    answers: { [key: string]: string };
    clubDetailQuestions: DetailQuestion[];
    onAnswerChange: (questionTitle: string, value: string) => void;
    containerStyle: CSSObject;
}
