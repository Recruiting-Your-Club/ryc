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
