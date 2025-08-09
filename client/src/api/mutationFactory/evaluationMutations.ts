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
            mutationFn: async (params: {
                clubId: string;
                evaluationId: string;
                score: number;
                comment: string;
            }) => {
                await putEvaluationScoreAndComment(params);
            },
        });
    },
    useDeleteEvaluation: () => {
        return useMutation({
            mutationFn: async (params: {
                clubId: string;
                evaluationId: string;
                score: number;
                comment: string;
            }) => {
                await deleteEvaluation(params);
            },
        });
    },
    usePostPersonalApplicationEvaluation: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: async (params: {
                clubId: string;
                applicantId: string;
                score: number;
                comment: string;
            }) => {
                await postPersonalApplicationEvaluation(params);
            },
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
            mutationFn: async (params: {
                clubId: string;
                applicantId: string;
                score: number;
                comment: string;
            }) => {
                await postPersonalInterviewEvaluation(params);
            },
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
