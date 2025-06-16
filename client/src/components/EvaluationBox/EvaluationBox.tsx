import EditPencil from '@assets/images/edit-pencil.svg';
import Trash from '@assets/images/trash.svg';
import { Button, Divider, Rating, Text } from '@components/_common';
import { TextArea } from '@components/_common/TextArea';
import React, { useState } from 'react';
import {
    perStarScoreGroup,
    svgButtonCss,
    svgButtonGroup,
    s_averageNumber,
    s_averageText,
    s_boxContainer,
    s_myEvaluationText,
    s_savedEvaluationContainer,
    s_starScoreContainer,
    textareaCss,
    userEvaluation,
    userSavedEvaluation,
    userStarScore,
} from './EvaluationBox.style';
import type { EvaluationBoxProps } from './types';

function EvaluationBox({ evaluation, height }: EvaluationBoxProps) {
    // prop destruction
    // lib hooks
    // initial values
    // state, ref, querystring hooks
    const [hasUserEvaluation, setHasUserEvaluation] = useState(true); // 현재 나의 평가가 등록되어있는지
    const [willEditEvaluation, setWillEditEvaluation] = useState(false);

    // form hooks
    // query hooks
    // calculated values
    // handlers
    // effects
    return (
        <div css={s_boxContainer(height)}>
            <div css={s_savedEvaluationContainer(hasUserEvaluation)}>
                <div css={s_starScoreContainer}>
                    <Text as="span" type="captionSemibold" noWrap sx={s_averageText}>
                        평균 평점
                    </Text>
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
                <Divider />
                <div css={perStarScoreGroup(false)}>
                    <Text as="span" type="captionSemibold">
                        등록된 평가가 없습니다.
                    </Text>
                </div>
                <div css={userSavedEvaluation}>
                    <div css={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Text
                            as="span"
                            type="subCaptionBold"
                            textAlign="start"
                            sx={s_myEvaluationText}
                        >
                            나의 평가
                        </Text>
                        {hasUserEvaluation && (
                            <span css={svgButtonGroup}>
                                {/* 추후 기능 구현 확장 예정 */}
                                <Button variant="transparent" size="xs">
                                    <EditPencil css={svgButtonCss} />
                                </Button>
                                <Button
                                    variant="transparent"
                                    size="xs"
                                    onClick={() => setHasUserEvaluation(false)}
                                >
                                    <Trash css={svgButtonCss} />
                                </Button>
                            </span>
                        )}
                    </div>
                    <Divider />
                    <div css={userStarScore(hasUserEvaluation)}>
                        <Text as="span" type="captionSemibold">
                            등록된 평가가 없습니다.
                        </Text>
                    </div>
                </div>
            </div>
            {(!hasUserEvaluation || willEditEvaluation) && (
                <div css={userEvaluation}>
                    <Rating size="lg" />
                    <TextArea size="xs" placeholder="코멘트를 작성해주세요." sx={textareaCss} />
                    <Button size="full">저장하기</Button>
                </div>
            )}
        </div>
    );
}

export { EvaluationBox };
