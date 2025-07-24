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

export interface TooltipProps {
    content: string;
    direction?: Direction;
    children: ReactNode;
    delay?: number;
    disabled?: boolean;
    wrapperSx?: CSSObject;
    tooltipSx?: CSSObject;
}
