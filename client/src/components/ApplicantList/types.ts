import { Applicant } from '@api/domain/applicant/types';

export interface ApplicationListProps {
    title?: string;
    height?: string;
    applicantList: Applicant[];
    selectedApplicantId: number;
    onSelectApplicantId: (id: number) => void;
}
