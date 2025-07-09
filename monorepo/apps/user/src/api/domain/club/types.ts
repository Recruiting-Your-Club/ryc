type summaries = {
    title: string;
    value: string;
};
type images = {
    imageUrl: string;
    thumbnailUrl: string;
};
type announcementStatus = 'RECRUITING' | 'UPCOMING' | 'CLOSED' | 'EMPTY';

interface ClubTag {
    name: string;
}
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
export interface Club {
    name: string;
    detailDescription: string;
    imageUrl: string;
    thumbnailUrl: string;
    category: string;
    clubTags: ClubTag[];
    clubSummaries: summaries[];
    clubDetailImages: images[];
}
