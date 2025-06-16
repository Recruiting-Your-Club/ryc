import { css } from '@emotion/react';
import theme from '@styles/theme';

export const s_miniCardContainer = (isActivated?: boolean) => css`
    width: 100%;
    background-color: ${theme.colors.white};
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.8rem 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
        background-color: ${theme.colors.gray[200]};
    }
    ${isActivated &&
    css`
        background-color: ${theme.colors.gray[200]};
    `}
`;

export const s_informationContainer = css`
    display: flex;
    gap: 1rem;
    align-items: center;
`;

export const s_textInformationContainer = css`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
`;
