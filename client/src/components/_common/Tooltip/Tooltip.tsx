import type { ReactNode } from 'react';
import React, { useRef, useState } from 'react';
import { tooltipContainter, tooltipStyle } from './Tooltip.style';
import type { CSSObject } from '@emotion/react';
export type Direction = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
    content: string;
    direction?: Direction;
    children: ReactNode;
    delay?: number;
    disabled?: boolean;
    sx?: CSSObject;
}

function Tooltip({
    content,
    direction = 'bottom',
    delay = 300,
    disabled = false,
    children,
    sx,
}: TooltipProps) {
    const [visible, setVisible] = useState<boolean>();
    const timeoutRef = useRef<NodeJS.Timeout>();

    const showTooltip = () => {
        timeoutRef.current = setTimeout(() => {
            setVisible(true);
        }, delay);
    };
    const hideTooltip = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setVisible(false);
    };
    return (
        <div css={tooltipContainter} onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
            {children}
            {!disabled && visible && <div css={[tooltipStyle(direction), sx]}>{content}</div>}
        </div>
    );
}

export { Tooltip };
