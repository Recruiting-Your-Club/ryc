import type { CSSObject } from '@emotion/react';

export interface DocumentBoxProps {
    index: number;
    question: string;
    answer: string;
    sx?: CSSObject;
    questionSx?: CSSObject;
}
