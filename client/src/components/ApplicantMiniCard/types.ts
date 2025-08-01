import type { CSSObject } from '@emotion/react';
import type { HTMLAttributes } from 'react';

export interface Applicant {
    id: number;
    name: string;
    email: string;
}

export interface ApplicationMiniCardProps extends HTMLAttributes<HTMLButtonElement> {
    applicant: Applicant;
    isCompleted?: boolean;
    isActivated?: boolean;
    sx?: CSSObject;
}
