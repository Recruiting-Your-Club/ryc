import type { CSSObject } from '@emotion/react';
import type { CSSProperties } from 'react';
import theme from '@styles/theme';

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    size?: TextAreaSize;
    width?: string;
    error?: boolean;
    errorText?: string;
    label?: string;
    sx?: CSSObject;
    charCount?: boolean;
}

export type TextAreaSize = 'sm' | 'md' | 'lg';

interface Typography extends CSSObject {
    fontSize: CSSProperties['fontSize'];
    fontWeight: CSSProperties['fontWeight'];
    lineHeight: CSSProperties['lineHeight'];
}

interface TextAreaSizeConfig {
    height: string;
    padding: CSSProperties['padding'];
    typography: Typography;
}

export const textAreaSize: Record<TextAreaSize, TextAreaSizeConfig> = {
    sm: {
        height: '20rem',
        padding: '0.75rem',
        typography: theme.typography.bodyRegular,
    },
    md: {
        height: '30rem',
        padding: '1rem',
        typography: theme.typography.bodyRegular,
    },
    lg: {
        height: '40rem',
        padding: '1.25rem',
        typography: theme.typography.bodyRegular,
    },
};
