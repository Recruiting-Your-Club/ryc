import { ApplicantDetail, Document } from '@api/domain/applicant/types';

export interface InformationBoxProps {
    applicant: ApplicantDetail | null;
    documentList: Document | null;
    height?: string;
}
