import type { EvaluationDetailWithSummary } from '@api/domain/evaluation/types';

export interface EvaluationBoxProps {
    clubId: string;
    selectedApplicantId: string | null;
    evaluation: EvaluationDetailWithSummary;
    onPostComment: (applicantId: string, score: number, comment: string, clubId: string) => void;
    onDeleteComment: (evaluationId: string, clubId: string) => void;
    onUpdateComment: (evaluationId: string, score: number, comment: string, clubId: string) => void;
    height?: string;
}
