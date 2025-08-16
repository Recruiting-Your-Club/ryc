import type { EvaluationDetailWithSummary } from '@api/domain/evaluation/types';

export const INITIAL_EVALUATION_SUMMARY: EvaluationDetailWithSummary = {
    applicantId: '',
    completedEvaluatorCount: 0,
    totalEvaluatorCount: 0,
    averageScore: 0,
    evaluationDetails: [],
};
