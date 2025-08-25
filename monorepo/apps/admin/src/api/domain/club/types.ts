interface RepresentativeImage {
    id: string;
    url: string;
    originalFileName: string;
    contentType: string;
}

interface ClubDetailImages {
    id: string;
    url: string;
    originalFileName: string;
    contentType: string;
}

export interface MyClubResponse {
    id: string;
    name: string;
    shortDescription: string;
    detailDescription: string;
    representativeImage: RepresentativeImage;
    category: category;
    clubTags: clubTag[];
    clubSummaries: clubSummaries[];
    clubDetailImages: ClubDetailImages[];
}

export interface DetailClubResponse {
    id: string;
    name: string;
    shortDescription: string;
    detailDescription: string;
    representativeImage: RepresentativeImage;
    category: category;
    clubTags?: clubTag[];
    clubSummaries?: clubSummaries[];
    clubDetailImages?: clubDetailImages[];
}

export type category =
    | 'PERFORMANCE_ARTS'
    | 'CULTURE'
    | 'SPORTS'
    | 'ACADEMIC'
    | 'VOLUNTEER'
    | 'RELIGION';

type clubTag = {
    id: string;
    name: string;
};

type clubSummaries = {
    id: string;
    title: string;
    content: string;
};

export type clubDetailImages = {
    id: string;
    url: string;
    originalFileName: string;
    contentType: string;
};

type announcementStatus = 'RECRUITING' | 'UPCOMING' | 'CLOSED' | 'EMPTY';

export interface AllClub {
    id: string;
    name: string;
    shortDescription: string;
    imageUrl: string;
    thumbnailUrl: string;
    category: string;
    announcementStatus?: announcementStatus;
    clubTags: ClubTag[];
}
interface summaries {
    id: string;
    title: string;
    content: string;
}

interface ClubTag {
    id: string;
    name: string;
}
export interface Club {
    name: string;
    shortDescription: string;
    detailDescription: string;
    representativeImage: RepresentativeImage;
    category: string;
    clubTags: ClubTag[];
    clubSummaries: summaries[];
    clubDetailImages: RepresentativeImage[];
}

export interface ClubByInviteCode {
    id: string;
    name: string;
    shortDescription: string;
    representativeImage: RepresentativeImage;
    category: string;
    clubTags: ClubTag[];
    announcementStatus: announcementStatus;
}

export interface UpdateClub {
    name: string;
    shortDescription: string;
    detailDescription: string;
    representativeImage: string | null;
    category: string;
    clubTags: ClubTag[];
    clubSummaries: summaries[];
    clubDetailImages: string[] | null;
}
export interface CreateClub {
    name: string;
    category: string;
    representativeImage: string | null;
}
export interface CreateClubResponse {
    clubId: string;
}
