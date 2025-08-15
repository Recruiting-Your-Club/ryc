export interface EvaluationSummary {
    applicantId: string;
    completedEvaluatorCount: number;
    totalEvaluatorCount: number;
    averageScore: number;
}

export interface EvaluationDetail {
    evaluationId: string;
    evaluatorId: string;
    evaluatorName: string;
    evaluatorThumbnailUrl: string;
    isEvaluatorImagePresent: boolean;
    score: number;
    comment: string;
    evaluationType: 'APPLICATION' | 'INTERVIEW';
    isMyEvaluation: boolean;
}

export interface EvaluationDetailWithSummary {
    applicantId: string;
    completedEvaluatorCount: number;
    totalEvaluatorCount: number;
    averageScore: number;
    evaluationDetails: EvaluationDetail[];
}

export interface Evaluation {
    evaluationsOfApplicants: EvaluationDetailWithSummary[];
}

export interface MyEvaluationStatus {
    applicantEvaluationStatuses: PerEvaluationStatus[];
}

export interface PerEvaluationStatus {
    applicantId: string;
    isEvaluated: boolean;
}
