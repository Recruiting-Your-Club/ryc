import type { CSSObject } from '@emotion/react';
import type { InputHTMLAttributes } from 'react';

export interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    leftText?: string;
    rightText?: string;
    isChecked?: boolean;
    size?: 'sm' | 'md' | 'lg';
    sx?: CSSObject;
    handleToggle?: () => void;
}
