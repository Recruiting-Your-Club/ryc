import {
    deleteEvaluation,
    postPersonalEvaluation,
    putEvaluationScoreAndComment,
} from '@api/domain';
import { evaluationKeys } from '@api/querykeyFactory';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const evaluationMutations = {
    usePutEvaluation: (applicantId: string) => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (params: {
                evaluationId: string;
                score: number;
                comment: string;
                clubId: string;
            }) => putEvaluationScoreAndComment(params),

            onSuccess: (_, variables) => {
                queryClient.invalidateQueries({
                    queryKey: evaluationKeys.evaluationDetail(
                        variables.clubId,
                        [applicantId],
                        'document',
                    ),
                });
            },
        });
    },

    useDeleteEvaluation: (applicantId: string) => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (params: { evaluationId: string; clubId: string }) =>
                deleteEvaluation(params),

            onSuccess: (_, variables) => {
                queryClient.invalidateQueries({
                    queryKey: evaluationKeys.evaluationDetail(
                        variables.clubId,
                        [applicantId],
                        'document',
                    ),
                });
            },
        });
    },
    usePostPersonalEvaluation: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (params: {
                clubId: string;
                applicantId: string;
                score: number;
                comment: string;
                type: 'application' | 'interview';
            }) => postPersonalEvaluation(params),

            onSuccess: (_, variables) => {
                queryClient.invalidateQueries({
                    queryKey: evaluationKeys.evaluationDetail(
                        variables.clubId,
                        [variables.applicantId],
                        variables.type === 'application' ? 'document' : 'interview',
                    ),
                });
            },
        });
    },
};

export { evaluationMutations };
