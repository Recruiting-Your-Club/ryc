import type { ReactNode } from 'react';
import React, { useState } from 'react';
import { tooltipContainter, tooltipStyle } from './Tooltip.style';
import type { CSSObject } from '@emotion/react';
export type Direction = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
    content: string;
    direction?: Direction;
    children: ReactNode;
    sx?: CSSObject;
}

function Tooltip({ content, direction = 'bottom', children, sx }: TooltipProps) {
    const [visible, setVisible] = useState<boolean>();

    const showTooltip = () => {
        setVisible(true);
    };
    const hideTooltip = () => {
        setVisible(false);
    };
    return (
        <div css={tooltipContainter} onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
            {children}
            {visible && <div css={[tooltipStyle(direction), sx]}>{content}</div>}
        </div>
    );
}

export { Tooltip };
