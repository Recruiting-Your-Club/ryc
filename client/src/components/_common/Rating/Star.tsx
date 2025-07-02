import React from 'react';
import type { SerializedStyles } from '@emotion/react';
import { s_halfStar, s_size, s_star } from './Rating.style';
import type { StarProps } from './types';
import StarSVG from '@assets/images/star.svg';

export function Star({
    filled,
    partialFill,
    size,
    customCSS,
    onClick,
    onMouseEnter,
    onMouseLeave,
}: StarProps) {
    const cssProp = [s_size(size), s_star(filled)];

    return (
        <button
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            css={[cssProp, customCSS]}
        >
            <StarSVG />

            {partialFill && partialFill > 0 && partialFill < 1 ? (
                <div css={s_halfStar(partialFill * 100)}>
                    <StarSVG />
                </div>
            ) : null}
        </button>
    );
}
