import type { ReactNode, InputHTMLAttributes } from 'react';
import type { CSSObject } from '@emotion/react';

export type InputVariant = 'primary' | 'lined';

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
