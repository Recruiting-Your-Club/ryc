import { httpRequest } from '@api/common/httpRequest';

import type {
    EmailVerificationSend,
    RequestPatchEmailVerification,
    RequestPostEmailVerification,
} from './types';

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

export { postEmailVerification, patchEmailVerification };
