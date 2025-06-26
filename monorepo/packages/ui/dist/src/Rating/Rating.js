import { jsx as _jsx } from "@emotion/react/jsx-runtime";
import { useState } from 'react';
import { Star } from './Star';
import { ratingContainer } from './Rating.style';
const TOTAL_STARS_DEFAULT = 5;
export function Rating({ value = 0, size, totalStars = TOTAL_STARS_DEFAULT, type = 'click', onChange, customCSS, }) {
    const [hoverRating, setHoverRating] = useState(value);
    const [rating, setRating] = useState(value);
    const handleClick = (index) => {
        if (type === 'display')
            return;
        setRating(index);
        onChange?.(index);
    };
    const handleMouseEnter = (index) => {
        if (type === 'display')
            return;
        setHoverRating(index);
    };
    const handleMouseLeave = () => {
        if (type === 'display')
            return;
        setHoverRating(null);
    };
    return (_jsx("div", { css: [ratingContainer, customCSS], children: Array.from({ length: totalStars }, (_, index) => {
            const starIndex = index + 1;
            const isFilled = (hoverRating || rating) >= starIndex;
            const partialFill = (hoverRating || rating) - starIndex + 1;
            return (_jsx(Star, { filled: isFilled, partialFill: partialFill, size: size ?? 'md', onClick: () => handleClick(starIndex), onMouseEnter: () => handleMouseEnter(starIndex), onMouseLeave: handleMouseLeave }, starIndex));
        }) }));
}
//# sourceMappingURL=Rating.js.map