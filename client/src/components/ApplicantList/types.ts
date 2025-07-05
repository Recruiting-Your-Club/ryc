import type { ReactNode } from 'react';

export interface ApplicationListProps {
    title?: string;
    height?: string;
    children?: ReactNode;
    isList?: boolean;
}
