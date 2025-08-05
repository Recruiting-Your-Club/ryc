import { httpRequest } from '@api/common/httpRequest';
import type { EvaluationSummary } from './types';

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

export { postApplicationEvaluationSummary, postInterviewEvaluationSummary };
