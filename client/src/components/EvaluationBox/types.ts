import { Evaluation, EvaluationWithIsMine } from '@api/domain/applicant/types';
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

export const MOCK_USER_ID = 'user-42'; // 해당 ID는 임시 아이디입니다. 실제 token 사용 시 삭제 예정
