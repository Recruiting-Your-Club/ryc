import type { CSSObject } from '@emotion/react';
import React from 'react';
import type { ButtonHTMLAttributes } from 'react';

import { PulseSpinner } from '../LoadingSpinner';
import { s_base, s_size, s_variant } from './Button.style';

export type ButtonSize = 'xs' | 's' | 'md' | 'lg' | 'xl' | 'full';
export type ButtonVariant = 'primary' | 'outlined' | 'transparent' | 'text';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    disabled?: boolean;
    size?: ButtonSize;
    loading?: boolean;
    sx?: CSSObject;
    radius?: string;
    zIndex?: number;
}
function Button({
    variant = 'primary',
    size = 'xl',
    children,
    disabled = false,
    radius = '0.6rem',
    zIndex = 0,
    loading = false,
    sx,
    type = 'button',
    'aria-label': ariaLabel,
    onClick,
}: ButtonProps) {
    const cssProp = [s_base(radius, zIndex), s_size(size)];

    if (variant) cssProp.push(s_variant(variant));

    return (
        <button
            disabled={disabled}
            onClick={onClick}
            type={type}
            aria-label={ariaLabel}
            css={[cssProp, sx]}
        >
            {loading && <PulseSpinner />}
            {!loading && children}
        </button>
    );
}
export { Button };
