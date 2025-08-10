interface InterviewSet {
    id: number;
    name: string;
    startTime: string;
    endTime: string;
}

export interface InterviewSchedule {
    date: string;
    interviewSets: InterviewSet[];
}

export interface Interviewee {
    id: number;
    name: string;
    email: string;
    interviewSetId: number | null;
}

export interface IntervieweeDetail extends Interviewee {
    studentId: string;
    phone: string;
}

export interface Evaluation {
    applicantId: number;
    averageScore: number;
    comments: { id: number; score: number; name: string; comment: string }[];
}

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
