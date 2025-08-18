import { postInterviewEmail, postPlainEmail } from '@api/domain';
import type { Email, InterviewEmail } from '@api/domain/email/types';
import { useToast } from '@hooks/useToast';
import { useMutation } from '@tanstack/react-query';

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
        onError: () => {
            onClose();
            toast('이메일 전송에 실패했어요.', { type: 'error', toastTheme: 'colored' });
        },
    });
};

export const emailMutations = {
    usePostPlainEmail: (onClose: () => void) => useEmailMutation<Email>(postPlainEmail, onClose),

    usePostInterviewEmail: (onClose: () => void) =>
        useEmailMutation<InterviewEmail>(postInterviewEmail, onClose),
};
