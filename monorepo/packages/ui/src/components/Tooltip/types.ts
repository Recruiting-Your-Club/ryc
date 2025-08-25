import type { CSSObject } from '@emotion/react';
import type { ReactNode } from 'react';

export type Direction =
    | 'topLeft'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomRight'
    | 'top'
    | 'bottom'
    | 'left'
    | 'right';

export type Position = {
    top: number;
    left: number;
    transform: string;
};

export interface TooltipProps {
    content: string;
    direction?: Direction;
    children: ReactNode;
    delay?: number;
    disabled?: boolean;
    wrapperSx?: CSSObject;
    tooltipSx?: CSSObject;
}

export interface TooltipPortalProps {
    position: Position;
    disabled: boolean;
    visible: boolean;
    content: string;
    isMobile: boolean;
    tooltipRef: React.RefObject<HTMLDivElement>;
    tooltipSx?: CSSObject;
}
