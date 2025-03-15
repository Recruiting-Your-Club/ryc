import type { CSSObject } from '@emotion/react';
import { css } from '@emotion/react';
import theme from '@styles/theme';
import { hexToRgb } from '@utils/hexToRgb';
import type { CSSProperties } from 'react';
import type { CheckboxColor, CheckboxSize, CheckboxVariant } from './CheckboxRoot';

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
    xs: { width: '0.8rem', height: '0.8rem' },
    s: { width: '0.9rem', height: '0.7rem' },
    md: { width: '1.2rem', height: '0.6rem' },
    lg: { width: '1.2rem', height: '0.8rem' },
};

export const s_size = (size: CheckboxSize = 'xs') => {
    return css`
        width: ${checkboxSize[size].width};
        height: ${checkboxSize[size].height};
    `;
};

export const s_text = (size: CheckboxSize = 'xs', disabled: boolean = false) => {
    return css`
        ${typographySize[size].typography};
        color: ${(disabled && `rgba(${hexToRgb(theme.colors.black)}, 0.3)`) || theme.colors.black};
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

export const s_svgSize = (size: CheckboxSize = 'xs') => css`
    width: ${svgSize[size].width};
    height: ${svgSize[size].height};
    margin-left: ${size === 'lg' && '0.05rem'};
    margin-top: ${(size === 's' || size === 'md') && '0.01rem'};
`;

const defaultTrueSvgColor = (
    isChecked: boolean = false,
    defaultChecked: boolean = false,
    disabled: boolean = false,
) => css`
    color: ${(defaultChecked || isChecked) && disabled && theme.colors.white} !important;
`;

export const s_svgColor = (
    variant: CheckboxVariant = 'outline',
    color: CheckboxColor = 'default',
    isChecked: boolean = false,
    defaultChecked: boolean = false,
    disabled: boolean = false,
) => {
    switch (variant) {
        case 'outline':
        case 'subtle':
            return css`
                ${defaultTrueSvgColor(isChecked, defaultChecked, disabled)}
                color: ${(isChecked && CHECKBOX_COLORS[color]) || 'transparent'};
            `;
        case 'solid':
            return css`
                ${defaultTrueSvgColor(isChecked, defaultChecked, disabled)}
                color: ${(isChecked && theme.colors.white) || 'transparent'};
            `;
    }
};

const baseVariant = (
    isChecked: boolean = false,
    defaultChecked: boolean = false,
    disabled: boolean = false,
) => css`
    width: 1rem;
    height: 1rem;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    border-radius: 0.25rem;
    cursor: pointer;

    ${disabled &&
    css`
        cursor: default !important;
    `}

    ${(defaultChecked || isChecked) &&
    disabled &&
    css`
        border-color: transparent !important;
        background-color: rgba(${hexToRgb(theme.colors.black)}, 0.3) !important;
    `}
`;

export const s_variant = (
    isChecked: boolean = false,
    variant: CheckboxVariant = 'outline',
    color: CheckboxColor = 'default',
    defaultChecked: boolean = false,
    disabled: boolean = false,
) => {
    switch (variant) {
        case 'outline':
            return css`
                ${baseVariant(isChecked, defaultChecked, disabled)};
                border: 0.025rem solid;
                border-color: ${(isChecked && `rgba(${hexToRgb(CHECKBOX_COLORS[color])}, 0.7)`) ||
                theme.colors.gray[400]};
            `;
        case 'solid':
            return css`
                ${baseVariant(isChecked, defaultChecked, disabled)};
                border: 0.025rem solid;
                border-color: ${(isChecked && 'transparent') || theme.colors.gray[400]};
                background-color: ${(isChecked && CHECKBOX_COLORS[color]) || 'transparent'};
            `;
        case 'subtle':
            return css`
                ${baseVariant(isChecked, defaultChecked, disabled)};
                background-color: ${(disabled && `rgba(${hexToRgb(theme.colors.black)}, 0.3)`) ||
                `rgba(${hexToRgb(CHECKBOX_COLORS[color])}, 0.2)`};
            `;
    }
};

export const rootContainer = css`
    display: inline-flex;
    white-space: nowrap;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
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
