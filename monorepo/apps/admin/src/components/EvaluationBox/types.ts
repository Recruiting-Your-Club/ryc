export interface Evaluation {
    applicantId: number;
    averageScore: number;
    comments: { id: number; score: number; name: string; comment: string }[];
}

export interface EvaluationBoxProps {
    evaluation: Evaluation | null;
    height?: string;
}
