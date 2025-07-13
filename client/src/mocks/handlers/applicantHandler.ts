import { Applicant, ApplicantDetail, Document, Evaluation } from '@api/domain/applicant/types';
import { BASE_URL } from '@constants/api';
import { extractUserIdFromToken } from '@utils/EvaluationBox/extractUserIdFromToken';
import { http, HttpResponse } from 'msw';
import docApplicantDetailList from '../data/applicant/docApplicantDetailList.json';
import docApplicantList from '../data/applicant/docApplicantList.json';
import docEvaluationList from '../data/applicant/docEvaluationList.json';
import documentList from '../data/applicant/documentList.json';

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
    http.get(`${BASE_URL}doc-evaluation/:id`, ({ request, params }) => {
        const authHeader = request.headers.get('Authorization');
        const userId = extractUserIdFromToken(authHeader);

        const detail = docEvaluationList.find(
            (evaluation) => evaluation.applicantId === Number(params.id),
        );

        if (!detail) {
            return HttpResponse.json({ message: 'Not found' }, { status: 404 });
        }

        const commentsWithMyIdFlag = detail.comments.map((comment) => ({
            ...comment,
            isMine: userId !== null && comment.writerId === userId,
        }));

        return HttpResponse.json(
            { ...(detail as Evaluation), comments: commentsWithMyIdFlag },
            { status: 200 },
        );
    }),
    http.post(`${BASE_URL}doc-evaluation/:applicantId/comment`, async ({ request, params }) => {
        const authHeader = request.headers.get('Authorization');
        const userId = extractUserIdFromToken(authHeader);

        if (!userId) return HttpResponse.json({ status: 401 });

        const applicantId = Number(params.applicantId);
        const evaluation = docEvaluationList.find(
            (evaluation) => evaluation.applicantId === applicantId,
        );

        if (!evaluation) return HttpResponse.json({ status: 404 });

        const body = (await request.json()) as { score: number; comment: string };
        const newCommentId = Math.max(0, ...evaluation.comments.map((comment) => comment.id)) + 1;

        const newEvaluation = {
            id: newCommentId,
            writerId: userId,
            name: `인물${userId}`,
            score: body.score,
            comment: body.comment,
            isMine: true,
        };

        evaluation.comments.push(newEvaluation);

        return HttpResponse.json(newEvaluation, { status: 201 });
    }),
    http.delete(
        `${BASE_URL}doc-evaluation/:applicantId/comment/:commentId`,
        ({ request, params }) => {
            const authHeader = request.headers.get('Authorization');
            const userId = extractUserIdFromToken(authHeader);

            const applicantId = Number(params.applicantId);
            const commentId = Number(params.commentId);

            const evaluation = docEvaluationList.find(
                (evaluation) => evaluation.applicantId === applicantId,
            );

            if (!evaluation) return HttpResponse.json({ status: 404 });

            const commentIndex = evaluation.comments.findIndex(
                (comment) => comment.id === commentId,
            );

            if (commentIndex === -1) return HttpResponse.json({ status: 404 });

            const comment = evaluation.comments[commentIndex];

            if (comment.writerId !== userId) return HttpResponse.json({ status: 403 });

            evaluation.comments.splice(commentIndex, 1);

            return HttpResponse.json({ status: 200 });
        },
    ),
    http.put(
        `${BASE_URL}doc-evaluation/:applicantId/comment/:commentId`,
        async ({ request, params }) => {
            const authHeader = request.headers.get('Authorization');
            const userId = extractUserIdFromToken(authHeader);

            const applicantId = Number(params.applicantId);
            const commentId = Number(params.commentId);

            const evaluation = docEvaluationList.find(
                (evaluation) => evaluation.applicantId === applicantId,
            );

            if (!evaluation) return HttpResponse.json({ status: 404 });

            const targetComment = evaluation.comments.find((comment) => comment.id === commentId);

            if (!targetComment) return HttpResponse.json({ status: 404 });
            if (targetComment.writerId !== userId) return HttpResponse.json({ status: 403 });

            const body = (await request.json()) as { score: number; comment: string };

            targetComment.score = body.score;
            targetComment.comment = body.comment;

            return HttpResponse.json(
                {
                    ...targetComment,
                    isMine: true,
                },
                { status: 200 },
            );
        },
    ),
];

export { applicantHandler };
