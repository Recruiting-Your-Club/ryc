import type { EvaluationDataWithSummary } from '@api/domain/evaluation/types';
export interface EvaluationBoxProps {
    selectedApplicantId: string | null;
    evaluation: EvaluationDataWithSummary;
    onPostComment: (args: {
        clubId: string;
        applicantId: string;
        score: number;
        comment: string;
    }) => void;
    onDeleteComment: (args: { evaluationId: string; clubId: string }) => void;
    onUpdateComment: (args: {
        evaluationId: string;
        score: number;
        comment: string;
        clubId: string;
    }) => void;
    height?: string;
}

export const MOCK_USER_ID = 'user-42'; // 해당 ID는 임시 아이디입니다. 실제 token 사용 시 삭제 예정
