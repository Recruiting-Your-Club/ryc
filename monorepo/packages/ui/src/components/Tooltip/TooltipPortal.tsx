import type { CSSObject } from '@emotion/react';
import React from 'react';
import { createPortal } from 'react-dom';

import { tooltipPortalStyle } from './Tooltip.style';

interface TooltipPortalProps {
    position: { top: number; left: number; transform: string } | null;
    disabled: boolean;
    visible: boolean;
    content: string;
    isMobile: boolean;
    tooltipRef: React.RefObject<HTMLDivElement>;
    tooltipSx?: CSSObject;
}

function TooltipPortal({
    position,
    disabled,
    visible,
    content,
    isMobile,
    tooltipRef,
    tooltipSx,
}: TooltipPortalProps) {
    if (!position || disabled || !visible) return null;

    return createPortal(
        <div
            ref={tooltipRef}
            css={[tooltipPortalStyle(content.length, isMobile, position), tooltipSx]}
        >
            {content}
        </div>,
        document.body,
    );
}

export { TooltipPortal };
export type { TooltipPortalProps };
