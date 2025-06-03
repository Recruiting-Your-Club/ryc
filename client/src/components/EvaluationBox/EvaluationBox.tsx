import EditPencil from '@assets/images/edit-pencil.svg';
import Trash from '@assets/images/trash.svg';
import { Button, Divider, Rating, Text } from '@components/_common';
import { TextArea } from '@components/_common/TextArea';
import React, { useState } from 'react';
import {
    boxContainer,
    perStarScoreGroup,
    savedEvaluation,
    starScoreWrapper,
    svgButtonCss,
    svgButtonGroup,
    textareaCss,
    userEvaluation,
    userSavedEvaluation,
    userStarScore,
} from './EvaluationBox.style';

interface EvaluationBoxProps {
    height?: string;
}

function EvaluationBox({ height }: EvaluationBoxProps) {
    const [hasUserEvaluation, setHasUserEvaluation] = useState(true); // 현재 나의 평가가 등록되어있는지

    return (
        <div css={boxContainer(height)}>
            <div css={savedEvaluation(hasUserEvaluation)}>
                <div css={starScoreWrapper}>
                    <Text
                        as="span"
                        type="captionSemibold"
                        noWrap
                        sx={{ paddingTop: '0.3rem', marginRight: '0.4rem' }}
                    >
                        평균 평점
                    </Text>
                    <Rating value={4} totalStars={5} size="lg" type="display" />
                    <Text
                        as="span"
                        type="captionRegular"
                        color="primary"
                        sx={{ paddingTop: '0.3rem' }}
                    >
                        (4)
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
                            sx={{ margin: '0.5rem 0' }}
                        >
                            나의 평가
                        </Text>
                        {hasUserEvaluation && (
                            <span css={svgButtonGroup}>
                                <EditPencil css={svgButtonCss} />
                                <Trash css={svgButtonCss} />
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
            {!hasUserEvaluation && (
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
