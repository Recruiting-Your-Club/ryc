export interface Evaluation {
    applicantId: number;
    averageScore: number;
    comments: { evaluator: string; comment: string }[];
}

export interface EvaluationBoxProps {
    evaluation: Evaluation | null;
    height?: string;
}
