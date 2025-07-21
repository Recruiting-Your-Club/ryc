export interface Applicant {
    id: number;
    name: string;
    email: string;
}

export interface ApplicantDetail extends Applicant {
    studentId: string;
    phone: string;
}

export interface Document {
    applicantId: number;
    detail: { question: string; answer: string }[];
}

export interface Evaluation {
    applicantId: number;
    averageScore: number;
    comments: Comment[];
}
export interface Comment {
    id: number;
    writerId: string;
    name: string;
    score: number;
    comment: string;
}

export interface CommentWithIsUser extends Comment {
    isUser: boolean;
}

export interface EvaluationWithIsMine extends Omit<Evaluation, 'comments'> {
    comments: CommentWithIsUser[];
}
