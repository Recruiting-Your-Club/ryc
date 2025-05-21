import { css } from '@emotion/react';
import theme from '@styles/theme';
export const dialogCss = css`
    max-width: 64dvw;
    max-height: 90dvh;
    min-width: 115rem;
`;

export const headerCss = css`
    justify-content: space-between;
    padding: 1.4rem 3rem;
`;

export const contentCss = css`
    display: flex;
    flex-direction: column;
    padding: 2rem 4rem;
    gap: 2rem;
    overflow: hidden;
`;

export const titleInputCss = css`
    border: 1px solid ${theme.colors.gray[500]};
    border-radius: 8px;
    padding-left: 1rem;
    ${theme.typography.captionRegular}
`;

export const inputCss = css`
    ::placeholder {
        ${theme.typography.captionRegular}
    }
`;

const dialogContentWrapper = css`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

export const titleWrapper = css`
    ${dialogContentWrapper}
    flex: 1;
`;

export const contentWrapper = css`
    ${dialogContentWrapper}
    flex: 9;
    min-height: 40rem;
    height: 100%;
`;

export const textareaCss = css`
    ${theme.typography.captionRegular}
    margin: -2.5rem 0;
    padding: 1rem 1.5rem;
    min-height: 35rem;
    height: 100%;

    ::placeholder {
        ${theme.typography.captionRegular}
    }
`;

export const actionCss = css`
    justify-content: flex-end;
    padding: 1rem 4rem 3rem 4rem;
`;
