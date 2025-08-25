import type { AnnouncementSubmitRequest } from '@api/domain/announcement/types';

export interface PreviewStepProps {
    preivewData: AnnouncementSubmitRequest;
    recruitFiles: File[];
}
