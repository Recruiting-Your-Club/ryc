import { css } from '@emotion/react';

import theme from '@ssoc/styles';

export const s_nonAnnouncementPageContainer = css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

export const s_textBox = css`
    margin-bottom: 4rem;
`;

export const s_iconContainer = css`
    margin-bottom: 4rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const s_fileIconWrapper = css`
    width: 10rem;
    height: 10rem;
    border-radius: 100%;
    background-color: ${theme.colors.gray[100]};
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const s_fileIcon = css`
    width: 6rem;
    height: 6rem;
    fill: ${theme.colors.gray[800]};
`;

export const s_captionText = css`
    margin-bottom: 0.5rem;
`;

export const s_dialogTextContainer = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
`;
