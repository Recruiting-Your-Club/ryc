import { Applicant, ApplicantDetail, Document, Evaluation } from '@api/domain/applicant/types';
import { BASE_URL } from '@constants/api';
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
    http.get(`${BASE_URL}doc-evaluation/:id`, ({ params }) => {
        const detail = docEvaluationList.find(
            (evaluation) => evaluation.applicantId === Number(params.id),
        );
        return HttpResponse.json(detail as Evaluation, { status: 200 });
    }),
];

export { applicantHandler };
