import type { InterviewDetailInformation } from '@api/domain/email/types';
import type { Dispatch, SetStateAction } from 'react';

export interface InterviewSettingDialogProps {
    open: boolean;
    handleClose: () => void;
    handleInterviewEmail: (
        numberOfPeopleByInterviewDateRequests: InterviewDetailInformation[],
        subject: string,
        content: string,
    ) => boolean;
}

export interface InterviewInformation {
    date: string;
    maxNumber: string;
    perTime: string;
    startTime: string;
    endTime: string;
    selectedTimeList: string[];
}

export interface InterviewSettingDialogContextType {
    numberValue: string;
    timeValue: string;
    timeButtonList: string[];
    setTimeButtonList: Dispatch<SetStateAction<string[]>>;
    startTime: string;
    setStartTime: Dispatch<SetStateAction<string>>;
    endTime: string;
    setEndTime: Dispatch<SetStateAction<string>>;
    interviewInformation: Record<string, InterviewInformation>;
    setInterviewInformation: Dispatch<SetStateAction<Record<string, InterviewInformation>>>;
    currentDate: string;
}
