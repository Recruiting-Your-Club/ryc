import type { Size, SizeStyle } from './types';
import type { CalendarProps } from './types';
export declare const SizeMap: Record<Size, SizeStyle>;
export declare const calendarContainer: ({ size, border, shadow, zIndex }: CalendarProps) => import("@emotion/react").SerializedStyles;
export declare const calendarHeaderContainer: import("@emotion/react").SerializedStyles;
export declare const monthControlButton: import("@emotion/react").SerializedStyles;
export declare const calendarBodyContainer: import("@emotion/react").SerializedStyles;
export declare const weekdaysContainer: import("@emotion/react").SerializedStyles;
export declare const daysContainer: import("@emotion/react").SerializedStyles;
export declare const weekCell: (index: number) => import("@emotion/react").SerializedStyles | undefined;
export declare const dayCell: (isSelected: boolean, index: number, today: boolean, isCurrentMonth: boolean, disabled: boolean) => import("@emotion/react").SerializedStyles;
//# sourceMappingURL=CalendarStyle.d.ts.map