import type { AnnouncementList } from '@api/domain/announcement/types';
import { BASE_URL } from '@constants/api';
import { http, HttpResponse } from 'msw';

import announcementByClub from '../data/announcement/announcementByClub.json';

const announcementHandler = [
    http.get(`${BASE_URL}clubs/:clubId/announcements`, () => {
        return HttpResponse.json(announcementByClub as AnnouncementList[], { status: 200 });
    }),
];

export { announcementHandler };
