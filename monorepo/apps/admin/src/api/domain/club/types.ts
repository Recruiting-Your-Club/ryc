export interface MyClubResponse {
    id: string;
    name: string;
    shortDescription: string;
    imageUrl: string;
    thumbnailUrl: string;
}
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
    value: string;
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
