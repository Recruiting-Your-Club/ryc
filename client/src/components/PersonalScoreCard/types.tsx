import { Dispatch, SetStateAction } from 'react';

export interface PersonalScoreCardProps {
    image?: string;
    name: string;
    score: number;
    comment: string;
    isMine?: boolean;
    isEditable?: boolean;
    handleDelete: () => void;
    onOpenForm: (value: boolean) => void;
    onScore: (value: number) => void;
    onComment: (value: string) => void;
}
