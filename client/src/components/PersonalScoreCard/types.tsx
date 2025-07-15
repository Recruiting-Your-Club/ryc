type FormState = {
    isOpenForm: boolean;
    comment: string;
    score: number;
    commentIdForEdit: number | null;
};

// type OnOpenForm = (nextState: Partial<FormState>) => void;

export interface PersonalScoreCardProps {
    image?: string;
    name: string;
    score: number;
    comment: string;
    commentId: number;
    isMine?: boolean;
    isEditable?: boolean;
    handleDelete: () => void;
    onOpenForm: (nextState: Partial<FormState>) => void;
    // onScore: (value: number) => void;
    // onComment: (value: string) => void;
    // onCommentId: (value: number) => void;
}
