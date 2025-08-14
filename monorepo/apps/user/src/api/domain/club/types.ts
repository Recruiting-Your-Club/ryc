type summaries = {
    title: string;
    value: string;
};
type images = {
    imageUrl: string;
    thumbnailUrl: string;
};
interface ClubTag {
    name: string;
}
export interface AllClub {
    id: string;
    name: string;
    shortDescription: string;
    representativeImage: string;
    thumbnailUrl: string;
    category: string;
    announcementStatus?: string;
    clubTags: ClubTag[];
}
export interface Club {
    name: string;
    detailDescription: string;
    representativeImage: string;
    thumbnailUrl: string;
    category: string;
    clubTags: ClubTag[];
    clubSummaries: summaries[];
    clubDetailImages: images[];
}
