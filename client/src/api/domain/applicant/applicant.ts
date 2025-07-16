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
        headers: {
            Authorization: 'Bearer mock-user-token-user-42', // 임시
        },
    });

    return response as Evaluation;
}

async function postDocumentEvaluation(
    applicantId: number,
    body: { score: number; comment: string },
): Promise<void> {
    await httpRequest.post({
        url: `doc-evaluation/${applicantId}/comment`,
        headers: {
            Authorization: 'Bearer mock-user-token-user-42', // 임시
        },
        body: body,
    });
}

async function deleteDocumentEvaluation(applicantId: number, commentId: number) {
    await httpRequest.delete({
        url: `doc-evaluation/${applicantId}/comment/${commentId}`,
        headers: {
            Authorization: 'Bearer mock-user-token-user-42', // 임시
        },
    });
}

async function updateDocumentEvaluation(
    applicantId: number,
    commentId: number,
    body: { score: number; comment: string },
): Promise<void> {
    await httpRequest.put({
        url: `doc-evaluation/${applicantId}/comment/${commentId}`,
        headers: {
            Authorization: 'Bearer mock-user-token-user-42', // 임시
        },
        body: body,
    });
}

export {
    getAllApplicants,
    getApplicantDetail,
    getDocument,
    getDocumentEvaluation,
    postDocumentEvaluation,
    deleteDocumentEvaluation,
    updateDocumentEvaluation,
};
