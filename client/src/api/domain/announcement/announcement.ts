import { httpRequest } from '@api/common/httpRequest';
import {
    ApplicationForm,
    Announcement,
    AnnouncementSummary,
    ApplicationSubmissionRequest,
    ApplicationSubmissionResponse,
} from './types';

async function getApplicationForm(announcementId: string): Promise<ApplicationForm> {
    const response = await httpRequest.get({
        url: `announcements/${announcementId}/application-form`,
    });
    return response as ApplicationForm;
}

async function postApplicationAnswers(
    announcementId: string,
    data: ApplicationSubmissionRequest,
): Promise<ApplicationSubmissionResponse> {
    const response = await httpRequest.post({
        url: `announcements/${announcementId}/applications`,
        body: data,
    });
    return response as ApplicationSubmissionResponse;
}

async function getAnnouncementList(clubId: string): Promise<AnnouncementSummary[]> {
    const response = await httpRequest.get({
        url: `clubs/${clubId}/announcements`,
    });
    return response as AnnouncementSummary[];
}

async function getAnnouncementDetail(announcementId: string): Promise<Announcement> {
    const response = await httpRequest.get({
        url: `announcements/${announcementId}`,
    });
    return response as Announcement;
}

export { getApplicationForm, postApplicationAnswers, getAnnouncementList, getAnnouncementDetail };
