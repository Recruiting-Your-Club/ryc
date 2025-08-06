export interface EvaluationSummary {
    applicantId: string;
    completedEvaluatorCount: number;
    totalEvaluatorCount: number;
    averageScore: number;
}

export interface EvaluationData {
    evaluationId: string;
    evaluatorId: string;
    evaluatorName: string;
    score: number;
    comment: string;
    evaluationType: 'APPLICANT' | 'INTERVIEW';
    isMyEvaluation: boolean;
}

export interface EvaluationDataWithSummary {
    completedEvaluatorCount: number;
    totalEvaluatorCount: number;
    averageScore: number;
    evaluationDatas: EvaluationData[];
}

export interface Evaluation {
    evaluationsByApplicant: {
        [applicantId: string]: EvaluationDataWithSummary;
    };
}
