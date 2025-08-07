import type { EvaluationDataWithSummary } from '@api/domain/evaluation/types';
import type { StepApplicant } from '@api/domain/step/types';

export interface Document {
    question: string;
    answer: string;
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
