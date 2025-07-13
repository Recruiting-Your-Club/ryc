import {
    getAllApplicants,
    getApplicantDetail,
    getDocument,
    getDocumentEvaluation,
} from '@api/domain/applicant/applicant';
import { applicantKeys } from '@api/querykeyFactory';
import { queryOptions } from '@tanstack/react-query';

const applicantQueries = {
    getApplicantDetail: (id: number) =>
        queryOptions({
            queryKey: applicantKeys.applicantDetail(id),
            queryFn: () => getApplicantDetail(id),
        }),
    allApplicants: () =>
        queryOptions({
            queryKey: applicantKeys.allApplicants,
            queryFn: () => getAllApplicants,
        }),
    getDocument: (id: number) =>
        queryOptions({
            queryKey: applicantKeys.documentDetail(id),
            queryFn: () => getDocument(id),
        }),
    getDocumentEvaluation: (id: number) =>
        queryOptions({
            queryKey: applicantKeys.evaluationDetail(id),
            queryFn: () => getDocumentEvaluation(id),
        }),
};

export { applicantQueries };
