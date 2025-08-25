export interface Tag {
    id: string;
    name: string;
}
export interface TagInputProps {
    tags: Tag[];
    onTagsChange: (tags: Tag[]) => void;
    placeholder?: string;
    maxTags?: number;
}
