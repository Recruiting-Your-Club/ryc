import { css } from '@emotion/react';

import theme from '@ssoc/styles';

export const s_listContainer = (height: string = '100%') => css`
    height: ${height};
    border-radius: 10px;
    background-color: ${theme.colors.white};
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: 0.5rem 1rem;
    box-shadow: 0px 0px 30px 0px rgba(0, 27, 55, 0.1);
    min-height: 10rem;
    max-height: 18rem;
`;

export const s_titleContainer = css`
    flex: 2;
    display: flex;
    width: 100%;
    padding: 1rem;
    align-items: center;
    justify-content: space-between;
`;

export const s_titleTextAndSelectionButtonContainer = css`
    display: flex;
    align-items: center;
    gap: 1.5rem;
`;

export const s_searchInput = css`
    width: 11rem;
    padding: 0 1rem 0 0.5rem;
    border-radius: 11px;
    background-color: ${theme.colors.gray[100]};
`;

export const s_searchButton = css`
    cursor: default;
`;

export const s_searchSvg = css`
    color: ${theme.colors.gray[400]};
`;

export const s_selectionButton = css`
    border-color: ${theme.colors.gray[300]};
    border-radius: 20px;
    padding: 0 1.5rem;
    width: 11.5rem;
    height: 2.8rem;
    ${theme.typography.captionRegular}
`;

export const s_intervieweeCardGroupWrapper = css`
    flex: 8;
    width: 100%;
    display: flex;
    padding: 0 1rem;
`;

export const s_invervieweeCardContainer = (isList: boolean = true) => css`
    width: 100%;
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    align-items: center;
    padding: 1rem 0;
    gap: 0.5rem;
    height: 7rem;
    ${!isList &&
    css`
        justify-content: center;
    `}
`;

export const s_buttonGroup = css`
    height: 22rem;
`;
