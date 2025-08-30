import type { EvaluationType } from '@api/domain/evaluation/types';
import { useEvaluationMutations } from '@api/hooks/useEvaluationMutations';
import type { ErrorWithStatusCode } from '@pages/ErrorFallbackPage/types';

function useEvaluation(
    type: EvaluationType,
    selectedApplicantId: string,
    getEvaluationActionCallbacks: (status: string) => {
        onSuccess: () => void;
        onError: (error: ErrorWithStatusCode) => void;
    },
) {
    const { mutate: postComment } = useEvaluationMutations.usePostPersonalEvaluation();
    const { mutate: updateComment } = useEvaluationMutations.usePutEvaluation(selectedApplicantId);
    const { mutate: deleteComment } =
        useEvaluationMutations.useDeleteEvaluation(selectedApplicantId);

    const handlePostComment = (
        applicantId: string,
        score: number,
        comment: string,
        clubId: string,
    ) => {
        postComment(
            { applicantId, score, comment, clubId, type: type },
            {
                onSuccess: getEvaluationActionCallbacks('등록').onSuccess,
                onError: (error) => {
                    getEvaluationActionCallbacks('등록').onError(error as ErrorWithStatusCode);
                },
            },
        );
    };

    const handleUpdateComment = (
        evaluationId: string,
        score: number,
        comment: string,
        clubId: string,
    ) => {
        updateComment(
            { evaluationId, score, comment, clubId, type: type },
            {
                onSuccess: getEvaluationActionCallbacks('수정').onSuccess,
                onError: (error) => {
                    getEvaluationActionCallbacks('수정').onError(error as ErrorWithStatusCode);
                },
            },
        );
    };

    const handleDeleteComment = (evaluationId: string, clubId: string) => {
        deleteComment(
            { evaluationId, clubId, type: type },
            {
                onSuccess: getEvaluationActionCallbacks('삭제').onSuccess,
                onError: (error) => {
                    getEvaluationActionCallbacks('삭제').onError(error as ErrorWithStatusCode);
                },
            },
        );
    };

    return {
        handlePostComment,
        handleUpdateComment,
        handleDeleteComment,
    };
}

export { useEvaluation };
