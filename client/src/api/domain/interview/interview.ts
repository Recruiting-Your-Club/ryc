import { httpRequest } from '../../common/httpRequest';
import type {
    Evaluation,
    InterviewApplicant,
    Interviewee,
    IntervieweeDetail,
    InterviewSchedule,
    InterviewSlot,
    UnreservedApplicant,
} from './types';

async function getAllInterviewSchedules(): Promise<InterviewSchedule[]> {
    const response = await httpRequest.get({
        url: `interviewschedules/all`,
    });
    return response as InterviewSchedule[];
}

async function getAllInterviewees(): Promise<Interviewee[]> {
    const response = await httpRequest.get({
        url: `interviewees/all`,
    });
    return response as Interviewee[];
}

async function getIntervieweeDetail(id: number): Promise<IntervieweeDetail> {
    const response = await httpRequest.get({
        url: `interviewees/${id}`,
    });
    return response as IntervieweeDetail;
}

async function getEvaluation(id: number): Promise<Evaluation> {
    const response = await httpRequest.get({
        url: `interviewer/${id}`,
    });
    return response as Evaluation;
}

async function updateIntervieweeSchedule(
    intervieweeId: number,
    body: { interviewSetId: number | null },
): Promise<void> {
    await httpRequest.put({
        url: `interviewees/${intervieweeId}`,
        body: body,
    });
}

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
    getAllInterviewSchedules,
    getAllInterviewees,
    getEvaluation,
    getIntervieweeDetail,
    updateIntervieweeSchedule,
    getInterviewSlot,
    getInterviewInformation,
    getUnreservedApplicant,
    patchInterviewReservation,
};
