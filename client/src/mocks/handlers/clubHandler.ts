import { http, HttpResponse } from 'msw';
import allClubList from '../data/club/clubAllList.json';
import type { AllClub } from '../../api/domain/club/types';
import { BASE_URL } from '@constants/api';
const clubHandler = [
    http.get(`${BASE_URL}clubs/all`, () => {
        return HttpResponse.json(allClubList as AllClub[], { status: 200 });
    }),
];

export { clubHandler };
