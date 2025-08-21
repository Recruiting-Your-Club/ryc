import type { EvaluationType } from '@api/domain/evaluation/types';
import { useEvaluationMutations } from '@api/hooks/useEvaluationMutations';

function useEvaluation(
    type: EvaluationType,
    selectedApplicantId: string,
    getEvaluationActionCallbacks: (status: string) => {
        onSuccess: () => void;
        onError: () => void;
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
            getEvaluationActionCallbacks('등록'),
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
            getEvaluationActionCallbacks('수정'),
        );
    };

    const handleDeleteComment = (evaluationId: string, clubId: string) => {
        deleteComment({ evaluationId, clubId, type: type }, getEvaluationActionCallbacks('삭제'));
    };

    return {
        handlePostComment,
        handleUpdateComment,
        handleDeleteComment,
    };
}

export { useEvaluation };
