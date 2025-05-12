import { css } from '@emotion/react';
import theme from '@styles/theme';
import type { CSSObject } from '@emotion/react';

export type Size = 'sm' | 'md' | 'lg';

const getToggleContainerSize = (size: Size) => {
    switch (size) {
        case 'sm':
            return css`
                width: 3.5rem;
                height: 2rem;
            `;
        case 'md':
            return css`
                width: 4.5rem;
                height: 2.5rem;
            `;
        case 'lg':
            return css`
                width: 5.6rem;
                height: 3rem;
            `;
    }
};
const getToggleSize = (size: Size) => {
    switch (size) {
        case 'sm':
            return css`
                width: 1.5rem;
                height: 1.5rem;
                top: 0.23rem;
                left: 0.3rem;
            `;
        case 'md':
            return css`
                width: 2rem;
                height: 2rem;
                top: 0.23rem;
                left: 0.3rem;
            `;
        case 'lg':
            return css`
                width: 2.5rem;
                height: 2.5rem;
                top: 0.25rem;
                left: 0.3rem;
            `;
    }
};
const getToggleMove = (size: Size) => {
    switch (size) {
        case 'sm':
            return '4rem';
        case 'md':
            return '4.5rem';
        case 'lg':
            return '5rem';
    }
};
export const hiddenCheckbox = css`
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
`;

export const toggleCircle = (isChecked: boolean, size: Size) => css`
    position: absolute;
    ${getToggleSize(size)};
    align-items: center;
    justify-content: start;
    border-radius: 50%;
    transition: all 0.2s ease-in-out;
    transform: translateX(0);
    ${isChecked &&
    css`
        transform: translateX(calc(${getToggleMove(size)} - 2.5rem));
    `}

    background-color: ${theme.colors.white};
`;

export const toggleContainer = (isChecked: boolean, size: Size) => {
    return css`
        position: relative;
        cursor: pointer;
        border-radius: 25px;
        ${getToggleContainerSize(size)};
        background-color: ${theme.colors.gray[400]};
        ${isChecked &&
        css`
            background-color: ${theme.colors.default};
        `}
    `;
};
