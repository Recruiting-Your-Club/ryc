import { httpRequest } from '@api/common/httpRequest';

import type {
    ClubInfoResponse,
    ClubMember,
    EnrollmentClubResponse,
    InvitesResponse,
} from './types';

async function getClubMemberList(params: { clubId: string }): Promise<ClubMember[]> {
    const response = await httpRequest.get({
        url: `clubs/${params.clubId}/users`,
        headers: { 'X-CLUB-ID': params.clubId },
        isAuthRequire: true,
    });

    return response as ClubMember[];
}

async function deleteClubMember(params: { clubId: string; userId: string }): Promise<void> {
    return await httpRequest.delete({
        url: `clubs/${params.clubId}/users/${params.userId}`,
        headers: { 'X-CLUB-ID': params.clubId },
        isAuthRequire: true,
    });
}

async function postClubIdAndGetInviteUrl(params: { clubId: string }): Promise<InvitesResponse> {
    const response = await httpRequest.post({
        url: `clubs/${params.clubId}/invites`,
        headers: { 'X-CLUB-ID': params.clubId },
        isAuthRequire: true,
    });

    return response as InvitesResponse;
}

async function postInviteCode(params: {
    clubId: string;
    inviteCode: string;
}): Promise<EnrollmentClubResponse> {
    const response = await httpRequest.post({
        url: `clubs/${params.clubId}/invites/${params.inviteCode}`,
        isAuthRequire: true,
    });

    return response as EnrollmentClubResponse;
}

async function getClubInfoByInviteCode(params: { inviteCode: string }): Promise<ClubInfoResponse> {
    const response = await httpRequest.get({
        url: `clubs/invites/${params.inviteCode}`,
        isAuthRequire: true,
    });

    return response as ClubInfoResponse;
}

export {
    getClubMemberList,
    deleteClubMember,
    postClubIdAndGetInviteUrl,
    postInviteCode,
    getClubInfoByInviteCode,
};
