import { patchEmailVerification, postEmailVerification } from '@api/domain/email/email';
import type {
    EmailVerificationSend,
    RequestPatchEmailVerification,
    RequestPostEmailVerification,
} from '@api/domain/email/types';
import { useMutation } from '@tanstack/react-query';

export const useSendEmailVerification = () => {
    return useMutation<EmailVerificationSend, unknown, RequestPostEmailVerification>({
        mutationFn: (payload) => postEmailVerification(payload),
    });
};

export const useVerifyEmailCode = () => {
    return useMutation<void, unknown, RequestPatchEmailVerification>({
        mutationFn: (payload) => patchEmailVerification(payload),
    });
};
