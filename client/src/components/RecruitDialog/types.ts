import type { Announcement } from '@api/domain/announcement/types';

export interface RecruitmentDialogProps {
    open?: boolean;
    handleClose?: () => void;
    link?: string;
    announcementDetail: Announcement;
}
