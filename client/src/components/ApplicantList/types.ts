import type { Applicant } from '@api/domain/applicant/types';
import type { ReactNode } from 'react';

export interface ApplicationListProps {
    title?: string;
    height?: string;
    applicantList: Applicant[];
    selectedApplicantId: number;
    onSelectApplicantId: (id: number) => void;
    titleMode?: TitleMode;
    children?: ReactNode;
}

export type TitleMode = 'titleString' | 'titleNode';
