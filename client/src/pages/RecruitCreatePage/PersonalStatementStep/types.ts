import type { QuestionProps } from '@components/QuestionForm/types';

export interface PersonalStatementStepProps {
    applicationQuestions: QuestionProps[];
    addApplicationQuestion: () => void;
    removeApplicationQuestion: (id: string) => void;
    updateApplicationQuestion: (id: string, updates: Partial<QuestionProps>) => void;
}
