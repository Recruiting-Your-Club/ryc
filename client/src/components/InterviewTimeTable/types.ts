import type { InterviewSchedule } from '@api/domain/interview/types';
import type { CSSObject } from '@emotion/react';
import type { Dispatch, SetStateAction } from 'react';

export interface InterviewTimeTableProps {
    interviewSchedules: InterviewSchedule[];
    selectedInterviewLabel: string;
    onSelect: (label: string) => void;
    onOpenChange?: Dispatch<SetStateAction<boolean>>;
    sx?: CSSObject;
    timeContentSx?: CSSObject;
    listSx?: CSSObject;
}
