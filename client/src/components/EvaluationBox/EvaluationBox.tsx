import {
    Button,
    ConfirmDialog,
    Divider,
    PersonalScoreCard,
    Rating,
    Text,
    TextArea,
} from '@components';
import { useToast } from '@hooks/useToast';
import React, { useState } from 'react';
import {
    perStarScoreGroup,
    s_averageNumber,
    s_averageText,
    s_boxContainer,
    s_buttonContainerForEdit,
    s_cancelButton,
    s_evaluationTitleContainer,
    s_savedEvaluationContainer,
    s_starScoreContainer,
    s_textarea,
    s_userEvaluation,
} from './EvaluationBox.style';
import { EvaluationBoxProps, MOCK_USER_ID } from './types';

const defaultState = {
    score: 0,
    comment: '',
    isOpenForm: false,
    commentIdForEdit: null as number | null,
};

function EvaluationBox({
    evaluation,
    onPostComment,
    onDeleteComment,
    onUpdateComment,
    height,
}: EvaluationBoxProps) {
    // prop destruction
    // lib hooks
    const { toast } = useToast();

    // initial values
    const defaultState = {
        score: 0,
        comment: '',
        isOpenForm: false,
        commentIdForEdit: null as number | null,
    };

    // state, ref, querystring hooks
    const [formStateMap, setFormStateMap] = useState<Record<number, typeof defaultState>>({}); // applicantId별로 상태 관리
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // form hooks
    // query hooks
    // calculated values
    const formState = formStateMap[evaluation.applicantId] ?? defaultState;

    const currentUserId = MOCK_USER_ID;
    const myComment = evaluation.comments.find((comment) => comment.writerId === currentUserId);

    // handlers
    const handleFormState = (partial: Partial<typeof defaultState>) => {
        setFormStateMap((prev) => ({
            ...prev,
            [evaluation.applicantId]: {
                ...(prev[evaluation.applicantId] ?? defaultState),
                ...partial,
            },
        }));
    };

    const handlePost = () => {
        if (formState.comment.length === 0) {
            toast('코멘트를 작성해야 저장할 수 있어요!', { type: 'error' });
            return;
        }
        onPostComment({
            applicantId: evaluation.applicantId,
            body: { score: formState.score, comment: formState.comment },
        });
        toast('작성한 평가가 저장되었어요!', { type: 'info' });
        handleFormState({ score: 0, comment: '' });
    };

    const handleDelete = () => {
        if (!myComment) return;
        onDeleteComment({
            applicantId: evaluation.applicantId,
            commentId: myComment.id,
        });
    };

    const handleDeleteClick = () => {
        if (formState.isOpenForm) {
            toast('수정 중에는 삭제할 수 없어요!', { type: 'error' });
            return;
        }
        setIsDeleteModalOpen(true);
    };

    const handleUpdate = () => {
        if (formState.comment.length === 0) {
            toast('코멘트를 작성해야 저장할 수 있어요!', { type: 'error' });
            return;
        }
        if (!myComment) return;
        onUpdateComment({
            applicantId: evaluation.applicantId,
            commentId: myComment.id,
            body: {
                score: formState.score,
                comment: formState.comment,
            },
        });
        handleFormState({
            isOpenForm: false,
        });
        toast('작성한 평가가 수정되었어요!', { type: 'info' });
    };

    const handleCancelEdit = () => {
        handleFormState({
            isOpenForm: false,
        });
    };

    // effects

    return (
        <div css={s_boxContainer(height)}>
            <div css={s_savedEvaluationContainer(Boolean(myComment))}>
                <div css={s_evaluationTitleContainer}>
                    <Text as="span" type="captionSemibold" noWrap sx={s_averageText}>
                        평가 목록
                    </Text>
                    <div css={s_starScoreContainer}>
                        <Rating
                            key={evaluation?.applicantId}
                            value={evaluation ? evaluation.averageScore : 0}
                            size="lg"
                            type="display"
                        />
                        <Text as="span" type="captionRegular" color="primary" sx={s_averageNumber}>
                            ({evaluation ? evaluation.averageScore : 0})
                        </Text>
                    </div>
                </div>
                <Divider />
                <div css={perStarScoreGroup((evaluation?.comments?.length ?? 0) > 0)}>
                    {evaluation && evaluation.comments.length > 0 ? (
                        evaluation.comments.map((evaluator) => (
                            <PersonalScoreCard
                                key={evaluator.id}
                                score={evaluator.score}
                                name={evaluator.name}
                                comment={evaluator.comment}
                                commentId={evaluator.id}
                                isUser={evaluator.writerId === currentUserId}
                                handleDelete={handleDeleteClick}
                                onOpenForm={() =>
                                    handleFormState({
                                        isOpenForm: true,
                                        comment: evaluator.comment,
                                        score: evaluator.score,
                                        commentIdForEdit: evaluator.id,
                                    })
                                }
                                isEditable
                            />
                        ))
                    ) : (
                        <Text as="span" type="captionSemibold">
                            등록된 평가가 없습니다.
                        </Text>
                    )}
                </div>
            </div>

            {/* 등록된 평가가 없거나, 수정 버튼을 누르면 아래 Form이 열립니다. */}
            {(!Boolean(myComment) || formState.isOpenForm) && (
                <div css={s_userEvaluation}>
                    <Rating
                        key={formState.score}
                        size="lg"
                        value={formState.score}
                        onChange={(score) => handleFormState({ score })}
                    />
                    <TextArea
                        size="xs"
                        placeholder="코멘트를 작성해주세요."
                        textAreaSx={s_textarea}
                        value={formState.comment}
                        onChange={(e) => handleFormState({ comment: e.target.value })}
                    />
                    {!formState.isOpenForm ? (
                        <Button size="full" onClick={handlePost}>
                            저장하기
                        </Button>
                    ) : (
                        <div css={s_buttonContainerForEdit}>
                            <Button size="full" onClick={handleCancelEdit} sx={s_cancelButton}>
                                취소하기
                            </Button>
                            <Button size="full" onClick={handleUpdate}>
                                수정하기
                            </Button>
                        </div>
                    )}
                </div>
            )}
            {isDeleteModalOpen && (
                <ConfirmDialog
                    type="warning"
                    title="알림"
                    dialogSize="sm"
                    cancelButton
                    closeIcon
                    content={`평가를 삭제하면 복구할 수 없어요.\n계속할까요?`}
                    open={isDeleteModalOpen}
                    handleClose={() => setIsDeleteModalOpen(false)}
                    actionHandler={handleDelete}
                />
            )}
        </div>
    );
}

export { EvaluationBox };
