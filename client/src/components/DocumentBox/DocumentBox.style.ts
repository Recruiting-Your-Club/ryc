import { css } from '@emotion/react';
import theme from '@styles/theme';
import { hexToRgb } from '@utils/hexToRgb';

export const contentContainer = (index: number) => css`
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    padding: 1.5rem 1rem;
    word-break: keep-all;
    overflow-wrap: break-word;
    background-color: ${theme.colors.blue[100]};
    ${index % 2 === 0 &&
    css`
        background-color: ${theme.colors.white};
    `}
`;

export const textWithUnderline = css`
    padding: 0 1rem 1rem 1rem;
    display: inline-flex;
    position: relative;
    min-width: 35rem;
    width: fit-content;
    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        border-top: 3px solid rgba(${hexToRgb(theme.colors.default)}, 0.5);
    }
`;

export const underline = css`
    min-width: 35rem;
    width: fit-content;
    margin-top: 0.5rem;
    border-top: 3px solid rgba(${hexToRgb(theme.colors.default)}, 0.5);
`;

export const answerWrapper = css`
    padding: 1rem 1rem 0 1rem;
`;
