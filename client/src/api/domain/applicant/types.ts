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
    comments: { id: number; name: string; score: number; comment: string }[];
}
