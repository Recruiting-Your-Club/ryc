import { httpRequest } from '@api/common/httpRequest';
import type {
    Applicant,
    ApplicantDetail,
    ApplicantDocument,
    Document,
    DocumentAll,
    Evaluation,
} from './types';

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

async function getDocument(id: string): Promise<Document> {
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

async function postDocumentDetail(params: {
    clubId: string;
    applicantIdList: string[];
}): Promise<DocumentAll> {
    return await httpRequest.post({
        url: `document/search`,
        body: params,
        headers: {
            Authorization: 'Bearer mock-user-token-user-42', // 임시
        },
    });
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

async function getApplicantDocument(params: {
    announcementId: string;
    applicantId: string;
    clubId: string;
}): Promise<ApplicantDocument> {
    const { announcementId, applicantId, clubId } = params;
    return await httpRequest.get({
        url: `announcements/${announcementId}/applicants/${applicantId}`,
        headers: {
            'X-CLUB-ID': clubId,
        },
    });
}

export {
    getAllApplicants,
    getApplicantDetail,
    getDocument,
    getDocumentEvaluation,
    postDocumentDetail,
    postDocumentEvaluation,
    deleteDocumentEvaluation,
    updateDocumentEvaluation,
    getApplicantDocument,
};
