import type { InputHTMLAttributes } from 'react';
import type { CSSObject } from '@emotion/react';

export interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    leftText?: string;
    rightText?: string;
    size?: Size;
    isChecked?: boolean;
    handleToggle?: () => void;
    sx?: CSSObject;
}
export type Size = 'sm' | 'md' | 'lg';
