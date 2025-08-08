import {
    getAllApplicants,
    getApplicantDetail,
    getApplicantDocument,
    getDocument,
    getDocumentEvaluation,
    postDocumentDetail,
} from '@api/domain/applicant/applicant';
import type { ApplicantDocument } from '@api/domain/applicant/types';
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
            queryFn: () => getAllApplicants(),
        }),
    // getDocument: (id: string) =>
    //     queryOptions({
    //         queryKey: applicantKeys.documentDetail(id),
    //         queryFn: () => getDocument(id),
    //     }),
    getDocumentEvaluation: (id: number) =>
        queryOptions({
            queryKey: applicantKeys.evaluationDetail(id),
            queryFn: () => getDocumentEvaluation(id),
        }),
    documentDetail: ({ clubId, applicantIdList }: { clubId: string; applicantIdList: string[] }) =>
        queryOptions({
            queryKey: applicantKeys.documentDetail(clubId, applicantIdList),
            queryFn: () => {
                const params = { clubId, applicantIdList: applicantIdList };
                return postDocumentDetail(params);
            },
        }),
    getApplicantDocument: (announcementId: string, applicantId: string, clubId: string) =>
        queryOptions<ApplicantDocument>({
            queryKey: applicantKeys.applicantDocument(announcementId, applicantId, clubId),
            queryFn: () =>
                getApplicantDocument({
                    announcementId,
                    applicantId,
                    clubId,
                }),
        }),
};

export { applicantQueries };
