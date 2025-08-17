import type { EvaluationDataWithSummary } from '@api/domain/evaluation/types';

export interface EvaluationBoxProps {
    selectedApplicantId: string | null;
    evaluation: EvaluationDataWithSummary;
    onPostComment: (
        applicantId: string,
        score: number,
        comment: string,
        clubId: string,
        type: 'application' | 'interview',
    ) => void;
    onDeleteComment: (evaluationId: string, clubId: string) => void;
    onUpdateComment: (evaluationId: string, score: number, comment: string, clubId: string) => void;
    height?: string;
}
