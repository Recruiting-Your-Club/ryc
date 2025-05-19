import { Avatar, Rating, Text } from '@components/_common';
import React from 'react';
import {
    cardContainer,
    contentContainer,
    evaluatorSection,
    headerContainer,
    ratingSection,
} from './PersonalScoreCard.style';
import type { PersonalScoreCardProps } from './types';

function PersonalScoreCard({ image, name, score, comment }: PersonalScoreCardProps) {
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
                </div>
                <div css={ratingSection}>
                    <Rating value={score} size="lg" type="display" />
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
