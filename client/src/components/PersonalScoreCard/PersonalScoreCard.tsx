import EditPencil from '@assets/images/edit-pencil.svg';
import Trash from '@assets/images/trash.svg';
import { Avatar, Rating, Text } from '@components';
import { svgButtonCss, svgButtonGroup } from '@components/EvaluationBox/EvaluationBox.style';
import { Button } from '@components/_common';
import React from 'react';
import {
    cardContainer,
    contentContainer,
    evaluatorSection,
    headerContainer,
    ratingSection,
} from './PersonalScoreCard.style';
import type { PersonalScoreCardProps } from './types';

function PersonalScoreCard({
    image,
    name,
    score,
    comment,
    isMine = false,
    isEditable = false,
    handleDelete,
    onOpenForm,
    onComment,
    onScore,
}: PersonalScoreCardProps) {
    // prop destruction
    // lib hooks
    // initial values
    // state, ref, querystring hooks
    // form hooks
    // query hooks
    // calculated values
    // handlers
    const handleEditFunction = () => {
        onOpenForm(true);
        onComment(comment);
        onScore(score);
    };
    // effects
    return (
        <div css={cardContainer}>
            <div css={headerContainer}>
                <div css={evaluatorSection}>
                    <Avatar shape="round" size="xs" imageURL={image} />
                    <Text
                        as="span"
                        type="captionSemibold"
                        noWrap
                        cropped
                        sx={{ paddingTop: '0.2rem' }}
                    >
                        {name}
                    </Text>
                    {isEditable && isMine && (
                        <span css={svgButtonGroup}>
                            <Button variant="transparent" size="xs">
                                <EditPencil css={svgButtonCss} onClick={handleEditFunction} />
                            </Button>
                            <Button variant="transparent" size="xs" onClick={handleDelete}>
                                <Trash css={svgButtonCss} />
                            </Button>
                        </span>
                    )}
                </div>
                <div css={ratingSection}>
                    <Rating key={score} value={score} size="lg" type="display" />
                </div>
            </div>
            <div css={contentContainer}>
                <Text as="span" type="captionSemibold" textAlign="start">
                    {comment}
                </Text>
            </div>
        </div>
    );
}

export { PersonalScoreCard };
