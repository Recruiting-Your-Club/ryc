import { css } from '@emotion/react';
import theme from '@styles/theme';

export const hiddenCheckbox = css`
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
`;

export const toggleContainer = css`
    display: flex;
    width: fit-content; /* 내용에 맞게 너비 조정 */
    height: fit-content;
    cursor: pointer;
    padding: 0.3rem;
    border-radius: 12px;
    background-color: ${theme.colors.default};
`;

export const leftTextContainer = (isChecked: boolean) => css`
    color: ${theme.colors.white};
    ${!isChecked &&
    css`
        color: ${theme.colors.defaultHover};
        background-color: ${theme.colors.white};
    `}
    padding: 0.5rem 1rem;
    transition: all 0.2s ease-in-out;
    border-radius: 10px;
    white-space: nowrap;
`;

export const rightTextContainer = (isChecked: boolean) => css`
    color: ${theme.colors.white};
    ${isChecked &&
    css`
        color: ${theme.colors.defaultHover};
        background-color: ${theme.colors.white};
    `}
    transition: all 0.2s ease-in-out;
    padding: 0.5rem 1rem;
    border-radius: 10px;
    white-space: nowrap;
`;
