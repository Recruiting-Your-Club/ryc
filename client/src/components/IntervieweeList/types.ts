import type { Interviewee, InterviewSchedule } from '@api/domain/interview/types';

export interface IntervieweeListProps {
    title?: string;
    height?: string;
    intervieweeList: Interviewee[];
    interviewSchedules: InterviewSchedule[];
    selectedApplicantId: number | null;
    onSelectApplicant: (id: number) => void;
}
