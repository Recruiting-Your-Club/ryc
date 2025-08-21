export type EvaluationType = 'application' | 'interview';

export interface EvaluationSummary {
    overviewDataList: PerEvaluationSummary[];
}

export interface PerEvaluationSummary {
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
    evaluatedApplicantIds: string[];
}

export interface PerEvaluationStatus {
    applicantId: string;
    isEvaluated: boolean;
}
