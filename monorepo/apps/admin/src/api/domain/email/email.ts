import { httpRequest } from '@api/common/httpRequest';

import type {
    Email,
    EmailVerificationSend,
    InterviewEmail,
    RequestPatchEmailVerification,
    RequestPostEmailVerification,
} from './types';

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
        isAuthRequire: true,
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
        isAuthRequire: true,
    });
}

async function postEmailVerification(
    data: RequestPostEmailVerification,
): Promise<EmailVerificationSend> {
    const response = await httpRequest.post({
        url: 'email-verifications',
        body: data,
    });
    return response as EmailVerificationSend;
}

async function patchEmailVerification(data: RequestPatchEmailVerification): Promise<void> {
    await httpRequest.patch({
        url: 'email-verifications',
        body: data,
    });
}

export { postPlainEmail, postInterviewEmail, postEmailVerification, patchEmailVerification };
