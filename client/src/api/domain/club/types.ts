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
    imageUrl: string;
    thumbnailUrl: string;
    category: string;
    status?: string;
    clubTags: ClubTag[];
}
export interface Club {
    name: string;
    detailDescription: string;
    imageUrl: string;
    thumbnailUrl: string;
    category: string;
    clubTags: string[];
    clubSummaries: summaries[];
    clubDetailImages: images[];
}
