import { css } from '@emotion/react';
import theme from '@styles/theme';
import { hexToRgb } from '@utils/hexToRgb';
import type { Step } from './types';

export const boxContainer = (height: string = '100%', step: Step) => css`
    height: ${height};
    border-radius: 10px;
    background-color: rgba(${hexToRgb(theme.colors.gray[200])}, 0.8);
    justify-content: center;
    align-items: center;

    ${step === 'final' &&
    css`
        background-color: rgba(${hexToRgb(theme.colors.default)}, 0.1);
    `}
`;

export const titleGroup = css`
    display: flex;
    height: 5%;
    padding: 1rem 1.5rem;
    justify-content: space-between;
    align-items: center;
`;

export const cardGroupWrapper = css`
    height: 95%;
    padding: 1rem 1rem;
`;

export const svgCss = css`
    height: 80%;
    vertical-align: middle;
    cursor: pointer;
`;

export const dividerCss = css`
    border-top: 0.2rem solid rgba(${hexToRgb(theme.colors.black)}, 0.1);
`;
