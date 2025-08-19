export type AdminProfileImage = {
    id: string;
    url: string;
    orginalFileName: string;
    contentType: string;
};

export interface ClubMember {
    adminId: string;
    adminName: string;
    role: string;
    joinedAt: string;
    adminProfileImage: AdminProfileImage;
}
