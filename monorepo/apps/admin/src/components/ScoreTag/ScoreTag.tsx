import Star from '@assets/images/score-star.svg';
import React from 'react';

import { scoreTag, svgCss } from './ScoreTag.style';
import type { ScoreTagProps } from './types';

function ScoreTag({ width = '4rem', score, sx }: ScoreTagProps) {
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
        <span css={[scoreTag(width, score), sx]}>
            <Star css={svgCss} />
            {score}
        </span>
    );
}
export { ScoreTag };
