import { Evaluation } from '@api/domain/applicant/types';

export interface EvaluationBoxProps {
    evaluation: Evaluation;
    onPostComment: (args: {
        applicantId: number;
        body: { score: number; comment: string };
    }) => void;
    onDeleteComment: (args: { applicantId: number; commentId: number }) => void;
    onUpdateComment: (args: {
        applicantId: number;
        commentId: number;
        body: { score: number; comment: string };
    }) => void;
    height?: string;
}
