export interface Evaluation {
    applicantId: number;
    averageScore: number;
    comments: { id: number; score: number; name: string; comment: string }[];
}

export interface EvaluationBoxProps {
    evaluation: Evaluation | null;
    height?: string;
}

export const MOCK_USER_ID = 'user-42'; // 해당 ID는 임시 아이디입니다. 실제 token 사용 시 삭제 예정
