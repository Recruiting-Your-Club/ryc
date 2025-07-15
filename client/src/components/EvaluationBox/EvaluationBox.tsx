import { Button, Divider, Rating, Text } from '@components';
import { PersonalScoreCard } from '@components/PersonalScoreCard';
import { TextArea } from '@components/_common/TextArea';
import React, { useEffect, useState } from 'react';
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
    evaluation,
    onPostComment,
    onDeleteComment,
    onUpdateComment,
    height,
}: EvaluationBoxProps) {
    // prop destruction
    // lib hooks
    // initial values
    const [formStateMap, setFormStateMap] = useState<
        Record<
            number,
            { score: number; comment: string; isOpenForm: boolean; commentIdForEdit: number | null }
        >
    >({});
    const formState = formStateMap[evaluation.applicantId] ?? {
        score: 0,
        comment: '',
        isOpenForm: false,
        commentIdForEdit: null,
    };

    // state, ref, querystring hooks
    const [commentIdForEdit, setCommentIdForEdit] = useState<number | null>(null);
    const [score, setScore] = useState<number>(0);
    const [comment, setComment] = useState<string>('');
    const [isOpenForm, setIsOpenForm] = useState<boolean>(false);

    // form hooks
    // query hooks
    // calculated values
    const myComment = evaluation.comments.find((comment) => comment.isMine);

    // handlers
    const handlePost = () => {
        onPostComment({
            applicantId: evaluation.applicantId,
            body: { score: formState.score, comment: formState.comment },
        });
        setScore(0);
        setComment('');
    };

    const handleDelete = () => {
        if (!myComment) return;
        onDeleteComment({ applicantId: evaluation.applicantId, commentId: myComment.id });
    };

    const handleUpdate = () => {
        if (!myComment) return;
        onUpdateComment({
            applicantId: evaluation.applicantId,
            commentId: myComment.id,
            body: {
                score: formState.score,
                comment: formState.comment,
            },
        });
        setIsOpenForm(false);
        setScore(0);
        setComment('');
        setCommentIdForEdit(null);
        handleFormState({ isOpenForm: false });
    };

    const handleFormState = (partial: Partial<typeof formState>) => {
        setFormStateMap((prev) => ({
            ...prev,
            [evaluation.applicantId]: {
                ...formState,
                ...partial,
            },
        }));
    };

    const handleOpenFormState = (partial: Partial<typeof formState>) => {
        setFormStateMap((prev) => ({
            ...prev,
            [evaluation.applicantId]: {
                ...formState,
                ...partial,
            },
        }));
        setIsOpenForm(false);
    };

    // effects
    useEffect(() => {
        if (isOpenForm) handleFormState({ score, comment, isOpenForm, commentIdForEdit });
    }, [isOpenForm]);

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
                                isMine={evaluator.isMine}
                                handleDelete={handleDelete}
                                onComment={setComment}
                                onScore={setScore}
                                onOpenForm={setIsOpenForm}
                                onId={setCommentIdForEdit}
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
                            <Button
                                size="full"
                                onClick={() => handleOpenFormState({ isOpenForm: false })}
                                sx={s_cancelButton}
                            >
                                취소하기
                            </Button>
                            <Button size="full" onClick={handleUpdate}>
                                수정하기
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export { EvaluationBox };
