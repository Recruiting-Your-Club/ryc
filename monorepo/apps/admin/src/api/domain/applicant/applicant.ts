import { httpRequest } from '@api/common/httpRequest';

import type { ApplicantDocument } from './types';

async function getApplicantDocument(params: {
    announcementId: string;
    applicantId: string;
    clubId: string;
}): Promise<ApplicantDocument> {
    const { announcementId, applicantId, clubId } = params;
    return await httpRequest.get({
        url: `announcements/${announcementId}/applications/${applicantId}`,
        headers: {
            'X-CLUB-ID': clubId,
        },
        isAuthRequire: true,
    });
}

export { getApplicantDocument };
