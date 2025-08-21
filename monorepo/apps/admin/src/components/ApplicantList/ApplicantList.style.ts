import { css } from '@emotion/react';

import theme from '@ssoc/styles';

export const s_listContainer = (height: string = '100%') => css`
    height: ${height};
    border-radius: 10px;
    background-color: ${theme.colors.white};
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 0.5rem 1rem;
    box-shadow: 0px 0px 30px 0px rgba(0, 27, 55, 0.1);
    /* overflow: hidden; */
    min-height: 20rem;
`;

export const s_titleContainer = css`
    flex: 0.7;
    display: flex;
    width: 100%;
    padding: 0.5rem;
    align-items: center;
    justify-content: space-between;
    min-height: 5rem;
`;

export const s_searchButton = css`
    cursor: default;
`;

export const s_searchSvg = css`
    color: ${theme.colors.gray[400]};
`;

export const s_searchInput = css`
    width: 11rem;
    padding: 0 1rem 0 0.5rem;
    border-radius: 11px;
    background-color: ${theme.colors.gray[100]};
`;

export const s_miniCardGroupWrapper = css`
    flex: 9.3;
    width: 100%;
    min-height: 0;
    padding: 0.5rem 0.2rem;
`;

export const s_miniCardContainer = (isList: boolean = true) => css`
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    list-style-type: none;
    ${!isList &&
    css`
        justify-content: center;
    `}

    &::after {
        content: '';
        height: 0.5rem;
        flex-shrink: 0;
    }
`;
