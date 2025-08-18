import { css } from '@emotion/react';

import theme from '@ssoc/styles';

export const s_dialog = css`
    max-width: 64dvw;
    max-height: 90dvh;
    min-width: 115rem;
`;

export const s_header = css`
    justify-content: space-between;
    padding: 1.4rem 3rem;
`;

export const s_titleText = css`
    padding: 0.3rem 0 0 0;
`;

export const s_divider = css`
    border-top: 1px solid;
`;

export const s_content = css`
    display: flex;
    flex-direction: column;
    padding: 2rem 4rem;
    gap: 2rem;
    overflow: hidden;
`;

export const s_titleInput = css`
    border: 1px solid ${theme.colors.gray[500]};
    border-radius: 8px;
    padding-left: 1rem;
    ${theme.typography.captionRegular}
`;

export const s_input = css`
    ::placeholder {
        ${theme.typography.captionRegular}
    }
`;

const s_dialogContentWrapper = css`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

export const s_titleWrapper = css`
    ${s_dialogContentWrapper}
    flex: 1;
`;

export const s_contentWrapper = css`
    ${s_dialogContentWrapper}
    flex: 9;
    min-height: 40rem;
    height: 100%;
`;

export const s_action = css`
    justify-content: flex-end;
    padding: 1rem 4rem 3rem 4rem;
`;

export const s_editorRoot = css`
    min-width: 43rem;
    height: 100%;
    justify-content: start;
`;

export const s_editorToolbar = css`
    flex: 0.6;
    height: 4rem;
    max-height: 4rem;
    background-color: ${theme.colors.white};
    border-radius: 8px;
    border: 1px solid ${theme.colors.gray[500]};
    padding: 5px 10px;
`;

export const s_editorTextarea = css`
    flex: 9.4;
    border-radius: 8px;
    transition: border-color 0.3s ease-in-out;
    &:focus {
        border-color: ${theme.colors.default};
        outline: none;
    }
`;
