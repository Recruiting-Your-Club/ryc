export type AdminProfileImage = {
    id: string;
    url: string;
    originalFileName: string;
    contentType: string;
};

export interface ClubMember {
    adminId: string;
    adminName: string;
    role: string;
    joinedAt: string;
    adminProfileImage: AdminProfileImage;
}

export interface InvitesResponse {
    inviteCode: string;
    expireAt: string;
}

export interface EnrollmentClubResponse {
    clubRoleId: string;
    role: string;
    joinedAt: string;
}

export interface ClubInfoResponse {
    id: string;
    name: string;
    representativeImage: AdminProfileImage;
    shortDescription: string;
    category: string;
    clubTags: ClubTag[];
    announcementStatus: string;
}

export interface ClubTag {
    id: string;
    name: string;
}
