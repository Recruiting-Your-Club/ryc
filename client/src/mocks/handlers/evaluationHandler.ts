import type {
    EvaluationDetail,
    EvaluationSummary,
    MyEvaluationStatus,
} from '@api/domain/evaluation/types';
import { BASE_URL } from '@constants/api';
import { http, HttpResponse } from 'msw';

import applicationEvaluationDetail from '../data/evaluation/applicationEvaluationDetail.json';
import applicationEvaluationSummary from '../data/evaluation/applicationEvaluationSummary.json';
import interviewEvaluationDetail from '../data/evaluation/interviewEvaluationDetail.json';
import interviewEvaluationSummary from '../data/evaluation/interviewEvaluationSummary.json';
import myApplicationEvaluationStatus from '../data/evaluation/myApplicationEvaluationStatus.json';

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

    http.post(`${BASE_URL}evaluation/applications/search`, async ({ request }) => {
        const { applicantIdList } = (await request.json()) as {
            applicantIdList: string[];
        };

        const filtered = applicationEvaluationDetail.evaluationsOfApplicants.filter((evaluation) =>
            applicantIdList.includes(evaluation.applicantId),
        );

        return HttpResponse.json({ evaluationsOfApplicants: filtered }, { status: 200 });
    }),

    http.post(`${BASE_URL}evaluation/interviews/search`, async ({ request }) => {
        const { applicantIdList } = (await request.json()) as {
            applicantIdList: string[];
        };

        const filtered = interviewEvaluationDetail.evaluationsOfApplicants.filter((evaluation) =>
            applicantIdList.includes(evaluation.applicantId),
        );

        return HttpResponse.json({ evaluationsOfApplicants: filtered }, { status: 200 });
    }),

    http.put(`${BASE_URL}evaluation/:evaluationId`, async ({ request, params }) => {
        const { evaluationId } = params as {
            evaluationId: string;
        };
        const { score, comment } = (await request.json()) as { score: number; comment: string };

        const sources = [applicationEvaluationDetail, interviewEvaluationDetail];

        let foundDetail: typeof applicationEvaluationDetail | null = null;
        let applicantEvaluation:
            | (typeof applicationEvaluationDetail.evaluationsOfApplicants)[number]
            | undefined;

        for (const source of sources) {
            applicantEvaluation = source.evaluationsOfApplicants.find((applicant) =>
                applicant.evaluationDetails.some(
                    (evaluation) => evaluation.evaluationId === evaluationId,
                ),
            );
            if (applicantEvaluation) {
                foundDetail = source;
                break;
            }
        }

        if (!foundDetail || !applicantEvaluation) {
            return HttpResponse.json({ message: '자원을 찾을 수 없습니다.' }, { status: 404 });
        }

        const targetEvaluation = applicantEvaluation.evaluationDetails.find(
            (evaluation) => evaluation.evaluationId === evaluationId,
        );

        if (targetEvaluation) {
            targetEvaluation.score = score;
            targetEvaluation.comment = comment;
        }

        return HttpResponse.json(foundDetail, { status: 200 });
    }),

    http.delete(`${BASE_URL}evaluation/:evaluationId`, async ({ params }) => {
        const { evaluationId } = params as {
            evaluationId: string;
        };

        const sources = [applicationEvaluationDetail, interviewEvaluationDetail];

        let foundDetail: typeof applicationEvaluationDetail | null = null;
        let applicantEvaluation:
            | (typeof applicationEvaluationDetail.evaluationsOfApplicants)[number]
            | undefined;

        for (const source of sources) {
            applicantEvaluation = source.evaluationsOfApplicants.find((applicant) =>
                applicant.evaluationDetails.some(
                    (evaluation) => evaluation.evaluationId === evaluationId,
                ),
            );
            if (applicantEvaluation) {
                foundDetail = source;
                break;
            }
        }

        if (!foundDetail || !applicantEvaluation) {
            return HttpResponse.json({ status: 404 });
        }

        applicantEvaluation.evaluationDetails = applicantEvaluation.evaluationDetails.filter(
            (evaluation) => evaluation.evaluationId !== evaluationId,
        );

        return HttpResponse.json(foundDetail, { status: 200 });
    }),

    http.post(`${BASE_URL}evaluation/:type`, async ({ request, params }) => {
        const { type } = params as { type: 'application' | 'interview' };
        const { applicantId, score, comment } = (await request.json()) as {
            applicantId: string;
            score: number;
            comment: string;
        };

        const evaluationDetail =
            type === 'application' ? applicationEvaluationDetail : interviewEvaluationDetail;

        const applicantEvaluation = evaluationDetail.evaluationsOfApplicants.find(
            (item) => item.applicantId === applicantId,
        );

        if (!applicantEvaluation) {
            return HttpResponse.json({ status: 404 });
        }

        const newEvaluation = {
            evaluationId: `eval-${Date.now()}`,
            evaluatorId: 'mock-evaluator',
            evaluatorName: '정지훈',
            evaluatorThumbnailUrl: '',
            isEvaluatorImagePresent: false,
            score,
            comment,
            evaluationType: type === 'application' ? 'APPLICATION' : 'INTERVIEW',
            isMyEvaluation: true,
        };

        applicantEvaluation.evaluationDetails.push(newEvaluation);

        return HttpResponse.json(evaluationDetail, { status: 201 });
    }),

    http.post(`${BASE_URL}evaluation/:type/my-status`, async ({ request }) => {
        const { applicantIdList } = (await request.json()) as { applicantIdList: string[] };

        const filtered: MyEvaluationStatus = {
            applicantEvaluationStatuses:
                myApplicationEvaluationStatus.applicantEvaluationStatuses.filter((status) =>
                    applicantIdList.includes(status.applicantId),
                ),
        };

        return HttpResponse.json(filtered, { status: 200 });
    }),
];

export { evaluationHandler };