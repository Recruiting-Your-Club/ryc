import { httpRequest } from '@api/common/httpRequest';
import type { Evaluation, EvaluationSummary } from './types';

async function postApplicationEvaluationSummary(params: {
    clubId: string;
    applicantIdList: string[];
}): Promise<EvaluationSummary[]> {
    return await httpRequest.post({
        url: `evaluation/applications/summary`,
        body: params,
        headers: {
            Authorization: 'Bearer mock-user-token-user-42', // 임시
        },
    });
}

async function postInterviewEvaluationSummary(params: {
    clubId: string;
    applicantIdList: string[];
}): Promise<EvaluationSummary[]> {
    return await httpRequest.post({
        url: `evaluation/interviews/summary`,
        body: params,
        headers: {
            Authorization: 'Bearer mock-user-token-user-42', // 임시
        },
    });
}

async function postDetailApplicationEvaluation(params: {
    clubId: string;
    applicantIdList: string[];
}): Promise<Evaluation> {
    return await httpRequest.post({
        url: `evaluation/applications/search`,
        body: params,
        headers: {
            'X-CLUB-ID': params.clubId,
            Authorization: 'Bearer mock-user-token-user-42', // 임시
        },
    });
}

async function postDetailInterviewEvaluation(params: {
    clubId: string;
    applicantIdList: string[];
}): Promise<Evaluation> {
    return await httpRequest.post({
        url: `evaluation/interviews/search`,
        body: params,
        headers: {
            'X-CLUB-ID': params.clubId,
            Authorization: 'Bearer mock-user-token-user-42', // 임시
        },
    });
}

async function postPersonalApplicationEvaluation(params: {
    clubId: string;
    applicantId: string;
    score: number;
    comment: string;
}): Promise<void> {
    await httpRequest.post({
        url: `evaluation/application`,
        body: { applicantId: params.applicantId, score: params.score, comment: params.comment },
        headers: { 'X-CLUB-ID': params.clubId },
    });
}

async function postPersonalInterviewEvaluation(params: {
    clubId: string;
    applicantId: string;
    score: number;
    comment: string;
}): Promise<void> {
    await httpRequest.post({
        url: `evaluation/interview`,
        body: { applicantId: params.applicantId, score: params.score, comment: params.comment },
        headers: { 'X-CLUB-ID': params.clubId },
    });
}

async function putEvaluationScoreAndComment(params: {
    evaluationId: string;
    score: number;
    comment: string;
    clubId: string;
}): Promise<void> {
    await httpRequest.put({
        url: `evaluation/${params.evaluationId}`,
        body: { score: params.score, comment: params.comment },
        headers: { 'X-CLUB-ID': params.clubId },
    });
}

async function deleteEvaluation(params: { evaluationId: string; clubId: string }): Promise<void> {
    await httpRequest.delete({
        url: `evaluation/${params.evaluationId}`,
        headers: { 'X-CLUB-ID': params.clubId },
    });
}

export {
    postApplicationEvaluationSummary,
    postInterviewEvaluationSummary,
    postDetailApplicationEvaluation,
    postDetailInterviewEvaluation,
    postPersonalApplicationEvaluation,
    postPersonalInterviewEvaluation,
    putEvaluationScoreAndComment,
    deleteEvaluation,
};
