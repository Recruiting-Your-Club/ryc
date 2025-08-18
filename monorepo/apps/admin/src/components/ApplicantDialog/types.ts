import type { PersonalInfo, QuestionAnswer } from '@api/domain/applicant/types';
import type { EvaluationDetailWithSummary } from '@api/domain/evaluation/types';
import type { StepApplicantWithoutImage } from '@api/domain/step/types';

export interface ApplicantDialogProps {
    open: boolean;
    handleClose: () => void;
    applicant: StepApplicantWithoutImage;
    evaluationLabels: string[];
    personalInformation: PersonalInfo[];
    preQuestionAnswers: QuestionAnswer[];
    applicationQuestionAnswers: QuestionAnswer[];
    evaluations: EvaluationDetailWithSummary[];
    isThreeStepProcess: boolean;
}
