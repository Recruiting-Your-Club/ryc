import { http, HttpResponse } from 'msw';
import { BASE_URL } from '@constants/api';
import applicationEvaluationSummary from '../data/evaluation/applicationEvaluationSummary.json';
import interviewEvaluationSummary from '../data/evaluation/interviewEvaluationSummary.json';

import type { EvaluationSummary } from '@api/domain/evaluation/types';

const evaluationHandler = [
    http.post(`${BASE_URL}evaluation/applications/summary`, async ({ request }) => {
        const { applicantIdList } = (await request.json()) as {
            applicantIdList: string[];
        };

        const filtered = (applicationEvaluationSummary as EvaluationSummary[]).filter((summary) =>
            applicantIdList.includes(summary.applicantId),
        );

        return HttpResponse.json(filtered, { status: 200 });
    }),

    http.post(`${BASE_URL}evaluation/interviews/summary`, async ({ request }) => {
        const { applicantIdList } = (await request.json()) as {
            applicantIdList: string[];
        };

        const filtered = (interviewEvaluationSummary as EvaluationSummary[]).filter((summary) =>
            applicantIdList.includes(summary.applicantId),
        );

        return HttpResponse.json(filtered, { status: 200 });
    }),
];

export { evaluationHandler };
