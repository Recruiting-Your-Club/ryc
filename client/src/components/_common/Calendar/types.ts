export interface CalendarProps {
    selectedDate: string[];
    setSelectedDate: (selectedDate: string[]) => void;
    isMultiple?: boolean;
    readonly?: boolean;
}
