import { css, keyframes } from '@emotion/react';
import type { CSSObject } from '@emotion/react';

import theme from '@ssoc/styles';

import type { Direction } from './types';

export const fadeInScale = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const tooltipContainter = css`
    position: relative;
    display: inline-flex;
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
    top: css`
        bottom: 100%;
        margin-bottom: 0.3rem;
    `,
    bottom: css`
        top: 100%;
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

export const tooltipStyle = (direction: Direction, contentLength: number, isMobile: boolean) => css`
    position: absolute;
    background-color: ${theme.colors.black};
    color: ${theme.colors.white};
    padding: 0.8rem 1rem;
    border-radius: 5px;
    min-width: 10rem;
    white-space: nowrap;

    ${!isMobile &&
    contentLength > 50 &&
    css`
        width: 40rem;
        max-width: 40rem;
        white-space: normal;
    `}

    ${isMobile &&
    contentLength > 30 &&
    css`
        width: 30rem;
        max-width: 30rem;
        white-space: normal;
    `}

    z-index: 999999;
    animation: ${fadeInScale} 0.2s ease-in-out;
    ${theme.typography.subCaptionRegular};
    text-align: center;

    ${positionStyles[direction]};
`;

export const tooltipPortalStyle = (
    contentLength: number,
    isMobile: boolean,
    position: { top: number; left: number; transform: string },
) => css`
    position: fixed;
    top: ${position.top}px;
    left: ${position.left}px;
    transform: ${position.transform};
    z-index: 999999;
    pointer-events: none;

    background-color: ${theme.colors.black};
    color: ${theme.colors.white};
    padding: 0.8rem 1rem;
    border-radius: 5px;
    min-width: 10rem;
    white-space: nowrap;

    ${!isMobile &&
    contentLength > 50 &&
    css`
        width: 35rem;
        max-width: 35rem;
        white-space: normal;
    `}

    ${isMobile &&
    contentLength > 30 &&
    css`
        width: 25rem;
        max-width: 25rem;
        white-space: normal;
    `}

    animation: ${fadeInScale} 0.2s ease-in-out;
    ${theme.typography.subCaptionRegular};
    text-align: center;
`;
