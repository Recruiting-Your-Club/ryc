import type { InterviewSlot } from '@api/domain/interview/types';

export interface InterviewEmailDialogProps {
    open: boolean;
    handleClose: () => void;
    handleInterviewEmail: (subject: string, content: string) => Promise<boolean>;
    interviewSlots: InterviewSlot[];
    clubId: string;
    announcementId: string;
}
