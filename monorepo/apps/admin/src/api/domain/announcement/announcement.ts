import { httpRequest } from '@api/common/httpRequest';

import type {
    Announcement,
    AnnouncementList,
    AnnouncementSubmitRequest,
    DetailAnnouncement,
    PostAnnouncementResponse,
} from './types';

async function getAllAnnouncements(clubId: string): Promise<Announcement[]> {
    const response = await httpRequest.get({
        url: `clubs/${clubId}/announcements`,
        isAuthRequire: true,
    });
    return response as Announcement[];
}

async function getDetailAnnouncement(announcementId: string): Promise<DetailAnnouncement> {
    const response = await httpRequest.get({
        url: `announcements/${announcementId}`,
        isAuthRequire: true,
    });
    return response as DetailAnnouncement;
}

async function getAnnouncementsByClub(clubId: string): Promise<AnnouncementList[]> {
    const response = await httpRequest.get({
        url: `clubs/${clubId}/announcements`,
    });
    return response as AnnouncementList[];
}

async function postAnnouncement(
    clubId: string,
    payload: AnnouncementSubmitRequest,
): Promise<PostAnnouncementResponse> {
    const response = await httpRequest.post({
        url: `clubs/${clubId}/announcements`,
        isAuthRequire: true,
        headers: {
            'X-CLUB-ID': clubId,
        },
        body: payload,
    });
    return response as PostAnnouncementResponse;
}

async function putAnnouncement(
    clubId: string,
    announcementId: string,
    payload: AnnouncementSubmitRequest,
): Promise<void> {
    await httpRequest.put({
        url: `clubs/${clubId}/announcements/${announcementId}`,
        isAuthRequire: true,
        headers: {
            'X-CLUB-ID': clubId,
        },
        body: payload,
    });
}

export {
    getAnnouncementsByClub,
    getDetailAnnouncement,
    getAllAnnouncements,
    postAnnouncement,
    putAnnouncement,
};
