import type { Interviewee, InterviewSchedule } from '@api/domain/interview/types';

export interface EnrichedInterviewee extends Interviewee {
    interviewDate: string;
    interviewName: string;
    startTime: string;
    endTime: string;
}

export interface IntervieweeListProps {
    title?: string;
    height?: string;
    intervieweeList: EnrichedInterviewee[];
    interviewSchedules: InterviewSchedule[];
    selectedApplicantId: number | null;
    onSelectApplicant: (id: number) => void;
}
