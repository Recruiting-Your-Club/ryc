import { css } from '@emotion/react';

import theme from '@ssoc/styles';

export const s_tableWrapper = css`
    position: relative;
    width: 80%;
    border-radius: 0.8rem;
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
    ${theme.typography.captionSemibold}
    height: 4rem;
    padding: 0.75rem;
    vertical-align: middle;
`;

export const s_tableBody = css`
    & tr:last-child {
        border-bottom: none;
    }
`;

export const s_tableCell = css`
    padding: 1rem;
    vertical-align: middle;
`;
