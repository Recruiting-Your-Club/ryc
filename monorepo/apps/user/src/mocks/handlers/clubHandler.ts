import type { AllClub, Club, ClubInterviewDetails } from '@api/domain/club/types';
import { BASE_URL } from '@constants/api';
import { http, HttpResponse } from 'msw';

import allClubList from '../data/club/clubAllList.json';
import clubDetail from '../data/club/clubDetail.json';
import clubReservation from '../data/club/clubReservation.json';

const clubHandler = [
    http.get(`${BASE_URL}clubs`, () => {
        return HttpResponse.json(allClubList as AllClub[], { status: 200 });
    }),

    http.get(`${BASE_URL}clubs/:id`, ({ params }) => {
        const clubId = params.id;
        const club = clubDetail.find((club) => club.id === clubId);

        return HttpResponse.json(club as Club, { status: 200 });
    }),
    http.get(
        `${BASE_URL}clubs/:clubId/announcements/:announcementId/applicants/:applicantId`,
        () => {
            return HttpResponse.json(clubReservation as ClubInterviewDetails, { status: 200 });
        },
    ),
];

export { clubHandler };
