import { httpRequest } from '@api/common/httpRequest';

import type { ClubMember } from './types';

async function getClubMemberList(params: { clubId: string }): Promise<ClubMember[]> {
    return await httpRequest.get({
        url: `clubs/${params.clubId}/users`,
        headers: { 'X-CLUB-ID': params.clubId },
        isAuthRequire: true,
    });
}

async function deleteClubMember(params: { clubId: string; userId: string }): Promise<void> {
    return await httpRequest.delete({
        url: `clubs/${params.clubId}/users/${params.userId}`,
        headers: { 'X-CLUB-ID': params.clubId },
        isAuthRequire: true,
    });
}

async function postClubIdAndGetInviteUrl(params: { clubId: string }): Promise<string> {
    return await httpRequest.post({
        url: `clubs/${params.clubId}/invites`,
        headers: { 'X-CLUB-ID': params.clubId },
        isAuthRequire: true,
    });
}

async function postInviteCode(params: { clubId: string; inviteCode: string }): Promise<void> {
    return await httpRequest.post({
        url: `clubs/${params.clubId}/invites/${params.inviteCode}`,
        isAuthRequire: true,
    });
}

export { getClubMemberList, deleteClubMember, postClubIdAndGetInviteUrl, postInviteCode };
