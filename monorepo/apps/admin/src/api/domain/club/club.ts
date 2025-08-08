import { httpRequest } from '../../common/httpRequest';
import type { Club, MyClubResponse } from './types';

async function getMyClub(): Promise<MyClubResponse[]> {
    const response = await httpRequest.get({
        url: 'clubs/my',
        isAuthRequire: false,
    });
    return response as MyClubResponse[];
}

async function getClub(id: string): Promise<Club> {
    const response = await httpRequest.get({
        url: `clubs/${id}`,
    });
    return response as Club;
}

export { getMyClub, getClub };
