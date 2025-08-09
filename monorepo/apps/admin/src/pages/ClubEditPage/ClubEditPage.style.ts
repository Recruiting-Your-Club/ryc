import { css } from '@emotion/react';

import theme from '@ssoc/styles';

export const s_clubDetailPageContainer = css`
    width: 100%;
    height: 100%;
    background-color: ${theme.colors.gray[100]};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 0;
`;

export const s_contentContainer = css`
    max-width: 90rem;
    min-height: 130rem;
    width: 100%;
    height: 100%;
    background-color: ${theme.colors.white};
    padding: 2rem 2rem;
    border-radius: 10px;
    border: 1px solid ${theme.colors.gray[200]};
`;
export const s_clubHeader = css`
    display: flex;
    align-items: center;
    height: 7rem;
    gap: 1rem;
    padding: 0 1rem;
`;
export const s_editButtonContainer = css`
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: end;
    align-items: end;
`;
export const s_buttonWrapper = css`
    padding-bottom: 0;
`;
export const s_clubImage = css`
    width: 6rem;
    height: 6rem;
    min-width: 6rem;
    @media (max-width: 480px) {
        min-width: 5rem;
        width: 5rem;
        height: 5rem;
    }
`;
export const s_clubHeaderTextContainer = (isEditMode: boolean) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    gap: 0.5rem;
    ${!isEditMode &&
    css`
        padding-bottom: 0.5rem;
    `};
`;

export const s_introduceContainer = css`
    padding: 4rem 3rem;
    min-height: 70rem;
`;

export const s_clubHeaderTitle = css`
    @media (max-width: 480px) {
        ${theme.typography.h3Semibold};
    }
`;
export const s_imageListContainer = css`
    display: grid;
    justify-content: center;
    width: 100%;
    grid-template-columns: repeat(3, 1fr); // 기본 3열
    padding: 4rem 3rem;
    gap: 0.5rem;
    @media (min-width: 480px) {
        grid-template-columns: repeat(4, 1fr);
    }
`;

export const s_imageItem = css`
    aspect-ratio: 1 / 1;
    border-radius: 10px;
    background-color: transparent;
`;
