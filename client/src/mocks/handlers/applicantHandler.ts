import { Applicant, ApplicantDetail, Document } from '@api/domain/applicant/types';
import { MOCK_USER_ID } from '@components/EvaluationBox/types';
import { BASE_URL } from '@constants/api';
import { http, HttpResponse } from 'msw';
import docApplicantDetailList from '../data/applicant/docApplicantDetailList.json';
import docApplicantList from '../data/applicant/docApplicantList.json';
import docEvaluationList from '../data/applicant/docEvaluationList.json';
import documentList from '../data/applicant/documentList.json';

const userId = MOCK_USER_ID; // 임시

const applicantHandler = [
    http.get(`${BASE_URL}applicants/all`, () => {
        return HttpResponse.json(docApplicantList as Applicant[], { status: 200 });
    }),
    http.get(`${BASE_URL}applicants/:id`, ({ params }) => {
        const detail = docApplicantDetailList.find(
            (applicant) => applicant.id === Number(params.id),
        );
        return HttpResponse.json(detail as ApplicantDetail, { status: 200 });
    }),
    http.get(`${BASE_URL}documents/:id`, ({ params }) => {
        const detail = documentList.find((document) => document.applicantId === Number(params.id));
        return HttpResponse.json(detail as Document, { status: 200 });
    }),
    http.get(`${BASE_URL}doc-evaluation/:id`, ({ params }) => {
        const evaluation = docEvaluationList.find(
            (evaluation) => evaluation.applicantId === Number(params.id),
        );
        if (!evaluation) return HttpResponse.json({ status: 404 });

        return HttpResponse.json(evaluation, { status: 200 });
    }),
    http.post(`${BASE_URL}doc-evaluation/:applicantId/comment`, async ({ request, params }) => {
        const evaluation = docEvaluationList.find(
            (evaluation) => evaluation.applicantId === Number(params.applicantId),
        );
        if (!evaluation) return HttpResponse.json({ status: 404 });

        const body = (await request.json()) as { score: number; comment: string };
        const existingIds = evaluation.comments.map((comment) => comment.id);
        const newCommentId = existingIds.length === 0 ? 1 : Math.max(...existingIds) + 1;

        const newEvaluation = {
            id: newCommentId,
            writerId: userId,
            name: `인물${userId.replace('user-', '')}`,
            score: body.score,
            comment: body.comment,
        };

        evaluation.comments.push(newEvaluation);

        return HttpResponse.json(newEvaluation, { status: 201 });
    }),
    http.delete(`${BASE_URL}doc-evaluation/:applicantId/comment/:commentId`, ({ params }) => {
        const evaluation = docEvaluationList.find(
            (evaluation) => evaluation.applicantId === Number(params.applicantId),
        );
        if (!evaluation) return HttpResponse.json({ status: 404 });

        const commentIndex = evaluation.comments.findIndex(
            (comment) => comment.id === Number(params.commentId),
        );
        evaluation.comments.splice(commentIndex, 1);

        return HttpResponse.json({ status: 200 });
    }),
    http.put(
        `${BASE_URL}doc-evaluation/:applicantId/comment/:commentId`,
        async ({ request, params }) => {
            const evaluation = docEvaluationList.find(
                (evaluation) => evaluation.applicantId === Number(params.applicantId),
            );
            if (!evaluation) return HttpResponse.json({ status: 404 });

            const targetComment = evaluation.comments.find(
                (comment) => comment.id === Number(params.commentId),
            );
            if (!targetComment) return HttpResponse.json({ status: 404 });

            const body = (await request.json()) as { score: number; comment: string };

            targetComment.score = body.score;
            targetComment.comment = body.comment;

            return HttpResponse.json(targetComment, { status: 200 });
        },
    ),
];

export { applicantHandler };
