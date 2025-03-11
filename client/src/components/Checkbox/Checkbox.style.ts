import type { CSSObject } from '@emotion/react';
import { css } from '@emotion/react';
import theme from '@styles/theme';
import type { CSSProperties } from 'react';
import type { CheckboxColor, CheckboxSize, CheckboxVariant } from './CheckboxRoot';

interface Typography extends CSSObject {
    fontSize: CSSProperties['fontSize'];
    fontWeight: CSSProperties['fontWeight'];
    lineHeight: CSSProperties['lineHeight'];
}
interface Size {
    width?: CSSProperties['width'];
    height?: CSSProperties['height'];
    typography: Typography;
}

export const checkboxSize: Record<CheckboxSize, Size> = {
    xs: { width: '1rem', height: '1rem', typography: theme.typography.subCaptionRegular },
    s: { width: '1.5rem', height: '1.5rem', typography: theme.typography.captionRegular },
    md: { width: '2rem', height: '2rem', typography: theme.typography.captionRegular },
    lg: { width: '2.5rem', height: '2.5rem', typography: theme.typography.bodyRegular },
};

export const s_size = (size: CheckboxSize = 's') => {
    return css`
        width: ${checkboxSize[size].width};
        height: ${checkboxSize[size].height};
    `;
};

export const s_variant = (
    variant: CheckboxVariant = 'outline',
    color: CheckboxColor = 'default',
) => {
    switch (variant) {
        case 'outline':
            return css``;
        case 'solid':
            return css``;
        case 'subtle':
            return css``;
    }
};

export const rootContainer = css`
    display: 'inline-flex';
    align-items: 'center';
    vertical-align: 'top';
    line-height: '1.2';
    cursor: 'pointer';
`;

export const hiddenInputCss = css`
    border: 0rem;
    clip: rect(0rem, 0rem, 0rem, 0rem);
    height: 0rem;
    margin: 0rem;
    overflow: hidden;
    padding: 0rem;
    position: absolute;
    width: 0rem;
    white-space: nowrap;
    overflow-wrap: normal;
`;

export const controlCss = (isChecked?: boolean) => {
    return css`
        width: 1rem;
        height: 1rem;
        display: inline-block;
        position: relative;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        border: 0.125rem solid;
        border-color: ${isChecked ? theme.colors.default : theme.colors.black};
    `;
};

export const labelCss = css`
    margin-left: 0.5rem;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
`;
