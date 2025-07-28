import { httpRequest } from '../../common/httpRequest';
import type { MyClubResponse } from './types';

async function getMyClub(): Promise<MyClubResponse[]> {
    const response = await httpRequest.get({
        url: 'clubs/my',
        isAuthRequire: true,
    });
    return response as MyClubResponse[];
}

export { getMyClub };
