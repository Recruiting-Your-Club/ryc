import type { InterviewSchedule } from '@api/domain/interview/types';

export interface InterviewTimeTableProps {
    interviewSchedules: InterviewSchedule[];
    selectedInterviewLabel: string;
    onSelect: (label: string) => void;
}
