import React from 'react';
import { s_size, s_base, s_variant } from './Button.style';
import type { CSSObject, SerializedStyles } from '@emotion/react';
import type { ButtonHTMLAttributes } from 'react';
import { PulseSpinner } from '../LoadingSpinner';

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
