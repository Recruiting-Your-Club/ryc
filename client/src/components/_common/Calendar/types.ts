import type { CSSObject } from '@emotion/react';

export type CalendarMode = 'single' | 'multiple' | 'range' | 'custom';
export interface CalendarProps {
    // useState의 왼쪽 값
    selectedDate?: string[];
    // useState의 오른쪽 값
    onSelect?: (selectedDate: string[]) => void;
    highlightedDate?: string[];
    onlySelected?: boolean;
    mode?: CalendarMode;
    disabled?: boolean;
    border?: boolean;
    shadow?: boolean;
    size?: Size;
    rangePicker?: boolean;
    sx?: CSSObject;
    zIndex?: CSSObject['zIndex'];
}

export interface CalendarData {
    day: number;
    isCurrentMonth: boolean;
    dateString: string;
    weekend: number;
}

export type Size = 'sm' | 'md' | 'lg' | 'full';

export interface SizeStyle {
    width?: CSSObject['width'];
    height?: CSSObject['height'];
}
