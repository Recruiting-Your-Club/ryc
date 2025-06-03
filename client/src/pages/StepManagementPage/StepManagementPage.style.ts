import { css } from '@emotion/react';
import theme from '@styles/theme';
import { hexToRgb } from '@utils/hexToRgb';

export const stepManagementPageContainer = css`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

export const topContainer = css`
    width: 100%;
    height: 5%;
    min-height: 4rem;
    max-height: 5rem;
    padding: 3rem 0;
`;

export const searchBarContainer = css`
    width: 30%;
    height: 100%;
    padding: 0 3.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const stepBoxContainer = css`
    height: 90%;
    padding: 0 3.5rem 0 3.5rem;
    display: flex;
    gap: 2rem;
`;

export const inputCss = css`
    width: 100%;
    height: 3rem;
    padding: 0 0.5rem 0 1rem;
    max-width: 15rem;
    min-width: 14rem;
    border-radius: 8px;
    color: ${theme.colors.gray[600]};
    background-color: ${theme.colors.white};
    box-shadow: 0px 0px 3px 0px rgba(${hexToRgb(theme.colors.black)}, 0.15);
`;

export const cardGroup = css`
    height: 100%;
    padding: 0.5rem 0.5rem;
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.8rem;

    &::after {
        content: '';
        height: 0.5rem;
        flex-shrink: 0;
    }
`;
