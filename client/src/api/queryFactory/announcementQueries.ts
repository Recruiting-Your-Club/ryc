import { queryOptions } from '@tanstack/react-query';
import { announcementKeys } from '../querykeyFactory';
import {
    getApplicationForm,
    getAnnouncementList,
    getAnnouncementDetail,
} from '@api/domain/announcement/announcement';

const announcementQueries = {
    getAnnouncementList: (clubId: string) =>
        queryOptions({
            queryKey: announcementKeys.lists(clubId),
            queryFn: () => getAnnouncementList(clubId),
        }),
    getAnnouncementDetail: (announcementId: string) =>
        queryOptions({
            queryKey: announcementKeys.detail(announcementId),
            queryFn: () => getAnnouncementDetail(announcementId),
        }),
    getApplicationForm: () =>
        queryOptions({
            queryKey: announcementKeys.detail('application-form'),
            queryFn: () => getApplicationForm(),
        }),
};

export { announcementQueries };
