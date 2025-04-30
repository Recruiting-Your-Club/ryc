import type { ReactNode } from 'react';
import React, { useState } from 'react';
import { tooltipContainter, tooltipStyle } from './Tooltip.style';

export interface TooltipProps {
    content: string;
    children: ReactNode;
}

function Tooltip({ content, children }: TooltipProps) {
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
            {visible && <div css={tooltipStyle}>{content}</div>}
        </div>
    );
}

export { Tooltip };
