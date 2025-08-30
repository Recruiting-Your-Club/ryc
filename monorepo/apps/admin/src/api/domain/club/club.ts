import { httpRequest } from '../../common/httpRequest';
import type {
    Club,
    ClubByInviteCode,
    CreateClub,
    CreateClubResponse,
    DetailClubResponse,
    MyClub,
    UpdateClub,
} from './types';

async function getMyClub(): Promise<MyClub[]> {
    const response = await httpRequest.get({
        url: 'clubs/my',
        isAuthRequire: true,
    });
    return response as MyClub[];
}

async function getDetailClub(clubId: string): Promise<DetailClubResponse> {
    const response = await httpRequest.get({
        url: `clubs/${clubId}`,
    });
    return response as DetailClubResponse;
}

async function getClub(id: string): Promise<Club> {
    const response = await httpRequest.get({
        url: `clubs/${id}`,
    });
    return response as Club;
}
async function updateClub(id: string, club: UpdateClub): Promise<Club> {
    const response = await httpRequest.put({
        url: `clubs/${id}`,
        headers: {
            'X-CLUB-ID': id,
        },
        body: club,
        isAuthRequire: true,
    });
    return response as Club;
}

async function getClubInfoByInviteCode(params: { inviteCode: string }): Promise<ClubByInviteCode> {
    const response = await httpRequest.get({
        url: `clubs/invites/${params.inviteCode}`,
    });

    return response as ClubByInviteCode;
}

async function createClub(club: CreateClub): Promise<CreateClubResponse> {
    const response = await httpRequest.post({
        url: 'clubs',
        body: club,
        isAuthRequire: true,
    });
    return response as CreateClubResponse;
}

export { getMyClub, getClub, updateClub, getDetailClub, createClub, getClubInfoByInviteCode };
