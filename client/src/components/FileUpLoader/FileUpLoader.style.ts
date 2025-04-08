import { css } from '@emotion/react';
import theme from '@styles/theme';
import type { Align } from './type';

export const s_fileUpLoader = css`
    position: relative;
    margin-top: 1rem;
    width: 60rem;
`;
export const s_fileUpLoaderHelperText = css`
    position: absolute;
    top: 1rem;
    right: 0;
    ${theme.typography.subCaptionLight};
    color: ${theme.colors.gray[600]};
`;

export const s_fileUpLoaderInput = css`
    display: none;
`;

export const s_fileUpLoaderBox = (hasFile: boolean, isActive: boolean, disabled: boolean) => css`
    width: 100%;
    min-height: 8rem;
    border: 1px solid ${theme.colors.gray[300]};
    border-radius: 8px;
    margin-top: 0.5rem;
    padding: 0;
    ${theme.typography.helperTextRegular};

    ${!hasFile &&
    css`
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
    `}

    ${hasFile &&
    css`
        display: block;
    `}

  ${isActive &&
    css`
        border-color: ${theme.colors.default};
        background-color: ${theme.colors.gray[100]};
    `}

    ${disabled &&
    css`
        opacity: 0.5;
        pointer-events: none;
        user-select: none;
        cursor: not-allowed;
    `}
`;

export const s_fileUpLoaderEmptyView = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${theme.typography.helperTextRegular}
`;

export const s_fileUpLoaderItemList = css`
    padding: 0;
    margin: 0;
    overflow-y: auto;
    max-height: 8rem;
`;

export const s_fileUpLoaderIcon = css`
    margin-right: 0.5rem;
`;

export const s_fileHeader = css`
    border-bottom: 1px solid ${theme.colors.gray[300]};
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    padding: 0.75rem 1rem;
    background-color: ${theme.colors.gray[100]};
    color: ${theme.colors.gray[700]};
    ${theme.typography.subCaptionRegular};
`;

export const s_fileRow = css`
    display: grid;
    grid-template-columns: 5% 45% 20% 15% 15%;
    align-items: center;
    gap: 0.5rem;
    padding-right: 1rem;
`;

export const s_fileHeaderText = (align: Align) => css`
    text-align: ${align};
`;

export const s_fileItem = css`
    padding: 1rem;
    border-bottom: 1px solid ${theme.colors.gray[200]};
`;

export const s_fileNameWithIcon = css`
    display: flex;
    align-items: center;
    gap: 1rem;
    ${theme.typography.helperTextRegular};
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export const s_fileMetaItem = css`
    color: ${theme.colors.gray[600]};
    ${theme.typography.helperTextRegular};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
`;

export const s_xIcon = css`
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`;

export const s_fileImagePreview = css`
    width: 1.25rem;
    height: 1.25rem;
    object-fit: contain;
`;
