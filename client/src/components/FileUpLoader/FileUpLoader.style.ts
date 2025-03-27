import { css } from '@emotion/react';
import theme from '@styles/theme';

export const s_fileUpLoaderInput = css`
    display: none;
`;

export const s_fileUpLoaderBox = (hasFile: boolean) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50rem;
    height: 10rem;
    border: 1px solid ${theme.colors.gray[300]};
    border-radius: 8px;
    margin-top: 0.5rem;
    ${hasFile &&
    css`
        flex-direction: column;
    `}

    overflow: auto;
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
