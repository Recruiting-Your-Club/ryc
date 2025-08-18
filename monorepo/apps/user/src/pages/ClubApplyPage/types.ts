import type {
    PersonalInfoQuestionType,
    QuestionOption,
    QuestionType,
} from '@api/domain/announcement/types';
import type { CSSObject } from '@emotion/react';
import type { RefObject } from 'react';

export type PageAnswer = 'personal' | 'detail';

export type FileRecord = Record<string, File[]>;

export interface QuestionResponse {
    id: string;
    label: string;
    type: QuestionType | PersonalInfoQuestionType;
    options?: QuestionOption[];
    isRequired: boolean;
    description?: string;
}
/* 페이지에서 쓰는 답변 타입 (view model) */
export interface Answer {
    id: string;
    value: string;
    questionTitle: string;
    pageAnswerType: PageAnswer;
    questionType: QuestionType | PersonalInfoQuestionType;
    optionIds?: string[];
}

export interface ClubApplyPersonalInfoPageProps {
    answers: Answer[];
    clubPersonalQuestions: QuestionResponse[];
    onAnswerChange: (
        questionId: string,
        questionTitle: string,
        value: string,
        optionText?: string,
    ) => void;
    onFileUpload: (
        questionId: string,
        questionTitle: string,
        questionType: string,
        files: File[],
    ) => void;
    containerStyle: CSSObject;
    getValidationError: (questionTitle: string, value: string) => boolean;
    getErrorMessage: (questionTitle: string, value: string) => string | undefined;
    touched: { [key: string]: boolean };
    onBlur: (questionTitle: string) => void;
    onFocus: (questionTitle: string) => void;
    questionRefs: RefObject<{ [key: string]: HTMLDivElement | null }>;
    isFileUploading?: boolean;
}

export interface ClubApplyDetailQuestionPageProps {
    answers: Answer[];
    clubDetailQuestions: QuestionResponse[];
    onAnswerChange: (questionId: string, questionTitle: string, value: string) => void;
    containerStyle: CSSObject;
    touched: { [key: string]: boolean };
    onBlur: (questionTitle: string) => void;
    onFocus: (questionTitle: string) => void;
    questionRefs: RefObject<{ [key: string]: HTMLDivElement | null }>;
}
