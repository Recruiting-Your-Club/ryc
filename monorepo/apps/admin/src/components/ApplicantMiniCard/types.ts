import type { StepApplicant } from '@api/domain/step/types';
import type { CSSObject } from '@emotion/react';
import type { HTMLAttributes } from 'react';

export interface ApplicationMiniCardProps extends HTMLAttributes<HTMLButtonElement> {
    applicant: StepApplicant;
    isCompleted?: boolean;
    isActivated?: boolean;
    sx?: CSSObject;
}
