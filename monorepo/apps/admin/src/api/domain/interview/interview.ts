import { httpRequest } from '../../common/httpRequest';
import type { InterviewApplicant, InterviewSlot, UnreservedApplicant } from './types';

async function getInterviewSlot(params: {
    announcementId: string;
    clubId: string;
}): Promise<InterviewSlot[]> {
    return await httpRequest.get({
        url: `admin/announcements/${params.announcementId}/interview-slots`,
        headers: { 'X-CLUB-ID': params.clubId },
        isAuthRequire: true,
    });
}

// 면접 예약자들 조회
async function getInterviewInformation(params: {
    announcementId: string;
    interviewSlotId: string;
    clubId: string;
}): Promise<InterviewApplicant[]> {
    return await httpRequest.get({
        url: `admin/interview-slots/${params.interviewSlotId}/reservations`,
        headers: { 'X-CLUB-ID': params.clubId },
        isAuthRequire: true,
    });
}

// 면접 미예약자들 조회
async function getUnreservedApplicant(params: {
    announcementId: string;
    clubId: string;
}): Promise<UnreservedApplicant[]> {
    return await httpRequest.get({
        url: `announcements/${params.announcementId}/interviews/unreserved-applicants`,
        headers: { 'X-CLUB-ID': params.clubId },
        isAuthRequire: true,
    });
}

// 면접 예약 정보 수정
async function putInterviewReservation(params: {
    applicantId: string;
    interviewSlotId: string;
    clubId: string;
    oldInterviewSlotId: string;
}): Promise<void> {
    await httpRequest.put({
        url: `admin/applicants/${params.applicantId}/interview-reservation`,
        body: { interviewSlotId: params.interviewSlotId },
        headers: { 'X-CLUB-ID': params.clubId },
        isAuthRequire: true,
    });
}

async function deleteInterviewReservation(params: {
    reservationId: string;
    clubId: string;
    oldInterviewSlotId: string;
}): Promise<void> {
    await httpRequest.delete({
        url: `admin/interview-reservations/${params.reservationId}`,
        headers: { 'X-CLUB-ID': params.clubId },
        isAuthRequire: true,
    });
}

export {
    getInterviewSlot,
    getInterviewInformation,
    getUnreservedApplicant,
    putInterviewReservation,
    deleteInterviewReservation,
};
