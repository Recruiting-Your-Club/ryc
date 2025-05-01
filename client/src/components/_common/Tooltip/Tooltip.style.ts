import { css } from '@emotion/react';
import type { Direction } from './Tooltip';
import theme from '@styles/theme';

export const tooltipContainter = css`
    position: relative;
    display: inline-block;
`;

export const tooltipStyle = (direction: Direction) => {
    const positionStyles: Record<Direction, ReturnType<typeof css>> = {
        top: css`
            bottom: 100%;
            left: 50%;
            margin-bottom: 0.3rem;
        `,
        bottom: css`
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
    return css`
        position: absolute;
        background-color: ${theme.colors.black};
        color: ${theme.colors.white};
        padding: 0.8rem 1rem;
        border-radius: 5px;
        white-space: nowrap;
        ${theme.typography.subCaptionRegular};
        ${positionStyles[direction]};
    `;
};
