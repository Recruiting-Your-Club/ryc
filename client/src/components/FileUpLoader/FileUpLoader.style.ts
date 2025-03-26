import { css } from '@emotion/react';
import theme from '@styles/theme';

export const s_fileUpLoaderInput = css`
    display: none;
`;

export const s_fileUpLoaderBox = () => css`
    width: 50rem;
    height: 10rem;
    border: 1px solid ${theme.colors.gray[300]};
    border-radius: 8px;
    margin-top: 0.5rem;

    overflow: auto;
`;
