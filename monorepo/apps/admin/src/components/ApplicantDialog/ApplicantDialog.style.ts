import { css } from '@emotion/react';

import theme from '@ssoc/styles';

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
    padding-top: 0.5rem;
    overflow: hidden;
`;

export const contentHeader = css`
    width: 100%;
    flex: 0.7;
    height: 100%;
    min-height: 4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1.5rem 0.5rem;
    overflow: hidden;
`;

export const contentBody = css`
    width: 100%;
    flex: 9.3;
    height: 100%;
    display: flex;
    gap: 1rem;
    overflow: hidden;
`;

export const formContainer = css`
    flex: 7.5;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 0.5rem;
    overflow: hidden;
`;

export const titleWrapper = css`
    flex: 0.5;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1rem 0;
`;

export const contentWrapper = css`
    flex: 9.5;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;

export const evalutaionContainer = css`
    flex: 2.5;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 0.5rem;
    overflow: hidden;
`;

export const formWrapper = css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: ${theme.colors.white};
    border: 1px solid ${theme.colors.gray[300]};
    border-radius: 8px;
    padding: 0.3rem 1rem;
`;

export const documentBoxGroup = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    padding: 2rem;
    overflow-y: auto;

    &::after {
        content: '';
        height: 0.5rem;
        flex-shrink: 0;
    }
`;

export const s_documentTypeTextWrapper = css`
    align-self: flex-start;
    padding: 0 1rem;
`;

export const evaluationContainer = css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: ${theme.colors.white};
    border: 1px solid ${theme.colors.gray[300]};
    border-radius: 8px;
    overflow: hidden;
`;

export const evalutaionTitleWrapper = css`
    width: 100%;
    flex: 0.7;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem;
    overflow: hidden;
`;

export const chevronSvgCss = (willActive?: boolean) => css`
    width: 3rem;
    height: 3rem;
    color: ${theme.colors.black};
    &:hover {
        cursor: pointer;
        pointer-events: auto;
    }
    ${!willActive &&
    css`
        color: ${theme.colors.gray[300]};
        &:hover {
            cursor: default;
            pointer-events: none;
        }
    `}
`;

export const starScoreWrapper = css`
    width: 100%;
    flex: 0.9;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    overflow: hidden;
    padding: 0.4rem;
`;

export const perStarScoreGroup = (empty?: boolean) => css`
    width: 100%;
    flex: 8.4;
    display: flex;
    flex-direction: column;
    padding: 1rem 0.5rem;
    gap: 0.8rem;
    overflow-y: auto;

    ${!empty &&
    css`
        align-items: center;
        justify-content: center;
    `}

    &::after {
        content: '';
        height: 0.5rem;
        flex-shrink: 0;
    }
`;
