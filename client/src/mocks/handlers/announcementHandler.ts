import { http, HttpResponse } from 'msw';
import { BASE_URL } from '@constants/api';
import announcementAllList from '../data/announcement/announcementAllList.json';
import announcementDetail from '../data/announcement/announcementDetail.json';
import announcementApplicationForm from '../data/announcement/announcementApplicationForm.json';

const announcementHandler = [
    http.get(`${BASE_URL}clubs/:clubId/announcements`, () => {
        return HttpResponse.json(announcementAllList, { status: 200 });
    }),

    http.get(`${BASE_URL}announcements/:announcementId`, () => {
        return HttpResponse.json(announcementDetail, { status: 200 });
    }),

    http.get(`${BASE_URL}announcements/:announcementId/application-form`, () => {
        return HttpResponse.json(announcementApplicationForm, { status: 200 });
    }),
];

export { announcementHandler };
