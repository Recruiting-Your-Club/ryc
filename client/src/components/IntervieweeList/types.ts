import { ApplicantSummary } from '@components/ApplicantMiniCard/types';
import type { InterviewSchedule } from '@components/InterviewTimeTable/types';

export type IntervieweeInformation = {
    id: number;
    name: string;
    email: string;
    interviewDate: string;
    interviewName: string;
};

export interface IntervieweeListProps {
    title?: string;
    height?: string;
    intervieweeList: IntervieweeInformation[];
    interviewSchedules: InterviewSchedule[];
    selectedApplicantId: number | null;
    onSelectApplicant: (id: number) => void;
}
