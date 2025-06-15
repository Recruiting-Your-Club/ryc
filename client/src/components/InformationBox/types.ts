export interface ApplicantDetail {
    id: number;
    name: string;
    email: string;
    studentId: string;
    phone: string;
}
export interface InformationBoxProps {
    applicant: ApplicantDetail | null;
    height?: string;
}
