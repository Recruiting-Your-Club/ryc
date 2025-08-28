export interface EmailVerificationDialogProps {
    email?: string;
    isOpen: boolean;
    onClose: () => void;
    onVerify?: (code: string) => Promise<boolean>;
    onResendCode?: () => Promise<void>;
    expiresAt: string;
    codeLength?: number;
}

export type EmailStatus = 'idle' | 'success' | 'error' | 'info';
