import { css, keyframes } from '@emotion/react';
import theme from '@styles/theme';
export const fadeInScale = keyframes `
  0% {
    opacity: 0;
    transform: scale(0.95);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;
export const tooltipContainter = css `
    position: relative;
    display: inline-block;
`;
export const positionStyles = {
    topLeft: css `
        bottom: 100%;
        right: 50%;
        margin-bottom: 0.3rem;
    `,
    topRight: css `
        bottom: 100%;
        left: 50%;
        margin-bottom: 0.3rem;
    `,
    bottomLeft: css `
        top: 100%;
        right: 50%;
        margin-top: 0.3rem;
    `,
    bottomRight: css `
        top: 100%;
        left: 50%;
        margin-top: 0.3rem;
    `,
    top: css `
        bottom: 100%;
        margin-bottom: 0.3rem;
    `,
    bottom: css `
        top: 100%;
        margin-top: 0.3rem;
    `,
    left: css `
        top: 50%;
        right: 100%;
        transform: translateY(-50%);
        margin-right: 0.3rem;
    `,
    right: css `
        top: 50%;
        left: 100%;
        transform: translateY(-50%);
        margin-left: 0.3rem;
    `,
};
export const tooltipStyle = (direction) => css `
    position: absolute;
    background-color: ${theme.colors.black};
    color: ${theme.colors.white};
    padding: 0.8rem 1rem;
    border-radius: 5px;
    max-width: 20rem;
    white-space: nowrap;
    z-index: 999;
    animation: ${fadeInScale} 0.2s ease-in-out;
    ${theme.typography.subCaptionRegular};
    ${positionStyles[direction]};
`;
//# sourceMappingURL=Tooltip.style.js.map