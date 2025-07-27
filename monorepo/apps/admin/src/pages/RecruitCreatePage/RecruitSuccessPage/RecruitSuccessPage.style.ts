import { css } from '@emotion/react';

import theme from '@ssoc/styles';

export const s_container = css`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const s_iconContainer = css`
    margin-bottom: 2rem;
`;

export const s_successIcon = css`
    width: 10rem;
    height: 10rem;
    background-color: ${theme.colors.blue[100]};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
`;

export const s_checkCircle = css`
    width: 8rem;
    height: 8rem;
    fill: ${theme.colors.default};
`;

export const s_mainTitle = css`
    ${theme.typography.h1Semibold}
    margin-bottom: 1rem;
`;

export const s_subTitle = css`
    ${theme.typography.h4Semibold}
    margin-bottom: 1rem;
    color: ${theme.colors.gray[800]};
`;

export const s_urlSection = css`
    border-radius: 0.5rem;
    padding: 1.5rem;
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const s_urlLabel = css`
    ${theme.typography.bodyRegular}
    margin-bottom: 0.75rem;
`;

export const s_urlContainer = css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background-color: ${theme.colors.white};
    border-radius: 0.75rem;
    border: 1px solid ${theme.colors.gray[300]};
    padding: 0.75rem;
`;

export const s_urlCode = css`
    ${theme.typography.bodyRegular}
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: ${theme.colors.gray[800]};
    max-width: 40rem;
`;

export const s_copy = css`
    width: 2rem;
    height: 2rem;
`;

export const s_copyCheckCircle = css`
    width: 2rem;
    height: 2rem;
    fill: ${theme.colors.default};
`;

export const s_buttonContainer = css`
    display: flex;
    gap: 1rem;
    ${theme.typography.bodyRegular}
    margin-bottom: 1rem;
`;

export const s_externalLink = css`
    width: 2rem;
    height: 2rem;
    fill: ${theme.colors.white};
    margin-right: 1rem;
`;

export const s_footerContainer = css`
    padding-top: 1.5rem;
    border-top: 1px solid ${theme.colors.gray[200]};
    margin-top: 1.5rem;
`;

export const s_footerText = css``;
