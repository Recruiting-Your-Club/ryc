import { httpRequest } from '../../common/httpRequest';
import type {
    InterviewApplicant,
    InterviewSlot,
    UnreservedApplicant,
} from './types';

async function getInterviewSlot(params: {
    announcementId: string;
    clubId: string;
}): Promise<InterviewSlot[]> {
    return await httpRequest.get({
        url: `announcements/${params.announcementId}/interview-slots`,
        headers: { 'X-CLUB-ID': params.clubId },
    });
}

async function getInterviewInformation(params: {
    announcementId: string;
    interviewSlotId: string;
    clubId: string;
}): Promise<InterviewApplicant> {
    return await httpRequest.get({
        url: `announcements/${params.announcementId}/interview-slots/${params.interviewSlotId}/reservations`,
        headers: { 'X-CLUB-ID': params.clubId },
    });
}

async function getUnreservedApplicant(params: {
    announcementId: string;
    clubId: string;
}): Promise<UnreservedApplicant> {
    return await httpRequest.get({
        url: `announcements/${params.announcementId}/unreserved`,
        headers: { 'X-CLUB-ID': params.clubId },
    });
}

async function patchInterviewReservation(params: {
    reservationId: string;
    interviewSlotId: string;
    clubId: string;
}): Promise<void> {
    await httpRequest.patch({
        url: `interview-reservations/${params.reservationId}`,
        body: { interviewSlotId: params.interviewSlotId },
        headers: { 'X-CLUB-ID': params.clubId },
    });
}

export {
    getInterviewSlot,
    getInterviewInformation,
    getUnreservedApplicant,
    patchInterviewReservation,
};
