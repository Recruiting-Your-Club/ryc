import { http, HttpResponse } from 'msw';

import { BASE_URL } from '../../constants/api';
import announcementAllList from '../data/announcement/announcementAllList.json';
import announcementApplicationForm from '../data/announcement/announcementApplicationForm.json';
import announcementDetail from '../data/announcement/announcementDetail.json';

const announcementHandler = [
    http.get(`${BASE_URL}clubs/:clubId/announcements`, ({ params }) => {
        const clubId = params.clubId;
        const announcements = announcementAllList.filter(
            (announcement) => announcement.clubId === clubId,
        );

        return HttpResponse.json(announcements, { status: 200 });
    }),

    http.get(`${BASE_URL}announcements/:announcementId`, ({ params }) => {
        const announcementId = params.announcementId;
        const announcement = announcementDetail.find(
            (announcement) => announcement.id === announcementId,
        );

        return HttpResponse.json(announcement, { status: 200 });
    }),

    http.get(`${BASE_URL}announcements/:announcementId/application-form`, ({ params }) => {
        const announcementId = params.announcementId;
        const applicationForm = announcementApplicationForm.find(
            (applicationForm) => applicationForm.id === announcementId,
        );

        return HttpResponse.json(applicationForm, { status: 200 });
    }),
];

export { announcementHandler };
