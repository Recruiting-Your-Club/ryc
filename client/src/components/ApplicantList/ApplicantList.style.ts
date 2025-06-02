import { css } from '@emotion/react';
import theme from '@styles/theme';

export const boxContainer = (height: string = '100%') => css`
    height: ${height};
    border-radius: 10px;
    background-color: ${theme.colors.white};
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 0.5rem 1rem;
`;

export const titleSection = css`
    flex: 1;
    display: flex;
    width: 100%;
    padding: 0 0.5rem;
    align-items: center;
    justify-content: end;
    min-height: 6rem;
`;

export const inputCss = css`
    width: 11rem;
    padding: 0 0 0 0.5rem;
    border-radius: 15px;
    background-color: ${theme.colors.gray[100]};
`;

export const dividerCss = css`
    /* width: 95%; */
`;

export const miniCardGroupSection = css`
    flex: 9;
`;
