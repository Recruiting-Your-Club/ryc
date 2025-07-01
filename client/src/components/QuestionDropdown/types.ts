import type { DetailQuestion, PersonalQuestion, Answer } from '@pages/ClubApplyPage/types';

export interface QuestionDropdownProps {
    completedQuestionsCount: number;
    requiredQuestionsCount: number;
    personalQuestions: PersonalQuestion[];
    detailQuestions: DetailQuestion[];
    answers: Answer[];
}
