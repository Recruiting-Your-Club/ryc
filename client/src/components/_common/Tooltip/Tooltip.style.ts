import { css } from '@emotion/react';
import type { CSSObject } from '@emotion/react';
import type { Direction } from './types';
import theme from '@styles/theme';

export const tooltipContainter = css`
    position: relative;
    display: inline-block;
`;

export const positionStyles: Record<Direction, CSSObject> = {
    topLeft: css`
        bottom: 100%;
        right: 50%;
        margin-bottom: 0.3rem;
    `,
    topRight: css`
        bottom: 100%;
        left: 50%;
        margin-bottom: 0.3rem;
    `,
    bottomLeft: css`
        top: 100%;
        right: 50%;
        margin-top: 0.3rem;
    `,
    bottomRight: css`
        top: 100%;
        left: 50%;
        margin-top: 0.3rem;
    `,
    left: css`
        top: 50%;
        right: 100%;
        transform: translateY(-50%);
        margin-right: 0.3rem;
    `,
    right: css`
        top: 50%;
        left: 100%;
        transform: translateY(-50%);
        margin-left: 0.3rem;
    `,
};

export const tooltipStyle = (direction: Direction) => css`
    position: absolute;
    background-color: ${theme.colors.black};
    color: ${theme.colors.white};
    padding: 0.8rem 1rem;
    border-radius: 5px;
    white-space: nowrap;
    ${theme.typography.subCaptionLight};
    ${positionStyles[direction]};
`;
