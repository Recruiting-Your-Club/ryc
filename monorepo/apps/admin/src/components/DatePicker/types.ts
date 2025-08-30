export interface DatePickerProps {
    mode?: 'single' | 'multiple' | 'range';
    selectedDate: string[];
    onChange: (dates: string[]) => void;
    placeholder?: string;
    showAlwaysOpenToggle?: boolean;
    alwaysOpenLabel?: string;
    alwaysOpenSentinel?: { start: string; end: string };
}
