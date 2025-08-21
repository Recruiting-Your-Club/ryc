import type { InterviewSlot } from '@api/domain/interview/types';
import type { SelectedLabel } from '@pages/ApplicantSchedulePage/types';
import type { Dispatch, SetStateAction } from 'react';

export interface InterviewSlotDropdownProps {
    open: boolean;
    onOpenChange: Dispatch<SetStateAction<boolean>>;
    selectedInterviewLabel: SelectedLabel;
    interviewSlots: InterviewSlot[];
    onSelectLabel: (label: string) => void;
}
