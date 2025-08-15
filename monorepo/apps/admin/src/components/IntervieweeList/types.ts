import type { InterviewSlot } from '@api/domain/interview/types';
import type { StepApplicant } from '@api/domain/step/types';

export type SelectedLabel = {
    label: string;
    interviewSlotId: string | null;
};

export interface EnrichedInterviewee extends StepApplicant {
    interviewDate: string;
    interviewName: string;
    startTime: string;
    endTime: string;
}

export interface IntervieweeListProps {
    title?: string;
    height?: string;
    intervieweeList: EnrichedInterviewee[];
    interviewSlots: InterviewSlot[];
    selectedApplicantId: string | null;
    onSelectApplicant: (id: string) => void;
    onInterviewSlotId: (id: string) => void;
}
