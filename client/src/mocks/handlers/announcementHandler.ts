import { http, HttpResponse } from 'msw';
import { BASE_URL } from '@constants/api';
import announcementAllList from '../data/announcement/announcementAllList.json';
import announcementDetail from '../data/announcement/announcementDetail.json';

const announcementHandler = [
    http.get(`${BASE_URL}clubs/:clubId/announcements`, () => {
        return HttpResponse.json(announcementAllList, { status: 200 });
    }),

    http.get(`${BASE_URL}announcements/:announcementId`, () => {
        // 배열의 첫 번째 요소를 반환 (실제로는 ID에 따라 필터링해야 함)
        return HttpResponse.json(announcementDetail[0], { status: 200 });
    }),

    http.get(`${BASE_URL}application-form`, () => {
        return HttpResponse.json(
            {
                applicationQuestions: [
                    {
                        id: 'e23e4567-e89b-12d3-a456-426614174000',
                        type: 'LONG_ANSWER',
                        label: '자신의 개발 경험을 적어주세요.',
                        isRequired: false,
                        options: ['보기1', '보기2'],
                    },
                ],
                preQuestions: [
                    {
                        id: 'e23e4567-e89b-12d3-a456-426614174001',
                        type: 'LONG_ANSWER',
                        label: '지원 동기를 적어주세요.',
                        isRequired: false,
                        options: ['보기1', '보기2'],
                    },
                ],
                personalInfoQuestions: ['NAME', 'EMAIL'],
            },
            { status: 200 },
        );
    }),
];

export { announcementHandler };
