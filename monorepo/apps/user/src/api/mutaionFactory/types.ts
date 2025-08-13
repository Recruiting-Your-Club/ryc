export interface InterviewReservationParams {
    clubId?: string;
    slotId?: string;
    announcementId?: string;
    applicantId?: string;
}
export interface InterviewReservationError {
    code: string;
    message: string;
}