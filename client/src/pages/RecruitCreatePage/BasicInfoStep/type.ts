import type { Dispatch, SetStateAction } from 'react';
import type { BasicInfoFields } from '../type';
import type { QuestionProps, QuestionType } from '@components/QuestionForm/type';

export interface BasicInfoStepProps extends QuestionHandlers {
    infoFields: BasicInfoFields;
    setInfoFields: Dispatch<SetStateAction<BasicInfoFields>>;
}

export interface QuestionHandlers {
    questions: QuestionProps[];
    addQuestion: () => void;
    removeQuestion: (id: string) => void;
    updateQuestion: (id: string, updates: Partial<QuestionProps>) => void;
    handleQuestionTypeChange: (id: string, newQuestionType: QuestionType) => void;
}

export interface InfoFieldGroupProps {
    infoFields: BasicInfoFields;
    setInfoFields: Dispatch<SetStateAction<BasicInfoFields>>;
}
