import type { EvaluationDataWithSummary } from '@api/domain/evaluation/types';
import type { StepApplicant } from '@api/domain/step/types';
import type { evaluation } from '@constants/applicantDialog';

export type EvaluationType = (typeof evaluation)[number];

export interface Evaluator {
    id: number;
    name: string;
    score: number;
    comment: string;
}

export interface Document {
    question: string;
    answer: string;
}
export interface Evaluation {
    type: EvaluationType;
    averageScore: number;
    evaluators: Evaluator[];
}

export interface ApplicantDialogProps {
    open: boolean;
    handleClose: () => void;
    applicant: StepApplicant;
    evaluationLabels: string[];
    documentList: Document[];
    evaluations: EvaluationDataWithSummary[];
    isThreeStepProcess: boolean;
}
