import type { QuestionResponse } from '@pages/ClubApplyPage/types';
import type { Answer } from '@pages/ClubApplyPage/types';

export interface ClubSubmitCardProps {
    clubName: string;
    category: string;
    deadline: string;
    field: string;
    personalQuestions: QuestionResponse[];
    detailQuestions: QuestionResponse[];
    completedQuestionsCount: number;
    requiredQuestionsCount: number;
    requiredQuestionsCompleted: boolean;
    allQuestionsCount: number;
    answers: Answer[];
    logo: string;
    isSubmitting: boolean;
    onQuestionFocus: (questionTitle: string, tab: string) => void;
    onSubmit?: () => void;
}
