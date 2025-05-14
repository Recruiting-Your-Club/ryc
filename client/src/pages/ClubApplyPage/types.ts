import type { CSSObject } from '@emotion/react';

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

export interface ClubApplyPersonalInfoPageProps {
    idx: number;
    answers: { [key: string]: string };
    clubPersonalQuestions: PersonalQuestion[];
    onAnswerChange: (id: string, value: string) => void;
    containerStyle: CSSObject;
}

export interface ClubApplyDetailQuestionPageProps {
    idx: number;
    answers: { [key: string]: string };
    clubDetailQuestions: DetailQuestion[];
    onAnswerChange: (id: string, value: string) => void;
    containerStyle: CSSObject;
}
