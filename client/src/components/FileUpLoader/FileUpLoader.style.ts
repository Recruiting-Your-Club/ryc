import { css } from '@emotion/react';
import theme from '@styles/theme';

export const s_fileUpLoaderInput = css`
    display: none;
`;

export const s_fileUpLoaderBox = (hasFile: boolean, isActive: boolean) => css`
    width: 60rem;
    border: 1px solid ${theme.colors.gray[300]};
    border-radius: 8px;
    margin-top: 0.5rem;
    padding: 0;
    ${theme.typography.helperTextRegular};
    overflow: auto;
    overflow-x: hidden;

    ${hasFile
        ? css`
              display: block;
              max-height: 10rem;
          `
        : css`
              display: flex;
              align-items: center;
              justify-content: center;
              text-align: center;
              height: 5rem;
          `}
    ${isActive &&
    css`
        border-color: ${theme.colors.default};
    `}
`;

export const s_fileUpLoaderEmptyView = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    ${theme.typography.helperTextRegular}
`;

export const s_fileImage = css`
    margin-right: 0.5rem;
`;

export const s_fileHeader = css`
    border-bottom: 1px solid ${theme.colors.gray[300]};
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

export const s_fileHeaderText = css`
    text-align: center;
`;

export const s_fileItemList = css`
    list-style: none;
    padding: 0;
    margin: 0;
`;

export const s_fileItem = css`
    padding: 1rem;
    border-bottom: 1px solid ${theme.colors.gray[200]};
`;

export const s_fileNameWithIcon = css`
    display: flex;
    align-items: center;
    gap: 1rem;
    ${theme.typography.helperTextBold};
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
