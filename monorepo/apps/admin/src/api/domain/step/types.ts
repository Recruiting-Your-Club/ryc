export type EvaluationType = 'document' | 'interview';
type RecruitmentStep = 'DOCUMENT' | 'INTERVIEW' | 'FINAL';

export interface StepApplicant {
    applicantId: string;
    name: string;
    email: string;
    imageAllowed: boolean;
    imagePresent: boolean;
    status: string;
    submittedAt: string;
    representativeImage: ProfileImageInformation;
}

export interface StepApplicantWithoutImage {
    applicantId: string;
    name: string;
    email: string;
    status: string;
    submittedAt: string;
}

export interface ProfileImageInformation {
    id: string;
    url: string;
    originalFileName: string;
    contentType: string;
}

export interface Step {
    process: RecruitmentStep[];
}
