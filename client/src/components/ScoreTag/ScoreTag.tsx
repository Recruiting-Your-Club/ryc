import Star from '@assets/images/score-star.svg';
import type { CSSObject } from '@emotion/react';
import React from 'react';
import { scoreTag, svgCss } from './ScoreTag.style';

export interface ScoreTagProps {
    width?: string;
    score: string;
    sx?: CSSObject;
}

function ScoreTag({ width = '4.5rem', score, sx }: ScoreTagProps) {
    return (
        <div>
            <span css={[scoreTag(width, score), sx]}>
                <Star css={svgCss} />
                {score}
            </span>
        </div>
    );
}
export { ScoreTag };
