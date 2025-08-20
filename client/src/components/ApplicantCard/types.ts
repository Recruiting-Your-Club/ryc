import type { MergedStepApplicant } from '@components/CardBox/types';

export interface ApplicantCardProps {
    applicant: MergedStepApplicant;
    checked: boolean;
    onChange: (email: string, checked: boolean) => void;
    onClick: () => void;
}
