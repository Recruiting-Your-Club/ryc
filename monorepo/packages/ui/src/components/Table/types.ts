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

export interface TableRowProps {
    children: ReactNode;
    sx?: CSSObject;
}

export interface TableColumnHeaderCellProps {
    children: ReactNode;
    sx?: CSSObject;
}

export interface TableBodyProps {
    children: ReactNode;
    sx?: CSSObject;
}

export interface TableCellProps {
    children: ReactNode;
    sx?: CSSObject;
}
