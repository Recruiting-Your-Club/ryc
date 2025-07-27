import React from 'react';

import { Avatar, Rating, Text } from '@ssoc/ui';

import {
    cardContainer,
    contentContainer,
    evaluatorSection,
    headerContainer,
    ratingSection,
} from './PersonalScoreCard.style';
import type { PersonalScoreCardProps } from './types';

function PersonalScoreCard({ image, name, score, comment }: PersonalScoreCardProps) {
    // prop destruction
    // lib hooks
    // initial values
    // state, ref, querystring hooks
    // form hooks
    // query hooks
    // calculated values
    // handlers
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
                </div>
                <div css={ratingSection}>
                    <Rating key={name + comment} value={score} size="lg" type="display" />
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
