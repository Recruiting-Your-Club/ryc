type FormState = {
    isOpenForm: boolean;
    comment: string;
    score: number;
    commentIdForEdit: string | null;
};

export interface PersonalScoreCardProps {
    image?: string;
    name: string;
    score: number;
    comment: string;
    commentId: string;
    isUser?: boolean;
    isEditable?: boolean;
    handleDelete: () => void;
    onHandleForm: (nextState: Partial<FormState>) => void;
}
