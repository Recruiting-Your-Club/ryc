import { css } from '@emotion/react';

import theme from '@ssoc/styles';

import type { Size } from './types';

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
            `;
        case 'md':
            return css`
                width: 2rem;
                height: 2rem;
            `;
        case 'lg':
            return css`
                width: 2.5rem;
                height: 2.5rem;
            `;
    }
};
const getToggleMove = (size: Size) => {
    switch (size) {
        case 'sm':
            return '1.6rem';
        case 'md':
            return '2.1rem';
        case 'lg':
            return '2.7rem';
    }
};
export const hiddenCheckbox = css`
    display: hidden;
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
`;

export const toggleCircle = (isChecked: boolean, size: Size) => css`
    ${getToggleSize(size)};
    border-radius: 50%;
    transition: all 0.2s ease-in-out;
    transform: translateX(0) translateY(-0.05rem);
    ${isChecked &&
    css`
        transform: translateX(${getToggleMove(size)}) translateY(-0.05rem);
    `}

    background-color: ${theme.colors.white};
`;

export const toggleContainer = (isChecked: boolean, size: Size) => css`
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 0 0.2rem;
    border-radius: 25px;
    ${getToggleContainerSize(size)};
    background-color: ${theme.colors.gray[400]};
    ${isChecked &&
    css`
        background-color: ${theme.colors.default};
    `}
`;
