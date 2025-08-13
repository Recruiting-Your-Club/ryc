import { httpRequest } from '../../common/httpRequest';
import type { DetailClubResponse, MyClubResponse } from './types';

async function getMyClub(): Promise<MyClubResponse[]> {
    const response = await httpRequest.get({
        url: 'clubs/my',
        isAuthRequire: true,
    });
    return response as MyClubResponse[];
}

async function getDetailClub(clubId: string): Promise<DetailClubResponse> {
    const response = await httpRequest.get({
        url: `clubs/${clubId}`,
    });
    return response as DetailClubResponse;
}

export { getMyClub, getDetailClub };
