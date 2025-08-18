import type { StepApplicant } from '@api/domain/step/types';
import type { CSSObject } from '@emotion/react';

export type Step = 'document' | 'interview' | 'final';

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
    onEmailDialogOpen: (target: string, ids: string[], isInterviewDialog?: boolean) => void;
    height?: string;
    sx?: CSSObject;
}
