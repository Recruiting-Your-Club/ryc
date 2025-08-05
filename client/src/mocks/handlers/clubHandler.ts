import { http, HttpResponse } from 'msw';
import allClubList from '../data/club/clubAllList.json';
import clubDetail from '../data/club/clubDetail.json';
import myClubList from '../data/club/myClubList.json';
import type { AllClub, Club, MyClub } from '@api/domain/club/types';
import { BASE_URL } from '@constants/api';

const clubHandler = [
    http.get(`${BASE_URL}clubs/all`, () => {
        return HttpResponse.json(allClubList as AllClub[], { status: 200 });
    }),
    http.get(`${BASE_URL}clubs/my`, () => {
        return HttpResponse.json(myClubList as MyClub[], { status: 200});
    }),
    http.get(`${BASE_URL}clubs/:id`, () => {
        return HttpResponse.json(clubDetail as Club, { status: 200 });
    })
];

export { clubHandler };
