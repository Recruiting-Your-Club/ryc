import {
    deleteEvaluation,
    postPersonalEvaluation,
    putEvaluationScoreAndComment,
} from '@api/domain';
import { evaluationKeys } from '@api/querykeyFactory';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface DeletePersonalEvaluation {
    evaluationId: string;
    clubId: string;
    type: 'application' | 'interview';
}

interface PutEvaluation {
    evaluationId: string;
    score: number;
    comment: string;
    clubId: string;
    type: 'application' | 'interview';
}

interface PostPersonalEvaluation {
    clubId: string;
    applicantId: string;
    score: number;
    comment: string;
    type: 'application' | 'interview';
}

export const useEvaluationMutations = {
    usePutEvaluation: (applicantId: string) => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (params: PutEvaluation) => putEvaluationScoreAndComment(params),

            onSuccess: (_, variables) => {
                queryClient.invalidateQueries({
                    queryKey: evaluationKeys.evaluationDetail(
                        variables.clubId,
                        [applicantId],
                        variables.type === 'application' ? 'application' : 'interview',
                    ),
                });
            },
        });
    },

    useDeleteEvaluation: (applicantId: string) => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (params: DeletePersonalEvaluation) => deleteEvaluation(params),

            onSuccess: (_, variables) => {
                queryClient.invalidateQueries({
                    queryKey: evaluationKeys.evaluationDetail(
                        variables.clubId,
                        [applicantId],
                        variables.type === 'application' ? 'application' : 'interview',
                    ),
                });
            },
        });
    },
    usePostPersonalEvaluation: () => {
        const queryClient = useQueryClient();
        return useMutation({
            mutationFn: (params: PostPersonalEvaluation) => postPersonalEvaluation(params),

            onSuccess: (_, variables) => {
                queryClient.invalidateQueries({
                    queryKey: evaluationKeys.evaluationDetail(
                        variables.clubId,
                        [variables.applicantId],
                        variables.type === 'application' ? 'application' : 'interview',
                    ),
                });
            },
        });
    },
};
