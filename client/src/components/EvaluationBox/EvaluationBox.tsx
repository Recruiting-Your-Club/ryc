import { Button, Divider, Rating, Text } from '@components';
import { PersonalScoreCard } from '@components/PersonalScoreCard';
import { TextArea } from '@components/_common/TextArea';
import React, { useState } from 'react';
import {
    perStarScoreGroup,
    s_averageNumber,
    s_averageText,
    s_boxContainer,
    s_evaluationTitleContainer,
    s_savedEvaluationContainer,
    s_starScoreContainer,
    textareaCss,
    userEvaluation,
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
    // state, ref, querystring hooks
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
            body: { score: score, comment: comment },
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
                score: score,
                comment: comment,
            },
        });
        setIsOpenForm(false);
        setScore(0);
        setComment('');
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
                                isMine={evaluator.isMine}
                                handleDelete={handleDelete}
                                onComment={setComment}
                                onScore={setScore}
                                onOpenForm={setIsOpenForm}
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
            {(!Boolean(myComment) || isOpenForm) && (
                <div css={userEvaluation}>
                    <Rating size="lg" value={score} onChange={(score) => setScore(score)} />
                    <TextArea
                        size="xs"
                        placeholder="코멘트를 작성해주세요."
                        textAreaSx={textareaCss}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <Button size="full" onClick={isOpenForm ? handleUpdate : handlePost}>
                        {isOpenForm ? '수정하기' : '저장하기'}
                    </Button>
                </div>
            )}
        </div>
    );
}

export { EvaluationBox };
