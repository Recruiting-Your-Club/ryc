import { http, HttpResponse } from 'msw';
import { BASE_URL } from '@constants/api';
import applicationEvaluationSummary from '../data/evaluation/applicationEvaluationSummary.json';
import interviewEvaluationSummary from '../data/evaluation/interviewEvaluationSummary.json';
import applicationEvaluationDetail from '../data/evaluation/applicationEvaluationDetail.json';
import interviewEvaluationDetail from '../data/evaluation/interviewEvaluationDetail.json';

import type { Evaluation, EvaluationSummary } from '@api/domain/evaluation/types';

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

    http.post(`${BASE_URL}evaluation/applicants/search`, async ({ request }) => {
        const { applicantIdList } = (await request.json()) as {
            applicantIdList: string[];
        };

        const filteredEntries = Object.entries(applicationEvaluationDetail).filter(
            ([applicantId]) => applicantIdList.includes(applicantId),
        );

        const filtered = Object.fromEntries(filteredEntries);

        return HttpResponse.json(filtered, { status: 200 });
    }),

    http.post(`${BASE_URL}evaluation/interviews/search`, async ({ request }) => {
        const { applicantIdList } = (await request.json()) as {
            applicantIdList: string[];
        };

        const filteredEntries = Object.entries(interviewEvaluationDetail).filter(([applicantId]) =>
            applicantIdList.includes(applicantId),
        );

        const filtered = Object.fromEntries(filteredEntries);

        return HttpResponse.json(filtered, { status: 200 });
    }),
];

export { evaluationHandler };
