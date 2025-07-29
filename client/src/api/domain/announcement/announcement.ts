import { httpRequest } from '@api/common/httpRequest';
import { ApplicationForm, Announcement, AnnouncementSummary } from './types';

async function getApplicationForm(): Promise<ApplicationForm> {
    const response = await httpRequest.get({
        url: 'application-form',
    });
    return response as ApplicationForm;
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

export { getApplicationForm, getAnnouncementList, getAnnouncementDetail };
