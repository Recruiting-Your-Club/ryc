import type { evaluation } from '@constants/ApplicantDialog';

export type EvaluationType = (typeof evaluation)[number];

export interface Evaluator {
    id: number;
    name: string;
    score: number;
    comment: string;
}

export interface Evaluation {
    type: EvaluationType;
    averageScore: number;
    evaluators: Evaluator[];
}

export interface ApplicantDialogProps {
    open: boolean;
    handleClose: () => void;
    name?: string;
    email?: string;
}
