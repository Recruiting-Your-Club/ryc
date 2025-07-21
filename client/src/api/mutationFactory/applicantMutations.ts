import {
    deleteDocumentEvaluation,
    postDocumentEvaluation,
    updateDocumentEvaluation,
} from '@api/domain';
import { applicantKeys } from '@api/querykeyFactory';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const applicantMutations = {
    usePostDocumentEvaluation: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: ({
                applicantId,
                body,
            }: {
                applicantId: number;
                body: { score: number; comment: string };
            }) => postDocumentEvaluation(applicantId, body),

            onSuccess: (_, { applicantId }) => {
                queryClient.invalidateQueries({
                    queryKey: applicantKeys.evaluationDetail(applicantId),
                });
            },
        });
    },

    useDeleteDocumentEvaluation: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: ({ applicantId, commentId }: { applicantId: number; commentId: number }) =>
                deleteDocumentEvaluation(applicantId, commentId),
            onSuccess: (_, { applicantId }) => {
                queryClient.invalidateQueries({
                    queryKey: applicantKeys.evaluationDetail(applicantId),
                });
            },
        });
    },

    useUpdateDocumentEvaluation: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: ({
                applicantId,
                commentId,
                body,
            }: {
                applicantId: number;
                commentId: number;
                body: {
                    score: number;
                    comment: string;
                };
            }) => updateDocumentEvaluation(applicantId, commentId, body),
            onSuccess: (_, { applicantId }) => {
                queryClient.invalidateQueries({
                    queryKey: applicantKeys.evaluationDetail(applicantId),
                });
            },
        });
    },
};

export { applicantMutations };
