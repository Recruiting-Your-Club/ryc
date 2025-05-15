import React, { useRef, useState, useEffect } from 'react';
import { tooltipContainter, tooltipStyle } from './Tooltip.style';
import type { TooltipProps } from './types';

function Tooltip({
    content,
    direction = 'bottom',
    delay = 100,
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

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <div css={tooltipContainter} onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
            {children}
            {!disabled && visible && <div css={[tooltipStyle(direction), sx]}>{content}</div>}
        </div>
    );
}

export { Tooltip };
