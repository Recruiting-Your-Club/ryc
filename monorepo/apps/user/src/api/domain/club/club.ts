import { httpRequest } from '../../common/httpRequest';
import type { AllClub, Club, ClubInterviewSchedule, SubmitReservationResponse } from './types';

async function getAllClubs(): Promise<AllClub[]> {
    const response = await httpRequest.get({
        url: 'clubs',
    });
    return response as AllClub[];
}
async function getClub(id: string): Promise<Club> {
    const response = await httpRequest.get({
        url: `clubs/${id}`,
    });
    return response as Club;
}
async function getClubReservation(
    clubId: string,
    announcementId: string,
    applicantId: string,
): Promise<ClubInterviewSchedule> {
    const response = await httpRequest.get({
        url: `clubs/${clubId}/announcements/${announcementId}/interview-slots?applicant-id=${applicantId}`,
    });
    return response as ClubInterviewSchedule;
}

async function submitInterviewReservation(slotId: string, applicantId: string): Promise<SubmitReservationResponse> {
    const response = await httpRequest.post({
        url: `interview-slots/${slotId}/reservations`,
        headers: {
            'interview-slot-id': slotId,
        },
        body: {
            applicantId: applicantId,
        },
    });
    return response as SubmitReservationResponse;
}

export { getAllClubs, getClub, getClubReservation, submitInterviewReservation };
