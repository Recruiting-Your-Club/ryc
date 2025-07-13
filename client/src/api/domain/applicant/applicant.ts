import { httpRequest } from '@api/common/httpRequest';
import { Applicant, ApplicantDetail, Document, Evaluation } from './types';

async function getAllApplicants(): Promise<Applicant[]> {
    const response = await httpRequest.get({
        url: 'applicants/all',
    });
    return response as Applicant[];
}

async function getApplicantDetail(id: number): Promise<ApplicantDetail> {
    const response = await httpRequest.get({
        url: `applicants/${id}`,
    });
    return response as ApplicantDetail;
}

async function getDocument(id: number): Promise<Document> {
    const response = await httpRequest.get({
        url: `documents/${id}`,
    });
    return response as Document;
}

async function getDocumentEvaluation(id: number): Promise<Evaluation> {
    const response = await httpRequest.get({
        url: `doc-evaluation/${id}`,
    });
    return response as Evaluation;
}

export { getAllApplicants, getApplicantDetail, getDocument, getDocumentEvaluation };
