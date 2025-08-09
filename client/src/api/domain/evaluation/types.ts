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
    evaluationType: 'APPLICATION' | 'INTERVIEW';
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
