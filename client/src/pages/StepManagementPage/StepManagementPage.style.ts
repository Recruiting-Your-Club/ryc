import { css } from '@emotion/react';
import theme from '@styles/theme';
import { hexToRgb } from '@utils/hexToRgb';

export const s_stepManagementPageContainer = css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

export const s_topContainer = css`
    width: 100%;
    height: 5%;
    min-height: 4rem;
    max-height: 5rem;
    padding: 3rem 0;
`;

export const s_searchBarContainer = css`
    width: 30%;
    height: 100%;
    padding: 0 3.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const s_stepBoxContainer = css`
    height: 90%;
    padding: 0 3.5rem 0 3.5rem;
    display: flex;
    gap: 2rem;
`;

export const s_input = css`
    width: 100%;
    height: 3rem;
    padding: 0 0.5rem 0 1rem;
    max-width: 15rem;
    min-width: 14rem;
    border-radius: 8px;
    color: ${theme.colors.gray[600]};
    background-color: ${theme.colors.white};
    box-shadow: 0px 0px 3px 0px rgba(${hexToRgb(theme.colors.black)}, 0.15);
`;
