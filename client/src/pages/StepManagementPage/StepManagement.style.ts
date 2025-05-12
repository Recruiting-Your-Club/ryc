import { css } from '@emotion/react';
import theme from '@styles/theme';
import { hexToRgb } from '@utils/hexToRgb';

export const stepManagementPageContainer = css`
    width: 100%;
    height: 100%;
`;

export const topContainer = css`
    width: 100%;
    height: 5%;
`;

export const searchBarContainer = css`
    width: 30%;
    height: 100%;
    padding: 2.5rem 3.5rem;
    display: flex;
    align-items: center;
    /* background-color: olive; */
`;

export const inputCss = css`
    width: 100%;
    height: 3rem;
    padding: 0 0.5rem 0 1rem;
    max-width: 15rem;
    min-width: 13rem;
    border-radius: 8px;
    color: ${theme.colors.gray[600]};
    background-color: ${theme.colors.white};
    box-shadow: 0px 0px 3px 0px rgba(${hexToRgb(theme.colors.black)}, 0.15);
`;

export const stepBoxContainer = css`
    height: 95%;
    padding: 1rem 3.5rem;
    display: flex;
    gap: 2rem;
`;

export const cardGroup = css`
    height: 100%;
    padding: 0.5rem 0.5rem;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;

    &::after {
        content: '';
        height: 0.5rem;
        flex-shrink: 0;
    }
`;
