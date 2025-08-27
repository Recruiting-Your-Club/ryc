export interface EmailVerificationDialogProps {
    email?: string;
    isOpen: boolean;
    onClose: () => void;
    onVerify?: (code: string) => Promise<void>;
    onResendCode?: () => Promise<void>;
    codeLength?: number;
}

export type EmailStatus = 'idle' | 'success' | 'error';
