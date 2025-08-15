import type { CSSObject } from '@emotion/react';
import type { HTMLAttributes } from 'react';

export interface ApplicationMiniCardProps extends HTMLAttributes<HTMLButtonElement> {
    applicant: { applicantId: string; name: string; email: string };
    isCompleted?: boolean;
    isActivated?: boolean;
    sx?: CSSObject;
}
