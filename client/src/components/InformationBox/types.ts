export interface ApplicantDetail {
    id: number;
    name: string;
    email: string;
    studentId: string;
    phone: string;
}
export interface InformationBoxProps {
    applicant: ApplicantDetail | null;
    documentList: Document | null;
    height?: string;
}

export interface Document {
    id: number;
    detail: { question: string; answer: string }[];
}
