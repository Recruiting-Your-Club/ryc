export interface InterviewTimeBoxProps {
    selectedDate: string;
    selectedTimes: string[];
    interval: number;
    handleClick: (time: string) => void;
    handleReset: () => void;
}
