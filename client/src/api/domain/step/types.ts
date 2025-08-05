export type EvaluationType = 'document' | 'interview';
type RecruitmentStep = 'DOCUMENT' | 'INTERVIEW' | 'FINAL';

export interface StepApplicant {
    applicantId: string;
    name: string;
    email: string;
    status: string;
    submittedAt: string;
}

export interface Step {
    process: RecruitmentStep[];
}
