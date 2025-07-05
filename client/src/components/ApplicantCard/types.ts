export interface ApplicantCardProps {
    name: string;
    email: string;
    date: string;
    score: string;
    status: string;
    checked: boolean;
    onChange: (email: string, checked: boolean) => void;
    onClick: () => void;
}
