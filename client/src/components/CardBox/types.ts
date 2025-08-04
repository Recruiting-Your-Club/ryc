import type { StepApplicant } from '@api/domain/step/types';
import type { CSSObject } from '@emotion/react';

export type Step = 'normal' | 'final';

export interface CardBoxProps {
    stepTitle: string;
    step: Step;
    searchText: string;
    passedApplicantList: StepApplicant[];
    failedApplicantList: StepApplicant[];
    handleOpen: (applicant: StepApplicant) => void;
    height?: string;
    sx?: CSSObject;
}
