export interface MainCardProps {
    title?: string;
    category?: string;
    description?: string;
    status: 'progress' | 'primary' | 'end';
    hashTag?: string[];
}
