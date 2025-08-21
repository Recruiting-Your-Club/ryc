import { httpRequest } from '@api/common/httpRequest';

import type { Step, StepApplicant } from './types';

async function getTotalSteps({ announcementId }: { announcementId: string }): Promise<Step> {
    const response = await httpRequest.get({
        url: `announcements/${announcementId}/process`,
        isAuthRequire: true,
    });
    return response as Step;
}

async function getAllStepApplicants({
    announcementId,
    clubId,
    status,
}: {
    announcementId: string;
    clubId: string;
    status?: string;
}): Promise<StepApplicant[]> {
    const url = status
        ? `announcements/${announcementId}/applicants?status=${status}`
        : `announcements/${announcementId}/applicants`;

    return await httpRequest.get({
        url: url,
        headers: {
            'X-CLUB-ID': clubId,
        },
        isAuthRequire: true,
    });
}

async function updateStepApplicantsStatus({
    applicantId,
    status,
    clubId,
}: {
    applicantId: string;
    status: string;
    clubId: string;
}): Promise<void> {
    await httpRequest.patch({
        url: `applicants/${applicantId}/status`,
        body: { status: status },
        headers: {
            'X-CLUB-ID': clubId,
        },
        isAuthRequire: true,
    });
}

export { getTotalSteps, getAllStepApplicants, updateStepApplicantsStatus };
