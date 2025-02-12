import { s_size, s_base, s_variant } from './Button.style';
import React from 'react';

import type { SerializedStyles } from '@emotion/react';
import type { ButtonHTMLAttributes } from 'react';

export type ButtonSize = 'xs' | 's' | 'md' | 'lg' | 'xl' | 'full';
export type ButtonVariant = 'primary';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant: ButtonVariant;
    disabled?: boolean;
    size: ButtonSize;
    loading?: boolean;
    customCss?: SerializedStyles;
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    radius?: string;
    zIndex?: number;
}
function Button({
    variant,
    size,
    children,
    disabled = false,
    radius = '0.3rem',
    zIndex = 0,
    loading = false,
    customCss,
    type = 'button',
    'aria-label': ariaLabel,
    onClick,
}: ButtonProps) {
    const cssProp = [s_size(size), s_base(radius, zIndex)];

    if (variant) cssProp.push(s_variant[variant]);

    return (
        <button disabled={disabled} onClick={onClick} type={type} aria-label={ariaLabel} css={[cssProp, customCss]}>
            {loading && '...'}
            {!loading && children}
        </button>
    );
}
export { Button };
