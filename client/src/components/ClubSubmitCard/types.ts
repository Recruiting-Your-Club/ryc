import type { DetailQuestion, PersonalQuestion } from '@pages/ClubApplyPage/types';
import type { Answer } from '@pages/ClubApplyPage/types';

export interface ClubSubmitCardProps {
    clubName: string;
    tag: string;
    deadline: string;
    personalQuestions: PersonalQuestion[];
    detailQuestions: DetailQuestion[];
    completedQuestionsCount: number;
    requiredQuestionsCount: number;
    deadlineColor?: string;
    onSubmit?: () => void;
    answers: Answer[];
}
