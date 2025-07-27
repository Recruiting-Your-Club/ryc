import { http, HttpResponse } from 'msw';
import { BASE_URL } from '@constants/api';
import type { Announcement } from '@api/domain/announcement/types';

// Mock 데이터
const mockAnnouncements: Announcement[] = [
    {
        announcementId: '123e4567-e89b-12d3-a456-426614174000',
        title: '2025년도 상반기 신입 모집',
        summaryDescription: '코딩 동아리에서 신입 개발자를 모집합니다.',
        target: '컴퓨터공학과 학생',
        announcementStatus: 'RECRUITING',
        announcementType: 'LIMITED_TIME',
        applicationStartDate: '2025-06-01T09:00',
        applicationEndDate: '2025-06-30T18:00',
        tags: ['프로그래밍', '웹개발', '백엔드'],
    },
    {
        announcementId: '456e7890-e89b-12d3-a456-426614174001',
        title: '프론트엔드 개발자 모집',
        summaryDescription: 'React, Vue 등 프론트엔드 기술을 공부할 개발자를 모집합니다.',
        target: '웹개발에 관심 있는 학생',
        announcementStatus: 'RECRUITING',
        announcementType: 'LIMITED_TIME',
        applicationStartDate: '2025-05-01T09:00',
        applicationEndDate: '2025-05-31T18:00',
        tags: ['프론트엔드', 'React', 'Vue', 'JavaScript'],
    },
];

const announcementHandler = [
    http.get(`${BASE_URL}clubs/:clubId/announcements`, () => {
        return HttpResponse.json(mockAnnouncements, { status: 200 });
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
