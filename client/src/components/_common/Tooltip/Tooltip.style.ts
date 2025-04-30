import { css } from '@emotion/react';

export const tooltipContainter = css`
    position: relative;
    display: inline-block;
`;

export const tooltipStyle = css`
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background-color: #333;
    color: #fff;
    padding: 6px 14px;
    border-radius: 10px;
    white-space: nowrap;
    z-index: 10;
`;
