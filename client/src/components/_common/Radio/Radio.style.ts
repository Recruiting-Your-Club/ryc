import { css } from '@emotion/react';
import theme from '@styles/theme';

export const radioContainer = css`
    display: flex;
    justify-content: center;
    gap: 0.5rem;
`;

export const s_input = css`
    display: none;
`;

export const s_label = css`
    display: flex;
    align-items: center;
    cursor: pointer;
    gap: 0.5rem;
    font-size: ${theme.typography.helperTextRegular};
    &:hover {
        & > span {
            border: 0.1rem solid ${theme.colors.default};
        }
    }
`;

export const s_radio = (checked: boolean) => css`
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    border: 0.1rem solid ${theme.colors.black};
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    &::after {
        content: '';
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        background-color: ${checked && theme.colors.default};
        transition: background-color 0.1s ease-in;
    }
`;
