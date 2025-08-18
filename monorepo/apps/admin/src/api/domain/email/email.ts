import { httpRequest } from '@api/common/httpRequest';

import type { Email, InterviewEmail } from './types';

async function postPlainEmail(params: {
    announcementId: string;
    clubId: string;
    email: Email;
}): Promise<void> {
    const { announcementId, clubId, email } = params;

    return await httpRequest.post({
        url: `announcements/${announcementId}/emails`,
        headers: { 'X-ClUB-ID': clubId },
        body: email,
    });
}

async function postInterviewEmail(params: {
    announcementId: string;
    clubId: string;
    email: InterviewEmail;
}): Promise<void> {
    const { announcementId, clubId, email } = params;

    return await httpRequest.post({
        url: `admin/clubs/${clubId}/announcements/${announcementId}/interview-slots`,
        headers: { 'X-CLUB-ID': clubId },
        body: email,
    });
}

export { postPlainEmail, postInterviewEmail };
