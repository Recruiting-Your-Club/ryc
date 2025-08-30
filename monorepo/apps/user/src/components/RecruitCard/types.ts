export interface RecruitCardProps {
    title: string;
    content: string;
    deadline: string;
    hashtags: string[];
    status?: string;
    onClick?: () => void;
}
