import type { SerializedStyles } from '@emotion/react';
import React from 'react';

import StarSVG from '@ssoc/assets/images/star.svg';

import { s_halfStar, s_size, s_star } from './Rating.style';
import type { StarProps } from './types';

export function Star({
    filled,
    partialFill,
    size,
    sx,
    type,
    onClick,
    onMouseEnter,
    onMouseLeave,
}: StarProps) {
    const cssProp = [s_size(size), s_star(filled, type)];

    return (
        <button
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            css={[cssProp, sx]}
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
