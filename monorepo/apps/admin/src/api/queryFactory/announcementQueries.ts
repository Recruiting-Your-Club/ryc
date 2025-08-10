import { getAllAnnouncements, getDetailAnnouncement } from '@api/domain';
import { announcementKeys } from '@api/querykeyFactory';
import { DEFAULT_GCTIME } from '@constants/gcTime';
import { DEFAULT_STALETIME } from '@constants/staleTime';
import { queryOptions } from '@tanstack/react-query';

const announcementQueries = {
    list: (clubId: string) =>
        queryOptions({
            queryKey: announcementKeys.list(clubId),
            queryFn: () => getAllAnnouncements(clubId),
            staleTime: DEFAULT_STALETIME,
            gcTime: DEFAULT_GCTIME,
            enabled: !!clubId,
        }),

    detail: (announcementId: string) =>
        queryOptions({
            queryKey: announcementKeys.detail(announcementId),
            queryFn: () => getDetailAnnouncement(announcementId),
            staleTime: DEFAULT_STALETIME,
            gcTime: DEFAULT_GCTIME,
            enabled: !!announcementId,
        }),
};

export { announcementQueries };
