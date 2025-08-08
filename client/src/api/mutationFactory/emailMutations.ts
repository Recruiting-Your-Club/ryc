import { postInterviewEmail, postPlainEmail } from '@api/domain';
import type { Email, InterviewEmail } from '@api/domain/email/types';
import { useMutation } from '@tanstack/react-query';

export const emailMutations = {
    usePostPlainEmail: () => {
        return useMutation({
            mutationFn: (params: { announcementId: string; clubId: string; email: Email }) =>
                postPlainEmail(params),
        });
    },
    usePostInterviewEmail: () => {
        return useMutation({
            mutationFn: (params: {
                announcementId: string;
                clubId: string;
                email: InterviewEmail;
            }) => postInterviewEmail(params),
        });
    },
};
