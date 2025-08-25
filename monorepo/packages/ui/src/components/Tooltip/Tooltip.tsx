import React, { useEffect, useRef, useState } from 'react';

import { useMediaQuery } from '@ssoc/hooks';

import { tooltipContainter } from './Tooltip.style';
import { TooltipPortal } from './TooltipPortal';
import type { TooltipProps } from './types';

function Tooltip({
    content,
    direction = 'bottom',
    delay = 100,
    disabled = false,
    children,
    wrapperSx,
    tooltipSx,
}: TooltipProps) {
    //prop destruction
    //lib hooks
    const isMobile = useMediaQuery('mobile');

    //initial values
    //state, ref, querystring hooks
    const [visible, setVisible] = useState<boolean>(false);
    const [position, setPosition] = useState<{
        top: number;
        left: number;
        transform: string;
    } | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout>();
    const wrapperRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    //form hooks
    //query hooks

    //calculated values
    const calculatePosition = (triggerRect: DOMRect) => {
        const { top: triggerTop, bottom, left: triggerLeft, right, width, height } = triggerRect;
        const scrollX = window.pageXOffset;
        const scrollY = window.pageYOffset;
        const margin = 8;

        const positionMap = {
            top: {
                top: triggerTop + scrollY - margin,
                left: triggerLeft + scrollX + width / 2,
                transform: 'translateX(-50%) translateY(-100%)',
            },
            topLeft: {
                top: triggerTop + scrollY - margin,
                left: right + scrollX,
                transform: 'translateX(-100%) translateY(-100%)',
            },
            topRight: {
                top: triggerTop + scrollY - margin,
                left: triggerLeft + scrollX,
                transform: 'translateY(-100%)',
            },
            bottom: {
                top: bottom + scrollY + margin,
                left: triggerLeft + scrollX + width / 2,
                transform: 'translateX(-50%)',
            },
            bottomLeft: {
                top: bottom + scrollY + margin,
                left: right + scrollX,
                transform: 'translateX(-100%)',
            },
            bottomRight: {
                top: bottom + scrollY + margin,
                left: triggerLeft + scrollX,
                transform: '',
            },
            left: {
                top: triggerTop + scrollY + height / 2,
                left: triggerLeft + scrollX - margin,
                transform: 'translateX(-100%) translateY(-50%)',
            },
            right: {
                top: triggerTop + scrollY + height / 2,
                left: right + scrollX + margin,
                transform: 'translateY(-50%)',
            },
        };

        return positionMap[direction] || positionMap.bottom;
    };

    //handlers
    const showTooltip = () => {
        if (!wrapperRef.current) return;

        const rect = wrapperRef.current.getBoundingClientRect();
        setPosition(calculatePosition(rect));

        timeoutRef.current = setTimeout(() => {
            setVisible(true);
        }, delay);
    };

    const hideTooltip = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setVisible(false);
        setPosition(null);
    };

    //effects
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <div
            ref={wrapperRef}
            css={[tooltipContainter, wrapperSx]}
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
        >
            {children}
            <TooltipPortal
                position={position}
                disabled={disabled}
                visible={visible}
                content={content}
                isMobile={isMobile}
                tooltipRef={tooltipRef}
                tooltipSx={tooltipSx}
            />
        </div>
    );
}

export { Tooltip };
