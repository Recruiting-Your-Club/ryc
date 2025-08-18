import type { InterviewSchedule } from '@api/domain/interview/types';
import { Dispatch, SetStateAction } from 'react';

export interface InterviewTimeTableProps {
    interviewSchedules: InterviewSchedule[];
    selectedInterviewLabel: string;
    onSelect: (label: string) => void;
    onOpenChange: Dispatch<SetStateAction<boolean>>;
}
