import type { DetailQuestion, PersonalQuestion } from '@pages/ClubApplyPage/types';
import type { Answer } from '@pages/ClubApplyPage/types';

export interface ClubSubmitCardProps {
    clubName: string;
    category: string;
    deadline: string;
    description: string;
    personalQuestions: PersonalQuestion[];
    detailQuestions: DetailQuestion[];
    completedQuestionsCount: number;
    requiredQuestionsCount: number;
    requiredQuestionsCompleted: boolean;
    allQuestionsCount: number;
    answers: Answer[];
    onQuestionFocus: (questionTitle: string, tab: string) => void;
    onSubmit?: () => void;
}
