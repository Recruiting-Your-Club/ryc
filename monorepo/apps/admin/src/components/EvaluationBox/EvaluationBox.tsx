import { ConfirmDialog, PersonalScoreCard } from '@components';
import { CLUB_ID } from '@pages/DocumentEvaluationPage';
import React, { useState } from 'react';

import { useToast } from '@ssoc/ui';
import { Button, Divider, Rating, Text, TextArea } from '@ssoc/ui';

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
import type { EvaluationBoxProps } from './types';

function EvaluationBox({
    selectedApplicantId,
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
        commentIdForEdit: null as string | null,
    };

    // state, ref, querystring hooks
    const [formState, setFormState] = useState(defaultState); // applicantId별로 상태 관리
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

    // form hooks
    // query hooks
    // calculated values
    const myComment = evaluation.evaluationDatas.find((c) => c.isMyEvaluation);

    // handlers
    const handleFormState = (partial: Partial<typeof defaultState>) => {
        setFormState((prev) => ({ ...prev, ...partial }));
    };

    const handlePost = () => {
        if (formState.comment.length === 0) {
            toast('코멘트를 작성해야 저장할 수 있어요!', { type: 'error' });
            return;
        }
        onPostComment(
            selectedApplicantId || '',
            formState.score,
            formState.comment,
            CLUB_ID,
            'application',
        );
        handleFormState({ score: 0, comment: '' });
    };

    const handleDelete = () => {
        if (!myComment) return;
        onDeleteComment(myComment.evaluationId, CLUB_ID);

        // 초기화
        if (formState.commentIdForEdit === myComment.evaluationId) {
            setFormState(defaultState);
        }
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
        onUpdateComment(myComment.evaluationId, formState.score, formState.comment, CLUB_ID);
        handleFormState({
            isOpenForm: false,
        });
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
                            key={evaluation.averageScore}
                            value={evaluation ? evaluation.averageScore : 0}
                            size="lg"
                            type="display"
                        />
                        <Text as="span" type="captionRegular" color="primary" sx={s_averageNumber}>
                            ({evaluation?.averageScore ? evaluation.averageScore : 0})
                        </Text>
                    </div>
                </div>
                <Divider />
                <div css={perStarScoreGroup((evaluation?.evaluationDatas?.length ?? 0) > 0)}>
                    {evaluation?.evaluationDatas?.length > 0 ? (
                        evaluation.evaluationDatas.map((comment) => (
                            <PersonalScoreCard
                                key={comment.evaluationId}
                                score={comment.score}
                                name={comment.evaluatorName}
                                comment={comment.comment}
                                commentId={comment.evaluationId}
                                isUser={comment.isMyEvaluation}
                                handleDelete={handleDeleteClick}
                                onHandleForm={() =>
                                    handleFormState({
                                        isOpenForm: true,
                                        comment: comment.comment,
                                        score: comment.score,
                                        commentIdForEdit: comment.evaluationId,
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
            {(!myComment || formState.isOpenForm) && (
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
                        onChange={(event) => handleFormState({ comment: event.target.value })}
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
