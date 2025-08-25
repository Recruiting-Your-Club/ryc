import { putAnnouncement } from '@api/domain';
import type { AnnouncementSubmitRequest } from '@api/domain/announcement/types';
import { useMutation } from '@tanstack/react-query';

interface UseUpdateAnnouncementParams {
    clubId: string;
    announcementId: string;
    onSuccess?: () => void;
    onError?: (error: unknown) => void;
}

export const useUpdateAnnouncement = ({
    clubId,
    announcementId,
    onSuccess,
    onError,
}: UseUpdateAnnouncementParams) => {
    return useMutation({
        mutationFn: (payload: AnnouncementSubmitRequest) =>
            putAnnouncement(clubId, announcementId, payload),
        onSuccess,
        onError,
    });
};
