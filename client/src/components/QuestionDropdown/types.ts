import type { DetailQuestion, PersonalQuestion } from '@pages/ClubApplyPage/types';

export interface QuestionStatusDropdownProps {
    completedQuestionsCount: number;
    requiredQuestionsCount: number;
    personalQuestions: PersonalQuestion[];
    detailQuestions: DetailQuestion[];
}
