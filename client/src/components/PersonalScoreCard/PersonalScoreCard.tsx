import EditPencil from '@assets/images/edit-pencil.svg';
import Trash from '@assets/images/trash.svg';
import { Avatar, Button, Rating, Text } from '@components';
import React from 'react';
import {
    s_cardContainer,
    s_contentContainer,
    s_evaluatorSection,
    s_headerContainer,
    s_ratingSection,
    s_svgButton,
    s_svgButtonGroup,
} from './PersonalScoreCard.style';
import type { PersonalScoreCardProps } from './types';

function PersonalScoreCard({
    image,
    name,
    score,
    comment,
    commentId,
    isUser = false,
    isEditable = false,
    handleDelete,
    onHandleForm,
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
        onHandleForm({
            isOpenForm: true,
            comment,
            score,
            commentIdForEdit: commentId,
        });
    };
    // effects

    return (
        <div css={s_cardContainer}>
            <div css={s_headerContainer}>
                <div css={s_evaluatorSection}>
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
                    {isEditable && isUser && (
                        <span css={s_svgButtonGroup}>
                            <Button variant="transparent" size="xs">
                                <EditPencil css={s_svgButton} onClick={handleEditFunction} />
                            </Button>
                            <Button variant="transparent" size="xs" onClick={handleDelete}>
                                <Trash css={s_svgButton} />
                            </Button>
                        </span>
                    )}
                </div>
                <div css={s_ratingSection}>
                    <Rating key={score} value={score} size="lg" type="display" />
                </div>
            </div>
            <div css={s_contentContainer}>
                <Text as="span" type="captionSemibold" textAlign="start">
                    {comment}
                </Text>
            </div>
        </div>
    );
}

export { PersonalScoreCard };
