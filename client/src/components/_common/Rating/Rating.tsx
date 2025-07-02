import React, { useState } from 'react';
import type { SerializedStyles } from '@emotion/react';
import { Star } from './Star';
import { ratingContainer } from './Rating.style';
import type { RatingProps } from './types';
import { RATING_TYPE, STAR_SIZE, TOTAL_STARS_DEFAULT } from '@constants/rating';

export function Rating({
    value = 0,
    size,
    totalStars = TOTAL_STARS_DEFAULT,
    type = RATING_TYPE.CLICK,
    onChange,
    customCSS,
}: RatingProps) {
    const [hoverRating, setHoverRating] = useState<number | null>(value);
    const [rating, setRating] = useState<number>(value);

    const handleClick = (index: number) => {
        if (type === RATING_TYPE.DISPLAY) return;

        setRating(index);
        onChange?.(index);
    };

    const handleMouseEnter = (index: number) => {
        if (type === RATING_TYPE.DISPLAY) return;

        setHoverRating(index);
    };

    const handleMouseLeave = () => {
        if (type === RATING_TYPE.DISPLAY) return;

        setHoverRating(null);
    };

    return (
        <div css={[ratingContainer, customCSS]}>
            {Array.from({ length: totalStars }, (_, index) => {
                const starIndex = index + 1;
                const isFilled = (hoverRating || rating) >= starIndex;
                const partialFill = (hoverRating || rating) - starIndex + 1;

                return (
                    <Star
                        key={starIndex}
                        filled={isFilled}
                        partialFill={partialFill}
                        size={size ?? STAR_SIZE.MD}
                        onClick={() => handleClick(starIndex)}
                        onMouseEnter={() => handleMouseEnter(starIndex)}
                        onMouseLeave={handleMouseLeave}
                    />
                );
            })}
        </div>
    );
}
