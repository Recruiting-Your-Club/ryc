import type { CSSProperties } from 'react';
import type { SelectSize } from './Select';
import { css } from '@emotion/react';

interface Size {
    width?: CSSProperties['width'];
    height?: CSSProperties['height'];
}

export const selectSize: Record<SelectSize, Size> = {
    xs: {
        width: '8rem',
        height: '3rem',
    },
    s: {
        width: '10rem',
        height: '3rem',
    },
    md: {
        width: '12rem',
        height: '3rem',
    },
    lg: {
        width: '14rem',
        height: '3rem',
    },
    xl: {
        width: '16rem',
        height: '3rem',
    },
    full: {
        width: '100%',
        height: '3rem',
    },
};

export const s_size = (size: SelectSize) => {
    return css`
        width: ${selectSize[size].width};
        height: ${selectSize[size].height};
    `;
};

export const s_select = css`
    position: relative;
`;

export const s_selectContent = (open: boolean) => {
    return css``;
};

export const s_selectItem = (highlighted: boolean, selected: boolean) => {
    return css``;
};
