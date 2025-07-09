import type { Document } from '@api/domain/interview/types';

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
