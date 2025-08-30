import { css } from '@emotion/react';

import theme from '@ssoc/styles';

export const s_clubMemberRolePageContainer = css`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
`;

export const s_clubMemberRolePageTopContainer = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 80%;
    margin-top: 8rem;
`;

export const s_clubMemberRolePageTableContainer = css`
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: visible;
`;

export const s_firstHeaderCellContainer = css`
    display: flex;
    align-items: center;
    gap: 3rem;
`;

export const s_memberCellContainer = css`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

export const s_inputSx = css`
    border-radius: 10px;
    background-color: ${theme.colors.gray[200]};
    width: 25rem;
    box-shadow:
        inset -1px -1px 1px rgba(255, 255, 255, 1),
        inset 1px 1px 1px rgba(0, 0, 0, 0.1);
`;

export const s_buttonSx = css`
    width: 10rem;
`;

export const s_tableSx = css`
    overflow: visible;
`;

export const s_tableHeaderCellSx = css`
    padding-right: 10rem;
`;

export const s_tableCellSx = css`
    display: flex;
    align-items: center;
    gap: 1rem;
`;

export const s_tableCellDropdownSx = css`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
`;

export const s_dropdownTriggerSx = css`
    border: none;
    padding: 0;
`;

export const s_dropdownItemSx = css`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const s_dropdownContentSx = css`
    z-index: 9999;
`;

export const s_tableCellNoActionSx = css`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 95%;
`;

export const s_searchButtonSx = css`
    pointer-events: none;
    &:hover {
        background-color: transparent;
    }
`;
