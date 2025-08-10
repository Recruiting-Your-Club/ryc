import { httpRequest } from '@api/common/httpRequest';

import type { Announcement, DetailAnnouncement } from './type';

export async function getAllAnnouncements(clubId: string): Promise<Announcement[]> {
    const response = await httpRequest.get({
        url: `clubs/${clubId}/announcements`,
        isAuthRequire: true,
    });
    return response as Announcement[];
}

export async function getDetailAnnouncement(announcementId: string): Promise<DetailAnnouncement> {
    const response = await httpRequest.get({
        url: `announcements/${announcementId}`,
        isAuthRequire: true,
    });
    return response as DetailAnnouncement;
}
