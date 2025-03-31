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

export const s_fileUpLoaderHelperText = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${theme.typography.helperTextRegular}
`;
export const s_fileImage = css`
    margin-right: 0.5rem;
`;

export const s_fileTable = css`
    width: 100%;
    text-align: left;
`;

export const s_fileTableHead = css`
    background-color: ${theme.colors.gray[100]};
    color: ${theme.colors.gray[700]};
    ${theme.typography.subCaptionRegular};
    th {
        padding: 0.5rem;
    }
`;

export const s_fileTableBody = css`
    td {
        padding: 0.75rem;
        border-top: 1px solid ${theme.colors.gray[200]};
        word-break: break-all;
    }
`;

export const s_fileNameWithIcon = css`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

export const s_fileIcon = css`
    width: 1.25rem;
    height: 1.25rem;
`;
export const s_xIcon = css`
    width: 1.25rem;
    height: 1.25rem;

    cursor: pointer;
`;
