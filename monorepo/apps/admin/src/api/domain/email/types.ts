export interface Email {
    recipients: string[];
    subject: string;
    content: string;
}

export interface InterviewEmail {
    subject: string;
    content: string;
}

export interface InterviewDetailInformation {
    start: string;
    interviewDuration: number;
    numberOfPeople: number;
}

export interface EmailVerificationSend {
    expiresAt: string;
}

export interface RequestPatchEmailVerification {
    email: string;
    code: number;
}

export interface RequestPostEmailVerification {
    email: string;
}
