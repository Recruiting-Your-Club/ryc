import { queryOptions } from '@tanstack/react-query';
import { announcementKeys } from '../querykeyFactory';
import { getAnnouncementsByClub } from '@api/domain/announcement/announcement';

const announcementQueries = {
    getListByClub: (clubId: string, on: boolean = false) =>
        queryOptions({
            queryKey: announcementKeys.listByClub(clubId),
            queryFn: () => getAnnouncementsByClub(clubId),
            enabled: on,
        }),
};

export { announcementQueries };