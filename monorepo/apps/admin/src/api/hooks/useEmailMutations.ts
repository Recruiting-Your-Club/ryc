import { postInterviewEmail, postPlainEmail } from '@api/domain';
import type { Email, InterviewEmail } from '@api/domain/email/types';
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
    onClose: () => void,
) => {
    const { toast } = useToast();

    return useMutation({
        mutationFn,
        onSuccess: () => {
            onClose();
            toast('이메일 전송이 완료되었어요!', {
                type: 'success',
                toastTheme: 'colored',
            });
        },
        onError: (error) => {
            onClose();
            // 500 에러인 경우 전역 처리에 위임
            if (error instanceof HttpError && error.statusCode === 500) {
                return;
            }
            toast('이메일 전송에 실패했어요.', { type: 'error', toastTheme: 'colored' });
        },
    });
};

export const useEmailMutations = {
    usePostPlainEmail: (onClose: () => void) => useEmailMutation<Email>(postPlainEmail, onClose),

    usePostInterviewEmail: (onClose: () => void) =>
        useEmailMutation<InterviewEmail>(postInterviewEmail, onClose),
};
