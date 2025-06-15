import type { CSSObject } from '@emotion/react';
import type { HTMLAttributes } from 'react';

export interface ApplicantSummary {
    id: number;
    name: string;
    email: string;
}

export interface ApplicationMiniCardProps extends HTMLAttributes<HTMLDivElement> {
    applicant: ApplicantSummary;
    isCompleted?: boolean;
    isActivated?: boolean;
    sx?: CSSObject;
}
