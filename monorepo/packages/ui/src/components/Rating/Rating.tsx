import type { SerializedStyles } from '@emotion/react';
import React, { useState } from 'react';

import { TOTAL_STARS_DEFAULT } from '../../constants/rating';
import { ratingContainer } from './Rating.style';
import { Star } from './Star';
import type { RatingProps } from './types';

export function Rating({
    value = 0,
    size,
    totalStars = TOTAL_STARS_DEFAULT,
    type = 'click',
    onChange,
    sx,
}: RatingProps) {
    const [hoverRating, setHoverRating] = useState<number | null>(value);
    const [rating, setRating] = useState<number>(value);

    const handleClick = (index: number) => {
        if (type === 'display') return;

        setRating(index);
        onChange?.(index);
    };

    const handleMouseEnter = (index: number) => {
        if (type === 'display') return;

        setHoverRating(index);
    };

    const handleMouseLeave = () => {
        if (type === 'display') return;

        setHoverRating(null);
    };

    return (
        <div css={[ratingContainer, sx]}>
            {Array.from({ length: totalStars }, (_, index) => {
                const starIndex = index + 1;
                const isFilled = (hoverRating || rating) >= starIndex;
                const partialFill = (hoverRating || rating) - starIndex + 1;

                return (
                    <Star
                        key={starIndex}
                        filled={isFilled}
                        partialFill={partialFill}
                        type={type}
                        size={size ?? 'md'}
                        onClick={() => handleClick(starIndex)}
                        onMouseEnter={() => handleMouseEnter(starIndex)}
                        onMouseLeave={handleMouseLeave}
                    />
                );
            })}
        </div>
    );
}
