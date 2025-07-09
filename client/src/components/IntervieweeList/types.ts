import type { IntervieweeInformation, InterviewSchedule } from '@api/domain/interview/types';

export interface IntervieweeListProps {
    title?: string;
    height?: string;
    intervieweeList: IntervieweeInformation[];
    interviewSchedules: InterviewSchedule[];
    selectedApplicantId: number | null;
    onSelectApplicant: (id: number) => void;
}
