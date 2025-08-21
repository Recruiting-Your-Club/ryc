import { httpRequest } from '@api/common/httpRequest';

import type { Evaluation, EvaluationSummary, EvaluationType, MyEvaluationStatus } from './types';

async function postApplicationEvaluationSummary(params: {
    clubId: string;
    applicantIdList: string[];
}): Promise<EvaluationSummary> {
    return await httpRequest.post({
        url: `evaluation/applications/summary`,
        body: { clubId: params.clubId, applicantIdList: params.applicantIdList },
        headers: {
            'X-CLUB-ID': params.clubId,
        },
        isAuthRequire: true,
    });
}

async function postInterviewEvaluationSummary(params: {
    clubId: string;
    applicantIdList: string[];
}): Promise<EvaluationSummary> {
    return await httpRequest.post({
        url: `evaluation/interviews/summary`,
        body: { clubId: params.clubId, applicantIdList: params.applicantIdList },
        headers: {
            'X-CLUB-ID': params.clubId,
        },
        isAuthRequire: true,
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
        },
        isAuthRequire: true,
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
        },
        isAuthRequire: true,
    });
}

async function postPersonalEvaluation(params: {
    clubId: string;
    applicantId: string;
    score: number;
    comment: string;
    type: EvaluationType;
}): Promise<void> {
    await httpRequest.post({
        url: `evaluation/${params.type}`,
        body: { applicantId: params.applicantId, score: params.score, comment: params.comment },
        headers: { 'X-CLUB-ID': params.clubId },
        isAuthRequire: true,
    });
}

async function putEvaluationScoreAndComment(params: {
    evaluationId: string;
    score: number;
    comment: string;
    clubId: string;
    type?: EvaluationType;
}): Promise<void> {
    await httpRequest.put({
        url: `evaluation/${params.evaluationId}`,
        body: { score: params.score, comment: params.comment },
        headers: { 'X-CLUB-ID': params.clubId },
        isAuthRequire: true,
    });
}

async function deleteEvaluation(params: {
    evaluationId: string;
    clubId: string;
    type?: 'application' | 'interview';
}): Promise<void> {
    await httpRequest.delete({
        url: `evaluation/${params.evaluationId}`,
        headers: { 'X-CLUB-ID': params.clubId },
        isAuthRequire: true,
    });
}

async function postMyEvaluationStatus(params: {
    applicantIdList: string[];
    clubId: string;
    type: 'application' | 'interview';
}): Promise<MyEvaluationStatus> {
    return await httpRequest.post({
        url: `evaluation/${params.type}s/my-status`,
        body: { applicantIdList: params.applicantIdList },
        headers: { 'X-CLUB-ID': params.clubId },
        isAuthRequire: true,
    });
}

export {
    postApplicationEvaluationSummary,
    postInterviewEvaluationSummary,
    postDetailApplicationEvaluation,
    postDetailInterviewEvaluation,
    postPersonalEvaluation,
    putEvaluationScoreAndComment,
    deleteEvaluation,
    postMyEvaluationStatus,
};
