import { postAnnouncement } from '@api/domain';
import type {
    AnnouncementSubmitRequest,
    PostAnnouncementResponse,
} from '@api/domain/announcement/types';
import { useMutation } from '@tanstack/react-query';

interface UseCreateAnnouncementParams {
    clubId: string;
    onSuccess?: (data: PostAnnouncementResponse) => void;
    onError?: (error: unknown) => void;
}

export const useCreateAnnouncement = ({
    clubId,
    onSuccess,
    onError,
}: UseCreateAnnouncementParams) => {
    return useMutation<PostAnnouncementResponse, unknown, AnnouncementSubmitRequest>({
        mutationFn: (payload) => postAnnouncement(clubId, payload),
        onSuccess: (data) => onSuccess?.(data),
        onError,
    });
};
