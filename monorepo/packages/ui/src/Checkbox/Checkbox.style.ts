import type { CSSObject } from '@emotion/react';
import { css } from '@emotion/react';
import type { CSSProperties } from 'react';

import theme from '@ssoc/styles';
import { hexToRgb } from '@ssoc/utils';

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

export const s_size = (size: CheckboxSize = 's') => {
    return css`
        width: ${checkboxSize[size].width};
        height: ${checkboxSize[size].height};
    `;
};

export const s_text = (size: CheckboxSize = 's', disabled: boolean = false) => {
    return css`
        ${typographySize[size].typography};
        color: ${theme.colors.black};
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;

        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;

        ${disabled &&
        css`
            color: ${theme.colors.disabled};
        `}
        ${size === 'md' &&
        css`
            padding-bottom: 0.04rem;
        `}

        ${size === 'lg' &&
        css`
            padding-bottom: 0.1rem;
        `}
    `;
};

const baseSVGwithColor = (
    isChecked: boolean = false,
    defaultChecked: boolean = false,
    disabled: boolean = false,
) => css`
    position: absolute;
    width: 100%;
    height: 100%;
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
                ${baseSVGwithColor(isChecked, defaultChecked, disabled)}
            `;
        case 'solid':
            return css`
                color: transparent;
                ${isChecked &&
                css`
                    color: ${theme.colors.white};
                `}
                ${baseSVGwithColor(isChecked, defaultChecked, disabled)}
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

    margin: 0;
    padding: 0;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    box-sizing: border-box;

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
                border: 0.025rem solid;
                border-color: transparent;
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
