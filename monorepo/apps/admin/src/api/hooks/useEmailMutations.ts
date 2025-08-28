import {
    patchEmailVerification,
    postEmailVerification,
    postInterviewEmail,
    postPlainEmail,
} from '@api/domain';
import type {
    Email,
    EmailVerificationSend,
    InterviewEmail,
    RequestPatchEmailVerification,
    RequestPostEmailVerification,
} from '@api/domain/email/types';
import { useMutation } from '@tanstack/react-query';

import { useToast } from '@ssoc/ui';

import { HttpError } from '../common/httpError';

type EmailMutationParams<T> = {
    announcementId: string;
    clubId: string;
    email: T;
};

const useEmailMutation = <T>(
    mutationFn: (params: EmailMutationParams<T>) => Promise<void>,
    onClose: (isClosed: boolean) => void,
) => {
    const { toast } = useToast();

    return useMutation({
        mutationFn,
        onSuccess: () => {
            onClose(true);
            toast('이메일 전송이 완료되었어요!', {
                type: 'success',
                toastTheme: 'colored',
            });
        },
        onError: (error) => {
            onClose(false);
            // 500 에러인 경우 전역 처리에 위임
            if (error instanceof HttpError && error.statusCode === 500) {
                return;
            }
            toast('이메일 전송에 실패했어요.', { type: 'error', toastTheme: 'colored' });
        },
    });
};

export const useEmailMutations = {
    usePostPlainEmail: (onClose: (isClosed: boolean) => void) =>
        useEmailMutation<Email>(postPlainEmail, () => onClose),

    usePostInterviewEmail: (onClose: (isClosed: boolean) => void) =>
        useEmailMutation<InterviewEmail>(postInterviewEmail, () => onClose),
};

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
