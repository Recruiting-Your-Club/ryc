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
        // 배열의 첫 번째 요소를 반환 (실제로는 ID에 따라 필터링해야 함)
        return HttpResponse.json(announcementDetail[0], { status: 200 });
    }),

    http.get(`${BASE_URL}announcements/:announcementId/application-form`, () => {
        return HttpResponse.json(announcementApplicationForm, { status: 200 });
    }),
];

export { announcementHandler };
