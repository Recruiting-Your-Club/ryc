import type { QuestionProps} from '@components/QuestionForm/type';
import { QuestionType } from '@components/QuestionForm/type';

export interface PersonalStatementStepProps {
    applicationQuestions: QuestionProps[];
    addApplicationQuestion: () => void;
    removeApplicationQuestion: (id: string) => void;
    updateApplicationQuestion: (id: string, updates: Partial<QuestionProps>) => void;
}
