import dayjs from 'dayjs';
import type { CalendarData } from './types';
declare function useCalendar(selectedDate: string[] | undefined, isMultiple: boolean | undefined, onSelect: (selectedDate: string[]) => void): {
    currentDate: dayjs.Dayjs;
    days: CalendarData[];
    today: string;
    newSelectedDate: Set<string>;
    handleBackMonth: () => void;
    handleNextMonth: () => void;
    handleSelectedDate: (selectDate: string) => void;
};
export { useCalendar };
//# sourceMappingURL=useCalendar.d.ts.map