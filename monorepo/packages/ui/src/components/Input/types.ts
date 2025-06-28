import type { CSSObject } from '@emotion/react';
import type { InputHTMLAttributes, ReactNode } from 'react';

export type InputVariant = 'primary' | 'lined' | 'transparent';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    variant?: InputVariant;
    error?: boolean;
    helperText?: string;
    startNode?: ReactNode;
    endNode?: ReactNode;
    inputSx?: CSSObject;
    labelSx?: CSSObject;
    helperSx?: CSSObject;
    height?: string;
}
