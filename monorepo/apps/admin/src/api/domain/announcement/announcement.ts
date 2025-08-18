import { httpRequest } from '@api/common/httpRequest';

import type { Announcement, AnnouncementList, DetailAnnouncement } from './types';

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

export { getAnnouncementsByClub, getDetailAnnouncement, getAllAnnouncements };
