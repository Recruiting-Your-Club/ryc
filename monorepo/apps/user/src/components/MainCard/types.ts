interface ClubTag {
    name: string;
}

export interface MainCardProps {
    title?: string;
    category?: string;
    description?: string;
    status?: string;
    clubTags?: ClubTag[];
    link?: string;
    imageURL?: string;
}
