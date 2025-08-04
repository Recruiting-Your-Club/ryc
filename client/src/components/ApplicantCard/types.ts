import type { StepApplicant } from '@api/domain/step/types';

export interface ApplicantCardProps {
    applicant: StepApplicant;
    checked: boolean;
    onChange: (email: string, checked: boolean) => void;
    onClick: () => void;
}
