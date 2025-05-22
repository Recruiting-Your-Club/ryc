import { css } from '@emotion/react';
import theme from '@styles/theme';

export const navigationContainer = css`
    display: flex;
    width: 100%;
    gap: 1rem;
`;

export const navigationButton = (isActive: boolean) => css`
    ${theme.typography.bodySemibold}
    color: ${theme.colors.gray[500]};
    margin-bottom: 0.5rem;
    padding-left: 0;
    :hover {
        color: ${theme.colors.gray[500]};
    }
    ${isActive &&
    css`
        color: ${theme.colors.black};
        ${theme.typography.bodyBold}
        :hover {
            color: ${theme.colors.black};
        }
    `}
    transition: color 0.1s;
`;

export const navigationSlider = (position: number, width: string) => css`
    display: absolute;
    left: 0;
    bottom: 0;
    margin: 0;
    z-index: 1;
    border-radius: 50%;
    border: 0.5px solid ${theme.colors.black};
    width: ${width};
    transform: translateX(${position}rem);
    transition:
        transform 0.3s ease-in-out,
        width 0.2s ease-in-out 0.05s;
`;
