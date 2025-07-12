import type { CSSObject } from '@emotion/react';
import { Applicant } from '@pages/StepManagementPage/types';

export type Step = 'normal' | 'final';

export interface CardBoxProps {
    stepTitle: string;
    step: Step;
    query: string;
    applicantList: Applicant[];
    handleOpen: (applicant: Applicant) => void;
    height?: string;
    sx?: CSSObject;
}
