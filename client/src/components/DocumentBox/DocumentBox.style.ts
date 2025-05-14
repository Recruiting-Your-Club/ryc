import { css } from '@emotion/react';
import theme from '@styles/theme';
import { hexToRgb } from '@utils/hexToRgb';

export const contentContainer = css`
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    background-color: ${theme.colors.blue[100]};
    padding: 1.5rem 1rem;
    word-break: keep-all;
    overflow-wrap: break-word;
`;

export const underScore = css`
    width: 35rem;
    border-top: 3px solid rgba(${hexToRgb(theme.colors.default)}, 0.5);
`;

export const answerWrapper = css`
    padding: 1rem 1rem 0 1rem;
`;
