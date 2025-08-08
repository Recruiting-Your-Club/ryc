import { queryOptions } from '@tanstack/react-query';
import { announcementKeys } from '../querykeyFactory';
import {
    getApplicationForm,
    getAnnouncementList,
    getAnnouncementDetail,
    postApplicationAnswers,
} from '@api/domain/announcement/announcement';
import { ApplicationSubmissionRequest } from '@api/domain/announcement/types';

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
