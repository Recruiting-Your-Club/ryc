import type { CSSObject } from '@emotion/react';

export type Step = 'normal' | 'final';

export interface MergedStepApplicant {
    applicantId: string;
    name: string;
    email: string;
    status: string;
    submittedAt: string;
    completedEvaluatorCount: number;
    totalEvaluatorCount: number;
    averageScore: number;
}

export interface CardBoxProps {
    stepTitle: string;
    step: Step;
    searchText: string;
    passedApplicantList: MergedStepApplicant[];
    failedApplicantList: MergedStepApplicant[];
    handleOpen: (applicant: MergedStepApplicant) => void;
    handleApplicantStatus: (applicantIds: string[], newStatus: string) => void;
    statusLabel: { label: string; status: string }[];
    statusInOwnStep: { pass: string; fail: string };
    onEmailDialogOpen: Dispatch<SetStateAction<boolean>>;
    height?: string;
    sx?: CSSObject;
}
