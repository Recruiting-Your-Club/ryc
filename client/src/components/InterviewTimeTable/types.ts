import type { InterviewSlot } from '@api/domain/interview/types';
import type { CSSObject } from '@emotion/react';
import type { Dispatch, SetStateAction } from 'react';

export interface InterviewTimeTableProps {
    interviewSlots: InterviewSlot[];
    selectedInterviewSlotId: string | null;
    onSelect?: (label: string) => void;
    setSelectedLabel?: Dispatch<SetStateAction<string>>;
    onOpenChange?: Dispatch<SetStateAction<boolean>>;
    sx?: CSSObject;
    timeContentSx?: CSSObject;
    listSx?: CSSObject;
}
