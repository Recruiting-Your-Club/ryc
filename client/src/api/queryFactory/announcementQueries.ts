import { queryOptions } from '@tanstack/react-query';
import { announcementKeys } from '../querykeyFactory';
import { getApplicationForm, getAnnouncementList } from '@api/domain/announcement/announcement';

const announcementQueries = {
    getAnnouncementList: (clubId: string) =>
        queryOptions({
            queryKey: announcementKeys.lists(clubId),
            queryFn: () => getAnnouncementList(clubId),
        }),
    getApplicationForm: () =>
        queryOptions({
            queryKey: announcementKeys.detail('application-form'),
            queryFn: () => getApplicationForm(),
        }),
};

export { announcementQueries };
