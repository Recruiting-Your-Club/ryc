import type { MergedStepApplicant } from '@components/CardBox/types';

export interface ApplicantCardProps {
    status: string;
    applicant: MergedStepApplicant;
    checked: boolean;
    onChange: (email: string, checked: boolean) => void;
    onClick: () => void;
}
