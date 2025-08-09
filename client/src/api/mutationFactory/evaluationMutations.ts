import {
    deleteEvaluation,
    postPersonalApplicationEvaluation,
    postPersonalInterviewEvaluation,
    putEvaluationScoreAndComment,
} from '@api/domain';
import { evaluationKeys } from '@api/querykeyFactory';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const evaluationMutations = {
    usePutEvaluation: () => {
        return useMutation({
            mutationFn: (params: {
                evaluationId: string;
                score: number;
                comment: string;
                clubId: string;
            }) => putEvaluationScoreAndComment(params),
        });
    },
    useDeleteEvaluation: () => {
        return useMutation({
            mutationFn: (params: { evaluationId: string; clubId: string }) =>
                deleteEvaluation(params),
        });
    },
    usePostPersonalApplicationEvaluation: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (params: {
                clubId: string;
                applicantId: string;
                score: number;
                comment: string;
            }) => postPersonalApplicationEvaluation(params),

            onSuccess: (_, variables) => {
                queryClient.invalidateQueries({
                    queryKey: evaluationKeys.evaluationDetail(
                        variables.clubId,
                        [variables.applicantId],
                        'document',
                    ),
                });
            },
        });
    },
    usePostPersonalInterviewEvaluation: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (params: {
                clubId: string;
                applicantId: string;
                score: number;
                comment: string;
            }) => postPersonalInterviewEvaluation(params),

            onSuccess: (_, variables) => {
                queryClient.invalidateQueries({
                    queryKey: evaluationKeys.evaluationDetail(
                        variables.clubId,
                        [variables.applicantId],
                        'interview',
                    ),
                });
            },
        });
    },
};

export { evaluationMutations };
