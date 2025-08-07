import { httpRequest } from '../../common/httpRequest';
import type { AnnouncementList } from './types';

async function getAnnouncementsByClub(clubId: string): Promise<AnnouncementList[]> {
    const response = await httpRequest.get({
        url: `clubs/${clubId}/announcements`,
    });
    return response as AnnouncementList[];
}

export { getAnnouncementsByClub };
