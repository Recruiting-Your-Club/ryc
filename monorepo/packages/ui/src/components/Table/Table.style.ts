import { css } from '@emotion/react';

import theme from '@ssoc/styles';

export const s_tableWrapper = css`
    position: relative;
    width: 100%;
    border-radius: 0.6rem;
    overflow: auto;
    border: 1px solid ${theme.colors.black};
`;

export const s_table = css`
    width: 100%;
    border-collapse: collapse;
`;

export const s_tableHeader = css`
    border-bottom: 1px solid ${theme.colors.black};
    background-color: ${theme.colors.gray[100]};
`;

export const s_tableRow = css`
    border-bottom: 1px solid ${theme.colors.black};
`;

export const s_tableColumnHeaderCell = css`
    ${theme.typography.subCaptionSemibold}
    height: 4.5rem;
    padding-left: 2rem;
    vertical-align: middle;
    text-align: left;

    &:last-child {
        text-align: right;
        padding-right: 2rem;
    }
`;

export const s_tableBody = css`
    & tr:last-child {
        border-bottom: none;
    }
`;

export const s_tableCell = css`
    padding-left: 2rem;
    height: 7rem;
    vertical-align: middle;
    ${theme.typography.captionRegular}

    &:last-child {
        text-align: right;
        padding-right: 2rem;
    }
`;
