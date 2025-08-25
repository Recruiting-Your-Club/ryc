export interface MyClubResponse {
    id: string;
    name: string;
    shortDescription: string;
    imageUrl: string;
    thumbnailUrl: string;
}

export interface DetailClubResponse {
    id: string;
    name: string;
    shortDescription: string;
    detailDescription: string;
    representativeImage: {
        id: string;
        url: string;
        originalFileName: string;
        contentType: string;
    };
    category: category;
    clubTags: clubTag[];
    clubSummaries: clubSummaries[];
    clubDetailImages: clubDetailImages[];
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

type clubDetailImages = {
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
    name: string;
}
export interface Club {
    name: string;
    detailDescription: string;
    imageUrl: string;
    category: string;
    clubSummaries: summaries[];
    clubDetailImages: string[];
}

export interface ClubByInviteCode {
    id: string;
    name: string;
    shortDescription: string;
    representativeImage: clubDetailImages;
    category: string;
    clubTags: ClubTag[];
    announcementStatus: announcementStatus;
}
