import type { AllClub, Club } from '@api/domain/club/types';
import { BASE_URL } from '@constants/api';
import { http, HttpResponse } from 'msw';

import allClubList from '../data/club/clubAllList.json';
import clubDetail from '../data/club/clubDetail.json';
import myClubList from '../data/club/myClubList.json';

const clubHandler = [
    http.get(`${BASE_URL}clubs/all`, () => {
        return HttpResponse.json(allClubList as AllClub[], { status: 200 });
    }),
    http.get(`${BASE_URL}clubs/:id`, ({ params }) => {
        const { id } = params;
        if (id === '7571e92b-f38b-4878-959c-f76ab9290ed0') {
            return HttpResponse.json(clubDetail, { status: 200 });
        }
        return HttpResponse.json({ error: 'Club not found' }, { status: 404 });
    }),
    http.get(`${BASE_URL}clubs/my`, () => {
        return HttpResponse.json(myClubList as AllClub[], { status: 200 });
    }),
];

export { clubHandler };
