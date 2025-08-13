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

type category = 'PERFORMANCE_ARTS' | 'CULTURE' | 'SPORTS' | 'ACADEMIC' | 'VOLUNTEER' | 'RELIGION';

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
