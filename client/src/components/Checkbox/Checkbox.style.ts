import type { CSSObject } from '@emotion/react';
import { css } from '@emotion/react';
import theme from '@styles/theme';
import type { CSSProperties } from 'react';
import type { CheckboxColor, CheckboxSize, CheckboxVariant } from './CheckboxRoot';

// rgba에서 rgb부분에 쓰이기 위한 변환 함수
const hexToRgba = (hex: string): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `${r}, ${g}, ${b}`;
};

const CHECKBOX_COLORS = {
    black: theme.colors.black,
    gray: theme.colors.gray[500],
    default: theme.colors.default,
    red: theme.colors.red[900],
};

interface Typography extends CSSObject {
    fontSize: CSSProperties['fontSize'];
    fontWeight: CSSProperties['fontWeight'];
    lineHeight: CSSProperties['lineHeight'];
}
interface Size {
    width?: CSSProperties['width'];
    height?: CSSProperties['height'];
    typography?: Typography;
    marginLeft?: CSSProperties['marginLeft'];
}

export const checkboxSize: Record<CheckboxSize, Size> = {
    xs: { width: '1.2rem', height: '1.2rem' },
    s: { width: '1.3rem', height: '1.3rem' },
    md: { width: '1.5rem', height: '1.5rem' },
    lg: { width: '1.75rem', height: '1.75rem' },
};

export const typographySize: Record<CheckboxSize, Size> = {
    xs: { typography: theme.typography.subCaptionRegular },
    s: { typography: theme.typography.captionRegular },
    md: { typography: theme.typography.captionRegular },
    lg: { typography: theme.typography.bodyRegular },
};

export const svgSize: Record<CheckboxSize, Size> = {
    xs: { width: '0.8rem', height: '0.8rem', marginLeft: '0rem' },
    s: { width: '0.8rem', height: '0.8rem', marginLeft: '0.05rem' },
    md: { width: '1.2rem', height: '0.6rem', marginLeft: '0rem' },
    lg: { width: '1.2rem', height: '0.8rem', marginLeft: '0.05rem' },
};

export const s_size = (size: CheckboxSize = 'xs') => {
    return css`
        width: ${checkboxSize[size].width};
        height: ${checkboxSize[size].height};
    `;
};

export const s_textSize = (size: CheckboxSize = 'xs') => {
    return css`
        ${typographySize[size].typography};
        color: ${theme.colors.black};
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        ${size === 'md' &&
        css`
            padding-top: 0.04rem;
        `}

        ${size === 'lg' &&
        css`
            padding-top: 0.1rem;
        `}
    `;
};

export const s_svgSize = (
    isChecked: boolean = false,
    size: CheckboxSize = 'xs',
    color: CheckboxColor = 'default',
) => css`
    width: ${svgSize[size].width};
    height: ${svgSize[size].height};
    margin-left: ${svgSize[size].marginLeft};
    color: ${(isChecked && CHECKBOX_COLORS[color]) || 'transparent'};
`;

const baseVariant = css`
    width: 1rem;
    height: 1rem;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    border-radius: 0.25rem;
    cursor: pointer;
`;

export const s_variant = (
    isChecked?: boolean,
    variant: CheckboxVariant = 'outline',
    color: CheckboxColor = 'default',
) => {
    switch (variant) {
        case 'outline':
            return css`
                ${baseVariant};
                border: 0.025rem solid;
                border-color: ${(isChecked && `rgba(${hexToRgba(CHECKBOX_COLORS[color])}, 0.7)`) ||
                theme.colors.gray[400]};
            `;
        case 'solid':
            return css``;
        case 'subtle':
            return css``;
    }
};

export const rootContainer = css`
    display: inline-flex;
    white-space: nowrap;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    /* padding: 0.25rem; */
`;

export const hiddenInputCss = css`
    position: absolute;
    width: 0rem;
    height: 0rem;
    border: 0rem;
    clip: rect(0rem, 0rem, 0rem, 0rem);
    padding: 0rem;
    margin: 0rem;
    overflow: hidden;
    white-space: nowrap;
    overflow-wrap: normal;
`;
