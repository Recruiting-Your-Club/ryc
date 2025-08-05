import type { ReactNode } from 'react';

export interface NavigationItem {
    title: string;
    page: ReactNode;
    width: string;
}

export interface ClubNavigationProps {
    navigationItem: NavigationItem[];
    controlledActive?: string;
    onActiveChange?: (title: string) => void;
}
