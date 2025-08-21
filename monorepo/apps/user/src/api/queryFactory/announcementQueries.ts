import { queryOptions } from '@tanstack/react-query';

import {
    getAnnouncementDetail,
    getAnnouncementList,
    getApplicationForm,
    postApplicationAnswers,
} from '../domain/announcement/announcement';
import type { ApplicationSubmissionRequest } from '../domain/announcement/types';
import { announcementKeys } from '../querykeyFactory';

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
    getApplicationForm: (announcementId: string) =>
        queryOptions({
            queryKey: announcementKeys.detail(`application-form-${announcementId}`),
            queryFn: () => getApplicationForm(announcementId),
        }),
    postApplicationAnswers: (announcementId: string, answerData: ApplicationSubmissionRequest) =>
        queryOptions({
            queryKey: announcementKeys.detail(`post-application-answers-${announcementId}`),
            queryFn: () => postApplicationAnswers(announcementId, answerData),
        }),
};

export { announcementQueries };
