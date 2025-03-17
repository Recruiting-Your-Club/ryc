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
        color: ${theme.colors.black};
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;

        ${disabled &&
        css`
            color: ${theme.colors.disabled};
        `}

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
    ${size === 'lg' &&
    css`
        margin-left: 0.05rem;
    `};

    ${(size === 's' || size === 'md') &&
    css`
        margin-top: 0.01rem;
    `}
`;

const defaultTrueSvgColor = (
    isChecked: boolean = false,
    defaultChecked: boolean = false,
    disabled: boolean = false,
) => css`
    color: ${(defaultChecked || isChecked) && disabled && theme.colors.white};
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
                color: transparent;
                ${isChecked &&
                css`
                    color: ${CHECKBOX_COLORS[color]};
                `}
                ${defaultTrueSvgColor(isChecked, defaultChecked, disabled)}
            `;
        case 'solid':
            return css`
                color: transparent;
                ${isChecked &&
                css`
                    color: ${theme.colors.white};
                `}
                ${defaultTrueSvgColor(isChecked, defaultChecked, disabled)}
            `;
    }
};

const baseVariant = (
    isChecked: boolean = false,
    defaultChecked: boolean = false,
    disabled: boolean = false,
) => css`
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
    border-radius: 0.25rem;
    cursor: pointer;

    ${disabled &&
    css`
        cursor: default;
    `}

    ${(defaultChecked || isChecked) &&
    disabled &&
    css`
        border-color: transparent;
        background-color: ${theme.colors.disabled};
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
                border: 0.025rem solid;
                border-color: ${theme.colors.gray[400]};
                ${isChecked &&
                css`
                    border-color: rgba(${hexToRgb(CHECKBOX_COLORS[color])}, 0.7);
                `}
                ${baseVariant(isChecked, defaultChecked, disabled)};
            `;
        case 'solid':
            return css`
                border: 0.025rem solid;
                border-color: ${theme.colors.gray[400]};
                background-color: transparent;
                ${isChecked &&
                css`
                    border-color: transparent;
                    background-color: ${CHECKBOX_COLORS[color]};
                `}
                ${baseVariant(isChecked, defaultChecked, disabled)};
            `;
        case 'subtle':
            return css`
                background-color: rgba(${hexToRgb(CHECKBOX_COLORS[color])}, 0.2);
                ${disabled &&
                css`
                    background-color: ${theme.colors.disabled};
                `};
                ${baseVariant(isChecked, defaultChecked, disabled)};
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
    display: none;
`;
