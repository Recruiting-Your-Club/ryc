export interface Evaluation {
    applicantId: number;
    averageScore: number;
    comments: { evaluator: string; comment: string }[];
}

export interface EvaluationBoxProps {
    evaluation: Evaluation | null;
    height?: string;
}

export const MOCK_USER_ID = 'user-42';
