import type { DocumentDetail, QuestionAnswer } from '@api/domain/applicant/types';
import type { EvaluationDataWithSummary } from '@api/domain/evaluation/types';
import type { StepApplicant } from '@api/domain/step/types';

export interface ApplicantDialogProps {
    open: boolean;
    handleClose: () => void;
    applicant: StepApplicant;
    evaluationLabels: string[];
    preQuestionAnswers: QuestionAnswer[];
    applicationQuestionAnswers: QuestionAnswer[];
    evaluations: EvaluationDataWithSummary[];
    isThreeStepProcess: boolean;
}
