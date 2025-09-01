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

    const handlePostComment = async (
        applicantId: string,
        score: number,
        comment: string,
        clubId: string,
    ) => {
        try {
            await postComment({ applicantId, score, comment, clubId, type });
            getEvaluationActionCallbacks('등록').onSuccess();
            return true;
        } catch (error) {
            getEvaluationActionCallbacks('등록').onError(error as ErrorWithStatusCode);
            return false;
        }
    };

    const handleUpdateComment = async (
        evaluationId: string,
        score: number,
        comment: string,
        clubId: string,
    ) => {
        try {
            await updateComment({ evaluationId, score, comment, clubId, type });
            getEvaluationActionCallbacks('수정').onSuccess();
            return true;
        } catch (error) {
            getEvaluationActionCallbacks('수정').onError(error as ErrorWithStatusCode);
            return false;
        }
    };

    const handleDeleteComment = async (evaluationId: string, clubId: string) => {
        try {
            await deleteComment({ evaluationId, clubId, type });
            getEvaluationActionCallbacks('삭제').onSuccess();
            return true;
        } catch (error) {
            getEvaluationActionCallbacks('삭제').onError(error as ErrorWithStatusCode);
            return false;
        }
    };

    return {
        handlePostComment,
        handleUpdateComment,
        handleDeleteComment,
    };
}

export { useEvaluation };
