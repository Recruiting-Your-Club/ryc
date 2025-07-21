import { ApplicantDetail, Document } from '@api/domain/applicant/types';

export interface InformationBoxProps {
    applicant: ApplicantDetail;
    document: Document;
    height?: string;
}
