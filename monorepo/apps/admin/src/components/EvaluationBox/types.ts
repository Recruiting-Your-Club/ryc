import type { EvaluationDetailWithSummary } from '@api/domain/evaluation/types';

export interface EvaluationBoxProps {
    clubId: string;
    selectedApplicantId: string | null;
    evaluation: EvaluationDetailWithSummary;
    onPostComment: (
        applicantId: string,
        score: number,
        comment: string,
        clubId: string,
    ) => Promise<boolean>;
    onDeleteComment: (evaluationId: string, clubId: string) => Promise<boolean>;
    onUpdateComment: (
        evaluationId: string,
        score: number,
        comment: string,
        clubId: string,
    ) => Promise<boolean>;
    height?: string;
}
