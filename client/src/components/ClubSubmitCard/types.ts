export interface ClubSubmitCardProps {
    clubName: string;
    tag: string;
    deadline: string;
    completedQuestions: number;
    totalQuestions: number;
    deadlineColor?: string;
    onSubmit?: () => void;
}
