import { css } from '@emotion/react';
import theme from '@styles/theme';
import { hexToRgb } from '@utils/hexToRgb';

const SCORE_COLOR_MAP = [
    { min: 3.5, color: theme.colors.green[300] },
    { min: 2.0, color: theme.colors.gray[800] },
    { min: 0.0, color: theme.colors.brown[100] },
    { min: -Infinity, color: theme.colors.red[1000] },
];

const baseScoreTag = (width: string) => css`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${width};
    padding: 0.2rem 0.4rem;
    border-radius: 4.5px;
    gap: 0.2rem;
`;

const customPerTag = (color: string) => css`
    color: ${color};
    background-color: rgba(${hexToRgb(color)}, 0.1);
    display: inline-flex;
    ${theme.typography.helperTextSemibold};
`;

const getScoreColor = (score: number): string => {
    return SCORE_COLOR_MAP.find(({ min }) => score > min)!.color;
};

export const scoreTag = (width: string, score: string) => {
    return css`
        ${baseScoreTag(width)}
        ${customPerTag(getScoreColor(Number(score)))}
    `;
};

export const svgCss = css`
    height: 1.2rem;
    vertical-align: middle;
`;
