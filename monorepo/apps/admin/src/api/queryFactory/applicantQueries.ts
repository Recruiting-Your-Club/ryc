import { getApplicantDocument } from '@api/domain/applicant/applicant';
import type { ApplicantDocument } from '@api/domain/applicant/types';
import { applicantKeys } from '@api/querykeyFactory';
import { queryOptions } from '@tanstack/react-query';

const applicantQueries = {
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
