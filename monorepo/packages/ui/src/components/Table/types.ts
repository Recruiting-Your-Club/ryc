import type { CSSObject } from '@emotion/react';
import type { ReactNode } from 'react';

export interface TableProps {
    children: ReactNode;
    sxWrapper?: CSSObject;
    sxTable?: CSSObject;
}

export interface TableHeaderProps {
    children: ReactNode;
    sx?: CSSObject;
}
