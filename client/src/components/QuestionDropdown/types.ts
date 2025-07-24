import type { DetailQuestion, PersonalQuestion, Answer } from '@pages/ClubApplyPage/types';

export interface QuestionDropdownProps {
    completedQuestionsCount: number;
    personalQuestions: PersonalQuestion[];
    detailQuestions: DetailQuestion[];
    requiredQuestionsCompleted: boolean;
    allQuestionsCount: number;
    answers: Answer[];
    onQuestionFocus: (questionTitle: string, tab: string) => void;
}
