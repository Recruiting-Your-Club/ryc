import { css } from '@emotion/react';

import theme from '@ssoc/styles';

export const s_userPageContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 2rem;
    margin-top: 2rem;
`;

export const s_userInfoBox = css`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 80rem;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

export const s_header = css`
    display: flex;
    align-items: center;
    padding: 2rem;
    border-bottom: 1px solid ${theme.colors.gray[200]};
`;

export const s_headerTitle = css`
    margin-bottom: 0.5rem;
`;

export const s_content = css`
    padding: 1.5rem;
`;

export const s_clubSection = css`
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid ${theme.colors.gray[200]};
`;

export const s_clubGrid = css`
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
    margin-top: 1rem;
    max-height: 35rem;
    overflow-y: auto;
`;

export const s_clubCard = css`
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding: 0.75rem 1rem;
    border: 1px solid ${theme.colors.gray[200]};
    border-radius: 8px;
    height: 6rem;
`;

export const s_clubInfo = css`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 65%;
`;
export const s_emptyState = css`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 6rem;
    border: 1px dashed ${theme.colors.gray[300]};
    border-radius: 8px;
    background-color: ${theme.colors.gray[50]};
    margin-top: 1rem;
`;

export const s_profileSection = css`
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
    padding: 1.5rem;
    background-color: ${theme.colors.default[200]};
    border-radius: 8px;
    border: 1px solid ${theme.colors.gray[200]};
`;

export const s_profileImage = css`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
`;

export const s_profileInfo = css`
    flex: 1;
`;

export const s_accountDetails = css`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 1.5rem;
`;

export const s_detailItem = css`
    display: flex;
    align-items: center;
    padding: 1rem 0;
    border-bottom: 1px solid ${theme.colors.gray[100]};

    &:last-child {
        border-bottom: none;
    }
`;

export const s_detailLabel = css`
    min-width: 5rem;
`;

export const s_detailValue = css`
    margin-right: auto;
    margin-left: 1rem;
`;

export const s_detailActions = css`
    display: flex;
    gap: 0.5rem;
`;

export const s_actionButton = css`
    padding: 0.5rem 0.75rem;
    background: none;
    border: 1px solid ${theme.colors.gray[300]};
    border-radius: 4px;
    color: ${theme.colors.gray[700]};
    cursor: pointer;
    transition: all 0.2s ease;
    width: 4.5rem;

    ${theme.typography.helperTextRegular};
    &:hover {
        border-color: ${theme.colors.default};
    }
`;
