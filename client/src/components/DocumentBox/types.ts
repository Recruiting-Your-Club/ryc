import type { CSSObject } from '@emotion/react';
import type { ReactNode } from 'react';

export interface DocumentBoxProps {
    index: number;
    question: string;
    answer: ReactNode;
    sx?: CSSObject;
    questionSx?: CSSObject;
}
