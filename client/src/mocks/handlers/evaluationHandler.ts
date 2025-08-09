import { http, HttpResponse } from 'msw';
import { BASE_URL } from '@constants/api';
// import applicationEvaluationSummary from '../data/evaluation/applicationEvaluationSummary.json';
// import interviewEvaluationSummary from '../data/evaluation/interviewEvaluationSummary.json';
import applicationEvaluationDetail from '../data/evaluation/applicationEvaluationDetail.json';
// import interviewEvaluationDetail from '../data/evaluation/interviewEvaluationDetail.json';

import type { EvaluationData, EvaluationSummary } from '@api/domain/evaluation/types';

const evaluationHandler = [
    // http.post(`${BASE_URL}evaluation/applications/summary`, async ({ request }) => {
    //     const { applicantIdList } = (await request.json()) as {
    //         applicantIdList: string[];
    //     };

    //     const filtered = (applicationEvaluationSummary as EvaluationSummary[]).filter((summary) =>
    //         applicantIdList.includes(summary.applicantId),
    //     );

    //     return HttpResponse.json(filtered, { status: 200 });
    // }),

    // http.post(`${BASE_URL}evaluation/interviews/summary`, async ({ request }) => {
    //     const { applicantIdList } = (await request.json()) as {
    //         applicantIdList: string[];
    //     };

    //     const filtered = (interviewEvaluationSummary as EvaluationSummary[]).filter((summary) =>
    //         applicantIdList.includes(summary.applicantId),
    //     );

    //     return HttpResponse.json(filtered, { status: 200 });
    // }),

    http.post(`${BASE_URL}evaluation/applications/search`, async ({ request }) => {
        const { applicantIdList } = (await request.json()) as {
            applicantIdList: string[];
        };

        const filteredEntries = Object.entries(
            applicationEvaluationDetail.evaluationsByApplicant,
        ).filter(([applicantId]) => applicantIdList.includes(applicantId));

        const filtered = Object.fromEntries(filteredEntries);

        return HttpResponse.json({ evaluationsByApplicant: filtered }, { status: 200 });
    }),

    // http.post(`${BASE_URL}evaluation/interviews/search`, async ({ request }) => {
    //     const { applicantIdList } = (await request.json()) as {
    //         applicantIdList: string[];
    //     };

    //     const filteredEntries = Object.entries(
    //         interviewEvaluationDetail.evaluationsByApplicant,
    //     ).filter(([applicantId]) => applicantIdList.includes(applicantId));

    //     const filtered = Object.fromEntries(filteredEntries);

    //     return HttpResponse.json({ evaluationsByApplicant: filtered }, { status: 200 });
    // }),

    http.put(`${BASE_URL}evaluation/:evaluationId`, async ({ request, params }) => {
        const { evaluationId } = params as { evaluationId: string };
        const { score, comment } = (await request.json()) as { score: number; comment: string };

        const entries = Object.entries(applicationEvaluationDetail.evaluationsByApplicant);
        let found = false;

        for (const [applicationId, evaluationDataWithSummary] of entries) {
            const targetEvaluation = evaluationDataWithSummary.evaluationDatas.find(
                (e) => e.evaluationId === evaluationId,
            );

            if (targetEvaluation) {
                targetEvaluation.score = score;
                targetEvaluation.comment = comment;
                found = true;
                break;
            }
        }

        if (!found) {
            return HttpResponse.json({ message: '자원을 찾을 수 없습니다.' }, { status: 404 });
        }

        return HttpResponse.json(applicationEvaluationDetail, { status: 200 });
    }),

    http.delete(`${BASE_URL}evaluation/:evaluationId`, async ({ params }) => {
        const { evaluationId } = params as { evaluationId: string };

        const evaluationEntry = Object.entries(
            applicationEvaluationDetail.evaluationsByApplicant,
        ).find(([_, evalautionDataWithSummary]) =>
            evalautionDataWithSummary.evaluationDatas.some(
                (evaluationdata) => evaluationdata.evaluationId === evaluationId,
            ),
        );

        if (!evaluationEntry) {
            return HttpResponse.json({ status: 404 });
        }

        const [applicantId, evaluationDataWithSummary] = evaluationEntry;

        evaluationDataWithSummary.evaluationDatas =
            evaluationDataWithSummary.evaluationDatas.filter(
                (evaluationdata) => evaluationdata.evaluationId !== evaluationId,
            );

        return HttpResponse.json(applicationEvaluationDetail, { status: 200 });
    }),

    http.post(`${BASE_URL}evaluation/application`, async ({ request }) => {
        const { applicantId, score, comment } = (await request.json()) as {
            applicantId: string;
            score: number;
            comment: string;
        };

        const [id, evaluationDataWithSummary] =
            Object.entries(applicationEvaluationDetail.evaluationsByApplicant).find(
                ([id]) => id === applicantId,
            ) || [];

        if (!evaluationDataWithSummary) {
            return HttpResponse.json({ status: 404 });
        }

        const newEvaluation = {
            evaluationId: `eval-${Date.now()}`,
            evaluatorId: 'mock-evaluator',
            evaluatorName: '정지훈',
            score,
            comment,
            evaluationType: 'APPLICATION',
            isMyEvaluation: true,
        };

        (evaluationDataWithSummary.evaluationDatas as EvaluationData[]).push(
            newEvaluation as EvaluationData,
        );

        return HttpResponse.json(applicationEvaluationDetail, { status: 201 });
    }),
];

export { evaluationHandler };
