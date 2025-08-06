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
            Authorization: 'Bearer mock-user-token-user-42', // 임시
        },
    });
}

export {
    postApplicationEvaluationSummary,
    postInterviewEvaluationSummary,
    postDetailApplicationEvaluation,
    postDetailInterviewEvaluation,
};
