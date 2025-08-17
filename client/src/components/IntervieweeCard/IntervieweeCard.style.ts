import { css } from '@emotion/react';
import theme from '@styles/theme';

export const s_cardContainer = (isActivated: boolean) => css`
    display: flex;
    width: 18rem;
    height: 100%;
    background-color: white;
    border: 1px solid ${theme.colors.gray[300]};
    border-radius: 30px;
    align-items: center;
    gap: 0.8rem;
    padding: 0.7rem 1rem;
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
    flex-direction: column;
    overflow: hidden;
`;
