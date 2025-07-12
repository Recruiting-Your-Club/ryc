import { Applicant } from '@pages/StepManagementPage/types';

export interface ApplicantCardProps {
    applicant: Applicant;
    checked: boolean;
    onChange: (email: string, checked: boolean) => void;
    onClick: () => void;
}
