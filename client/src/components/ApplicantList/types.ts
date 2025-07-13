import { Applicant } from '@components/ApplicantMiniCard/types';
import type { ReactNode } from 'react';

export interface ApplicationListProps {
    title?: string;
    height?: string;
    applicantList: Applicant[];
    selectedApplicantId: number;
    onSelectApplicantId: (id: number) => void;
}
