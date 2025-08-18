import type { EvaluationDetailWithSummary } from '@api/domain/evaluation/types';

export const DOCUMENT_STEP = 0;
export const INTERVIEW_STEP = 1;
export const FINAL_STEP_IN_THREE = 2;
export const FINAL_STEP_IN_TWO = 1;

export const INITIAL_EVALUATION_SUMMARY: EvaluationDetailWithSummary = {
    applicantId: '',
    completedEvaluatorCount: 0,
    totalEvaluatorCount: 0,
    averageScore: 0,
    evaluationDetails: [],
};
