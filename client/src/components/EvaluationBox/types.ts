import type { EvaluationDataWithSummary } from '@api/domain/evaluation/types';
export interface EvaluationBoxProps {
    evaluation: EvaluationDataWithSummary;
    onPostComment: (args: {
        clubId: string;
        applicantId: string;
        score: number;
        comment: string;
    }) => void;
    onDeleteComment: (args: {
        clubId: string;
        evaluationId: string;
        score: number;
        comment: string;
    }) => void;
    onUpdateComment: (args: {
        clubId: string;
        evaluationId: string;
        score: number;
        comment: string;
    }) => void;
    height?: string;
}

export const MOCK_USER_ID = 'user-42'; // 해당 ID는 임시 아이디입니다. 실제 token 사용 시 삭제 예정
