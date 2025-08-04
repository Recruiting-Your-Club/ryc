import type { Applicant } from '../applicant/types';

export interface StepApplicant extends Applicant {
    state: string;
    applicationDate: string;
    completedEvaluatorCount: number;
    totalEvaluatorCount: number;
    averageScore: number;
}

type RecruitmentStep = 'DOCUMENT' | 'INTERVIEW' | 'FINAL';

export interface Step {
    process: RecruitmentStep[];
}
