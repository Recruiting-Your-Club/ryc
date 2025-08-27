import type { CSSObject } from '@emotion/react';
import type { Answer, QuestionResponse } from '@pages/ClubApplyPage/types';

export interface QuestionDropdownProps {
    completedQuestionsCount: number;
    personalQuestions: QuestionResponse[];
    detailQuestions: QuestionResponse[];
    requiredQuestionsCompleted: boolean;
    allQuestionsCount: number;
    answers: Answer[];
    onQuestionFocus: (questionTitle: string, tab: string) => void;
    sx?: CSSObject;
}
