import { getAllAnnouncements, getDetailAnnouncement } from '@api/domain';
import { announcementKeys } from '@api/querykeyFactory';
import { DEFAULT_GCTIME } from '@constants/gcTime';
import { DEFAULT_STALETIME, PREFETCH_STALETIME } from '@constants/staleTime';
import { queryOptions } from '@tanstack/react-query';

const announcementQueries = {
    //prefetch/loader에서 쓸 list 기본 옵션
    listOpts: (clubId: string) =>
        queryOptions({
            queryKey: announcementKeys.list(clubId),
            queryFn: () => getAllAnnouncements(clubId),
            staleTime: PREFETCH_STALETIME,
            gcTime: DEFAULT_GCTIME,
        }),

    //컴포넌트에서 사용할 list (useSuspenseQuery)
    listUse: (clubId: string) =>
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
