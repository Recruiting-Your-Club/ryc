export interface InterviewSlot {
    id: string;
    period: SlotPeriod;
    maxNumberOfPeople: number;
    currentNumberOfPeople: number;
}

export interface SlotPeriod {
    startDate: string;
    endDate: string;
}

export interface InterviewApplicant {
    interviewSlotId: string;
    interviewReservations: ApplicantReservedInterview[];
}

export interface UnreservedApplicant {
    unreservedApplicants: ApplicantForInterviewSlot[];
}

export interface ApplicantReservedInterview extends ApplicantForInterviewSlot {
    interviewReservationId: string;
}

export interface ApplicantForInterviewSlot {
    applicantId: string;
    applicantEmail: string;
    applicantName: string;
}
