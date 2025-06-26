import type { CSSObject } from '@emotion/react';
export interface CalendarProps {
    selectedDate?: string[];
    onSelect?: (selectedDate: string[]) => void;
    isMultiple?: boolean;
    disabled?: boolean;
    border?: boolean;
    shadow?: boolean;
    size?: Size;
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
//# sourceMappingURL=types.d.ts.map